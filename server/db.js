const mysql = require('mysql');
const groupBy = require('../util/array.groupBy')
require('../util/promise.series')

const clauses = require('./db/clauses')
const {composeClauses} = require('./db/clauses/util')

module.exports = class DB {

    static get DBResults(){ return DBResults }

    constructor(config){
        this.pool = mysql.createPool(config);
    }

    get clauses(){ return clauses }

    clause(name, ...args){
        let Class = clauses[name]
        if( !Class ) throw new Error('Invalid clause: '+name)
        return new Class(...args)
    }
    
    getConnection(){
        return new Promise((resolve, reject)=>{
            this.pool.getConnection(function(err, connection) {
                if( err ) reject(err)
                else resolve(connection)
            });
        })
    }

    beginTransaction(){
        return new Promise(async (resolve, reject)=>{
            let conn = await this.getConnection()
            conn.beginTransaction(err=>{
                if( err ) reject(err)
                else resolve(conn)
            })
        })
    }

    query(sql, data, {timeout=30000, debug=false, logFailure=false, preSql=null}={}){
		return new QueryPromise(async (resolve, reject)=>{

            if( Array.isArray(data) )
                for( let d of data ){ composeClauses(this, d) }
            else
                composeClauses(this, data)

			sql = mysql.format(sql, data)

            if( debug )
                console.log(sql);

            let conn = await this.getConnection()

            try{

                if( preSql ){

                    if( typeof preSql == 'String')
                        preSql = [preSql]

                    preSql = preSql.filter(sql=>typeof sql == 'string')

                    // run each presql query
                    for( let sql of preSql ){
                        await new Promise((resolve, reject)=>{
                            conn.query({sql, timeout}, (err, results, fields)=>{
                                if( err ) return reject(err)
                                resolve(results)
                            })
                        })
                    }
                }

                // now run the main query on the same connection (in case preSql created some temp tables)
                await conn.query({sql, timeout}, (err, results, fields)=>{
                    if( err ){
                        if( logFailure )
                            console.info('QUERY FAILED: '+sql);
                        
                        humanifyError(err)

                        err.lastQuery = sql // NOTE: I don think I need this, err.sql is already present
                        reject(err)
                        return
                    }

                    if( Array.isArray(results) ){
                        results = DBResults.loadLargeArray(results)
                    }

                    results.fromQuery = sql

                    resolve(results)
                })

                conn.release()

            }catch(err){
                // make sure we release the connection, even if failed
                conn.release()
                throw err
            }

		})
	}

    /* 
        performs a series of queries and if any fail, will roll back  
    */
    async transactionalQuery(queries){

        let queryResults = []
        let conn = await this.beginTransaction()

        try{

            /* peform each query, making sure each one succeeds */
            await Promise.series(queries, (query, i, prevResult)=>new Promise((resolve, reject)=>{

                if( typeof query == 'function' )
                    query = query(prevResult)

                if( typeof query == 'string' )
                    query = [query]

                query.push((err, results, fields)=>{
                    if( err ) return reject(err)
                    queryResults.push(results)
                    resolve(results)
                })
                conn.query.apply(conn, query)
            }))

            /* if we got here, no queries failed */
            conn.commit()

            // https://github.com/mysqljs/mysql/issues/1656
            conn.release()

        }catch(err){
            conn.rollback()
            conn.release()
            throw err
        }

        return queryResults
    }

    // alias (DEPRECATED)
    q(){
        return this.query(...arguments)
    }

    format(...args){
		return mysql.format.apply(mysql, args)
	}
    
    escape(...args){
		return mysql.escape.apply(mysql, args)
	}

    escapeId(...args){
		return mysql.escapeId.apply(mysql, args)
	}

    updateOnDuplicate(attrs, {add=[]}={}){
        let updates = []
        for( let key in attrs ){

            let _key = this.escapeId(key)

            let val = `${_key} = VALUES(${_key})`

            // update should add to existing value
            if( add.includes(key) )
                val += ` + ${_key}`
            
            updates.push(val)
        }
        return `ON DUPLICATE KEY UPDATE ${updates.join(', ')}`
    }

    bulkInsert(table, rows, {ignore=true, replace=false, update=false}={}){
        let [cols, vals] = this.parseBulkInsert(rows)

        let INSERT = replace?'REPLACE':'INSERT'
        let IGNORE = ignore&&!update&&!replace?'IGNORE':''
        let UPDATE_ON_DUPLICATE = update ? this.updateOnDuplicate(rows[0]) : ''

        let sql = `${INSERT} ${IGNORE} INTO ${table} (${cols}) VALUES ? ${UPDATE_ON_DUPLICATE}`

        return this.query(sql, [vals])
    }

    bulkUpdate(table, rows){
        return this.bulkInsert(table, rows, {update: true})
    }

    parseBulkInsert(rows=[]){
        let cols = Object.keys(rows[0])
        let vals = rows = rows.map(r=>Object.values(r))
        cols = cols.map(col=>this.escapeId(col))
        return [cols, vals]
    }

    get NOW(){ return {
        toJSON(){ return new Date().getTime() },
        toString(){ return new Date().getTime() },
        toSqlString:()=>'NOW()'
    }}

    // DEPRECATED
    parseWhere(where={}){

        console.warning('!DEPRECATED - please stop using `db.parseWhere` and use clauses');

        let fields = []
        let values = []

        for( let key in where ){
            let val = where[key]

            // NOTE: this might create issues in existing code
            if( key[0] != '`' )
                key = this.escapeId(key)

            if( val instanceof clauses.Clause )
                fields.push(val.toSqlString(this, key))

            else if( ['NULL', 'NOT NULL'].includes(val) ){
                fields.push(`${key} IS ${val}`)

            }else if( ['IS NULL', 'IS NOT NULL'].includes(val) ){
                fields.push(`${key} ${val}`)
                
            }else{

                let oper = '='

                if( typeof val == 'string' ){
                    let [str, customOper, _val] = val.match(/((?:(?:!=)|(?:[><]=?)) )?(.+)/)
                    oper = customOper || oper
                    val = _val 
                }

                if( Array.isArray(val) )
                    fields.push(`${key} IN(?)`)
                else
                    fields.push(`${key} ${oper} ?`)

                values.push(val)
            }
        }

        return [fields, values]
    }

}

// TODO: change this to a Proxy so ANY array method can be called and redirected
class QueryPromise extends Promise {

    get values(){ return this.then(r=>r.values) }
    get value(){ return this.then(r=>r.value) }
    get first(){ return this.then(r=>r.first) }
    get last(){ return this.then(r=>r.last) }
    get length(){ return this.then(r=>r.length) }

    groupBy(...args){ return this.then(r=>r.groupBy(...args)) }
    filter(...args){ return this.then(r=>r.filter(...args)) }
    map(...args){ return this.then(r=>r.map(...args)) }
    find(...args){ return this.then(r=>r.find(...args)) }
}

class DBResults extends Array {
    static get array_chunk_size(){return 10000}
    
    groupBy(...args){
        return groupBy.apply(this, args )
    }

    get first(){ return this[0] }
    get last(){ return this[this.length-1] }
	
	get values(){
		return this.map(d=>d[Object.keys(d)[0]])
	}
	
	get value(){
		let values = this.map(d=>d[Object.keys(d)[0]])
		return values[0]
	}

    /**
     * Can't handle initializing with > ~42000 arguments. Use this instead of unpacking very large arrays
     * @param {Array} values
     * @returns {DBResults}
     */
	static loadLargeArray( values){
        const results = new this();
        for(let i=0; i < values.length; i+=DBResults.array_chunk_size){
            results.push(...values.slice(i, i+DBResults.array_chunk_size))
        }
        return results;
    }
    
}

function humanifyError(err){

    if( err.name == 'Error' )
        err.name = 'DBError'

    // simplify foreign key restraint errors
    if( err.code == 'ER_ROW_IS_REFERENCED_2' ){

        let [,fkTable, fk] = err.sqlMessage.match(/key constraint fails \(`.+`(.+)`, CONSTRAINT (.+)\)/) || []

        if( fkTable ){
            err.message = `Not allowed, record is linked to "${fkTable}"`
        }
    }

}