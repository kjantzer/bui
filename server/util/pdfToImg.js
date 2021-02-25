const childProcess = require('child_process')

module.exports = function pdfToImg(input, output, {
    density=300,
    quality=100
}={}){

    return new Promise((resolve, reject)=>{

        let resp = ''

        const worker = childProcess.spawn('gm', [
            'convert',
            '-density', density,
            '-quality', quality,
            '-trim',
            input,
            output
        ]);

        worker.stdout.on('data', (data) => {
            resp += data
        });

        worker.stderr.on('data', (data) => {
            resp += data
        });

        worker.on('error', err => {
            reject(err)
        });
        
        worker.on('close', code => {
            resolve(resp)
        });

    })
}


