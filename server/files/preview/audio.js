
// imported into code
if( require.main !== module){

    const {spawnJob} = require('./spawn')
	
	exports.audioPreview = function(file, opts){
        return spawnJob(__filename, file, opts)
	}

// when spawned directly
}else{

const argv = require('yargs').argv
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const shellExec = require(`../../../util/shellExec`)

ffmpeg.setFfmpegPath('/usr/bin/ffmpeg');

const defaultOpts = {
    size: '800x250',
    colors: '#000000',
    gain: -6,
    clipAt: 300, // 5 min
    clipTo: '00:05:00.0', // then clip to 5 min and create waveform
    clipGain: 0,
    waveform: true
}

;(async function(){

    let {file} = argv
    let opts = {...defaultOpts, ...argv}

    if( !file )
        return console.error('no file given')

    if( !fs.existsSync(file) )
        return console.error('file does not exist')

    let metadataOutput = {}

    let metadata = await new Promise(resolve=>{
        ffmpeg.ffprobe(file, function(err, metadata) {
            resolve(metadata);
        });
    })

    let audioStream = metadata.streams.find(s=>s.codec_type=='audio')

    if( !audioStream )
        throw new Error('no audio stream found')

    metadataOutput = audioStream

    if( opts.waveform === true ){

        let thumbnailSrc = file
        let thumbnailFromClippedSample = opts.clipAt && metadataOutput.duration > opts.clipAt

        // create clipped version of orig to create waveform from
        if( thumbnailFromClippedSample ){

            let clippedFile = file+'-clipped-for-waveform.mp3'

            await shellExec('ffmpeg', [
                '-ss 00:00:00.0',
                '-hide_banner',
                '-loglevel error',
                '-y',
                `-i "${thumbnailSrc}"`,
                '-c:a libmp3lame',
                '-t '+opts.clipTo,
                `"${clippedFile}"`,
            ]).then(r=>{
                if( opts.debug )
                    console.log(r);
            }).catch(err=>{
                clippedFile = null
            })

            thumbnailSrc = clippedFile
            opts.gain = opts.clipGain
        }

        if( thumbnailSrc )
        await shellExec('ffmpeg', [
            '-y',
            '-hide_banner',
            '-loglevel error',
            `-i "${thumbnailSrc}"`,
            '-filter_complex "[0:a]aformat=channel_layouts=mono,',
                `compand=gain=${opts.gain},`,
                `showwavespic=s=${opts.size}:colors=${opts.colors}"`,
            '-frames:v 1',
            `"${file+'.preview.png'}"`
        ])

        if( thumbnailFromClippedSample && fs.existsSync(thumbnailSrc) ){
            fs.unlinkSync(thumbnailSrc)
        }
    }
    
    console.log(JSON.stringify(metadataOutput))

})().catch(err=>{
    console.log(err);
})

}