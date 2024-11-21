// will contain an array of Onix objects
module.exports = class OnixArray extends Array {

    value(opts){ return this[0]?.value(opts) }

    get(key){

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
        return this.map(d=>d.toJSON?.(opts)||d)
    }
}

