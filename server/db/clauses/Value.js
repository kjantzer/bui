const Clause = require('./Clause')
const Group = require('./Group')
const {sqlStr} = require('./util')

const AllowedOperators = [
    '!=', '>=','>', '<=', '<', '=', 'NOT', 'LIKE', 'NOT LIKE'
]

/*
    NOTE: not sure I like this idea...
*/
module.exports = class Value extends Clause {

    constructor(oper, value, {ifNull=false, key, escapeId=false}={}){
        super()

        this.key = key
        this.ifNull = ifNull
        this.escapeId = escapeId // defaults to false cause assumes the key is hardcoded

        if( value === undefined ){
            this.value = oper
            this.oper = Array.isArray(this.value) ? '' : '='
        }else{
            this.value = value
            this.oper = oper?.toUpperCase()
        }

        if( !AllowedOperators.includes(oper.toUpperCase()) )
            throw new Error('Invalid operator: '+oper)
    }

    toSqlString(db, key){

        key = this.key || key

        if( key.toSqlString ){
            key = key.toSqlString()

        // make sure key is escaped
        }else if( this.escapeId && key[0] != '`' ){
            key = db.escapeId(key)
        }

        if( this.ifNull )
            key = `IFNULL(${key}, '')`
            
        if( Array.isArray(this.value) )
            return `${key} ${this.oper=='NOT'?this.oper:''} IN(${db.escape(this.value)})`
        else{

            if( ['NULL', 'NOT NULL', 'null', 'not null', null].includes(this.value) )
                return `${key} IS ${this.value}`

            if( ['IS NULL', 'IS NOT NULL', 'is null', 'is not null'].includes(this.value) )
                return `${key} ${this.value}`

            if( this.oper == 'NOT' || this.oper == 'IS NOT')
                this.oper = '!='
                
            let value = this.value
            
            if( typeof value == 'string' && !['now()', 'curdate()'].includes(value.toLowerCase()) )
                value = db.escape(this.value)
            else if( value?.toSqlString )
                value = value.toSqlString()

            return `${key} ${this.oper||'='} ${value}`
        }
    }

    // NOTE: this is a bit complicated :/
    // expects a string or array of strings like:
    // `key`, `key: value`, `key = value`, `key like value`, `key > value`, etc
    static fromString(str, group, opts={}){

        let values = Array.isArray(str) ? str : str.split(',')

        // create a group for all these values if one isn't given
        if( !group ){

            // see if one of the values is an `OR` conjunction
            let conjunction = values.find(v=>v.toLowerCase()=='or')
            if( conjunction )
                values = values.filter(s=>s!=conjunction)

            group = new Group({}, conjunction||opts?.conjunction||'AND')
        }
            
        // format each value given
        values.forEach((s,i)=>{

            if( !s.trim() ) return
            
            // look for default structure of `key: value`
            let [key, val] = s.split(':').map(s=>s.trim())
            let oper = '='

            // if no value found, test the key again
            if( !val ){
                
                // does key have a space? then treat first "word" as the key and the rest the "value"
                if( key.includes(' ') ){
                    [key, ...val] = key.split(' ')
                    val = val.join(' ')
                }else{
                    // this will result in testing for "key not null"
                    val = undefined
                }
            }

            // does the value contain an allowed operator? eg: "like value"
            let valAndOper = val?.split(new RegExp('('+AllowedOperators.join('|')+')', 'i')).filter(s=>s)
            
            // if matched a operator and val, separate (but dont treat null values as operators)
            if( valAndOper?.length >= 2 && val != 'is not null' && val != 'is null' ){

                oper = valAndOper.shift()
                val = valAndOper.join('').trim()

                // LIKE must contain '%' to be of use, so if user forgot to, default LIKE left or right
                if( oper == 'like' && !val.includes('%') )
                    val = '%'+val+'%'
            }

            // format the value for all comparisions but LIKE
            if( oper != 'like' ){
                
                // looks like a date, keep value
                if( val && val.match(/[\d\.]+\//) )
                    val = val // TODO: format date?

                // attempt to parse as number
                else if( val && val.match(/^[\d\.]+$/) )
                    val = parseFloat(val) || val
            }

            // support key prefix
            if( opts.keyPrefix )
                key = opts.keyPrefix+'.'+key

            // now create official "Value" clause
            group.set(i+key, new Value(oper, !val?'NOT NULL':val, {key, escapeId: true}))
        })

        // if no values, return `true = true`
        // TODO: `Group` clause should probably handle this
        if( group.size == 0 )
            return new Value('=', true, {key: sqlStr`true`})

        // return group of Values
        return group
    }

    // DEPRECATED: never used to my knowledge. Only thought about using
    static _fromString(str){

        let values = str.trim().split(new RegExp('('+AllowedOperators.join('|')+')', 'i'))
        values = values.map(s=>s.trim()).filter(s=>s)

        let oper = '='
        let val = values[0]

        if( values.length == 2 ){
            oper = values[0]
            val = values[1]
        }

        if( val.match(/\d+\.?\d*/) )
            val = parseFloat(val)

        return new this(oper, val)
    }
}