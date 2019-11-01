
module.exports = {
	
	//urlPath: 'extra/path/after/parent-url' // make sure to set this. Can also be set with options
	//stale: 5000, // fetch() wont actually fetch unless 5 seconds have passed since last fetch

	constructor: function(models, options){
	
		this.parentModel = options ? options.parentModel : null;
		
		if( options && options.urlPath ) this.urlPath = options.urlPath
		
		this.hasFetched = false;
	
		Backbone.Collection.prototype.constructor.apply(this, arguments);
	},
	
	// uses the URL from the parentModel and adds `urlPath` property
	url: function(){
		
		if( !this.parentModel || !(this.parentModel instanceof Backbone.Model) ){
			console.error('Backbone.ChildCollection: a `parentModel` is expected')
			return null
		}
		
		var url = '';
		var parentModel = this.parentModel;
		
		if( parentModel && typeof parentModel.url == 'function')
			url = parentModel.url();
		else if( parentModel )
			url = parentModel.url;
		
		if( !url ){
			console.warn('No URL on the `parentModel`');
			return null;
		}
		
		return this.urlPath ? url+'/'+this.urlPath : url;
	},
	
	fetch: function(opts){

		var opts = opts || {};
		var stale = opts.stale || this.stale;
		var onSuccess = opts.success || null;
		var timeSinceLastFetch = this.timeSinceLastFetch()

		// if a "stale" property was given, dont fetch until the date is considered stale
		if( stale && timeSinceLastFetch && timeSinceLastFetch < stale )
			return;

		this.__lastFetched = new Date;

		opts.success = function(){
			this.hasFetched = true;
			this.isFetching = false;
			onSuccess && onSuccess.apply(this, arguments)
		}.bind(this)
		
		this.isFetching = true;
		
		return Backbone.Collection.prototype.fetch.call(this, opts);
	},
	
	// returns `true` if fetching and `false` if not
	fetchOnce: function(opts){
		if( !this.hasFetched && !this.isFetching ){
			this.fetch(opts)
			return true
		}else if( opts && opts.success ){
			opts.success(this, this.models)
			return false;
		}
	},

	timeSinceLastFetch: function(){
		return this.__lastFetched ? (new Date).getTime() - this.__lastFetched.getTime() : null;
	},

	_updateFromModel: function(models){
		this.update(models);
	}
	
};