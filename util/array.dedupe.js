const groupBy = require('./array.groupBy')

module.exports = function dedupe(cb){
    return groupBy.call(this, cb, {forceArray: true, returnAsArray: true}).map(d=>d[0])
}