const Clause = require('./Clause')
const {makePath} = require('./util')
const Group = require('./Group')

// https://dev.mysql.com/doc/refman/5.7/en/json-search-functions.html#function_json-search
module.exports = class JsonSearch extends Clause {

    constructor(value, path='$', conjunction='AND'){
        super()
        this.value = value
        this.path = path
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
            if( val == undefined )
                return `JSON_CONTAINS_PATH(${key}, 'all', '${path}')`

            // TODO: searching real numbers wont work (number strings are fine)
            val = db.escape(val)

            return `JSON_SEARCH(${key}, 'one', ${val}, null, '${path}') IS NOT NULL`

        }).join(' '+this.conjunction+' ')
    }

    // str example: `key: val, key2: %val2, key3`
    static fromString(field, str, group){

        let groups = {}

        if( !group )
            group = new Group({}, 'AND')

        str.split(',').forEach(s=>{
            if( !s.trim() ) return
            
            let [key, val] = s.split(':').map(s=>s.trim())

            if( !val ) val = undefined

            groups[key] = groups[key] || []
            groups[key].push(val)
        })

        for( let key in groups ){
            
            let vals = groups[key]

            group.set(
                {toSqlString:()=>field},
                new JsonSearch(vals, key, 'OR')
            )
        }

        return group
    }
}