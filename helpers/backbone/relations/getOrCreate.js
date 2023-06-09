/*
	getOrCreate
	
	`id` can be a hash of attributes so long as it contains the ID
*/
module.exports = function(id, opts){

	if( !id )
		return null;

	let ModelClass = this.model || Backbone.Model;
	let idAttribute = ModelClass.prototype.idAttribute || 'id' // this works when Backbone.Model.extend is used
	let lookupID = id

	if( typeof id === 'object' ){
		// NOTE: could this be a perf issue creating an empty model just to find ID?
		// if no `id` value, then assume a custom idAttribute must be used, determine it
		if( !id.id )
			idAttribute = (new this.model).idAttribute
		lookupID = id[idAttribute]
	}

	var model = this.get.call(this, lookupID, opts)

	
	if( model ){

		// given ID is actually an object of attributes, so update model
		// update silently for now to maintain previous pattern
		if( id != lookupID && typeof id == 'object' )
			model.set(id, {silent: true}) // update attrs

	// if no model, create and add the requested model
	}else{

		id = id instanceof Backbone.Model ? id[id.idAttribute] : id;
		

		var data = {}

		if( typeof id == 'object' )
			data = id;
		else
			data[idAttribute] = id;

		let needsFetching = Object.keys(data).length == 1 // do this here cause the model may have defaults added
		
		model = new ModelClass(data);

		// NOTE: for some reason custom idAttribute is not being propagated to model.id when first created ^
		// looks like a subclassed Backbone.Model using class/extend does not read the custom idAttribute
		// when the model is initially constructed. But it does work when Backbone.Model.extend() is used
		// setting the data again afer created seems to properly apply `model.id`
		// this hack/fix should work okay for now
		model.set(data, {silent: true})

		model.needsFetching = needsFetching

		// add model to this collection
		if( !opts || opts.add !== false )
			this.add(model, {fromGetOrCreate: true, silent:(opts&&opts.silent||false)});
		else
			model.collection = this;
	}

	return model;
}