const Clause = require('./Clause')

const AllowedOperators = [
    '!=', '>', '>=', '<', '<=', '=', 'NOT'
]

/*
    NOTE: not sure I like this idea...
*/
module.exports = class Value extends Clause {

    constructor(oper, value){
        super()

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
        if( Array.isArray(this.value) )
            return `${key} ${this.oper} IN(${db.escape(this.value)})`
        else{
            if( this.oper == 'NOT' )
                this.oper = '!='
                
            return `${key} ${this.oper} ${db.escape(this.value)}`
        }
    }
}