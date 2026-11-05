/*
	# Edited

	Allows for backbone models to be "edited" without being officially saved. Number of changes is tracked. Changes then be saved or reset

	```js
	model.editAttrs({key: val})
	
	model.editedAttrs() // {key: val}
	model.isEdited() // true

	model.resetEdited() // abort edit
	model.saveEdited() 
	```

	> Note: see `<b-edited-model-btns>` for a view that uses this

	## Child Changes
	Sometimes a model may have child models that should be "edited" and tracked on the parent model. For this, each model (and subsequent child models) must set `editedChildren` to an array of child model/collection keys that should be cascaded when checking for changes.

	```js
	class Model extends Backbone.Model {
		editedChildren = ['events']
		get collections(){ return {
			events: EventsColl
		}}
	}

	model.on('edited-child', (isEdited, edited, {path})=>{
		console.log('child edited', isEdited, edited, path)
	})

	model.get('events').editAttrs({key: val})
	
	model.isEdited() // true
	```

	## Linked Changes
	A model that isn't one of its children (ex: a text shown with it, saved on its own) can be linked: its edits count as this
	model's, saving or resetting this model does it too, and its changes trigger `edited-child` here

	```js
	let unlink = model.linkEdited(otherModel)
	unlink() // when it's no longer shown with it
	```
	
*/
import {Model} from 'backbone'
import './promises'

Model.prototype.isEdited = function(){
	return this.numberEditedAttrs()>0
}

Model.prototype.editedAttrs = function(){
	return Object.assign({}, this._editedAttrs||{})
}

Model.prototype.numberEditedAttrs = function(){
	let num = this._editedAttrs&&Object.keys(this._editedAttrs).length || 0

	// cascade down to child models/collections and check for changes
	if( this.editedChildren ){
		for( let childKey of this.editedChildren ){
			let child = this.get(childKey)

			// collection
			if( child?.each)
				child.each(m=>{
					let n = m.numberEditedAttrs()
					if( n ) num += n
				})
			// model
			else if( child?.numberEditedAttrs ){
				let n = child.numberEditedAttrs()
				if( n ) num += n
			}
		}
	}

	// linked models (see linkEdited)
	this._editedLinks?.forEach(m=>{ num += m.numberEditedAttrs() || 0 })

	return num
}

// another model's edits count as this one's, and save/reset with it (see "Linked Changes"); returns an unlink fn
Model.prototype.linkEdited = function(model){
	if( !model || model == this ) return ()=>{}

	this._editedLinks ||= new Set()
	this._editedLinks.add(model)

	let onEdited = (isEdited, edited)=>this.trigger('edited-child', this.isEdited(), edited, {path: [this, model]})
	model.on('edited', onEdited)

	// (it may have edits already)
	if( model.isEdited?.() ) onEdited(true, model.editedAttrs())

	return ()=>{
		model.off('edited', onEdited)
		if( this._editedLinks?.delete(model) )
			this.trigger('edited-child', this.isEdited(), false, {path: [this, model]})
	}
}

Model.prototype.saveEdited = function(opts={}){
	let attrs = Object.assign({}, this._editedAttrs)

	return new Promise(async (resolve, reject)=>{
		
		try{
			
			if( this.editedChildren ){
				for( let childKey of this.editedChildren ){

					let child = this.get(childKey)

					// collection
					if( child?.each)
						child.each(m=>m.saveEdited(opts))
					// model
					else if( child?.saveEdited )
						await child.saveEdited(opts)
				}
			}

			// linked models with edits (see linkEdited)
			for( let m of this._editedLinks || [] )
				if( m.isEdited() ) await m.saveEdited(opts)

			let dataToSave = Object.keys(attrs).length > 0
			
			if( dataToSave )
				if( opts.setOnly )
					this.set(attrs, opts)
				else
					await this.saveSync(attrs, opts)
			
			this._editedAttrs = {}
			this._origAttrs = null

			this.trigger('edited:saved', attrs)
			this.trigger('edited', false, {})

			// find the top level "model" and trigger "edited-child" event
			let path = []
			let parentModel = this.parentModel || this.collection?.parentModel
			while(parentModel){
				path.unshift(parentModel)
				parentModel = parentModel.parentModel || parentModel.collection?.parentModel
			}
			
			if( path[0] )
				path[0].trigger('edited-child', this.isEdited(), false, {path})

			resolve(dataToSave)

		}catch(err){			
			// if fails to save, likely due to lack of URL specified, so fallback to using set
			// FIXME: this is weird design, but I think I used it this way once
			// might need to put a version of it back
			// this.set(attrs, opts)
			// opts.success()
			// resolve()

			reject(err)
		}
		
	})
}

Model.prototype.resetEdited = function(opts={}){

	if( this.editedChildren ){
		for( let childKey of this.editedChildren ){
			
			let child = this.get(childKey)

			// collection
			if( child?.each)
				child.each(m=>m.resetEdited({...opts, _silent: true}))
			// model
			else if( child?.resetEdited )
				child.resetEdited({...opts, _silent: true})
		}
	}

	// linked models (see linkEdited; not silent: what shows them puts their value back)
	this._editedLinks?.forEach(m=>{ if( m.isEdited() ) m.resetEdited(opts) })

	let orig = this._origAttrs
	this._editedAttrs = {}
	this._origAttrs = null

	// never reset these as the values in .attributes was only used on initial fetch
	// they are not maintained as the child model/coll fetch and change data
	if( orig ){
		let ignoreKeys = [...Object.keys(this.models||{}), ...Object.keys(this.collections||{})]
		for( let ignoreKey of ignoreKeys ){
			delete orig[ignoreKey]
		}
	}

	this.set(orig)

	if( opts.silent !== true ){
		this.trigger('edited:reset')
		this.trigger('edited', this.isEdited(), {})
	}
}

Model.prototype.editAttr = async function(key, val, opts={}){
	let attrs;
	if( typeof key == 'object' ){
		attrs = key;
		opts = val || {};
	} else {
		(attrs = {})[key] = val;
	}
	
	this._origAttrs = this._origAttrs || Object.assign({}, this.attributes)
	this._editedAttrs = Object.assign((this._editedAttrs||{}), attrs)
	
	// remove 
	for(let key in attrs){
		let orig = this._origAttrs[key]
		let edited = this._editedAttrs[key]
		
		if( opts.save 
		|| edited === orig
		|| (!(edited?true:false) && !(orig?true:false)) // treat "falsey" values as the same
		|| (edited === true && orig === 1) // treat boolean "yes" as the same (assuming it was a check-box)
		|| (!orig && Array.isArray(edited) && edited.length == 0 )
		|| (edited && edited.length == 0 && orig && orig.length == 0)
		// NOTE: do this for objects too?
		|| (Array.isArray(orig) && Array.isArray(edited) && JSON.stringify(orig) == JSON.stringify(edited))
		){
			
			if( typeof edited === 'boolean' || edited === 0 )
				// unify "falsey" values as null
				this._editedAttrs[key] = null
			else
				delete this._editedAttrs[key]
		}

		if( opts.save === true )
			this._origAttrs[key] = attrs[key]
	}
	
	if( opts.save !== true )
		opts._edited = true
	
	if( opts.save === true ){
		await this.saveSync(attrs, opts)
		this.trigger('edited:saved', attrs)
		return
	}

	this.set(attrs, opts)
	
	let edited = this.editedAttrs()
	this.trigger('edited', this.isEdited(), edited)

	// find the top level "model" and trigger "edited-child" event
	let path = []
	let parentModel = this.parentModel || this.collection?.parentModel
	while(parentModel){
		path.unshift(parentModel)
		parentModel = parentModel.parentModel || parentModel.collection?.parentModel
	}
	
	if( path[0] )
		path[0].trigger('edited-child', this.isEdited(), edited, {path})

	return edited
}