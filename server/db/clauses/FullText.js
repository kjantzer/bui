const Clause = require('./Clause')

// TODO: support search modifiers:
// https://dev.mysql.com/doc/refman/8.0/en/fulltext-search.html#function_match
module.exports = class FullText extends Clause {

    toSqlString(db, key){
        return `MATCH(${key}) AGAINST(${db.escape(this.value)})`
    }
}