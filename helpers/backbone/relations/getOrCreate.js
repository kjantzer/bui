/*
	getOrCreate
	
	`id` can be a hash of attributes so long as it contains the ID
*/
module.exports = function(id, opts){

	if( !id )
		return null;

	let lookupID = typeof id === 'object' ? id[this.model.prototype.idAttribute] : id

	var model = this.get.call(this, lookupID, opts)

	// if no model, fetch and add the requested model
	if( !model ){

		id = id instanceof Backbone.Model ? id[id.idAttribute] : id;
		var ModelClass = this.model || Backbone.Model;

		var data = {}

		if( typeof id == 'object' )
			data = id;
		else
			data[ModelClass.prototype.idAttribute] = id;

		var model = new ModelClass(data);

		model.needsFetching = Object.keys(data).length == 1

		// add model to this collection
		if( !opts || opts.add !== false )
			this.add(model, {silent:(opts&&opts.silent||false)});
		else
			model.collection = this;
	}

	return model;
}