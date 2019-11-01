module.exports = function(id, opts){

	opts = opts || {}
	var success = typeof opts == 'object' ? opts.success : opts;
	
	if( !id ){
		if( success ) success(null)
		return null;
	}

	var model = this.getOrCreate.apply(this, arguments)

	// model has not fetched yet (via getOrFetch)
	if( model.needsFetching ){

		delete model.needsFetching;
		model.isFetching = true;

		var finishedCallback = function(model, resp, opts){
			
			delete model.isFetching
			model.isInvalid = !!resp.getAllResponseHeaders // resp will be a `xhr` object when in the error callback
			
			if( success ) success(model)

			// are there any other success callbacks waiting? Call them now (see below)
			if( model._getOrFetchSuccess ){
				model._getOrFetchSuccess.forEach(function(fn){ fn(model) });
				delete model._getOrFetchSuccess;
			}
		}

		if( model.isNew() )
			model.save({}, {success: finishedCallback, error: finishedCallback})
		else
			model.fetch({data:(opts.data||null), success: finishedCallback, error: finishedCallback});

	// model currently fetching, stash the "success" callback on the model - it will be called when fetch completes
	}else if( model.isFetching && success){
		model._getOrFetchSuccess = model._getOrFetchSuccess || [];
		model._getOrFetchSuccess.push(success)

	// already fetched
	}else{
		if( success ) success(model)
	}

	return model;
}