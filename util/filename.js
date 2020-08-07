
module.exports = {

    // https://stackoverflow.com/a/7846439/484780
    pieces(filename){
        let [str, name, num, ext] = filename.match(/^(.*?)(?:\((\d+)\))?(?:\.(.+))?$/)
        if( num ) num = parseInt(num)
        return [name, num, ext]
    },

    increase(filename){
        let [name, num, ext] = this.pieces(filename)
        num = num ? num + 1 : 1
        num = `(${num})`
        if( ext ) ext = '.'+ext
        return [name,num,ext].filter(s=>s).join('')
    },

    getUnique(fs, path, filename){
        while(fs.existsSync(path+'/'+filename)){
            filename = this.increase(filename)
        }
        return filename
    }
}

