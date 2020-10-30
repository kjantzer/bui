/*
    NOTE: proof of concept – still in development
    NOTE: sort of replicates Backbone functionality, but with less 
    overhead and modified for our needs...still thinking things through
*/
// import Emitter from 'component-emitter'
import {Events} from 'backbone'

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

    async create(attrs, opts={}){
        let model = this._createModel(attrs)
        
        if( !opts.wait )
            this.add(model)

        await (model.saveSync ? model.saveSync() : model.save())

        if( opts.wait )
            this.add(model)
        
        opts.success&&opts.success(model)
        return model
    }

    // alias to match helpers/backbone/promises
    async createSync(...args){ return this.create(...args)}

    _createModel(attrs){
        let Model = this.model
        let m = new Model(attrs)
        m.coll = this
        m.collection = this
        return m
    }

    getOrCreate(attrs, {add=true, update=true}={}){
        
        let id = this.model.prototype.idAttribute

        if( typeof attrs != 'object' ){
            id = attrs
            attrs = {}
            attrs[this.model.prototype.idAttribute] = id
        }else{
            id = attrs[id]
        }
        
        let m = this.get(id)

        if( !m ){
            m = this._createModel(attrs)
            
            if( add )
                this.add(m)

        // merge attrs with existing
        }else if( update ){
            if( m.set ) // likely a backbone model
                m.set(attrs)
            else
                Object.assign(m, attrs)
        }

        return m
    }

    async getOrFetch(attrs, opts={}){
        let model = this.getOrCreate(attrs, opts)
        await model.fetchSync()
        opts.success&&opts.success(model)
        return model
    }

    forEach(fn){ return this.models.forEach(fn) }
    map(fn){ return this.models.map(fn) }
    flatMap(fn){ return this.models.flatMap(fn) }
    find(fn){ return this.models.find(fn) }
    filter(fn){ return this.models.filter(fn) }
    reduce(fn, start=0){ return this.models.reduce(fn, start) }

    add(...args){
        this.models.push(...args)
        this.trigger('add', args)
    }

    async fetchSync(params={}){ return this.fetch(params) } // TEMP alias to match older Backbone change

    async fetch(params={}){

        let urlStr = this.url
        let base = location.protocol+'//'+location.hostname+(location.port?':'+location.port:'')

        if( !urlStr )
            return console.error('Cannot fetch; `url` missing')

        if( urlStr.match(/^http/) )
            base = undefined

        let url = base ? new URL(this.url, base) : new URL(this.url)
        
        if( params.data ){
            let data = params.data

            if( data && typeof data == 'object' ){
                for( let k in data ){
                    if( typeof data[k] == 'object' )
                        data[k] = JSON.stringify(data[k])
                }
            }

            url.search = new URLSearchParams(data)
        }
            
        let data = []

        try {
            let resp = await fetch(url)

            if( resp.status != 200 )
                throw new Error(resp.statusText)
            
            data = await resp.json()
        }catch(err){
            throw err
        }

        this._parse(data, params)
        this.trigger('sync', this)
    }

    _parse(data, params={}){
        
        let Model = this.model

        let models = data.map(d=>{
            return this.getOrCreate(d, {add: false, update: true})
        })

        if( params.data && params.data.pageAt > 0 ){
            this.models.push(...models)
        }else{
            this.models.forEach(m=>{
                if( !models.includes(m) ){
                    delete m.coll
                    delete m.collection
                }
            })
            this.models = models
        }
    }
}

Object.assign(Collection.prototype, Events)
// Emitter(Collection.prototype)