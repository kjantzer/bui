const FileManager = require('../../../server/fileManager')
let opts

module.exports = class CommentFiles extends FileManager {

    static set opts(val){ opts = val }

    get ASSETS_PATH(){ return opts?.ASSETS_PATH || '/mnt/data'}
    get rootDir(){ return opts?.rootDir || '' }

    get group(){ return 'comments' } // track all files under the "comments" group

    waitForPreviewGeneration = true
    previewSize = 400

    get groupPath(){ 

        if( this.attrs?.dir_path )
            return this.attrs?.dir_path

        // group files by the comment `group/gid`
        return `${this.group}/${this.parent_group}/${this.gid}`
    }

}