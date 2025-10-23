/*
    Use FFMPEG to get metadata and optionally more intensive stats and waveform
*/
const ffmpeg = require('fluent-ffmpeg')
const shellExec = require(`../../../util/shellExec`)

async function metadata(filePath, {stats=true,debug=false}={}){

    if( debug )
        console.time('audio metadata');

    let metadata = await new Promise(resolve=>{
        ffmpeg.ffprobe(filePath, function(err, metadata) {

            let data = metadata.streams.find(s=>s.codec_type=='audio')

            if( data && metadata.format?.tags )
                data.tags = metadata.format.tags

            if( debug )
                console.timeEnd('audio metadata');

            resolve(data);
        });
    })

    if( !stats )
        return metadata

    if( debug )
        console.time('audio stats');

    return shellExec('ffmpeg', [
        '-hide_banner',
        '-i', `"${filePath}"`,
        //'-af', 'loudnorm=I=-23:TP=-1:LRA=11:print_format=summary',
        '-af', 'astats',
        '-f', 'null',
        '-'
    ]).then(r=>{

        let lines = r.split('\n')

        let stats = lines.map(line=>{

            let [, key, value] = line.match(/^\[Parsed_astats.*\] (.*):\s*(.*)/) || []

            if( value?.match(/^[\d\.-]+$/) ){
                let v = parseFloat(value)
                value = isNaN(v) ? value : v
            }

            return key ? [key, value] : null

        }).filter(d=>d)

        stats = Object.fromEntries(stats)
        
        metadata.stats = stats

        if( debug )
            console.timeEnd('audio stats');

        return metadata
    })
}

function waveform(filePath, {duration=192, color='#000000', gain=0, height=100, pixelsPerSecond=10, crop=50, maxWidth=false}={}){
    
    duration = Math.ceil(duration)

    // cropped to remove dead space at top and bottom of waveform
    crop = crop / 100
    let cropTop = (1-crop) / 2
    height = Math.round(height / crop) // maintain actual height given after cropped
    let width = pixelsPerSecond * duration

    if( maxWidth && width > maxWidth )
        width = maxWidth
    
    return shellExec('ffmpeg', [
        '-y', // overwrite existing output file
        '-hide_banner', // suppress annoying ffmpeg banner
        '-loglevel error',
        '-i', `"${filePath}"`, // input file
        '-filter_complex', `"compand=gain=${gain},showwavespic=s=${width}x${height}:colors=${color}:scale=lin,crop=iw:ih*${crop}:0:ih*${cropTop}"`,
        '-frames:v', '1', // make sure output is a single image of waveform
        `"${filePath}.preview.png"`
    ])
}

module.exports = {
    waveform,
    metadata
}