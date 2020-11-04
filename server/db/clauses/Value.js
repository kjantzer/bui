const Clause = require('./Clause')

const AllowedOperators = [
    '!=', '>', '>=', '<', '<=', '='
]

/*
    NOTE: not sure I like this idea...
*/
module.exports = class Value extends Clause {

    constructor(oper, value){
        super()
        this.value = value
        this.oper = oper

        if( !AllowedOperators.includes(oper) )
            throw new Error('Invalid operator: '+oper)
    }

    toSqlString(db, key){
        return `${key} ${this.oper} ${db.escape(this.value)}`
    }
}