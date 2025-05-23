const Fuse = require('fuse.js')
const Model = require('../model')
const ModelFindWhereTerm = require('./model-findWhereTerm')
require('../../util/promise.series')

const SearchTypes = new Map()

class SearchAPI {

    constructor(attrs, req){
        Object.assign(this, attrs)
        this.req = req
        this.db = Model.db
    }

    get limit(){ return 100 }
    typeDelimiter = ','

    static enableFindWhereTerm(){
        ModelFindWhereTerm(this)
    }

    static get api(){return {
		routes: [
			['get', '/search/:term', 'searchDefault'],
            ['get', '/search/:type/:term', 'searchType']
		]
	}}

    static add(type){

        if( Array.isArray(type) )
            return type.forEach(t=>this.add(t))

        if( !type.name )
            return console.error('SearchType must have a `name`')

        SearchTypes.set(type.name, type)
    }

    static get searchTypeDefs(){
        return SearchTypes
    }

    static searchTypeDef(type){
        return SearchTypes.get(type)
    }

    async searchType(){

        if( !this.db ) throw new Error('Missing `this.db`')

        let types = this.typeDelimiter === false ? [this.type] : this.type?.split(this.typeDelimiter).map(s=>s.trim())

        let badType = types.find(type=>!SearchTypes.get(type))
        if( badType ) throw Error('Invalid search type: '+badType)
            
        return this.searchTypes(types)
    }

    // default searches all "types"
    async searchDefault(){
        // TODO: allow types to be set by query param or filters?
        // not needed yet so we'll leave out for now
        let types = Array.from(SearchTypes.keys())
        return this.searchTypes(types)
    }

    async searchTypes(types=[], {hydrate=true}={}){

        if( !this.db ) throw new Error('Missing `this.db`')
        if( !types || types.length == 0 ) throw new Error('No search types given')
        
        let data = []
        let byType = {} // get list of IDs, grouped by type
        let result = []
        let threshold
        let lookupGivenID = types.length == 1 && this.req.query.id !== undefined

        // requested a specific known ID
        if( lookupGivenID ){
            
            // spoof expected responses
            byType[types[0]] = [this.term]
            result = [{item: {type: types[0], id: this.term}}]
            

        }else{

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

            // NOTE: this? or shoud I use `ignoreDiacritics`
            function simplifyStr(str){
                return str.replace(/[,'’”]/g, '').toLowerCase()
            }

            data = data.map(row=>{
                row.label = simplifyStr(row.label)
                return row
            })

            // further reduce and sort the results from a string search
            // by matching the `term` agaist the `label` returned from the search types
            let fuse = new Fuse(data, {
                threshold: threshold,
                includeScore: true,
                // ignoreLocation: true,
                // ignoreDiacritics: true,
                keys: ["label"]
            })

            result = fuse.search(simplifyStr(this.term))

            if( !hydrate )
                return result

            result.forEach(row=>{
                byType[row.item.type] = byType[row.item.type] || []
                byType[row.item.type].push(row.item.id)
            })
        }

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

        return lookupGivenID ? res[0] : res
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