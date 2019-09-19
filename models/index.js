/*
    NOTE: proof of concept – still in development
    NOTE: sort of replicates Backbone functionality, but with less 
    overhead and modified for our needs...still thinking things through
*/

export class Collection {

    constructor(){
        this.models = []
    }

    get model(){
        return Object
    }

    get length(){ return this.models.length }

    first(){ return this.at(0) }
    last(){ return this.at(this.length-1) }
    at(i){ return this.models[i] }

    get(id, key="id"){
        return this.find(m=>{
            if( key == 'id' )
                return m.id == id
            else
                return (m.get?m.get(key):m[key]) == id
        })
    }

    getOrCreate(id){
        let m = this.get(id)
        return m || new (this.model)({id: id})
    }

    forEach(fn){ return this.models.forEach(fn) }
    map(fn){ return this.models.map(fn) }
    flatMap(fn){ return this.models.flatMap(fn) }
    find(fn){ return this.models.find(fn) }
    filter(fn){ return this.models.filter(fn) }
    reduce(fn, start=0){ return this.models.reduce(fn, start) }

    add(...args){
        this.models.push(...args)
    }

    async fetchSync(params={}){ return this.fetch(params) } // TEMP alias to match older Backbone change

    async fetch(params={}){

        let urlStr = this.url
        let base = location.protocol+'//'+location.hostname

        if( !urlStr )
            return console.error('Cannot fetch; `url` missing')

        if( urlStr.match(/^http/) )
            base = undefined

        let url = new URL(this.url, base)
        
        if( params.data ){
            let data = params.data

            if( data.filters )
                data.filters = JSON.stringify(params.data.filters)

            url.search = new URLSearchParams(data)
        }
            
        let data = []

        try {
            data = await fetch(url).then(resp=>resp.json())
        }catch(err){
            console.log('failed to fetch data');
            return
        }

        this._parse(data, params)
    }

    _parse(data, params={}){
        
        let Model = this.model

        let models = data.map(d=>{
            let m = new Model(d)
            m.coll = this
            m.collection = this
            return m
        })

        if( params.data && params.data.pageAt > 0 ){
            this.models.push(...models)
        }else{
            this.models.forEach(m=>{
                delete m.coll
                delete m.collection
            })
            this.models = models
        }
    }
}