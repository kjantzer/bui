
// imported into code
if( require.main !== module){

	const { spawn } = require('child_process')

	exports.extensions = ['pdf', 'docx', 'doc', 'xlsx', 'xls']

	exports.generate = function(file, {size=null}={}){

		return new Promise((resolve, reject)=>{
			let args = [
				__filename,
				'--file='+file
			]

			if( size )
				args.push('--size='+size)

			let child = spawn('nodejs', args)
			let error = ''
			let resp = ''

			child.stdout.on('data', (data) => {
				resp += data
			});

			child.stderr.on('data', (data) => {
				error += data
			});

			child.on('error', function(err) {
				error += err
			});

			child.on('exit', (code) => {
				if( error )
					reject({code, error, resp})
				else
					resolve(resp)
			});

		})
	}

// when spawned directly
}else{

	const argv = require('yargs').argv
	const fs = require('fs')
	const childProcess = require('child_process')
	const getPort = require('get-port')
	const os = require('os')
	const path = require('path')

	function convertDoc(input, {
		output= '',
		format='pdf'
	}={}){
		return new Promise(async (resolve, reject) => {
			
			output = output || input+'.preview.'+format

			const port = await getPort()
			const userProfilePath = path.join(os.tmpdir(), port.toString())
			const stderr = [];
			const writerStream = fs.createWriteStream(output);

			// NOTE: port and user-profile are used so multiple unoconv can run in parallel
			const args = [
				'--format='+format,
				'--stdout',
				'--port='+port,
            	'--user-profile='+userProfilePath,
				input
			]

			const worker = childProcess.spawn('unoconv', args);

			worker.on('error', err => {
				if (err.message.indexOf('ENOENT') > -1) {
					console.error('unoconv command not found');
				}
				return reject(err);
			});

			worker.stdout.pipe(writerStream);

			worker.stderr.on('data', data => {
				stderr.push(data);
			});

			worker.on('close', code => {
				if (stderr.length) {
					return reject(new Error(Buffer.concat(stderr).toString('utf8')));
				}
				resolve(output);
			});
		});
	}

	function createThumbnail(input, {
		output= '',
		size=800,
		quality=75
	}={}){
		return new Promise((resolve, reject) => {

			output = output || input+'.preview.jpg'

			const worker = childProcess.spawn('gm', [
				'convert', 
				'-resize', size+'x'+size,
				'-quality', quality,
				input,
				output
			]);

			worker.on('error', err => {
				console.log(err);
			});
			
			worker.on('close', code => {
				resolve(true);
			});
		});
	}

	(async function(){

		if( !argv.file )
			return console.error('no file given')

		if( !fs.existsSync(argv.file) )
			return console.error('file does not exist')

		let pdfFile = argv.file

		if( !pdfFile.match(/\.pdf$/) ){
			console.log('convert to pdf...');
			pdfFile = await convertDoc(argv.file)
		}
		
		console.log('create thumbnail...');
		await createThumbnail(pdfFile+'[0]', {
			output: argv.file+'.preview.jpg',
			size: argv.size
		})

		console.log('all done');

	})()

}