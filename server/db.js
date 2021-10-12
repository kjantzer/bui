const mysql = require('mysql');
const groupBy = require('../util/array.groupBy')
require('../util/promise.series')

const clauses = require('./db/clauses')

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

    query(sql, data, {timeout=30000, debug=false, logFailure=false}={}){
		return new Promise((resolve, reject)=>{

			sql = mysql.format(sql, data)

            if( debug )
                console.log(sql);

            // gets connection, queries, then releases connection
			this.pool.query({sql, timeout}, (err, results, fields)=>{
				if( err ){
                    if( logFailure )
					    console.info('QUERY FAILED: '+sql);
                    err.lastQuery = sql
					reject(err)
                    return
                }

                if( Array.isArray(results) ){
                    results = DBResults.loadLargeArray(results)
                }

                results.fromQuery = sql

                resolve(results)
			})
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

    updateOnDuplicate(attrs){
        let updates = []
        for( let key in attrs ){
            key = this.escapeId(key)
            updates.push(`${key} = VALUES(${key})`)
        }
        return `ON DUPLICATE KEY UPDATE ${updates.join(', ')}`
    }

    bulkInsert(table, rows, {ignore=true, replace=false}={}){
        let [cols, vals] = this.parseBulkInsert(rows)
        let sql = `${replace?'REPLACE':'INSERT'} ${ignore&&!replace?'IGNORE':''} INTO ${table} (${cols}) VALUES ?`
        return this.query(sql, [vals])
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