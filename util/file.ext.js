Object.defineProperty(File.prototype, 'ext', {
    get: function(){
        return this.name.split('.').pop()
    }
})

Object.defineProperty(File.prototype, 'nameWithoutExt', {
    get: function(){
        return this.name.split('.').shift()
    }
})