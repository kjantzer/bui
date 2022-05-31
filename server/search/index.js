require('../../util/promise.series')
const Fuse = require('fuse.js')

const SearchTypes = new Map()

class SearchAPI {

    constructor(attrs, req){
        Object.assign(this, attrs)
        this.req = req
    }

    get limit(){ return 100 }

    static get api(){return {
		routes: [
			['get', '/search/:term', 'searchDefault'],
            ['get', '/search/:type/:term', 'searchType']
		]
	}}

    static add(type){
        if( !type.name )
            return console.error('SearchType must have a `name`')

        SearchTypes.set(type.name, type)
    }

    async searchType(){

        if( !this.db ) throw new Error('Missing `this.db`')
        
        let SearchType = SearchTypes.get(this.type)

        if( !SearchType ) throw Error('Invalid search type')
            
        return this.searchTypes([this.type])
    }

    // default searches all "types"
    async searchDefault(){
        // TODO: allow types to be set by query param or filters?
        // not needed yet so we'll leave out for now
        let types = Array.from(SearchTypes.keys())
        return this.searchTypes(types)
    }

    async searchTypes(types=['book'], {hydrate=true}={}){

        if( !this.db ) throw new Error('Missing `this.db`')
        
        let data = []
        let threshold

        // perform searches for each "type"
        await Promise.series(types, async type=>{
            let SearchType = SearchTypes.get(type)
            if( SearchType ){
                let st = new SearchType(this.req, this.db)
                let res = await st.query(this.term)
                if( !threshold || st.threshold < threshold )
                    threshold = st.threshold
                data.push(...res)
            }
        })

        // further reduce and sort the results from a string search
        // by matching the `term` agaist the `label` returned from the search types
        let fuse = new Fuse(data, {
            threshold: threshold,
            includeScore: true,
            keys: ["label"]
        })
        let result = fuse.search(this.term)

        if( !hydrate )
            return result

        // get list of IDs, grouped by type
        let byType = {}
        result.forEach(row=>{
            byType[row.item.type] = byType[row.item.type] || []
            byType[row.item.type].push(row.item.id)
        })

        // hydrate the IDs with real data
        for( let type in byType ){
            let SearchType = SearchTypes.get(type)
            let typeData = await new SearchType(this.req, this.db).hydrate(byType[type], {term:this.term})
            byType[type] = typeData.groupBy('id')
        }

        // add the hydrated data to the sorted results
        let res = result.map(row=>{

            let rowData = byType[row.item.type][row.item.id]

            if( rowData )
            rowData.search = Object.assign({
                score: row.score,
                weight: row.item.weight,
                matched: row.item.matched || this.type,
                label: row.item.label
            }, rowData.search||{})

            return rowData
        })

        // dedupe and remove rows that didnt hydrate
        let uniqIds = {}
        res = res.filter(row=>{
            if( !row ) return false
            let id = row.type+row.id
            if( uniqIds[id] ) return false
            return uniqIds[id] = true
        })

        // final sort
        // sort data taking in account each type's "weight" (higher weight = more important)
        res = res.sort((a,b)=>{

            let aDelta =  1 + (-1 / (a.search.weight||50))
            let bDelta =  1 + (-1 / (b.search.weight||50))

            // sort by fuse.js score and the weight
            let scoreSort = (a.search.score+bDelta) - (b.search.score+aDelta)

            if( scoreSort !== 0 ) return scoreSort

            // different types, maintain current sort
            if( a.type != b.type ) return 0

            let SearchType = SearchTypes.get(a.type)
            if( SearchType && SearchType.finalSort )
                return SearchType.finalSort(a, b)
            
            return 0
        })

        await Promise.all(res.map(async (row, i)=>{
            let SearchType = SearchTypes.get(row.type)
            if( !SearchType ) return 
            
            SearchType = new SearchType(this.req, this.db)
            await SearchType.finalFormat(row, i, {term: this.term})
        }))
        
        if( this.limit > 0 )
            res = res.slice(0, this.limit)

        return res
    }

    get filters(){
        try {
            let filters = this.req.query.filters

            if( filters && typeof filters == 'string')
                return JSON.parse(filters)
            else if( filters )
                return filters
            else
                return {}
        }catch(err){
            console.log('Malformed filters:', this.req.query.filters);
            return {}
        }
    }
}


module.exports = SearchAPI