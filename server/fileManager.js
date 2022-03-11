const Model = require('./model')
const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs')
const shellExec = require(bui`util/shellExec`)
const {round} = require(bui`util/math`)
const sharp = require('sharp')
const exif = require('exif-reader')
const msOfficeThumbnailer = require('./thumbnail/msOffice')
const ffmpeg = require('fluent-ffmpeg')
const Vibrant = require('node-vibrant')

ffmpeg.setFfmpegPath('/usr/bin/ffmpeg');

module.exports = class FileManager extends Model {

    get config(){ return {
        table: 'files',
        jsonFields: ['sizes', 'traits']
    }}

    get ASSETS_PATH(){ return '/mnt/data' }
    get rootDir(){ return ''}
    get group(){ return '' }

    skipDuplicates = false // only applies when same parent_id
    waitForPreviewGeneration = false // upload response wont return until preview saved
    autoRotate = false
    previewSize = 800

    // TODO: 
    // capturePalette = true // make this an opt-out?
    // sizes = false // add an array of sizes to save, in addition to preview

    audioWaveformPreview = { // return false to disable
        size: '800x250',
        colors: '#000000',
        gain: -6,
        clipAt: 1200, // 20 min // if 20 min
        clipTo: '00:05:00.0', // then clip to 5 min and create waveform
        clipGain: 0
    }

    // constratin to aspect ratio on upload?
    // only `square` supported currently
    aspectRatio = false // = dont apply, use original file
    aspectRatioDefaults = {
        fit:'contain',
        background: 'auto' // = use color palette
    }

    get parent_id(){ return this.__parent_id }
    set parent_id(id){ this.__parent_id = id }

    // example on how to change default download filename
    // get downloadFilename(){ return this.attrs.orig_filename }
    
    // shouldn't need to override these
    get groupPath(){ return this.group.toLowerCase() }
    get fileName(){ return this.attrs.id ? (this.attrs.filename) : '' }
    get dirPath(){ return [this.ASSETS_PATH, this.rootDir, this.groupPath].filter(s=>s).join('/')}
    get path(){ return this.dirPath+'/'+this.fileName }
    get filePath(){ return path.join(this.dirPath, this.fileName) }

    get displayPath(){
        if( this.attrs.has_preview
        && this.attrs.ext != 'pdf'
        && msOfficeThumbnailer.extensions.includes(this.attrs.ext) ){
            let filename = this.fileName ? this.fileName+'.preview.pdf' : ''
            return path.join(this.dirPath, filename)
        }

        if( this.req.query.size || this.req.query.display )
            return this.previewPath

        return this.filePath
    }

    get previewPath(){

        if( !this.attrs.has_preview ){
            return this.filePath
        }

        let ext = [, 'jpg', 'png'][this.attrs.has_preview]||'jpg'
        let size = parseInt(this.req.query.size||this.req.query.display) || false

        if( !size || !this.attrs.sizes || !this.attrs.sizes.includes(size)){
            size = 'preview'
        }

        let name = this.fileName ? this.fileName+`.${size}.`+ext : ''
        return path.join(this.dirPath, name)
    }

    ensureDirPath(){
        return mkdirp.sync(this.dirPath)
    }

    findWhere(where){
        // if asking for a set of files, parent_id must be given
        if( !this.id )
            where['parent_id'] = this.parent_id || false

        where['group_name'] = this.group
    }

    async upload(file, src='', {traits={}, description=null}={}){

        if( !file ){
            file = this.req.files.file
        }

        // if all files uploaded together
        if( Array.isArray(file) ){
            let resp = []
            for( let _file of file ){
                try {
                    let _resp = await new (this.constructor)(null, this.req).upload(_file, src, {traits})
                    resp.push(_resp)
                }catch(err){
                    resp.push({
                        error: err.message
                    })
                }
            }
            return resp
        }

        if( !file ) throw new Error('No file found')

        let filename = file.name
        let ext = file.name.split('.').pop()

        let info = {
            parent_id: this.parent_id || null,
            group_name: this.group,
            filename: filename,
            ext: ext,
            size: file.size,
            type: file.mimetype,
            dir_path: this.groupPath,
            orig_filename: file.name,
            user_id: this.req.user.id,
            description,
            src: src,
            md5: file.md5,
            traits: traits,
        }

        if( this.skipDuplicates == true ){
            let dupe = await this.db.query(/*sql*/`
                SELECT * FROM files
                WHERE IFNULL(parent_id,'') = ? AND group_name = ? AND dir_path = ? AND md5 = ?
            `, [info.parent_id||'', this.group, info.dir_path, info.md5]).then(r=>r.first)

            if( dupe )
                throw new Error('Duplicate file: '+dupe.filename)
        }

        // only one file allowed for this group/parent_id
        if( this.isSingular ){
            await this.find()
            if( this.id )
                await this.destroy()
        }

        await this.ensureDirPath()

        let isImg = info.type.match(/image/) && !info.type.match(/photoshop/)
        let isVideo = info.type.match(/video/)
        let isAudio = info.type.match(/audio/)
        let isPDF = info.type.match(/pdf/)
        let sharpImg
        let metadata = {}

        if( isImg ){
            sharpImg = sharp(file.tempFilePath || file.data)
            metadata = await sharpImg.metadata()

            if( metadata.exif ){
                try{
                    metadata.exif = info.traits.exif = exif(metadata.exif)
                    delete info.traits.exif.exif
                }catch(err){
                    console.log(err);
                }
            }
            
            info.traits.width = metadata.width
            info.traits.height = metadata.height
            info.traits.dpi = metadata.density
        }

        let {syncData} = await this.add(info, {manualSync:true})

        if( !this.id )
            throw new Error('failed to insert file record')

        // change filename to include the DB record ID so each is uniquely named
        filename = `${this.id}-${filename}`
        await this.update({filename}, {manualSync:true})

        let fileMoved = await new Promise(resolve=>{
            
            file.mv(this.dirPath+'/'+filename, err=>{
                err ? resolve(err) : resolve(true)
            })
        })

        if( fileMoved === true ){

            if( isPDF ){
                try{
                    let info = await pdfInfo(this.path)
                    let traits = Object.assign(info, this.attrs.traits)
                    await this.update({traits}, {manualSync:true})
                    
                }catch(err){
                    console.log('hmm...problem getting PDF info');
                }
            }
            
            let generatePreview = isVideo || isAudio 
                ? this.generateThumbnail() 
                : this.generatePreview({metadata, sharpImg, filename})

            if( this.waitForPreviewGeneration )
                await generatePreview

            if( syncData )
                syncData()

        }else{
            console.log('failed to upload, delete DB record', fileMoved);
            this.destroy()
            throw fileMoved
        }

        return this
    }

    async generateThumbnail(){
        
        let metadata = await new Promise(resolve=>{
            ffmpeg.ffprobe(this.filePath, function(err, metadata) {
                resolve(metadata);
            });
        })

        let videoStream = metadata.streams.find(s=>s.codec_type=='video')
        let audioStream = metadata.streams.find(s=>s.codec_type=='audio')

        let traits = this.attrs.traits || {}
        if( videoStream ){
            traits.width = videoStream.width
            traits.height = videoStream.height
            traits.duration = metadata.format.duration
        }else if ( audioStream ){

            traits = audioStream
            let has_preview = false

            let waveformOpts = this.audioWaveformPreview

            if( waveformOpts ){
                let thumbnailSrc = this.filePath
                let thumbnailFromClippedSample = waveformOpts.clipAt && traits.duration > waveformOpts.clipAt

                // create clipped version of orig to create waveform from
                if( thumbnailFromClippedSample ){
                    let clippedFile = this.filePath+'-clipped-for-waveform.mp3'

                    await shellExec('ffmpeg', [
                        '-ss 00:00:00.0',
                        `-i "${thumbnailSrc}"`,
                        '-c copy',
                        '-t '+waveformOpts.clipTo,
                        `"${clippedFile}"`,
                    ]).then(r=>{
                        if( waveformOpts.debug )
                            console.log(r);
                    })

                    thumbnailSrc = clippedFile
                    waveformOpts.gain = waveformOpts.clipGain
                }

                await shellExec('ffmpeg', [
                    `-i "${thumbnailSrc}"`,
                    '-filter_complex "[0:a]aformat=channel_layouts=mono,',
                        `compand=gain=${waveformOpts.gain},`,
                        `showwavespic=s=${waveformOpts.size}:colors=${waveformOpts.colors}"`,
                    '-frames:v 1',
                    `"${this.filePath+'.preview.png'}"`
                ])

                if( thumbnailFromClippedSample && fs.existsSync(thumbnailSrc) ){
                    fs.unlinkSync(thumbnailSrc)
                }

                has_preview = 2
            }

            await this.update({traits, has_preview}) // 2 = png

            return
        }

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

            ffmpeg(this.filePath)
            .output(this.filePath+'.preview.jpg')
            .noAudio()
            .seek(0.25) // move foward a little in case video starts black
            .on('error', function(err) {
                console.log('An error occurred: ' + err.message);
                resolve()
            })
            .on('end', function() {
                console.log('Processing finished !');
                resolve()
            })
            .run();
        })
            
        try{
            traits.palette = await this.getColorPalette()
        }catch(err){
            console.log('could not find palette', err);
        }

        await this.update({traits, has_preview: true})
    }

    async generatePreview({metadata, sharpImg, filename}={}){

        // keep track of attrs we want to change at the end of this routine
        let updateAttrs = {}

        // resave the image with proper rotation (iPhone, etc)
        if( sharpImg && this.autoRotate
        && metadata.exif && metadata.exif.image.Orientation != 1){

            let rotate = (metadata.exif.image.Orientation-1) * 90

            sharpImg.rotate(rotate).toFile(this.dirPath+'/'+filename)
        }

        // apply aspect ratio if set
        if( sharpImg && this.aspectRatio ){

            let arOpts = Object.assign({}, this.aspectRatioDefaults, this.aspectRatio)
            
            // get background color from palette
            if( arOpts.background == 'auto' ){
                let palette = await this.getColorPalette({fromPreview:false})
                this.attrs.traits.palette = palette

                // get most color with most population
                let color = Object.values(palette).sort((a,b)=>a.pop-b.pop).pop()
                arOpts.background = color.hex
            }

            let {width, height} = metadata
            let ratio = arOpts.ratio || this.aspectRatio

            if( ratio == 'square' ){
                width = height = Math.max(width, height)
            }else {
                // TODO: write logic for other aspect ratios
                throw new Error('Only square aspect ratio is currently supported')
            }

            // constrain image to aspect ratio
            await sharpImg.resize(width, height, arOpts).toFile(this.dirPath+'/'+filename)

            sharpImg = sharp(this.dirPath+'/'+filename)

            this.attrs.traits.width = width
            this.attrs.traits.height = height
            updateAttrs.traits = this.attrs.traits
        }

        // if office doc, create PDF preview and jpg thumbnail
        if( this.previewSize  && msOfficeThumbnailer.extensions.includes(this.attrs.ext) ){
            await msOfficeThumbnailer.generate(this.filePath)
            .then(async resp=>{
                updateAttrs.has_preview = true
            }).catch(err=>{
                console.log('thumbnail FAILED', err);
            })
        }

        // create preview for image file
        if( this.previewSize && sharpImg ){
            await sharpImg
                .resize(this.previewSize, this.previewSize, {
                        fit:'inside',
                        withoutEnlargement: true,
                        background:'#ffffff'
                })
                .flatten({background:'#ffffff'}) // in case png with transparency is uploaded
                .toFile(this.dirPath+'/'+filename+'.preview.jpg')
            
            updateAttrs.has_preview = true
            
            try{
                if( !this.attrs.traits.palette )
                    this.attrs.traits.palette = await this.getColorPalette()

                updateAttrs.traits = this.attrs.traits
            }catch(err){
                console.log('could not find palette', err);
            }
        }

        // create additional sizes if specified
        if( sharpImg && this.sizes ){
            let sizes = []

            // wait for all the sizes to finish
            await Promise.all(this.sizes.map(async size=>{

                // skip creating sizes that are bigger than source file
                if( Math.max(metadata.width, metadata.height) < size )
                    return

                await sharpImg.clone()
                .resize(size, size, {
                    fit:'inside',
                    withoutEnlargement: true,
                    background:'#ffffff'
                })
                .flatten({background:'#ffffff'}) // in case png with transparency is uploaded
                .toFile(this.dirPath+'/'+filename+`.${size}.jpg`)
                
                sizes.push(size)
            }))

            // track which sizes were created
            if( sizes.length > 0 )
                updateAttrs.sizes = sizes
        }

        if( Object.keys(updateAttrs).length > 0 )
            this.update(updateAttrs)
    }

    async getColorPalette({returnSwatches=false, fromPreview=true, filePath=null}={}){
        
        filePath = filePath || this.filePath+(fromPreview?'.preview.jpg': '')
        let palette = await Vibrant.from(filePath).getPalette()

        if( returnSwatches )
            return palette

        let colors = {}

        for( let key in palette ){
            colors[key.toLowerCase()] = {
                hex: palette[key].hex,
                rgb: palette[key].rgb,
                pop: palette[key].population,
            }
        }

        return colors
    }

    // delete the files after the DB record is removed
    afterDestroy(){
        let file = this.filePath
        let sizes = this.attrs.sizes

        if( fs.existsSync(file) )
            fs.unlinkSync(file)

        // possible PDF preview of MS word/excel doc
        if( fs.existsSync(file+'.preview.pdf') )
            fs.unlinkSync(file+'.preview.pdf')

        // small jpg previews of PDFs or large images
        if( fs.existsSync(file+'.preview.jpg') )
            fs.unlinkSync(file+'.preview.jpg')

        if( fs.existsSync(file+'.preview.png') )
            fs.unlinkSync(file+'.preview.png')

        if( sizes && Array.isArray(sizes) )
            for( let size of sizes ){
                if( fs.existsSync(file+`.${size}.jpg`) )
                    fs.unlinkSync(file+`.${size}.jpg`)
            }
    }

}

async function pdfInfo(filepath, {withText=false}={}){

    let infoStr = await shellExec('pdfinfo', `"${filepath}"`)

    let lines = infoStr.trim().split(`\n`)

    let info = {
        pages: 0,
        width: 0,
        height: 0
    }

    lines.forEach(line=>{
        let [key, val] = line.split(':')
        info[key.trim().toLowerCase()] = (val||'').trim()
    })

    if( info['page size'] ){
        try{
            let [, w, h] = info['page size'].match(/^(\d+\.?\d+?) x (\d+\.?\d+?) pts/)
            if( w ){
                info.width = round(w / 72)
                info.height = round(h / 72)
            }
        }catch(err){}
    }

    if( info.pages )
        info.pages = parseInt(info.pages)

    if( withText ){
        try{
            let text = await pdfText(filepath, withText)
            info.text = text
        }catch(err){}
    }

    return info
}

async function pdfText(filepath){
    return await shellExec('pdftotext', [
        '-raw', // keep content in raw data feed order
        '-layout',
        // `-f ${page}`, // first
        // `-l ${page}`, // and last page
        '-q', // dont print errors
        `"${filepath}"`,
        '-' // print to stdout
    ])
}

module.exports.pdfInfo = pdfInfo
module.exports.pdfText = pdfText

module.exports.createTableSql = (tableName='files')=>{ return /*sql*/`
CREATE TABLE ${tableName} (
id int(11) NOT NULL AUTO_INCREMENT,
parent_id int(11) DEFAULT NULL COMMENT 'May be used to link another record',
group_name varchar(128) DEFAULT NULL COMMENT 'A way to group uploads files into sets for specific uses',
filename varchar(128) DEFAULT NULL,
ext varchar(10) DEFAULT NULL,
size bigint(40) DEFAULT NULL,
type varchar(45) DEFAULT NULL,
dir_path varchar(200) DEFAULT NULL,
orig_filename varchar(128) DEFAULT NULL,
user_id int(11) DEFAULT '0' COMMENT 'Who uploaded this file?',
src varchar(128) DEFAULT NULL COMMENT 'Where did the upload come from?',
md5 varchar(64) DEFAULT NULL,
has_preview tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Whether a .preview.jpg was created',
description varchar(1000) DEFAULT NULL,
traits json DEFAULT NULL COMMENT 'Area to add extra data about file (eg: ordinal, primary, etc)',
ts_created timestamp NULL DEFAULT CURRENT_TIMESTAMP,
ts_updated timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (id),
KEY id (id) USING BTREE,
KEY group_name (group_name) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='A central table for tracking uploaded files'
`}