const Model = require('../model')
const groupBy = require('../../util/array.groupBy')

module.exports = function(SearchAPI){

    /*
        Uses Search.searchTypes to lookup the req.term
        and apply to the where; this is called before findWhere is applied
    */
    Model.prototype.findWhereTerm = async function(where, opts){

        let {Group, UnsafeSQL} = this.db.clauses
        let {term} = this.req.query
        let termSearch = this.config.termSearch

        if( !term || !termSearch ) return

        // dont let this term be used on related models
        delete this.req.query.term

        if( !this.findWhereTermResultsMatch )
            return console.warn('`findWhereTermResultsMatch` is missing')

        // convert to an array of term searching
        if( !Array.isArray(termSearch) )
            termSearch = [termSearch]

        let termSearchGroups = []

        // perform term search for each type
        for( let _termSearch of termSearch ){

            // search the term, but do not hydrate with record data, just return the IDs
            let results = await new SearchAPI({term}, this.req).searchTypes(_termSearch.types, {hydrate: false})

            // the search type may have been multiple, so lets group the results so we can 
            // query where with an OR
            results = groupBy.call(results.map(r=>r.item), 'type', {forceArray: true})

            let groups = new Group({}, 'OR')
            let types = Object.keys(results)

            await Promise.all(types.map(async type=>{

                let typeResults = results[type]
                let ids = typeResults.map(item=>item[_termSearch.resultID||'id']) // NOTE: support function

                await this.findWhereTermResultsMatch(groups, ids, {type, key:_termSearch.key, results: typeResults, where, opts})
            }))

            if( groups.size > 0  )
                termSearchGroups.push(groups)
        }

        if( termSearchGroups.length > 0 )
            where.term = new Group(Object.fromEntries(termSearchGroups.entries()), 'OR')
        else
            where.noresults = new UnsafeSQL('true = false')
    }

    Model.prototype.findWhereTermResultsMatch = function (whereGroup, ids, {type, results, where, key}={}){

        if( !key )
            key = this.config.termSearch.key

        if( !key ) return
        
        if( !whereGroup.has(key) )
            whereGroup.set(key, [])
            
        whereGroup.get(key).push(...ids)
    }

}