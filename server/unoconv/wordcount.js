/*
    NOTE: port and user-profile are used so multiple unoconv can run in parallel
*/
const childProcess = require('child_process')
const getPort = require('get-port')
const os = require('os')
const path = require('path')

module.exports = (file)=>{

    return new Promise(async (resolve, reject) => {

        const port = await getPort()
        const userProfilePath = path.join(os.tmpdir(), port.toString())

        let output = ''
        let error = ''
        let args = [
            '--format=txt',
            '--stdout',
            '--port='+port,
            '--user-profile='+userProfilePath,
            `"${file}"`
        ]
        const worker = childProcess.spawn('sh', ['-c', `unoconv ${args.join(' ')} | wc -w`]);

        worker.on('error', err => {
            return reject(err);
        });

        worker.stderr.on('data', data => {
            error += data
        });

        worker.stdout.on('data', data => {
            output += data
        });

        worker.on('close', code => {

            if( error )
                return reject(error)

            let count = output.trim()
            count = parseInt(count)
            if( isNaN(count) )
                reject('not a number')
            else
                resolve(count);
        });
    });

}