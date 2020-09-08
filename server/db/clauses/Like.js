const Clause = require('./Clause')

module.exports = class Like extends Clause {

    toSqlString(db, key){

        if( Array.isArray(this.value) )
            return `(${this.value.map(v=>{
                return `${key} LIKE ${db.escape(v)}`    
            }).join(' OR ')})`
        else
            return `${key} LIKE ${db.escape(this.value)}`
    }
}