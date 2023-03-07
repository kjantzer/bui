
// imported into code
if( require.main !== module){

    const {spawnJob} = require('./spawn')
	
	exports.extensions = ['psd']

	exports.psdPreview = function(file, {size=null}={}){
        return spawnJob(__filename, file, arguments[0])
	}

// when spawned directly
}else{

	const argv = require('yargs').argv
	const fs = require('fs')
    const sharp = require('sharp')
    const {PNG} = require('pngjs');

	(async function(){

        const {default: Psd} = await import("@webtoon/psd");

        let {file, size} = argv

		if( !file )
			return console.error('no file given')

		if( !fs.existsSync(file) )
			return console.error('file does not exist')

        size = size || 800
        
        const psdData = fs.readFileSync(file);
        const psdFile = Psd.parse(psdData.buffer);
        let pixels = await psdFile.composite()

        let png = new PNG({ width: psdFile.width, height: psdFile.height })
        png.data = Buffer.from(pixels);

        let  buffer = PNG.sync.write(png);

        // write full image
        let tempfile = `/tmp/psd-preview-${new Date().getTime()}.png`
        fs.writeFileSync(tempfile, buffer);

        // now create preview of image
        let img = sharp(tempfile).resize(size, size, {
            fit:'inside',
            withoutEnlargement: true,
            background:'#ffffff'
        })
        .flatten({background:'#ffffff'}) // in case png with transparency is uploaded

        await img.toFile(file+'.preview.jpg')

        let metadata = {
            layers: psdFile.layers.length,
            width: psdFile.width,
            height: psdFile.height,
            channels: psdFile.channelCount
        }

        console.log(JSON.stringify(metadata))

	})().catch(err=>{
        console.log(err);
    })

}