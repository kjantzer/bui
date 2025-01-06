const Model = require('../model')
const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
const office = require('./preview/office')
const {psdPreview} = require('./preview/psd')
const {audioPreview} = require('./preview/audio')
const {videoPreview} = require('./preview/video')
const {pdfInfo, pdfText} = require('./pdf')

function ThrowError(name, msg){
    let err = new Error(msg)
    err.name = name
    throw err
}

module.exports = class FileManager extends Model {

    get config(){ return {
        table: 'files',
        tableAlias: 'f',
        jsonFields: ['sizes', 'traits'],
        groupBy: 'f.id'
    }}

    get ASSETS_PATH(){ return '/mnt/data' }
    get rootDir(){ return ''}
    get group(){ return '' }

    skipDuplicates = false // only applies when same parent_id
    waitForPreviewGeneration = false // upload response wont return until preview saved
    autoRotate = false
    fullSize=true // set to number to save a smaller size (orig file will be overwritten)
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

    // set to false to disable
    // requires jszip, puppeteer, and xml2js
    epubPreview = {}

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

    async beforeResize(sharpImg, {width, height, metadata}){ }
    
    // shouldn't need to override these
    get groupPath(){ return this.group.toLowerCase() }
    get fileName(){ return this.attrs.id ? (this.attrs.filename) : '' }
    get dirPath(){ return [this.ASSETS_PATH, this.rootDir, this.groupPath].filter(s=>s).join('/')}
    get path(){ return this.dirPath+'/'+this.fileName }
    get filePath(){ return path.join(this.dirPath, this.fileName||'') }

    get displayPath(){
        if( this.attrs.has_preview
        && this.attrs.ext != 'pdf'
        && office.extensions.includes(this.attrs.ext) ){
            let filename = this.fileName ? this.fileName+'.preview.pdf' : ''
            return path.join(this.dirPath, filename)
        }

        if( this.req.query.size || this.req.query.display )
            return this.previewPath

        return this.filePath
    }

    get previewPath(){

        if( !this.attrs.has_preview ){

            // fallback to full size image
            if( ['jpg', 'jpeg', 'png', 'gif', 'tif', 'heic', 'DNG'].includes(this.attrs.ext) ) 
                return this.filePath
            else 
                return null
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

    removeDirIfEmpty(dir){
        dir = dir || this.dirPath
        
        let files = fs.readdirSync(dir)
        files = files.filter(s=>!['.DS_Store'].includes(s)) // likely not needed in production, this is a mac thing

        if( files.length == 0 )
            fs.rmdirSync(dir)
    }

    findWhere(where){
        // if asking for a set of files, parent_id must be given
        if( !this.id )
            where['parent_id'] = this.parent_id || false

        where['group_name'] = this.group
    }

    async checkIsDuplicate(info){
        let dupe = await this.db.query(/*sql*/`
            SELECT * FROM files
            WHERE IFNULL(parent_id,'') = ? AND group_name = ? AND dir_path = ? AND md5 = ?
        `, [info.parent_id||'', this.group, info.dir_path, info.md5]).then(r=>r.first)

        return !!dupe
    }

    async upload(file, src='', {traits={}, description=null, stripMetadata=false}={}){

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

        if( !file ) ThrowError('NoFile', 'No file found')

        let filename = file.name
        let ext = file.name.split('.').pop()

        // make sure extensions are lowercase
        if( ext ){
            filename = filename.replace(new RegExp(ext+'$'), ext.toLowerCase())
            ext = ext.toLowerCase()
        }

        let info = {
            parent_id: this.parent_id || null,
            group_name: this.group,
            filename: filename,
            ext: ext,
            size: file.size,
            type: file.mimetype,
            dir_path: this.groupPath,
            orig_filename: file.name,
            user_id: this.req.user?.id,
            description,
            src: src,
            md5: file.md5,
            traits: traits,
        }

        if( this.skipDuplicates == true ){
            if( await this.checkIsDuplicate(info) )
                ThrowError('DuplicateFile', 'file already uploaded')
        }

        // only one file allowed for this group/parent_id
        if( this.isSingular ){
            await this.find()
            if( this.id )
                await this.destroy()
        }

        await this.ensureDirPath()

        let isImg = info.type.match(/image/) && !info.type.match(/photoshop/)
        let isPDF = info.type.match(/pdf/)
        let sharpImg
        let metadata = {}

        if( isImg ){
            sharpImg = sharp(file.tempFilePath || file.data)
            metadata = await sharpImg.metadata()

            if( metadata.exif ){
                try{
                    const exif = require('exif-reader')
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
            ThrowError('FileRecordFail', 'failed to insert file record')

        // change filename to include the DB record ID so each is uniquely named
        filename = `${this.id}-${filename}`
        await this.update({filename}, {manualSync:true})

        let fileMoved = await new Promise(async resolve=>{
            
            if( stripMetadata && sharpImg )
                try{
                    // by default does not keep metadata
                    await sharpImg.toFile(this.dirPath+'/'+filename)
                    resolve(true)
                }catch(err){
                    reject(err)
                }
            else
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
                    console.log('hmm...problem getting PDF info', err);
                }
            }
            
            let generatePreview = this.generatePreview({metadata, sharpImg, filename, fileType: info.type})

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

    async generatePreview({metadata, sharpImg, filename, fileType}={}){

        // keep track of attrs we want to change at the end of this routine
        let updateAttrs = {}

        if( this.epubPreview && filename.match(/\.epub$/) ){

            const epubPreview = require('./preview/epub')

            try{
                let {previewFilePath, contents, toc} = await epubPreview.call(this, filename)

                // grab the just created full-size preview image, it will be used futher below
                sharpImg = sharp(previewFilePath)

                // save contents and TOC to traits
                this.attrs.traits.contents = contents
                this.attrs.traits.toc = toc
                updateAttrs.traits = this.attrs.traits

            }catch(err){
                // graceful fail, no reason to bail if preview fails to create
                console.log(err);
                return
            }

        }

        let orientation = metadata.orientation ?? metadata.exif?.image?.Orientation
        // NOTE: even numbers are also mirrored
        let orientations = [0, 0, 180, 180, 90, 90, 270, 270] // https://sirv.com/help/articles/rotate-photos-to-be-upright/
        // resave the image with proper rotation (iPhone, etc)
        if( sharpImg && this.autoRotate && orientation){
            let rotate = orientations[(orientation-1)] || 0
            if( rotate > 0 )
                sharpImg.rotate(rotate).toFile(this.dirPath+'/'+filename)
        }

        // apply aspect ratio if set
        if( sharpImg && this.aspectRatio ){

            let arOpts = Object.assign({}, this.aspectRatioDefaults, this.aspectRatio)

            let {width, height} = metadata
            let ratio = arOpts.ratio || this.aspectRatio

            if( ratio == 'square' ){
                width = height = Math.max(width, height)
            }else {
                // TODO: write logic for other aspect ratios
                ThrowError('ApsectRatio', 'Only square aspect ratio is currently supported')
            }

            // does aspect ratio resizing need to be done?
            if( metadata.width != width || metadata.height != height ){

                // get background color from palette
                if( arOpts.background == 'auto' ){
                    
                    let tempFileForPalette = `/tmp/aspect-palette-${filename}`
                    await sharpImg.clone().resize(5, 200, {
                        fit: 'cover',
                        position: 'left'
                    }).toFile(tempFileForPalette)

                    let palette = await this.getColorPalette({filePath:tempFileForPalette})

                    this.attrs.traits.palette = palette

                    // get most color with most population
                    let color = Object.values(palette).sort((a,b)=>a.pop-b.pop).pop()
                    arOpts.background = color?.hex || '#ffffff';
                }

                await this.beforeResize(sharpImg, {width, height, metadata})

                // constrain image to aspect ratio
                await sharpImg.resize(width, height, arOpts).toFile(this.dirPath+'/'+filename)

                sharpImg = sharp(this.dirPath+'/'+filename)

                this.attrs.traits.width = width
                this.attrs.traits.height = height
                updateAttrs.traits = this.attrs.traits
            }
        }

        // reduce size of full image
        if( sharpImg && typeof this.fullSize == 'number' ){

            fs.unlinkSync(this.dirPath+'/'+filename)

            let ext = this.attrs.ext == 'DNG' ? 'jpg' : this.attrs.ext

            if( this.attrs.ext == 'DNG' )
                this.attrs.type = updateAttrs.type = 'image/jpeg'

            filename = filename.replace(new RegExp(this.attrs.ext+'$'), ext)

            await sharpImg.resize(this.fullSize, this.fullSize, {
                fit: 'inside'
            }).sharpen().toFile(this.dirPath+'/'+filename)
            
            sharpImg = sharp(this.dirPath+'/'+filename)
            metadata = await sharpImg.metadata()

            this.attrs.ext = ext
            this.attrs.filename = filename
            // this.attrs.orig_filename = this.attrs.orig_filename.replace(new RegExp(this.attrs.ext+'$'), ext)

            // TODO: get updated size
            // this.attrs.size = updateAttrs.size = metadata.size
            this.attrs.traits.width = metadata.width
            this.attrs.traits.height = metadata.height

            updateAttrs.ext = this.attrs.ext
            updateAttrs.filename = this.attrs.filename
            // updateAttrs.orig_filename = this.attrs.orig_filename
            updateAttrs.traits = this.attrs.traits
        }

        if( fileType.match(/audio/) ){

            if( this.audioWaveformPreview )
            await audioPreview(this.filePath, this.audioWaveformPreview).then(traits=>{

                this.attrs.traits = {...this.attrs.traits, ...traits}
                updateAttrs.traits = this.attrs.traits
                updateAttrs.has_preview = 2 // png

            }).catch(err=>{
                console.log('PSD preview failed', err);
            })
        }

        if( fileType.match(/video/) ){

            await videoPreview(this.filePath).then(traits=>{

                this.attrs.traits = {...this.attrs.traits, ...traits}
                updateAttrs.traits = this.attrs.traits
                updateAttrs.has_preview = 1

            }).catch(err=>{
                console.log('PSD preview failed', err);
            })
        }

        // Photoshop
        if( filename.match(/\.psd$/) ){

            await psdPreview(this.filePath, {size: 1200}).then(traits=>{

                this.attrs.traits = {...this.attrs.traits, ...traits}
                updateAttrs.traits = this.attrs.traits
                updateAttrs.has_preview = true

            }).catch(err=>{
                console.log('PSD preview failed', err);
            })
        }

        // if office doc, create PDF preview and jpg thumbnail
        if( this.previewSize  && office.extensions.includes(this.attrs.ext) ){
            await office.officePreview(this.filePath)
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
            
            updateAttrs.has_preview = 1
        }

        // attempt to get color palette from preview img
        if( updateAttrs.has_preview == 1 && !this.attrs.traits.palette ){
            try{
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

        let colors = {}
        
        try{
            const Vibrant = require('node-vibrant')

            filePath = filePath || this.filePath+(fromPreview?'.preview.jpg': '')
            let palette = await Vibrant.from(filePath).getPalette()

            if( returnSwatches )
                return palette

            for( let key in palette ){
                if( palette[key] )
                colors[key.toLowerCase()] = {
                    hex: palette[key].hex,
                    rgb: palette[key].rgb,
                    pop: palette[key].population,
                }
            }

        }catch(err){}

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
        
        // optional sidecar info file
        if( fs.existsSync(file+'.json') )
            fs.unlinkSync(file+'.json')

        if( sizes && Array.isArray(sizes) )
            for( let size of sizes ){
                if( fs.existsSync(file+`.${size}.jpg`) )
                    fs.unlinkSync(file+`.${size}.jpg`)
            }
    }

}


module.exports.pdfInfo = pdfInfo
module.exports.pdfText = pdfText

module.exports.createTableSql = require('./createTableSql')