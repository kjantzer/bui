const Clause = require('./Clause')
const {makePath} = require('./util')
const Group = require('./Group')

// https://dev.mysql.com/doc/refman/5.7/en/json-search-functions.html#function_json-search
module.exports = class JsonSearch extends Clause {

    constructor(value, path='$', conjunction='AND', {not=false, ignoreCase=true}={}){
        super()
        this.value = value
        this.path = path
        this.ignoreCase = ignoreCase
        this.not = not
        this.conjunction = ['and', 'or'].includes(conjunction.toLowerCase()) ? conjunction : 'AND'
    }

    toSqlString(db, key){

        let value = this.value

        if( !Array.isArray(value) )
            value = [value]

        return value.map(val=>{

            // make (and escape) path
            let path = makePath(this.path, db)

            // if no value, then look for existance of the path
            if( val == undefined ){
                let isValue = this.not ? '= 0' : '= 1'
                return `JSON_CONTAINS_PATH(${key}, 'all', '${path}') ${isValue}`
            }

            // TODO: searching real numbers wont work (number strings are fine)
            if( typeof val == 'number'){
                return `${key}->>'${path}' = ${val}`
            }else{
                // https://stackoverflow.com/a/63243229/484780
                // initial test (simple) appears to not affect speed
                if( this.ignoreCase ){
                    key = `LOWER(${key})`
                    
                    if( val && val.toLowerCase ) // could be a number
                        val = val.toLowerCase()
                }
            }

            val = db.escape(val)

            let isValue = this.not ? 'IS NULL' : 'IS NOT NULL'

            return `JSON_SEARCH(${key}, 'one', ${val}, null, '${path}') ${isValue}`

        }).join(' '+this.conjunction+' ')
    }

    // str example: `key: val, key2: %val2, key3`
    static fromString(field, str, group, opts){

        let groups = {}

        if( !group )
            group = new Group({}, 'AND')

        let values = Array.isArray(str) ? str : str.split(',')
        
        values.forEach(s=>{
            if( !s.trim() ) return
            
            let [key, val] = s.split(':').map(s=>s.trim())

            if( !val ) val = undefined

            // date?
            if( val && val.match(/[\d\.]+\//) )
                val = val // TODO: format date?
            // attempt to parse as number
            else if( val && val.match(/[\d\.]+/) )
                val = parseFloat(val) || val

            groups[key] = groups[key] || []
            groups[key].push(val)
        })

        for( let key in groups ){
            
            let vals = groups[key]

            if( opts.path )
                key = opts.path+'.'+key

            group.set(
                {toSqlString:()=>field},
                new JsonSearch(vals, key, 'OR', opts)
            )
        }

        return group
    }
}