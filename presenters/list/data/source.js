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
    }

    set coll(coll){
        this.hasFetched = false
        this.__coll = coll
    }
    get coll(){ return this.__coll}

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

    async _fetchFromServer(pageAt){

        // TODO: support fetching data with `fetch` and a url?
        if( this.coll && this.coll.fetchSync ){

            let data = {term:this.filters.term||''}

            if( this.opts.fetch == 'more' ){
                data.pageAt = pageAt
                data.perPage = this.perPage
            }

            if( this.filters )
                data.filters = this.filters.toPostData()

            if( this.sorts )
                data.sorts = this.sorts.value

            await this.coll.fetchSync({
                data:data,
                merge: true,
                // for Backone 0.9.10/0.9.9, 'update' is needed to register change events on the model, rather than mass "reset" (see line 815 in backbone source)
                update: true,
            })
        }
    }

    fetch(pageAt){
        return this._fetching = new Promise(async (resolve, reject)=>{

            if( (pageAt == 0 && this._rawData.length == 0) 
            || (this._pageFetched != pageAt && this._rawData.length == pageAt && this.opts.fetch == 'more' ) ){

                this._pageFetched = pageAt

                if( this.opts.fetch )
                    await this._fetchFromServer(pageAt).catch(err=>{
                        reject(err)
                    })
                
                await this.refilter()
            }

            // why was I doing this? it doesn't work when data is filtered
            // if( this._rawData.length > pageAt )
            //     this.emit('change:count', this._rawData.length)

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