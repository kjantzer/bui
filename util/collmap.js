/*
    # Collection (Coll) Map

    An extension of the native `Map` object but with additional methods
    to use as a "collection" of data

    #### Methods
    - `map`
    - `flatMap`
    - `first`
    - `at(index)`
    - `filter`
    - `find`

    ### Store
    Docs needed; can pass a `store` option to save values in localStorage
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
        
        if( this.opts?.appendKey ){
            let k = typeof this.opts.appendKey == 'string' ? this.opts.appendKey : 'key'
            args[1][k] = args[0]
        }

        super.set(...args)

        // timeout used in case single object set from above
        if( this.store ){
            clearTimeout(this._setStore)
            this._setStore = setTimeout(()=>{
                this._storeUpdate(...args)
            })
        }
    }

    delete(...args){
        let didDelete = super.delete(...args)
        this._storeUpdate(...args)
        return didDelete
    }

    clear(...args){
        super.clear(...args)
        this._storeUpdate(...args)
    }

    trim(fromIndex){
        if( fromIndex < 0 || fromIndex >= this.size-1 ) return []

        let entries = this.toEntries()
        let trimmed = []
        for(let i = fromIndex; i < entries.length; i++){
            trimmed.push(entries[i])
            this.delete(entries[i][0])
        }
        this._storeUpdate({trim:fromIndex, trimmed})
        return trimmed
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

    valuesArray(){ return Array.from(this.values()) }
    keysArray(){ return Array.from(this.keys()) }

    at(i){
        return this.valuesArray()[i]
    }

    map(fn){
        let resp = []
        let i = 0
        this.forEach((v, key)=>resp.push(fn(v, key, i++)))
        return resp
    }

    flatMap(fn){
        let resp = []
        let i = 0
        this.forEach((v, key)=>{
            let val = fn(v, key, i++)
            if( Array.isArray(val) )
                resp.push(...val)
            else
                resp.push(val)
        })
        return resp
    }

    filter(fn){
        let resp = []
        let i = 0
        this.forEach((v, key)=>fn(v, key, i++)?resp.push(v):null)
        return resp
    }

    indexOf(fn){
        let _i = -1
        this.find((v, k, i)=>{
            let found = typeof fn == 'function' ? fn(v, k, i) : (k == fn || v == fn)
            if( found ) _i = i
            return found
        })
        
        return _i
    }

    find(fn){
        // TODO: improve this, we should stop filtering once found
        return this.filter(fn)[0]
    }

    sum(fn){
        return this.valuesArray().sum?.(fn)
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