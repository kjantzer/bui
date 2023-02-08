const Clause = require('./Clause')
const {makePath} = require('./util')

// https://dev.mysql.com/doc/refman/5.7/en/json-search-functions.html
module.exports = class JsonContains extends Clause {

    constructor(value, {path='$', conjunction='AND', key=null, not=false, ifNull=false, ignoreCase=true}={}){
        super()
        this.value = value
        this.key = key
        this.path = path
        this.not = not
        this.ifNull = ifNull
        this.ignoreCase = ignoreCase
        this.conjunction = ['and', 'or'].includes(conjunction.toLowerCase()) ? conjunction : 'AND'
    }

    toSqlString(db, key){

        let value = this.value
        key = this.key || key

        if( typeof value == 'string' )
            value = value.split(',').map(s=>s.trim())
        else if( !Array.isArray(value) )
            value = [value]

        return '('+value.map(val=>{

            let path = this.path
            
            if( path == 'AUTO_DETECT' ){
                let paths = val.split('->')
                if( paths.length == 2 ){
                    val = paths[1]
                    path = paths[0]
                }

                if( this.ignoreCase )
                    path = path?.toLowerCase()
            }

            path = makePath(path, db)

            if( this.ifNull )
                key = `IFNULL(${key}, '${this.ifNull}')`

            if( val == undefined )
                return `${this.not?'!':''}JSON_CONTAINS_PATH(${key}, 'all', '${path}')`

            // https://stackoverflow.com/a/63243229/484780
            // initial test (simple) appears to not affect speed
            if( this.ignoreCase ){
                key = `LOWER(${key})`
                if( val && val.toLowerCase ) // could be a number
                    val = val.toLowerCase()
            }

            val = db.escape(val)
            
            if( val.match(/^'/) )
                val = val.replace(/^'/, `"`).replace(/'$/, `"`)
            
            return `${this.not?'!':''}JSON_CONTAINS(${key}, '${val}', '${path}' )`

        }).join(' '+this.conjunction+' ')+')'
    }
}