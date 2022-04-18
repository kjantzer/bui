const Clause = require('./Clause')

module.exports = class Between extends Clause {

    constructor(start, end, {addHours=false, epoch=false}={}){
        super()
        this.start = start
        this.end = end

        if( addHours )
            this.end = this.end+' 23:59:59'
        
        if( epoch ){
            this.start = new Date(this.start).getTime()
            this.end = new Date(this.end).getTime()
        }
    }

    toSqlString(db, key){
        return `${key} BETWEEN ${db.escape(this.start)} AND ${db.escape(this.end)}`
    }
}