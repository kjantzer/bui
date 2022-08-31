const Clause = require('./Clause')

module.exports = class JsonMergePatch extends Clause {

    constructor(value, {key=null}={}, ifNull='{}'){
        super()
        this.value = value
        this.key = key
        this.ifNull = ifNull
    }

    toSqlString(db, key){

        let val = this.value
        key = this.key || key

        key = db.escapeId(key)
        val = JSON.stringify(val)

        return `JSON_MERGE_PATCH( IFNULL(${key}, '${this.ifNull}'), '${val}' )`
    }
}