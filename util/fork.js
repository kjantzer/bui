/*
    # Fork

    Fork a worker process and return a promise that resolves with the worker's response.
    Defaults to 90 second timeout to kill the worker if it doesn't respond in time.
*/
const {fork} = require('child_process')

module.exports = class ForkWorker {

    settled = false

    constructor(workerFile, {msg='', timeout=90*1000}={}){

        let filename = workerFile.split('/').pop()
        this.worker = fork(workerFile, {
            // execArgv: [ '--inspect=9232' ]  // NOTE: not working? if working, opt-in?
        })

        this.response = new Promise((resolve, reject)=>{
            this.resolve = resolve
            this.reject = reject
        })

        if( timeout )
            this.timer = setTimeout(()=>{
                this.worker.kill('SIGKILL')
                this.settle(new Error(`${filename} timed out after ${timeout}ms`))
            }, timeout)

        this.worker.once('message', msg=>{
            this.worker.kill()

            if( msg.error )
                this.settle(new Error(msg.error))
            else
                this.settle(msg)
        })

        this.worker.once('error', err=>this.settle(err))

        this.worker.once('exit', (code, signal)=>{
            this.settle(new Error(`${filename} exited unexpectedly (code=${code}, signal=${signal})`))
        })

        this.worker.send(msg)
    }

    settle(resp){
        if( this.settled ) return
        this.settled = true
        clearTimeout(this.timer)

        if( resp instanceof Error )
            this.reject(resp)
        else
            this.resolve(resp)
    }
}