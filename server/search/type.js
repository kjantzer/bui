const Fuse = require('fuse.js')

module.exports = class SearchType {
    
    constructor(req, db){
        this.req = req
        this.db = db
    }
    
    formatTerm(term){ return term }

    get limit(){ return 100 }
    get type(){ return this.constructor.name || 'unknown' }

    query(term){
        return this.db.query(this.searchSql, this.formatTerm(term)).then(rows=>{
            rows.forEach(row=>row.type=row.type||this.type)
            return rows
        })
    }

    hydrate(ids){
        let type = this.constructor.name || 'unknown'
        return this.db.query(this.fillSql, [ids]).then(rows=>{
            rows.forEach(row=>{
                row.type=row.type||this.type
                row.search_matched=this.type
            })
            return rows
        })
    }

    async search(term){

        let data = await this.query(term)

        if( data.length == 0 )
            return data

        // further reduce and sort the results from a string search
        let fuse = new Fuse(data, {
            threshold: 0.2,
            includeScore: true,
            keys: ["label"]
        })

        let result = fuse.search(term)

        // use Map so order is retained
        let mappedResult = new Map()
        let ids = []
        result.forEach(row=>{
            ids.push(row.item.id)
            mappedResult.set(row.item.id, row.item)
        })

        if( ids.length == 0 )
            return []

        if( this.limit )
            ids = ids.splice(0, this.limit)

        let hydratedResults = await this.hydrate(ids)

        // replace original search results with hydrated data
        hydratedResults.forEach(row=>{
            mappedResult.set(row.id, row)
        })

        return Array.from(mappedResult.values())
    }
}