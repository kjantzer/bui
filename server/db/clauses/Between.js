const Clause = require('./Clause')

module.exports = class Between extends Clause {

    constructor(start, end, {addHours=false, epoch=false, key}={}){
        super()
        this.start = start
        this.end = end
        this.key = key

        if( addHours )
            this.end = this.end+' 23:59:59'
        
        if( epoch ){
            this.start = new Date(this.start).getTime()
            this.end = new Date(this.end).getTime()
        }
    }

    toSqlString(db, key){
        key = this.key || key
        if( key.toSqlString ) key = key.toSqlString()
        return `${key} BETWEEN ${db.escape(this.start)} AND ${db.escape(this.end)}`
    }
}