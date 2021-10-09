
globalThis.fetch.json = function(url, opts={}){

    opts.headers = opts.headers || {}
    opts.headers['Content-Type'] = 'application/json'

    if( opts.body && typeof opts.body == 'object' )
        opts.body = JSON.stringify(opts.body)

    return fetch(url, opts)
    .then(r=>r.json())
    .then(r=>{
        if( r && r.error )
            throw new Error(r.error)
        return r
    })
}