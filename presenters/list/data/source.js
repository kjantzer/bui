
export default class DataSource {

    constructor(opts={}){
        this.reset()

        this.opts = Object.assign({
            perPage: 30,
            fetch: true
        }, opts)
    }

    reset(){
        this.lastFiltered = 0
        this._rawData = []
        this._filteredData = []
        this.data = []
    }

    async length(){

        if( this._fetching )
            await this._fetching

        return this.data.length
    }
    
    forEach(fn){ return this.data.forEach(fn) }
    map(fn){ return this.data.map(fn) }
    filter(fn){ return this.data.filter(fn) }
    reduce(fn, start=0){ return this.data.reduce(fn, start) }

    async _fetchFromServer(){

        // TODO: support fetching data with `fetch` and a url?
        if( this.coll && this.coll.fetchSync ){
            let data = {}

            if( this.filters )
                data.filters = this.filters.value()

            await this.coll.fetchSync({data:data})
        }
    }

    fetch(pageAt){
        return this._fetching = new Promise(async resolve=>{

            if( pageAt == 0 && this._rawData.length == 0 ){

                if( this.opts.fetch )
                    await this._fetchFromServer()

                this.lastFiltered = 0
                this._rawData = this.coll.models || this.coll
                this._filteredData = this._rawData
                this.data = this._rawData

                await this.applyFilters()
            }

            if( this._filtering )
                await this._filtering

            if( this._sorting )
                await this._sorting

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