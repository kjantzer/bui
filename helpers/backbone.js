/*
    Extensions for using lit-html with Backbone Views
*/

import {render} from 'lit-html';
import {Model, Collection, View} from 'backbone'

View.prototype.props = function(){
    // lets make this an opt in since I've yet to use props
    // return this.model && this.model.toTemplate()
    return {}
}

// see default `render` method in Backbone.Subviews
View.prototype.renderHTML = function(){
    if( this.html ){
        render(this.html(this.props()||{}), this.el, {eventContext: this})
    }
}

/*
    TODO: consider moving this (and below) to Backbone.Util
*/
const fetchSync = function(opts={}){

    // a fetch is already happening
    if( this.__fetchSyncPromise ) return this.__fetchSyncPromise
    
    return this.__fetchSyncPromise = new Promise((resolve, reject)=>{
        let model = this
        opts.success = function(){
            model.__fetchSyncPromise = null
            model.isFetching = false
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

Model.prototype.saveSync = function(key, val, opts){
    return new Promise((resolve, reject)=>{
        
        let attrs;

        if( key == null || typeof key == 'object' ){
            attrs = key;
            opts = val;
        } else if( key != null ){
            (attrs = {})[key] = val;
        }

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

Collection.prototype.getOrFetchSync = function(id, opts={}){
    return new Promise((resolve, reject)=>{
        opts.success = model=>{
            resolve(model)
        }

        this.getOrFetch(id, opts)
    })
}


const xhrError = function(xhr, resp){
    
    let err = new Error()
    err.name = xhr.statusText
    err.details = xhr.responseJSON
    err.response = resp

    if( xhr.responseJSON && xhr.responseJSON.error )
        err.name = xhr.responseJSON.error

    if( xhr.responseJSON && xhr.responseJSON.errorMsg )
        err.message = xhr.responseJSON.errorMsg
    
    return err
}