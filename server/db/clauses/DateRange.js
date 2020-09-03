const Clause = require('./Clause')

module.exports = class DateRange extends Clause {

    constructor(start, end){
        super()
        this.start = start
        this.end = end
    }

    toSqlString(key, db){
        return `${key} BETWEEN ${db.escape(this.start)} AND ${db.escape(this.end)}`
    }
}