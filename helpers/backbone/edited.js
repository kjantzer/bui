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

	return num
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

	let orig = this._origAttrs
	this._editedAttrs = {}
	this._origAttrs = null
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
		)
			delete this._editedAttrs[key]

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