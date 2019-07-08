
/*
	NOTE: this concept is still in it's early stages
*/

Backbone.Model.prototype.isEdited = function(){
	return this._editedAttrs&&Object.keys(this._editedAttrs).length>0
}

Backbone.Model.prototype.editedAttrs = function(){
	return Object.assign({}, this._editedAttrs||{})
}

Backbone.Model.prototype.saveEdited = function(opts={}){
	let attrs = Object.assign({}, this._editedAttrs)
	this._editedAttrs = {}
	this._origAttrs = null

	return new Promise(resolve=>{
		
		opts.success = ()=>{
			this.trigger('edited', false, {})
			resolve()
		}
		
		opts.error = resolve
		
		// if fails to save, likely due to lack of URL specified, so fallback to using set
		try{
			this.save(attrs, opts)
		}catch(err){
			this.set(attrs, opts)
			opts.success()
		}
		
	})
}

Backbone.Model.prototype.resetEdited = function(opts={}){
	let orig = this._origAttrs
	this._editedAttrs = {}
	this._origAttrs = null
	this.set(orig)
	this.trigger('edited', this.isEdited(), {})
}

Backbone.Model.prototype.editAttr = function(key, val, opts={}){
	let attrs;
	if (_.isObject(key)) {
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
		
		// could be improved when comparing arrays
		if( edited === orig || (edited && edited.length == 0 && orig && orig.length == 0) )
			delete this._editedAttrs[key]
	}
	
	opts._edited = true
	
	this.set(attrs, opts)
	
	let edited = this.editedAttrs()
	this.trigger('edited', this.isEdited(), edited)
	return edited
}