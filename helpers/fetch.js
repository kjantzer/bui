
export const fetchJSON = function(url, opts={}){

    opts.headers = opts.headers || {}

    if( !opts.headers['Content-Type'] )
        opts.headers['Content-Type'] = 'application/json'

    if( opts.body && typeof opts.body == 'object' )
        opts.body = JSON.stringify(opts.body)

    return fetch(url, opts)
    .then(r=>r.json())
    .then(r=>{
        if( r && r.error ){
            if( Error.fromAPI )
                throw new Error.fromAPI(r)
            else
                throw new Error(r.error)
        }
            
        return r
    })
}


export const fetchText = function(url, opts={}){

    opts.headers = opts.headers || {}

    if( opts.body && typeof opts.body == 'object' )
        opts.body = JSON.stringify(opts.body)

    return fetch(url, opts).then(r=>r.text())
}

export default function bindFetchHelpers(object){
    if( !object ) object = globalThis.fetch
    object.json = fetchJSON
    object.text = fetchText
}

bindFetchHelpers() // do this by default

// lets export this function in case it needs to be called again
// example: if some other code overrides fetch and it needs to be bound again
export {bindFetchHelpers}

