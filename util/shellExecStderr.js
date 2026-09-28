const shell = require('shelljs');

/*
    Like `shellExec`, but for tools (pdfjam, ffmpeg) that write their real
    output to stderr even on a successful run 
    Success/failure is determined by the exit code 
*/
module.exports = function shellExecStderr(cmd, args=''){
    return new Promise((resolve, reject)=>{

        if( Array.isArray(args) )
            args = args.join(' ')

        let cmdArgs = `${cmd} `+args

        shell.exec(cmdArgs, {
            silent: !process.env.LOCAL_V6_PORT,
            async: true
        }, (code, stdout, stderr)=>{

            if( code !== 0 ){
                let err = new Error((stderr || stdout || `${cmd} exited with code ${code}`).trim())
                err.code = code
                err.cmd = cmdArgs
                return reject(err)
            }

            resolve(stdout || stderr)
        })

    })
}
