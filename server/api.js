/*
    # API

    ```js
    const app = require('express')(); // or instance of `server/app`
    const API = require('bui/server/api')
    const Sync = require('bui/realtime/server/sync')

    new API(app, [
        ClassA,
        ClassB
    ], {
        root: '/api' // prefix all APIs,
        sync: new Sync(io) // optionally support realtime syncing
    })

    class ClassA {

        // required
        static get api(){return {
            root: null // optional root to append to each route path
            idParam: 'id' // used in creation of apiPathPattern (used by Sync)
            requiresAuthentication: true, // routes default to private, change to make all public
            routes: [
                ['get', '/url-path', 'methodName'],
                ['get', '/url-path-public', 'methodName', {
                    requiresAuthentication:false,
                    cacheable: true // adds header `X-Is-Cacheable` for use with service worker
                }]
            ]
        }}

        // optionally prevent model from being accessible via API
        get canAccess(){ 
            // if( this.req.user.id != 1 ) return false
            return true
        }

        methodName(req){
            // do something
            return 'the value'
        }
    }
    ```
*/
const UrlPattern = require('url-pattern')
const CollMap = require('../util/collmap')
const toCSV = require('../util/toCSV')
const DEFAULT_OPTS = {
    root: '/api'
}

module.exports = class API {

	constructor(app, classes, opts={}){

        this.opts = Object.assign({}, DEFAULT_OPTS, opts)
		
        this.app = app
		this._classes = new CollMap()

        this.initClasses(classes)
	}

    initClasses(classes){
        classes.forEach(Class=>{
            
            if( Array.isArray(Class) )
                this.initClasses(Class)
            else
                this.initClassAPI(Class)
            
		})	
    }

    initClassAPI(Class){
        if( !Class.name )
            return console.warn('! API: not a valid class', Class)

        // cannot do this, could be a subclass with same prototype
        // if( Class.prototype.apiPathPattern )
        //     return console.log('already', Class.name); // already setup, no need to setup again (could be here from a related class api)

        if( !Class.api || !Class.api.routes )
            return console.warn('! API: class `'+Class.name+'` must specify `api.routes`')

        this._classes.set(Class, Class)

        let path = Class.api.root
        if( this.opts.root )
            path = this.opts.root + path
        path += '(/:'+(Class.api.idParam||'id')+')'

        Class.prototype.apiPathPattern = new UrlPattern(path, {segmentNameCharset: 'a-zA-Z0-9_'})
        Class.prototype.apiPathPattern.path = path

        if( !Class.prototype.hasOwnProperty('apiPath') )
        Object.defineProperty(Class.prototype, 'apiPath', {
            get: function apiPath() {
                // include all api params as empty string by default
                // NOTE: could maybe cause issues in some cases? if missing param is null, error is thrown
                let apiParams = Object.fromEntries(this.apiPathPattern.names.map(k=>[k,'']))
                let params = {...apiParams, ...this, id: this.id, ...(this.attrs || {})}
                return this.apiPathPattern.stringify(params)
            }
        });

        Class.api.routes.forEach(this.setupRoute.bind(this, Class))

        if( Class.api.sync )
            this.setupSync(Class)

        this.initRelatedAPIs(Class)
    }

    initRelatedAPIs(Class){
        if( !Class.related ) return

        for( let relatedKey in Class.related ){
            
            if( Class.related[relatedKey].api && Class.related[relatedKey].model ){
                let relatedClass = require(Class.related[relatedKey].model)
                
                if( relatedClass && relatedClass.api )
                    this.initClassAPI(relatedClass)
            }
        }
    }

    setupSync(Class){
        if( !this.opts.sync ) return console.error('`sync` not given')
        Class.prototype.sync = this.opts.sync.add(Class.prototype.apiPathPattern, Class)
    }

	setupRoute(Class, route){

		let [method, path, ...args] = route

        args = Array.from(args)

        let fnName = args.pop()
        let opts = {}

        // api function should generally be last arg, but an "options" object could be last
        if( typeof fnName == 'object' ){
            opts = fnName
            fnName = args.pop()
        }

        if( !Class.prototype[fnName] ){
            return console.warn(`! API: ${Class.name}.${fnName} does not exist`)
        }

        args.push(async (req, res)=>{
            
            // default is no auth required
            if( this.opts.requiresAuthentication === false ){
                if( (opts.requiresAuthentication == true // this particular route needs AUTH
                || Class.api.requiresAuthentication == true) // all routes on class need AUTH
                && !req.isAuthenticated?.() )
                    return res.status(401).send({error: 'session expired', code: 401})

            }else{
                if( opts.requiresAuthentication !== false // this particular route needs AUTH
                && Class.api.requiresAuthentication !== false // all routes on class need AUTH
                && !req.isAuthenticated?.() )
                    return res.status(401).send({error: 'session expired', code: 401})
            }

            try{

                // let c = this.init(Class)
                let model = new Class(req.params, req)
                model.req = req
                model.res = res

                // TODO: rename to something like `canAccessAPI`
                if( 'canAccess' in model && await model.canAccess === false )
                    return res.status(403).send({error: 'unauthorized', code: 403})

			
                let args = []

                if( ['add', 'update', 'patch'].includes(fnName) )
                    args.push(req.body)

                let onClientTerminated = model.onClientTerminated?.bind(model)
                if( onClientTerminated )
                    req.res.addListener('close', onClientTerminated)

				let resp = await model[fnName].apply(model, args)

                if( onClientTerminated )
                    req.res.removeListener('close', onClientTerminated)

                if( opts.cacheable ||
                    (opts.cacheable !== false && Class.api.cacheable)
                ){
                    res.set('X-Is-Cacheable', '1');
                }

                // TODO: let class determine how response is returned?
                this.finishResponse(req, res, resp)                

			}catch(err){

                // database error
                if( err.lastQuery ){
                    console.error(err.message)
                    console.log(err.lastQuery)
                }
                else if( process.env.ENV == 'development' 
                || ['Error', 'TypeError'].includes(err.name) 
                || req.query?.logErr !== undefined ){

                    let errMsg = err
                    let cwd = process.cwd()

                    // if stack is available, use it, but format it a bit better
                    if( err.stack) {
                        let stack = err.stack.split('\n')
                        .filter(s=>!s.match(/\(node:/g)) // ignore node.js core files, only show our code
                        .filter(s=>!s.match(/bui\/server\/api/g)) // ignore the "API" class since it's not helpful
                        .map(s=>{
                            // better formatting for each stack trace line
                            return s.replace(/ at /, ' - ').replace(cwd, '')
                        })

                        stack.push(`    - [${req.method}] ${req.path} (user: ${req.user?.id})`)
                        
                        errMsg = stack.join('\n')
                    }

                    console.log(errMsg)
                }
                
                let code = ['Error', 'DBError'].includes(err.name) ? 400 : (err.code || 500)

                if( typeof code != 'number' )
                    code = 500

                res.statusMessage = err.code == 'ER_PARSE_ERROR' ? err.code : (err.message||'').replace(/\n/g, ' ')
                res.status(code).json({
                    error: err.message,
                    code: code,
                    type: err.name,
                    data: err.data,
                    trace: req.query?.trace !== undefined ? (err.stack||'unknown') : null
                })
			}
		})

        if( Class.api.root )
            path = Class.api.root + path

        if( this.opts.root )
            path = this.opts.root + path
        
        args.unshift(path)

		this.app[method](...args)
	}

    finishResponse(req, res, resp){

        if( resp && resp.pipe )
            return resp.pipe(res)

        if( resp && resp.constructor && resp.constructor.name == 'Archiver' )
            return

        if( resp && resp instanceof Buffer && resp.filename )
            res.set('Content-disposition', 'attachment; filename='+resp.filename);

        if( resp && resp.sendFile ){
            if( resp.filename )
                res.set('Filename', resp.filename);

            if( resp.sendFile.startsWith('http') )
                res.redirect(resp.sendFile)
            else
                res.sendFile(resp.sendFile, err=>{
                    if( err )
                        res.status(err.status).json({
                            error: err.message,
                            code: err.code
                        })
                })

        }else if( resp && req.query.csv !== undefined ){
            res.set('Content-disposition', `attachment; filename=${req.query.csv||resp.filename||'api'}.csv`);
            if( !Array.isArray(resp) ) resp = [resp]
            resp = toCSV(resp)
            res.send(resp)
        }else if( req.query.downloadReq && req.headers['user-agent'].match('iPhone') ){
            let path = (req.query.download === 'preview' && resp.previewPath) || resp.path
            // res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
            res.download(path, (req.query.filename||resp.downloadFilename))

        }else if( req.query.download !== undefined && resp && resp.path ){
            let path = (req.query.download === 'preview' && resp.previewPath) || resp.path
            res.download(path, (req.query.filename||resp.downloadFilename))

        }else if( req.query.display !== undefined && resp && resp.path ){

            let path = ''

            if( req.query.display != '' )
                path = resp.previewPath
            else
                path = (resp.displayPath || resp.path)

            if( !path ) 
                return res.status(404).json({
                    error: 'No preview',
                    code: 404
                })

            if( resp.name )
                res.set('Filename', resp.name);

            if( path instanceof Buffer )
                res.send(path)
            else if( path.startsWith('http') )
                res.redirect(path)
            else
                res.sendFile(path, err=>{
                    if( err && !['ECONNABORTED', 'EPIPE'].includes(err?.code) )
                        res.status(err.status||500).json({
                            error: err.message,
                            code: err.code
                        })
                })
        
        }else{
            if( res.headersSent )
                res.end(resp)
            else
                res.send(resp)
        }
    }

    enableCatchall({msg='api not found', code=404}={}){
        // catachall for undefined API requests
        app.get((this.opts.root||'')+'/*', (req, res)=>{
            res.status(code).send({error: msg, code})
        })
    }

}