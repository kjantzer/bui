const Fuse = require('fuse.js')

module.exports = class SearchType {
    
    constructor(req, db){
        this.req = req
        this.db = db
    }

    // how to sort items with same score
    static finalSort(a, b){ return 0 }
    
    formatTerm(term){ return term }
    parseRow(row){ /* noop */ }
    finalFormat(row, {term}={}){ /* noop */ }

    get limit(){ return 100 }
    get threshold(){ return 0.2 }
    get type(){ return this.constructor.name || 'unknown' }

    termForBoolean(term){
        // remove characters that boolean mode doesn't like
        return term.replace(/[\(\)\*\-+]/g, ' ').replace(/\s{2,}/g, ' ')
    }

    query(term){
        term = this.formatTerm(term)
        let sql = this.searchSql
        if( typeof sql == 'function' ) sql = sql(term)
        return this.db.query(sql, term).then(rows=>{
            rows.forEach(row=>row.type=row.type||this.type)
            return rows
        })
    }

    hydrate(ids, {term}={}){
        let type = this.constructor.name || 'unknown'
        return this.db.query(this.fillSql, [ids]).then(async rows=>{
            await Promise.all(rows.map(async (row,i)=>{
                row.type=row.type||this.type
                await this.parseRow(row, i, {term, ids})
            }))
            return rows
        })
    }

    async search(term){

        let data = await this.query(term)

        if( data.length == 0 )
            return data

        // further reduce and sort the results from a string search
        let fuse = new Fuse(data, {
            threshold: this.threshold,
            includeScore: true,
            keys: ["label"]
        })

        let result = fuse.search(term)

        // use Map so order is retained
        let mappedResult = new Map() // NOTE: not really needed now
        let ids = []
        result.forEach(row=>{
            ids.push(row.item.id)
            mappedResult.set(row.item.id, row)
        })

        if( ids.length == 0 )
            return []

        // limit ids here so the hydrate query doesn't fetch too much data
        if( this.limit )
            ids = ids.splice(0, this.limit)

        let hydratedResults = await this.hydrate(ids)

        // replace original search results with hydrated data
        hydratedResults.forEach(row=>{
            row.search = Object.assign({
                score: mappedResult.get(row.id).score,
                weight: mappedResult.get(row.id).item.weight,
                matched: mappedResult.get(row.id).item.matched || this.type,
                label: mappedResult.get(row.id).item.label
            },row.search||{})

            mappedResult.set(row.id, row)
        })

        let res = Array.from(mappedResult.values())

        res = res.filter(row=>{
            return !!row.search
        })

        // now limit the original query results
        if( this.limit )
            res = res.splice(0, this.limit)

        res = res.sort((a,b)=>{
            
            if( a.search.score != b.search.score )
                return a.search.score - b.search.score
            
            if( this.constructor.finalSort )
                return this.constructor.finalSort(a, b)

            return 0
        })

        return res
    }
}