const Clause = require('./Clause')

https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_find-in-set
module.exports = class FindInSet extends Clause {

    toSqlString(db, key){
        return `FIND_IN_SET(${db.escape(this.value)}, ${key})`
    }
}