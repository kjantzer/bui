// will contain an array of Onix objects
module.exports = class OnixArray extends Array {

    isArray = true
    isValid(){ return true }

    get name(){ return this[0]?.name }
    get element(){ return this[0]?.element }
    get parent(){ return this[0]?.parent }
    get release(){ return this[0]?.release }
    get level(){ return this[0]?.level }

    first(){ return this[0] }
    last(){ return this[this.length-1] }
    at(i){ return this[i] }

    createProps(key){
        return this[0]?.createProps(key)
    }

    value(opts){ return this[0]?.value(opts) }
    has(){ return this[0]?.has(...arguments) }

    get(key){

        if( ['value'].includes(key) ) return

        if( typeof key == 'object' )
            return this.find(key)

        let keys = key.split('.')
        key = keys.shift()
        keys = keys.join('.')

        let resp =  this[key]

        if( keys && resp)
            return resp.get(keys)
        else
            return resp
    }

    set(key, val){
        this.push( val === undefined ? key : val)
    }

    getValues(key, filterFn, {one=false}={}){

        if( filterFn && one )
            return this.find(filterFn)?.getValue(key)
        if( filterFn )
            return this.filter(filterFn).map(d=>d.getValue(key))

        return one ? this[0]?.getValue(key) : this.map(d=>d.getValue(key))
    }

    getValue(key, filterFn){ return this.getValues(key, filterFn, {one:true})}

    filter(fn){
        // given object of values to test each element against
        if( typeof fn == 'object'){
            let matchValues = fn

            fn = function(d){
                let matches = true

                for( let k in matchValues){

                    let element = d.get(k)

                    // onix doesn't shouldn't have real boolean values, so if filtering by it
                    // assume we just want to check for existance (or lack thereof)
                    // ie: "MainSubject" element
                    if( typeof matchValues[k] == 'boolean' ){
                        if( !!element != !!matchValues[k] )
                            matches = false

                    }else if( !element ){
                        matches = false
                    
                    }else if( element.value() != matchValues[k] && element.get('value') != matchValues[k] )
                        matches = false 
                }
                return matches
            }
        }

        return super.filter(fn)
    }

    find(fn){ return this.filter(fn)[0]}

    toJSON(opts){
        return this.map(d=>{

            if( d.has?.('value') ){
                return opts.codes ? d.get('value') : d.value(opts)
            }

            return d.toJSON?.(opts)||d
        })
    }
}

