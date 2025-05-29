import Emitter from 'component-emitter'

export default class DataSource {

    constructor(opts={}){
        this.reset()

        this.opts = Object.assign({
            perPage: 30,
            fetch: true,
            fetchOnLoad: true
        }, opts)   
    }

    reset(){
        this._pageFetched = null
        this.lastFiltered = 0
        this._rawData = []      // unaltered data from server
        this._filteredData = [] // raw data with after filters applied
        this.data = []          // filtered data with "search term" applied

        // if still trying to fetch data, stop
        this.abortFetch()
    }

    abortFetch(){
        // stop fetching data if still in process
        this._fetchFromServerController?.abort()
        this._fetchFromServerController = null
    }

    set coll(coll){
        this.hasFetched = false
        this.__coll = coll
    }
    get coll(){ return this.__coll}

    get isFiltered(){
        return this.filters && !!(this.filters.areApplied || this.filters.term )
    }

    async refilter(){
        this.lastFiltered = 0
        this._rawData = this.coll && this.coll.models || this.coll || []
        this._filteredData = this._rawData
        this.data = this._rawData

        await this.applyFilters()
    }

    get perPage(){ return this.opts.perPage }

    async length(){

        if( this._fetching )
            await this._fetching

        return this.data.length
    }
    
    at(i){ return this.data[i] }
    first(i){ return this.data[0] }
    last(){ return this.data[this.data.length-1]}

    forEach(fn){ return this.data.forEach(fn) }
    map(fn){ return this.data.map(fn) }
    flatMap(fn){ return this.data.flatMap(fn) }
    filter(fn){ return this.data.filter(fn) }
    reduce(fn, start=0){ return this.data.reduce(fn, start) }

    async _fetchFromServer(pageAt, {perPage}={}){

        // if currently trying to fetch, stop
        this.abortFetch()

        // TODO: support fetching data with `fetch` and a url?
        if( this.coll && this.coll.fetchSync ){

            let data = {term:this.filters.term||''}

            if( this.opts.fetch == 'more' ){
                data.pageAt = pageAt
                data.perPage = perPage ?? this.perPage
            }

            if( this.filters )
                data.filters = this.filters.toPostData()

            if( this.sorts )
                data.sorts = this.sorts.value

            if( this.opts.fetchData ){
                let fetchData = this.opts.fetchData
                if( typeof fetchData == 'string' ) fetchData = {[fetchData]:true}
                data = Object.assign(fetchData, data)
            }

            this._lastFetchedFromServerData = data

            // let fetch be aborted
            this._fetchFromServerController = new AbortController()

            await this.coll.fetchSync({
                signal: this._fetchFromServerController.signal,
                data:data,
                merge: true,
                remove: pageAt==0 ? true : false,
                // for Backone 0.9.10/0.9.9, 'update' is needed to register change events on the model, rather than mass "reset" (see line 815 in backbone source)
                update: true,
            }).finally(()=>{
                this._fetchFromServerController = null
            })
        }
    }

    fetch(pageAt, opts){
        return this._fetching = new Promise(async (resolve, reject)=>{

            if( (pageAt == 0 && this._rawData.length == 0) 
            || (this._pageFetched != pageAt && this._rawData.length == pageAt && this.opts.fetch == 'more' ) 
            || (pageAt == 0 && this.filters.shouldSearchTermOnDB && (this._lastFetchedFromServerData?.term||'') != (this.filters.term||'') ) ){

                this._pageFetched = pageAt

                if( this.opts.fetch ){
                    this.emit('fetching', true)
                    await this._fetchFromServer(pageAt, opts).catch(err=>{
                        reject(err)
                    })
                    this.emit('fetching', false)
                }
                
                await this.refilter()
            }

            if( this._filtering )
                await this._filtering

            if( this._sorting )
                await this._sorting

            this.hasFetched = true

            resolve(this.data.slice(pageAt, pageAt+this.opts.perPage))
        }).finally(_=>delete this._fetching)
    }

    applyFilters(){
        return this._filtering = new Promise(async resolve=>{

            if( !this.filters ) return resolve(this.data)

            if( this.lastFiltered < this.filters.lastChanged ){

                this.data = await this.filters.filter(this._rawData)

                if( this.coll?.applyGrouping )
                    this.data = this.coll.applyGrouping(this.data)
                
                if( this.sorts && (!this.sorts.sortOnDB || this.coll?.applyGrouping) )
                    await this.sort()

                this._filteredData = this.data
            }

            this.data = await this.filters.filterByTerm(this._filteredData)

            resolve(this.data)

            this.lastFiltered = new Date().getTime()

            clearTimeout(this._applyFiltersEventEmit)
            this._applyFiltersEventEmit = setTimeout(()=>{
                this.emit('changed')
            },500)


        }).finally(_=>delete this._filtering)
    }

    sort(){
        return this._sorting = new Promise(async resolve=>{

            if( !this.sorts ) return resolve(this.data)

            this.data = await this.sorts.sort(this.data)

            resolve(this.data)

        }).finally(_=>delete this._sorting)
    }
}

Emitter(DataSource.prototype)