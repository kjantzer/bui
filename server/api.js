const UrlPattern = require('url-pattern')

const DEFAULT_OPTS = {
    root: ''
}

module.exports = class API {

	constructor(app, classes, opts={}){

        this.opts = Object.assign({}, DEFAULT_OPTS, opts)
		
        this.app = app
		this._classes = new Map()

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

        if( !Class.api || !Class.api.routes )
            return console.warn('! API: class `'+Class.name+'` must specify `api.routes`')

        let path = Class.api.root
        if( this.opts.root )
            path = this.opts.root + path
        path += '(/:'+(Class.api.idParam||'id')+')'

        Class.prototype.apiPathPattern = new UrlPattern(path, {segmentNameCharset: 'a-zA-Z0-9_'})
        Class.prototype.apiPathPattern.path = path

        Object.defineProperty(Class.prototype, 'apiPath', {
            get: function apiPath() {
                let params = {...this, id: this.id, ...(this.attrs || {})}
                return this.apiPathPattern.stringify(params)
            }
        });

        Class.api.routes.forEach(this.setupRoute.bind(this, Class))

        if( Class.api.sync )
            this.setupSync(Class)
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
            
            if( opts.requiresAuthentication !== false // this particular route needs AUTH
            && Class.api.requiresAuthentication !== false // all routes on class need AUTH
            && !req.isAuthenticated() )
                return res.status(401).send({error: 'session expired', code: 401})

            try{

                // let c = this.init(Class)
                let model = new Class(req.params, req)
                model.req = req
                model.res = res

                if( 'canAccess' in model && await model.canAccess === false )
                    return res.status(403).send({error: 'unauthorized', code: 403})

			
                let args = []

                if( ['add', 'update', 'patch'].includes(fnName) )
                    args.push(req.body)

				let resp = await model[fnName].apply(model, args)

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
                else if( process.env.ENV == 'development' || err.name == 'Error' ){
                    console.log(err.stack||err)
                }
                
                let code = ['Error', 'DBError'].includes(err.name) ? 400 : (err.code || 500)
                res.statusMessage = err.code == 'ER_PARSE_ERROR' ? err.code : err.message
                res.status(code).json({
                    error: err.message,
                    code: code,
                    type: err.name,
                    data: err.data
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
                res.sendFile(resp.sendFile)

        }else if( req.query.downloadReq && req.headers['user-agent'].match('iPhone') ){
            let path = (req.query.download === 'preview' && resp.previewPath) || resp.path
            // res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
            res.download(path, (req.query.filename||resp.downloadFilename))

        }else if( req.query.download !== undefined && resp && resp.path ){
            let path = (req.query.download === 'preview' && resp.previewPath) || resp.path
            res.download(path, (req.query.filename||resp.downloadFilename))

        }else if( req.query.display !== undefined && resp && resp.path ){
            let path = (req.query.display != '' && resp.previewPath) || (resp.displayPath || resp.path)
            if( resp.name )
                res.set('Filename', resp.name);

            if( path.startsWith('http') )
                res.redirect(path)
            else
                res.sendFile(path)
        
        }else{
            if( res.headersSent )
                res.end(resp)
            else
                res.send(resp)
        }
    }

}