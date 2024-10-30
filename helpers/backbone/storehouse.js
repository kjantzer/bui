/*
    # Storehouse

	Used to make a single collection able to fetch sets of data and merge with existsing
*/
export function EnableStorehouseColl(Class, {urlPrefix=''}={}){

    const ClassFetch = Class.prototype.fetchSync

    Class.prototype.fetchSet = function (key, {force=false}={}){

		if( !key ) return this;

		// if we already did, or currently are fetching the requested key, skip fetching again (unless force requested)
		if( force !== true
		&& (this.hasFetchedStorehouse(key) || this.isFetchingStorehouse(key) ))
			return Promise.resolve()

        let url = this.url+'/'+urlPrefix+key;

		this._storehouseFetching = key;

		return ClassFetch.call(this, {
            url,
			update: true,
			remove: false
		}).then(resp=>{
			this._onStorehouseFetch.bind(this, key, resp)
			return resp
		})
	}

	// mark the type/foreign_id as "fetched"
	Class.prototype._onStorehouseFetch = function (key, resp){
		this._storehouseFetching = null; // no longer fetching data
		this._storehouseFetched.push(key)
		this.trigger('sync:'+key, resp);
	}

	Class.prototype._storehouseFetched = [], // holds array of `key`

	// has specific key been fetched? (if no params, just checks if any fetching has been done)
	Class.prototype.hasFetchedStorehouse = function (key){
		return key
		? this._storehouseFetched.indexOf(key) > -1 // has specific key been fetched?
		: this._storehouseFetched.length > 0	// or just has the collection ever been fetched?
	}

	Class.prototype.isFetchingStorehouse = function (key){
		return key
		? this._storehouseFetching == key // is specific key being fetched?
		: !!this._storehouseFetching	// or is the collection at least fetching something?
	}

}