/*
    Collection (Coll) Map
*/
module.exports = class CollMap extends Map {

    constructor(data, {appendKey=false, store=false}={}){

        if( !data && store )
            data = store()

        if( data )
            data = Object.entries(data)

        if( appendKey && data ){
            let k = typeof appendKey == 'string' ? appendKey : 'key'
            data.forEach(([key, d])=>{
                if( typeof d == 'object' )
                    d[k] = key
            })
        }

        super(data)

        this.store = store
    }

    set(...args){
        super.set(...args)
        this._storeUpdate(...args)
    }

    delete(...args){
        super.delete(...args)
        this._storeUpdate(...args)
    }

    _storeUpdate(args){
        if( this.store ){
            this.store(this.toObject())
            if( this.emit )
                this.emit('change', args)
        }
    }
    
    get first(){ return this.at(0) }
    get last(){ return this.at(this.size-1) }

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

    toObject(){
        return Object.fromEntries(this.entries())
    }
    
}