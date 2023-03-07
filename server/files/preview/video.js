
// imported into code
if( require.main !== module){

    const {spawnJob} = require('./spawn')

	exports.videoPreview = function(file, {size=null}={}){
        return spawnJob(__filename, file, arguments[0])
	}

// when spawned directly
}else{

const argv = require('yargs').argv
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')

ffmpeg.setFfmpegPath('/usr/bin/ffmpeg');

;(async function(){

    let {file} = argv

    if( !file )
        return console.error('no file given')

    if( !fs.existsSync(file) )
        return console.error('file does not exist')

    let traits = {}

    let metadata = await new Promise(resolve=>{
        ffmpeg.ffprobe(file, function(err, metadata) {
            resolve(metadata);
        });
    })

    let videoStream = metadata.streams.find(s=>s.codec_type=='video')
    // let audioStream = metadata.streams.find(s=>s.codec_type=='audio')

    if( !videoStream )
        throw new Error('no video stream found')
    
    if( videoStream ){
        traits.width = videoStream.width
        traits.height = videoStream.height
        traits.duration = metadata.format.duration
    }

    // NOTE: w/h never used
    let w = 0
    let h = 0

    if( traits.width > traits.height ){
        w = 800
        h = w / (traits.width / traits.height)
    }else{
        
        if( traits.width == traits.height )
            traits.square = true
        else
            traits.portrait = true

        h = 800
        w = h / (traits.height / traits.width)
    }
    
    await new Promise(resolve=>{

        ffmpeg(file)
        .output(file+'.preview.jpg')
        .noAudio()
        .seek(0.25) // move foward a little in case video starts black
        .on('error', function(err) {
            // console.log('An error occurred: ' + err.message);
            resolve()
        })
        .on('end', function() {
            console.log('Processing finished !');
            resolve()
        })
        .run();
    })
        
    console.log(JSON.stringify(traits))

})()

}