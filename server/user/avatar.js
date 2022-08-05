/*
    NOT USED YET

    copied code for use later (maybe)
*/
const dayjs = require('dayjs')
const sharp = require('sharp')
const exif = require('exif-reader')
const mkdirp = require('mkdirp');

const AVATAR_SIZES = [400, 200]

get avatarPath(){
        return path.join(ASSETS_PATH, 'user', String(this.id), 'avatar')
    }

avatar(){
            
        let size = 'original'
        let requestedSize = this.req.params.size && parseInt(this.req.params.size)
        if( AVATAR_SIZES.includes(requestedSize) )
            size = requestedSize

        return {sendFile: `${this.avatarPath}/${size}.jpg`}
    }


// TODO: some of this logic should be moved to a "central" image processing class
    async upload_avatar(){

        if( this.id != this.req.user.id && !this.req.user.isInternal )
            throw new APIAccessError()

        let file = this.req.files.file
        let dir = this.avatarPath

        if( !file ) throw Error('no file')
        
        await mkdirp.sync(dir)

        let ext = 'jpg'

        let sharpImg = sharp(file.data)

        // normalize
        await sharpImg
            .flatten({background:'#ffffff'}) // in case png with transparency is uploaded
            .toFormat('jpg')
        
        let metadata = await sharpImg.metadata()

         if( metadata.exif ){
            let exifInfo = exif(metadata.exif)
            
            if( exifInfo.image.Orientation ){
                sharpImg.rotate((exifInfo.image.Orientation-1) * 90)
            }
        }

        // save file as is
        await sharpImg.toFile(`${dir}/original.${ext}`)
        
        // save various sizes
        AVATAR_SIZES.forEach(async size=>{
            await sharpImg
                .resize(size, size, {
                    fit:'cover',
                    position: 'entropy',
                    withoutEnlargement: true,
                    background:'#ffffff'
                })
                .toFile(`${dir}/${size}.${ext}`)
        })


        // FIXME: is this date right timezone?
        let ts = dayjs().format('YYYY/MM/DD hh:mm:ss')
        this.update({has_avatar:ts})

        return {has_avatar: ts}

    }