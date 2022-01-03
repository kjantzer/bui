const Clause = require('./Clause')

module.exports = class UnsafeSQL extends Clause {

    constructor(rawSQL){
        super()
        this.rawSQL = rawSQL
    }

    toSqlString(db, key){
        return '('+this.rawSQL+')'
    }
}