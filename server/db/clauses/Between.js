const Clause = require('./Clause')

module.exports = class Between extends Clause {

    constructor(start, end, {addHours=false}={}){
        super()
        this.start = start
        this.end = end

        if( addHours )
            this.end = this.end+' 23:59:59'
    }

    toSqlString(db, key){
        return `${key} BETWEEN ${db.escape(this.start)} AND ${db.escape(this.end)}`
    }
}