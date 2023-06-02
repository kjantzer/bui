/*
	getOrCreate
	
	`id` can be a hash of attributes so long as it contains the ID
*/
module.exports = function(id, opts){

	if( !id )
		return null;

	let lookupID = typeof id === 'object' ? id[this.model.prototype.idAttribute] : id

	var model = this.get.call(this, lookupID, opts)

	
	if( model ){

		// given ID is actually an object of attributes, so update model
		// update silently for now to maintain previous pattern
		if( id != lookupID && typeof id == 'object' )
			model.set(id, {silent: true}) // update attrs

	// if no model, create and add the requested model
	}else{

		id = id instanceof Backbone.Model ? id[id.idAttribute] : id;
		var ModelClass = this.model || Backbone.Model;

		var data = {}

		if( typeof id == 'object' )
			data = id;
		else
			data[ModelClass.prototype.idAttribute] = id;

		let needsFetching = Object.keys(data).length == 1 // do this here cause the model may have defaults added
		
		model = new ModelClass(data);

		model.needsFetching = needsFetching

		// add model to this collection
		if( !opts || opts.add !== false )
			this.add(model, {fromGetOrCreate: true, silent:(opts&&opts.silent||false)});
		else
			model.collection = this;
	}

	return model;
}