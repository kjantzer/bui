/*
    Creates some promised verions of Backbone methods
*/

import {Model, Collection} from 'backbone'

const syncPromise = function(method, model, opts={}){
        return new Promise((resolve, reject)=>{
            this.sync(method, model, {
                ...opts,
                success: resolve,
                error: reject
            })
        })
    }

Collection.prototype.syncPromise = syncPromise
Model.prototype.syncPromise = syncPromise

const fetchSync = function(opts={}){

    // a fetch is already happening
    if( this.__fetchSyncPromise ) return this.__fetchSyncPromise

    if( opts.once && this.hasFetched )
        return Promise.resolve()

    if( opts.stale && this.hasFetched && new Date().getTime() - this.hasFetched < opts.stale )
        return Promise.resolve()

    if( this.filters && !(this.filters instanceof Map) ){

        if( !opts.data )
            opts.data = {filters: {}}
        
        opts.data.filters = Object.assign({}, opts.data.filters, this.filters)

        // optionally limit results by search
        // example: all products for a particular book ID
        // term='epx4'; searchTypes='products'
        // TODO: support this
        // if( this.search ){
        //     opts.data.term = this.search
        //     opts.data.searchTypes = this.searchTypes
        // }
    }

    return this.__fetchSyncPromise = new Promise((resolve, reject)=>{
        let model = this
        opts.success = function(){
            model.__fetchSyncPromise = null
            model.isFetching = false
            model.hasFetched = new Date().getTime()
            delete model.needsFetching
            resolve(arguments)
        }
        opts.error = function(model, xhr, opts){
            model.__fetchSyncPromise = null
            model.isFetching = false
            reject(xhrError(xhr, arguments))
        }

        model.isFetching = true
        this.fetch.call(this, opts)
    })
}

Collection.prototype.fetchSync = fetchSync
Model.prototype.fetchSync = fetchSync

// DEPRECATED: use `fetchSync({once:true})`
const fetchOnce = function(opts){
    if( !this.hasFetched && !this.isFetching ){
        this.fetchSync(opts)
        return true
    }else if( opts && opts.success ){
        opts.success(this, this.models)
        return false;
    }
}

Collection.prototype.fetchOnce = fetchOnce
Model.prototype.fetchOnce = fetchOnce


Model.prototype.saveSync = function(key, val, opts){
    return new Promise(async (resolve, reject)=>{

        let attrs;

        if( key == null || typeof key == 'object' ){
            attrs = key;
            opts = val;
        } else if( key != null ){
            (attrs = {})[key] = val;
        }

        let childChanges = {}

        /*  convert dot notation to object
            {"traits.width": 6} => {traits: {width: 6}}
        */
        for( let k in attrs ){
            
            let [childKey, key] = k.split('.')

            if( key ){
                childChanges[childKey] = childChanges[childKey] || {}
                childChanges[childKey][key] = attrs[k]
                delete attrs[k]
            }
        }

        // save each set of child changes (or merge with existing data to save on this object)
        for( let childKey in childChanges ){

            let child = this.get(childKey)
            let childAttrs = childChanges[childKey]

            // backbone model
            if( child.save && child.url )
                await child.saveSync(childAttrs, opts)
            // standard object, merge with existing attrs (so we dont replace whats already there)
            // if replacement is desired, dot notation saving should not be used
            else
                attrs[childKey] = Object.assign(child, childAttrs)
        }

        if( attrs && Object.keys(attrs).length == 0 )
            return resolve()

        opts = opts ? Object.assign({}, opts) : {};

        opts.success = function(){
            resolve(arguments)
        }
        opts.error = function(model, xhr, opts){
            reject(xhrError(xhr, arguments))
        }

        this.save.call(this, attrs, opts)
    })
}

Collection.prototype.createSync = function(attrs, opts={}){
    return new Promise((resolve, reject)=>{
        opts.success = function(){
            resolve(arguments)
        }
        opts.error = function(model, xhr, opts){
            reject(xhrError(xhr, arguments))
        }
        this.create(attrs, opts)
    })
}

Model.prototype.destroySync = function(opts={}){
    return new Promise((resolve, reject)=>{
        opts.success = function(){
            resolve(arguments)
        }
        opts.error = function(model, xhr, opts){
            reject(xhrError(xhr, arguments))
        }
        this.destroy(opts)
    })
}

Collection.prototype.getOrFetchSync = function(id, opts={}){
    return new Promise((resolve, reject)=>{
        opts.success = model=>{
            resolve(model)
        }

        this.getOrFetch(id, opts)
    })
}


// TODO: update this with custom Error class and support bui/app/errors
const xhrError = function(xhr, resp){

    let err = new Error()

    if( !xhr ){
        let [model, _xhr, opts] = resp
        err.name = opts.errorThrown && opts.errorThrown.error ? opts.errorThrown.error : opts.errorThrown
        err.message = opts.errorThrown && opts.errorThrown.error ? opts.errorThrown.error : opts.errorThrown
        err.type = opts.errorThrown?.type
        return err
    }

    err.name = xhr.statusText
    err.details = xhr.responseJSON
    err.response = resp

    if( xhr.responseJSON && xhr.responseJSON.error )
        err.name = xhr.responseJSON.error

    if( xhr.responseJSON && xhr.responseJSON.errorMsg )
        err.message = xhr.responseJSON.errorMsg

    return err
}