const Clause = require('./Clause')

module.exports = class UnsafeSQL extends Clause {

    constructor(opts={}){
        super()
        this.opts = opts
    }

    toSqlString(db, key){
        if( this.opts.includeNull)
            return `IFNULL(${key}, '') = ''`

        return `${key} = ''`
    }
}