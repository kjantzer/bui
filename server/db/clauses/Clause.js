
module.exports = class Clause {

    constructor(value){
        this.value = value
    }
    
    toSqlString(db, key){
        throw new Error('toSqlString not implemented')
    }
}