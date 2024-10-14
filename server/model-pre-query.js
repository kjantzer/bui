/*
    # Model Pre Query

    > WIP - new concept being ironed out...

    This class can be used to pre-query for a list of records before making a query for "real" data
    Ex: get list of records for a ref table, THEN query records that match

    ```js
    async findWhere(where, opts){
        await ModelPreQuery.applyTo(this, opts)
    }
    ```
*/
const Model = require('./model')

// tracks created temp tables so we can reuse within same session
// temp tables cleared when session disconnects (which would happen on new deploy)
const TMP_TABLES = new Map()

module.exports = class PreQuery extends Model {

    // config = {
    //     table: 'books',
    //     tableAlias: 'b',
    //     select: 'b.id',
    //     groupBy: 'b.id'
    // }

    static async applyTo(model, opts, join){
        return (new (this)({}, model.req)).applyPreSql(opts, join)
    }

    async applyPreSql(opts, join){

        if( !join )
            join = this.tableAlias+'.'+this.idAttribute

        if( !join ) throw new APIError('applyPreSql requires `join`')

        // generate the SQL
        let sql = await this.find({}, {...opts, returnSql:true})

        // see if we already generated this exact query
        let tmpTable = TMP_TABLES.get(sql)

        if( !tmpTable ){
            // console.log('create table');
            tmpTable = '_pre_query_'+new Date().getTime()
            TMP_TABLES.set(sql, tmpTable)
        }else{
            // console.log('use', tmpTable);
        }

        // will create temp table if needed
        opts.preSql = [/*sql*/`CREATE TEMPORARY TABLE IF NOT EXISTS ${tmpTable} ${sql}`]

        // let {pageAt, perPage} = this.req?.query || {}
        // pageAt = parseInt(pageAt)
        // perPage = parseInt(perPage)

        // if( perPage )
        //     opts.joins = [/*sql*/`JOIN (
        //                     SELECT * FROM ${tmpTable} LIMIT ${pageAt},${perPage}
        //                 ) ${tmpTable} ON ${tmpTable}.id = ${this.db.escapeId(join)}`]
        // else
            opts.joins = [/*sql*/`JOIN ${tmpTable} ON ${tmpTable}.id = ${this.db.escapeId(join)}`]

        // console.log(opts.preSql[0]); // TEST
        this.tmpTable = tmpTable
        return this
    }

    findWhere(where, opts){
        let filters = this.filters

        this.reportEngine.applyTo(where, {filters, ignore: opts.ignore, only: opts.only})

        // if now where clause applied, bail from query and return no results....
        // (unless findJoins resets it)
        if( !Object.keys(where).length )
            opts.bail = true

        // let other code know what was used
        this.opts = opts
        this.whereClause = where
    }

    get didBail(){ return this.opts.bail }

    findExtendQuery(sql, opts){

        // return no results since no proper where or findJoin was applied to limit result set
        if( opts.bail ) return /*sql*/`SELECT * FROM ${this.config.table} WHERE ${this.idAttribute} IS NULL`

        return sql // return default formatted query
    }

    _findLimit(limit){ return '' } // no limit

    hasFilter(keys){
        if( !Array.isArray(keys) )
            keys = [keys]

        return keys.find(key=>this.filters[key]!==undefined)
    }

}