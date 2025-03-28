/*
    # TaskQueue

    Uses `setImmediate` to continually loop, checking for the next task in the queue to process

    ```js
    let queue = new TaskQueue({
        autoStart: false // default true
        autoReload: true (use all defaults, or set to false)
        autoReload: {
            delay: 60 * 1000, // 1 minute
            whenEmpty: true // only reload if queue is empty
        },
        delay: false, // delay before processing next task (default none)
        progress: ({action, msg, data})=>{
            console.log(action)
        },
        load: async ()=>{
            // ideally should come from DB so queue can be resume after restart
            return [array of tasks]
        },
        process: async task=>{
            // process the task
        }
    })

    queue.start()
    queue.stop()

    queue.load() // force a reload of the queue (if you know new tasks are available)
    ```

    If you dont want to call `.load()` you can choose to set the `autoReload` option which will contiue to call `load()` after a delay
*/
module.exports = class TaskQueue {

    constructor(opts){
        this.opts = opts

        this._queue = null
        this.start = this.start.bind(this)
        this.run = this.run.bind(this)

        // default to auto reload
        if( opts?.autoReload !== false )
            this.opts.autoReload = {
                delay: 60 * 1000, // 1 minute
                whenEmpty: true,

                // could have set `true` (use all defaults) or provided custom opts
                ...(typeof this.opts.autoReload === 'object' ? this.opts.autoReload : {})
            }
        
        if( opts?.autoStart !== false )
            setImmediate(this.start)
    }

    get length(){ return this._queue?.length }
    get isRunning(){ return !!this._running }

    progress(action, msg, data){
        this.opts.progress?.({action, msg:msg||action, data})
    }

    async start(){
        if( this._running ) return

        this._running = true
        this.progress('start')
        
        await this.load()
        
        this.run()
    }

    async stop(){
        this._running = false
        this.progress('stop')
    }

    async load(){
        let len = this._queue?.length || 0
        
        this._queueLoadedAt = new Date().getTime()
        this._queue = await this.opts.load?.()

        if( !this._queue?.length )
            this._queue = null // means no more to load (paginated)

        this.progress('load', this._queue?.length - len+' tasks added to queue of '+len)
    }
    
    async run(){

        if( this._queue ){

            let task = this._queue.shift() // FIFO

            if( task ) 
                await this.process(task)
            // attempt to load next batch of paginated tasks
            else 
                await this.load()
        }

        autoreload: if( this.opts.autoReload ){

            // dont reload until queue is empty
            if( this.opts.autoReload.whenEmpty && this._queue?.length ) 
                break autoreload

            let tsElapsed = new Date().getTime() - this._queueLoadedAt

            if( tsElapsed > this.opts.autoReload.delay )
                await this.load()
        }

        if( this.opts.delay )
            await new Promise(resolve=>setTimeout(()=>resolve(), this.opts.delay))

        if( this._running )
            setImmediate(this.run)
    }

    async process(task){
        await this.opts.process?.(task)
        this.progress('process', null, task)
    }
}