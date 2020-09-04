const Clause = require('./Clause')

module.exports = class Between extends Clause {

    constructor(start, end){
        super()
        this.start = start
        this.end = end
    }

    toSqlString(db, key){
        return `${key} BETWEEN ${db.escape(this.start)} AND ${db.escape(this.end)}`
    }
}