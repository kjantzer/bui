const shell = require('shelljs');

// execute shell command in async - returns promise that resolves with response
module.exports = function shellExec(cmd, args=''){
    return new Promise((resolve, reject)=>{

        if( Array.isArray(args) )
            args = args.join(' ')

        let cmdArgs = `${cmd} `+args

        shell.exec(cmdArgs, {
            silent: !process.env.LOCAL_V6_PORT,
            async: true
        }, (code, stdout, stderr)=>{

            if( cmd == 'pdfjam' ){
                stdout = stdout || stderr
                stderr = stdout ? null : stderr
            }

            // dont treat this warning as a fatal error
            if( cmd == 'pdftk' && stderr.match(/^GC Warning:/) ){
                console.log(stderr);
                stderr = null
            }

            if( stderr )
                reject(stderr)
            else
                resolve(stdout)
        })

    })
}