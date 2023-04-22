const Clause = require('./Clause')

const AllowedOperators = [
    '!=', '>', '>=', '<', '<=', '=', 'NOT', 'LIKE', 'NOT LIKE'
]

/*
    NOTE: not sure I like this idea...
*/
module.exports = class Value extends Clause {

    constructor(oper, value, {ifNull=false, key}={}){
        super()

        this.key = key
        this.ifNull = ifNull

        if( value === undefined ){
            this.value = oper
            this.oper = Array.isArray(this.value) ? '' : '='
        }else{
            this.value = value
            this.oper = oper.toUpperCase()
        }

        if( !AllowedOperators.includes(oper) )
            throw new Error('Invalid operator: '+oper)
    }

    toSqlString(db, key){

        key = this.key || key

        if( this.ifNull )
            key = `IFNULL(${key}, '')`
            
        if( Array.isArray(this.value) )
            return `${key} ${this.oper} IN(${db.escape(this.value)})`
        else{
            if( this.oper == 'NOT' )
                this.oper = '!='
                
            return `${key} ${this.oper} ${db.escape(this.value)}`
        }
    }

    static fromString(str){

        let values = str.trim().split(new RegExp('('+AllowedOperators.join('|')+')'))
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