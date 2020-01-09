Object.defineProperty(File.prototype, 'ext', {
    get: function(){
        return this.name.split('.').pop()
    }
})