const Clause = require('./Clause')

module.exports = class Like extends Clause {

    toSqlString(db, key){
        return `${key} LIKE ${db.escape(this.value)}`
    }
}