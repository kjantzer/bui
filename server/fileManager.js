const Model = require('./model')
const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
const exif = require('exif-reader')
const msOfficeThumbnailer = require('./thumbnail/msOffice')
const ffmpeg = require('fluent-ffmpeg')
const Vibrant = require('node-vibrant')

ffmpeg.setFfmpegPath('/usr/bin/ffmpeg');

module.exports = class FileManager extends Model {

    get config(){ return {
        table: 'files',
        jsonFields: ['traits']
    }}

    get ASSETS_PATH(){ return '/mnt/data' }
    get rootDir(){ return ''}
    get group(){ return '' }

    get skipDuplicates(){ return false } // only for same parent_id
    get waitForPreviewGeneration(){ return false }
    get previewSize(){ return 800 }
    get autoRotate(){ return false }

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

        return this.filePath
    }

    get previewPath(){

        if( !this.attrs.has_preview ){
            return this.filePath
        }

        let name = this.fileName ? this.fileName+'.preview.jpg' : ''
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

    async upload(file, src='', {traits={}}={}){

        if( !file ){
            file = this.req.files.file
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
            
            let generatePreview = isVideo 
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

        let traits = this.attrs.traits || {}
        if( videoStream ){
            traits.width = videoStream.width
            traits.height = videoStream.height
            traits.duration = metadata.format.duration
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

        await this.update({traits, has_preview: true})
    }

    async generatePreview({metadata, sharpImg, filename}={}){

        // resave the image with proper rotation (iPhone, etc)
        if( sharpImg && this.autoRotate
        && metadata.exif && metadata.exif.image.Orientation != 1){

            let rotate = (metadata.exif.image.Orientation-1) * 90

            sharpImg
            .rotate(rotate)
            .toFile(this.dirPath+'/'+filename)
        }

        // preview generation turned off
        if( this.previewSize === false )
            return false

        // if office doc, create PDF preview and jpg thumbnail
        if( msOfficeThumbnailer.extensions.includes(this.attrs.ext) ){
            await msOfficeThumbnailer.generate(this.filePath)
            .then(async resp=>{
                this.update({has_preview: true})
            }).catch(err=>{
                console.log('thumbnail FAILED', err);
            })
        }

        if( sharpImg ){
            await sharpImg
                .resize(this.previewSize, this.previewSize, {
                        fit:'inside',
                        withoutEnlargement: true,
                        background:'#ffffff'
                })
                .flatten({background:'#ffffff'}) // in case png with transparency is uploaded
                .toFile(this.dirPath+'/'+filename+'.preview.jpg')
            
            let updateAttrs = {has_preview: true}
            
            try{
                this.attrs.traits.colors = await this.getColorPalette()
                updateAttrs.traits = this.attrs.traits
            }catch(err){
                console.log('could not find palette', err);
            }

            this.update(updateAttrs)
        }
    }

    async getColorPalette(){
        let palette = await Vibrant.from(this.filePath+'.preview.jpg').getPalette()

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

        if( fs.existsSync(file) )
            fs.unlinkSync(file)

        // possible PDF preview of MS word/excel doc
        if( fs.existsSync(file+'.preview.pdf') )
            fs.unlinkSync(file+'.preview.pdf')

        // small jpg previews of PDFs or large images
        if( fs.existsSync(file+'.preview.jpg') )
            fs.unlinkSync(file+'.preview.jpg')
    }

}

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