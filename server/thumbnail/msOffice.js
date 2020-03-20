
// imported into code
if( require.main !== module){

	const { spawn } = require('child_process')

	exports.extensions = ['docx', 'doc', 'xlsx', 'xls']

	exports.generate = function(file, {size=null}={}){
		let args = [
			__filename,
			'--file='+file
		]

		if( size )
			args.push('--size='+size)

		spawn('nodejs', args)
	}

// when spawned directly
}else{

	const argv = require('yargs').argv
	const fs = require('fs')
	const childProcess = require('child_process')

	function convertDoc(input, {
		output= '',
		format='pdf'
	}={}){
		return new Promise((resolve, reject) => {
			
			output = output || input+'.preview.'+format

			const stderr = [];
			const writerStream = fs.createWriteStream(output);

			const worker = childProcess.spawn('unoconv', ['-f', format, '--stdout', input]);

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

		console.log('convert to pdf...');
		let pdfFile = await convertDoc(argv.file)
		
		console.log('create thumbnail...');
		await createThumbnail(pdfFile+'[0]', {
			output: argv.file+'.preview.jpg',
			size: argv.size
		})

		console.log('all done');

	})()

}