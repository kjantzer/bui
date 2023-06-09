
module.exports = function(Orig){ return {
	
	// DEPRECATED - just use `get`
	childCollection: function(key ){ return this.getCollection(key); }, // alias
	
	getPromise(key, opts={}){
		opts.promise = true
		return this.get(key, opts)
	},

	// Overrides default to get a collection if no attribute for given `key` exists
	get: function(key, {dotnotation=true, promise=false}={}){

		// else, default to normal get of `attributes`
		if( !dotnotation || typeof key !== 'string' )
			return Orig.Get.apply(this, arguments)
		
		// get the key, subkey, and path of they exists; ex: "key/subkey.path"
		var keys = (key||'').split('.')
		key = keys.shift()
		var path = keys.join('.')
		keys = key.split('/')
		key = keys.shift();
		let subKey = keys[0]

		// child collection matching key?
		if( this.collections && this.collections[key] !== undefined )
			return this.getCollection(key, subKey, path);
		
		// child model matching key?
		if( this._childModel(key) )
			return this.getModel(key, path, {promise});
		
		// traversing up the parents for every `get` is expensive when dealing with lots of models so only do it if no attribute matches
		if( this.attributes[key] === undefined && key != 'name' ){

			if( this[key] !== undefined ){

				if( typeof this[key] == 'function' ){

					// keep infinite loop from happening:
					// example: key(){ return this.get('key') }
					// NOTE: this is a fix for legacy code... this ^ shouldn't be done
					if( this[key]._calledFromGetKey != key ){
						this[key]._calledFromGetKey = key
						let m = this[key].call(this)
						delete this[key]._calledFromGetKey
						return path && m.get ? m.get(path) : m
					}

					delete this[key]._calledFromGetKey

				}else{
					return this[key]
				}
			}
			
			// traverse up the parent models to check for one with a matching "name"
			let p = this.parentModel || (this.collection && this.collection.parentModel)
			while(p){
				if( p.name == key){break;} // we found a matching parent; stop searching
				p = p.parentModel || (p.collection && p.collection.parentModel)
			}
			
			// if we found a parentModel with a matching name, return it (or get more via path)
			if( p )
				return path ? p.get(path) : p
		}
		
		// else, default to normal get of `attributes`
		return Orig.Get.apply(this, arguments)
	},

	fetch: function(opts){

		opts = opts || {};
		var onSuccess = opts.success;
		var onError = opts.error;

		opts.success= function(){
			this.isFetching = false;
			this.hasFetched = true;
			onSuccess && onSuccess.apply(this, arguments)
		}.bind(this)

		opts.error= function(){
			this.isFetching = false;
			this.hasFetched = true;
			onError && onError.apply(this, arguments)
		}.bind(this)

		return Orig.Fetch.call(this, opts)
	},

	_childModel: function(key){
		// TEMP `childModels` can also be used since `models` breaks RelationalModel
		return (this.models && this.models[key]) || (this.childModels && this.childModels[key])
			|| (this.attrTypes && typeof this.attrTypes[key] == 'object' ? this.attrTypes[key] : undefined)
	},
	
	getCollection: function(key, subKey, path){
		
		this.__childCollections = this.__childCollections || {};
		
		let cacheKey = key + (subKey ? '/'+subKey : '' )
		
		// collection already initialized
		if( this.__childCollections[cacheKey] )
			return path ? this._getPathFromCollection(this.__childCollections[cacheKey], path) : this.__childCollections[cacheKey];
		
		// get the collection info for setup and determine if a Collection was given
		var CollInfo = this.collections && this.collections[key];
		
		// is CollInfo a function (but not a Collection)? Call it to get the info
		if( CollInfo && typeof CollInfo == 'function' && CollInfo.prototype && !CollInfo.prototype.toJSON && !CollInfo.prototype.fetch )
			CollInfo = CollInfo.call(this)

		// if given a subkey, get the coll info for the subkey 
		if( subKey && CollInfo[subKey] )
			CollInfo = CollInfo[subKey]

		var CollGiven = CollInfo 
						&& (
							(CollInfo.prototype && CollInfo.prototype.toJSON && CollInfo.prototype.fetch)
							|| (CollInfo.prototype && CollInfo.prototype.constructor) /* class */
						)
		
		// whoops, couldn't find a collection for the given key
		if( CollInfo == undefined ){
			console.trace('Collection for `'+cacheKey+'` not set.',  this.collections)
			return undefined;
		}
		
		// get the "class" of Collection to instantiate
		var ChildColl = CollGiven ? CollInfo : (CollInfo.collection ? CollInfo.collection : null);
		
		var opts = {
			parentModel: this
		}
		
		// if the value was a string, it should be the 'urlPath'
		if( typeof CollInfo === 'string' )
			opts.urlPath = CollInfo;
		
		// else, if an object, and not a Collection, pass everything as options to the collection
		else if( !CollGiven && typeof CollInfo === 'object')
			opts = Object.assign(CollInfo, opts);
		
		// get bootstrapped model data for initial creation of collection.
		// if the cacheKey of this collection matches a model attribute (and its an array), assume they're models
		let attr = this.attributes[key]
		if( attr && subKey ) attr = attr[subKey] // if we have a subkey, look for the data nested in attributes {key: {subkey:['data']}}
		var models = (attr && Array.isArray(attr)) ? attr : [];
		
		// no attributes and no models or URL path, this is not valid
		if( !ChildColl && models.length == 0 && !opts.urlPath ){
			console.warn('`'+cacheKey+'` is a collection group: ',  this.collections[key])
			return undefined
		}
		else if( !ChildColl )
			ChildColl = Backbone.ChildCollection;
		
		// create and store reference to this collection
		var Coll = this.__childCollections[cacheKey] = new ChildColl(models, opts)

		// more-or-less the same as having "fetched"
		if( models.length > 0 )
			Coll.hasFetched = new Date().getTime()
		
		// if the collection got its data from a model attribute, listen for when that attribute changes and update the collection 
		// if( this.attributes[key] )
		// 	Coll.listenTo(this, 'change:'+key, Coll._updateFromModel)
		
		// make sure parent model is set on the collection
		Coll.parentModel = this;
		
		if( this.name && !Coll[this.name] )
			Coll[this.name] = this
		
		return path && Coll ? this._getPathFromCollection(Coll, path) : Coll;
	},

	_getPathFromCollection: function(coll, path){
		var keys = path.split('.')
		var key = keys.shift()
		path = keys.join('.')
		var m = null;

		if( key == 'first' )
			m = coll.first()
		else if( key == 'last' )
			m = coll.last()
		else if( key.match(/^(?:index|at)(\d+)$/) )
			m = coll.at(key.match(/^(?:index|at)(\d+)$/)[1])
		else if( key )
			m = coll.get(key)

		return path && m ? m.get(path) : m
	},
	
	getModel: function(key, path, {promise=false}={}){

		this.__childModels = this.__childModels || {};

		// model already initialized
		if( this.__childModels[key] )
			return path ? this.__childModels[key].get(path) : this.__childModels[key];

		// get the collection info for setup and determine if a Collection was given
		var info = this._childModel(key);

		// is CollInfo a function (but not a Collection)? Call it to get the info
		if( info && typeof info == 'function' && info.name === key && info.prototype && !info.prototype.toJSON && !info.prototype.fetch )
			info = info.call(this)

		// was a model given? (instead of a hash {})
		// var infoIsModel = info && info.prototype && info.prototype.toJSON && info.prototype.fetch;
		var infoIsModel = isModel(info, key)

		var ChildModel = infoIsModel ? info : (info.model ? info.model : (info.coll?.model || Backbone.Model) );

		// look for model attributes on this model
		var attributes = this.attributes[key] && typeof this.attributes[key] == 'object' ? this.attributes[key] : {};

		// NOTE: cannot use `ChildModel.prototype.idAttribute` as `idAttribute` in class/extends wont be detected
		let idAttribute = 'id'

		// if no `id` value, then assume a custom idAttribute must be used and determine it
		// we add this test to attempt to improve perf (so we dont always have to create empty model to get key)
		if( attributes && !attributes.id )
			idAttribute = new ChildModel().idAttribute||'id'

		// were we given an ID key? get the id from the attributes on this model
		if( info.id || (this.attributes[key] !== undefined && typeof this.attributes[key] != 'object') ){
			attributes[idAttribute] = this.attributes[info.id||key];
			
			// save link from id name to the child model key.
			// this way when the id name value is changed we can update the child model. See `set` below
			if( info.id != key ){
				this.__childModelIDLookup = this.__childModelIDLookup || {}
				this.__childModelIDLookup[info.id] = key
			}
		}

		var id = attributes[idAttribute];
		
		if( (id === null || id === undefined) && info.defaultID !== undefined )
			id = String(info.defaultID)
		
		// cannot get a model, no value for ID
		if( info.id && !id ) return null;

		// see if we have a parent collection we are supposed to retrieve the model from
		let coll = id && info.coll
		
		// allow coll to be a string name in which case we will look for it on this model.
		if( coll && typeof coll == 'string' ){
			coll = this.get(coll) || window[coll] // get the collection based on string name or look for it on the window
			if( !coll ){
				console.trace('ChildCollection: no parent collection called ‘'+info.coll+'’ found on', this, 'or globally on the window')
			}
		}

		// if a parent collection was given, attempt to lookup the model (or create it)
		if( coll ){
			
			if( coll.isSingletonFactory )
				coll = coll()
			
			if( typeof coll == 'function' ){
				var Model = coll.call(this, id, key, attributes)
			}else{
				var Model = info.fetch ? coll.getOrFetch(attributes, {success:this._childModelFetched.bind(this, key, path), silent:true}) : coll.getOrCreate(attributes)
				Model.refColl = coll
			}

		// else, no collection, manually create the model
		}else{
			var Model = new ChildModel(attributes)
			// TODO: allow for urlPath to be used to set a url on this model
			if( info.fetch && id ) Model.fetch({success:this._childModelFetched.bind(this, key, path)});
		}

		if( Model ){
			Model.parentModel = this;
			Model.name = Model.name || key
		}

		this.__childModels[key] = Model;

		if( promise ){
			this._getPromises = this._getPromises || new Map()

			if( !this._getPromises.get(key) ){
				let resolve
				let promise = new Proxy(new Promise((_resolve)=>{resolve = _resolve}), {
					get: function(target, prop) {
						var value = target[prop];
						return typeof value == 'function' ? value.bind(target) : value;
					}
				})

				this._getPromises.set(key, {promise, resolve})
			}

			return this._getPromises.get(key).promise
		}

		return path && Model ? Model.get(path) : Model
	},

	_childModelFetched: function(key, path, model){
		// delay to allow for the model to save: `this.__childModels[key] = Model;`
		setTimeout(()=>{
			this.trigger('model:'+key+':fetch', model)

			let getPromise = this._getPromises && this._getPromises.get(key) 
			if( getPromise ){
				if( path )
					model = model.get(path)
				getPromise.resolve(model)
				this._getPromises.delete(key) 
			}
		})
	},
	
	set: function(key, val, options){
		
		var attrs, self = this;
		
		if ( typeof key == 'object' ) {
			attrs = key;
			options = val;
		} else {
			(attrs = {})[key] = val;
		}
		
		// if `key` is a child collection, update it
		if( self.__childCollections )
		for( let key in attrs){

			// 1.0+
			if( self.__childCollections[key] && self.__childCollections[key].set )
				self.__childCollections[key].set(attrs[key]);
			// -0.9.10
			else if( self.__childCollections[key] )
				self.__childCollections[key].update(attrs[key]);
		}
		
		// if `key` is a child model, clear the model to force `getModel` to run again
		if( self.__childModels )
		for( let key in attrs){
			if( self.__childModels[key] ){
				if( isModel(this.models[key], key) ){
					self.__childModels[key].clear({silent: true})
					self.__childModels[key].set(attrs[key])
				}else
					delete self.__childModels[key];
			}else if( self.__childModelIDLookup && self.__childModelIDLookup[key] )
				delete self.__childModels[self.__childModelIDLookup[key]];
		}
		
		// continue on with normal `set` logic
		return Orig.Set.apply(this, arguments);
	}
}}


function isModel(val, key){
	return val && val.prototype && val.name !== key
}