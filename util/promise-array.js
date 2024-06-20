/*
    A Promise that will return an array

    Make this possible:
    let resp = await new PromiseArray().filter(...)
*/
// TODO: change this to a Proxy so ANY array method can be called and redirected?
module.exports = class PromiseArray extends Promise {

    // NOTE: this is server/db array getters...maybe reconsider this here?
    get values(){ return this.then(r=>r.values) }
    get value(){ return this.then(r=>r.value) }
    get first(){ return this.then(r=>r.first) }
    get last(){ return this.then(r=>r.last) }
    get length(){ return this.then(r=>r.length) }

    groupBy(...args){ return this.then(r=>r.groupBy(...args)) }
    filter(...args){ return this.then(r=>r.filter(...args)) }
    map(...args){ return this.then(r=>r.map(...args)) }
    find(...args){ return this.then(r=>r.find(...args)) }
}