
/*
	NOTE: this concept is still in it's early stages
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
	return this._editedAttrs&&Object.keys(this._editedAttrs).length
}

Model.prototype.saveEdited = function(opts={}){
	let attrs = Object.assign({}, this._editedAttrs)

	return new Promise(async (resolve, reject)=>{
		
		try{
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
	return edited
}