/*
    Collection (Coll) Map
*/
module.exports = class CollMap extends Map {

    constructor(data, {appendKey=false, store=false, storeInOrder=false, storeLimit=false}={}){

        if( !data && store )
            data = store()

        if( data && !Array.isArray(data) )
            data = Object.entries(data)

        if( appendKey && data ){
            let k = typeof appendKey == 'string' ? appendKey : 'key'
            data.forEach(([key, d])=>{
                if( d && typeof d == 'object' )
                    d[k] = key
            })
        }

        super(data)

        this.store = store
        this.opts = arguments[1] || {}
    }

    set(...args){

        // must be a single object of values to set: {key: val, key2: val2}
        if( args.length == 1 && typeof args[0] == 'object' ){
            for( let key in args[0] ){
                this.set(key, args[0][key])
            }
            return
        }

        // delete first so the new value is added to end of stack (thus keeping in order of adding)
        if( this.opts?.storeInOrder )
            super.delete(...args)

        super.set(...args)

        // timeout used in case single object set from above
        clearTimeout(this._setStore)
        this._setStore = setTimeout(()=>{
            this._storeUpdate(...args)
        })
    }

    delete(...args){
        let didDelete = super.delete(...args)
        this._storeUpdate(...args)
        return didDelete
    }

    _storeUpdate(args){
        if( this.store ){
            this.store(this._valueToStore)
            if( this.emit )
                this.emit('change', args)
        }
    }

    get _valueToStore(){
        if( this.opts.storeInOrder ){

            let val = this.toEntries() // needed to maintain order

            if( this.opts?.storeLimit )
                val = val.slice(-1 * this.opts?.storeLimit)

            return val
        }

        return this.toObject() // object does not keep order
    }
    
    get first(){ return this.at(0) }
    get last(){ return this.at(this.size-1) }
    get length(){ return this.size }

    at(i){
        return Array.from(this.values())[i]
    }

    map(fn){
        let resp = []
        let i = 0
        this.forEach((v, key)=>resp.push(fn(v, key, i++)))
        return resp
    }

    filter(fn){
        let resp = []
        let i = 0
        this.forEach((v, key)=>fn(v, key, i++)?resp.push(v):null)
        return resp
    }

    find(fn){
        // TODO: improve this, we should stop filtering once found
        return this.filter(fn)[0]
    }

    toJSON(){
        return this.map(v=>(v.toJSON&&v.toJSON()||v))
    }

    toEntries(){
        return Array.from(this.entries())
    }

    toObject(){
        return Object.fromEntries(this.entries())
    }
    
}