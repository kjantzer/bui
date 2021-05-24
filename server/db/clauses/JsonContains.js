const Clause = require('./Clause')

// https://dev.mysql.com/doc/refman/5.7/en/json-search-functions.html
module.exports = class JsonContains extends Clause {

    constructor(value, path='$'){
        super()
        this.value = value
        this.path = path
    }

    toSqlString(db, key){
        return `JSON_CONTAINS(${key}, '${db.escape(this.value)}', ${db.escape(this.path)})`
    }
}