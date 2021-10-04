/*
    Collection (Coll) Map
*/
module.exports = class CollMap extends Map {

    constructor(data, {appendKey=false}={}){
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
    }
    
    get first(){ return this.at(0) }
    get last(){ return this.at(this.size-1) }

    at(i){
        return Array.from(this.values())[i]
    }

    map(fn){
        let resp = []
        this.forEach((v, key)=>resp.push(fn(v, key)))
        return resp
    }

    filter(fn){
        let resp = []
        this.forEach((v, key)=>fn(v, key)?resp.push(v):null)
        return resp
    }

    find(fn){
        // TODO: improve this, we should stop filtering once found
        return this.filter(fn)[0]
    }

    toJSON(){
        return this.map(v=>v.toJSON&&v.toJSON())
    }
}