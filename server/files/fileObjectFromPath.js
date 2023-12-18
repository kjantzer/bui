const fs = require('fs')
const crypto = require('crypto')
const mime = require('mime')

// create same "file" definition as express-fileupload (only data that is needed by fileManager.js)
module.exports = function fileObjectFromPath(filepath, filename){

    // if given single object
    if( filepath.path && filepath.filename ){
        filename = filepath.filename
        filepath = filepath.path
    }

    if( !filename ){
        filename = filepath.split('/').pop()
    }

    if( !fs.existsSync(filepath) )
        throw new Error('File not found: '+filepath)

    const stat = fs.statSync(filepath)
    const fileBuffer = fs.readFileSync(filepath)
    const hash = crypto.createHash('md5').update(fileBuffer).digest('hex')
    const ext = filename.split('.').pop()

    return {
        name: filename,
        data: fileBuffer,
        // tempFilePath: filepath, use this if `data` not used
        md5: hash,
        size: stat.size,
        mtime: stat.mtime,
        mimetype: mime.lookup(ext),
        mv: (destPath, cb)=>{ fs.copyFile(filepath, destPath, cb) }
    }
}