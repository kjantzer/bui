/*
    # jQuery Shim
    
    Backbone imports jQuery and Webpack complains if it can't import
    jQuery. Here we are faking out the jQuery import (see alias in
    webpack.config.js) and then only implementing the absolute 
    minimum that Backbone requires
*/
module.exports = {

    // Backbone.ajax calls $.ajax – create our own ajax
    ajax(opts) {

        // GET cannot use body, so convert to query string
        if( opts.data && opts.type == 'GET' ){

            let query = opts.data
            opts.data = null

            if( typeof query == 'object' ){

                for( let k in query ){
                    if( typeof query[k] == 'object' )
                        query[k] = JSON.stringify(query[k])
                }

                query = new URLSearchParams(query).toString()
            }
            
            opts.url += '?'+query
        }

        let headers = Object.assign({
            'Content-Type': 'application/json'
        }, opts.headers||{})

        fetch(opts.url, {
            signal: opts.signal, // allows fetch to be aborted
            method: opts.type,
            headers: headers,
            body: opts.data
        }).then(r=>{

            if( r.status == 404 && r.statusText == 'Not Found' ){
                let err = new Error(`${opts.type} ${opts.url}`)
                err.name = 'API not found'
                throw err
            }

            if( r && r.json ) return r.json()

            if( r && r.text && r.status != 200 )
                return {error: r.text(), status: r.status}
            
            return r && r.text ? r.text() : r
        })
        .then(resp=>{
            if( resp.error )
                opts.error(null, resp.err, resp)
            else
                opts.success(resp)
        }, err=>{
            opts.error(null, err.message, err)
        })
    }

}