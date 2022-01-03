/*
	Backbone Child Collection 1.1.0
	
	Used for REST collection that is child of a parent model.
	
	@author Kevin Jantzer, Blackstone Audio
	@since 2015-07-08
	
	https://github.com/kjantzer/backbone-child-collection
	
	TODO
	- what happenns if the parentModel is new? should collection not fetch/save?
	- if the model is destroyed, we should probably clean up all child collections
	- allow for urlPath to be used to set a url on this model
*/

import Backbone from 'backbone'

Backbone.Collection.prototype.getOrCreate = require('./getOrCreate')
Backbone.Collection.prototype.getOrFetch = require('./getOrFetch')
Backbone.Collection.prototype.getBefore = require('./getBefore')
Backbone.Collection.prototype.getAfter = require('./getAfter')

// we're about to override these, so keep a reference to them
let orig = {
	Set: Backbone.Model.prototype.set,
	Get: Backbone.Model.prototype.get,
	Fetch: Backbone.Model.prototype.fetch
}

Backbone.ChildCollection = Backbone.Collection.extend(require('./child-collection'))

Object.assign(Backbone.Model.prototype, require('./child-model')(orig))

// dot notation
const CollGet = Backbone.Collection.prototype.get
Object.assign(Backbone.Collection.prototype, {
	get(key, {dotnotation=true, promise=false}={}){

		// else, default to normal get of `attributes`
		if( !dotnotation || typeof key !== 'string' )
			return CollGet.apply(this, arguments)

		key = (key||'')
		key = key.replace(/\[\.\]/g, '[dot]')
		var keys = (key||'').split('.')
		key = keys.shift()
		key = key.replace(/\[dot\]/g, '.')
		var path = keys.join('.')

		let m = CollGet.call(this, key)

		if( path && m )
			return m.get(path, {promise})

		return m
	}
})