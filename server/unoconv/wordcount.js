const childProcess = require('child_process')

module.exports = (file)=>{

    return new Promise((resolve, reject) => {

        let output = ''
        const worker = childProcess.spawn('sh', ['-c', `unoconv -f txt --stdout ${file} | wc -w`]);

        worker.on('error', err => {
            return reject(err);
        });

        worker.stdout.on('data', data => {
            output += data
        });

        worker.on('close', code => {
            let count = output.trim()
            count = parseInt(count)
            if( isNaN(count) )
                reject('not a number')
            else
                resolve(count);
        });
    });

}