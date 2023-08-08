const express = require('express')
const http = require('http')

const DEFAULT_OPTS = {
    cors: false,
    corsPrivateNetwork: false,
    compression: true,
    parseCookies: true,
    bodyParser: {
        text: true, // parse text
        json: true // and json types
    },
    fileUploads: false, // see express-fileupload
    parseSocketIDs: true, // will set `req.socketIDs` from header 'x-socket-ids'
    staticPaths: [],
    beforeMiddleware: null, // optional hook
    handleUncaughtException: true,
    handleUnhandledRejection: true,
}

/*
    An opinionated express app for BUI apps
*/
module.exports = class ExpressApp {

    constructor(opts={}){

        this.app = new express()
        this.redis = opts.redis

        opts = Object.assign({}, DEFAULT_OPTS, opts)

        // https://www.npmjs.com/package/cors#enabling-cors-pre-flight
        if( opts.cors )
            this.options(opts.cors===true?'*':opts.cors, require('cors')())

        opts.beforeMiddleware?.call(this)

        if( opts.cors && opts.corsPrivateNetwork )
            this.use(_allowCorsPrivateNetwork)

        if( opts.compression)
            this.use(require('compression')())

        if( opts.parseCookies )
            this.use(require('cookie-parser')())

        if( opts.bodyParser ){
            let bodyParser = require('body-parser')
            for( let k in opts.bodyParser ){
                
                if( bodyParser[k] ){
                    let _opts = opts.bodyParser[k]
                    if( _opts == true ) _opts = {limit: '50mb'}
                    this.use(bodyParser[k](_opts))
                }
            }
        }

        if( opts.fileUploads )
            this.use(require('express-fileupload')(opts.fileUploads===true?{}:opts.fileUploads));

        if( opts.parseSocketIDs )
            this.use(_parseSocketIDs)

        opts.staticPaths?.forEach(path=>{
            this.use(express.static(path, {index: false}))
        })

        if( opts.handleUncaughtException )
            handleUncaughtException(opts.handleUncaughtException)

        if( opts.unhandledRejection )
            handleUnhandledRejection(opts.handleUnhandledRejection)
    }

    // pass-through to express
    options(...args){ return this.app.options(...args) }
    use(...args){ return this.app.use(...args) }
    param(...args){ return this.app.param(...args) }
    all(...args){ return this.app.all(...args) }
    get(...args){ return this.app.get(...args) }
    post(...args){ return this.app.post(...args) }
    put(...args){ return this.app.put(...args) }
    patch(...args){ return this.app.patch(...args) }
    delete(...args){ return this.app.delete(...args) }

    start({port=8080, publicPort=true, name="App"}={}){
        this.server = http.Server(this.app)
        
        if( publicPort === true ) publicPort = port

        this.server.listen(port, ()=>{
            console.log(`\n${name} running on http://localhost:${publicPort}`)
        });
    }

}

 function _parseSocketIDs(req, res, next){
    try{
        let socketIDs = req.headers['x-socket-ids']
        socketIDs = socketIDs ? JSON.parse(socketIDs) : []
        req.socketIDs = socketIDs
    }catch(err){}
    next()
}

// https://github.com/expressjs/cors/issues/236
function _allowCorsPrivateNetwork(req, res, next){
    if( req.headers["access-control-request-private-network"] )
        res.setHeader("access-control-allow-private-network", "true")
    
    next(null)
}


function handleUncaughtException(fn){
    fn = typeof fn == 'function' ? fn : function(err) {
        console.log('UNCAUGHT EXCEPTION');
        console.trace(err)
        if( err.lastQuery )
            console.log(err.lastQuery);
    }

    process.on('uncaughtException', fn)
}

function handleUnhandledRejection(fn){
    fn = typeof fn == 'function' ? fn : function(reason, promise) {
        console.log('Unhandled Rejection at:', promise, 'reason:', reason);
        // TODO: capture in a way to notify developers
    }

    process.on('unhandledRejection', fn);
}