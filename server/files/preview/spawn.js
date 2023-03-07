const { spawn } = require('child_process')

exports.spawnJob = function(jobFile, file, opts={}){

    return new Promise((resolve, reject)=>{
        let args = [
            jobFile,
            '--file='+file
        ]


        for( let k in opts ){
            args.push(`--${k}`, opts[k])
        }

        let child = spawn('nodejs', args)
        let error = ''
        let resp = ''

        child.stdout.on('data', (data) => {
            if( opts.debug ) console.log(data.toString());
            resp += data
        });

        child.stderr.on('data', (data) => {
            if( opts.debug ) console.log(data.toString());
            error += data
        });

        child.on('error', function(err) {
            if( opts.debug ) console.log(err);
            error += err
        });

        child.on('exit', (code) => {
            if( error )
                reject({code, error, resp})
            else{

                if( resp?.[0] == '[' || resp?.[0] == '{' )
                try{
                    let json = JSON.parse(resp.trim())
                    resp = json
                }catch(err){
                    console.log(err);
                }

                resolve(resp)
            }
        });

    })
}