const { spawn } = require('child_process')
const readline = require('readline')

function prompt(question, defaultVal){
    return new Promise((resolve)=>{
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        if( Array.isArray(question))
            question = question.join(`\n`)

        rl.question(question, async val=>{
            rl.close()
            resolve(val)
        })

        if( defaultVal !== undefined )
            rl.write(String(defaultVal))
    })
}


function shell(cmd, {stdio='pipe'}={}){
    return new Promise((resolve, reject)=>{

        const shellCmd = spawn(cmd, [], {shell:true, stdio});
        
        let resp = ''
        let err = ''

        if( shellCmd.stdout )
        shellCmd.stdout.on('data', (data) => {
            let s = data.toString()
            if( !s.includes('[Warning]') )
                resp += s
        });

        if( shellCmd.stderr )
        shellCmd.stderr.on('data', (data) => {
            let s = data.toString()
            if( !s.includes('[Warning]') )
                err += s
        });

        shellCmd.on('close', (code) => {
            
            if( err && !resp )
                reject(err)

            resolve(resp)
        })
    })
}

module.exports = {prompt, shell}