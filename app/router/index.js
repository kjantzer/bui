import Route from './route'
import HistoryStates from './history-states'
import config, {normalizePath} from './config'

const ROUTES = []

export class Router {

    // NOTE: this must be setup before anything uses router.add()
    
    config(opts){
        if( opts.root != undefined ){
            config.PATH_ROOT = opts.root
            delete opts.root
        }

        if( opts.prefix != undefined ){
            config.PATH_PREFIX = opts.prefix
            delete opts.prefix
        }

        if( opts.title != undefined ){
            config.APP_TITLE = opts.title
            delete opts.title
        }
        
        for( let key in opts ){
            config[key] = opts[key]
        }
    }

    get pathRoot(){ return config.PATH_ROOT }

    start(opts={}){

        // already started
        if( this.states ) return

        opts = Object.assign({
            currentState: null,
            requireState: false
        }, opts)

        this.states = new HistoryStates(config)

        // listen for state changes and change routes accordingly
        // I tried to add an async with this cb method but it takes quite a while
        window.addEventListener('popstate', e=>{
            
            if( opts.requireState && !e.state ) return // probably a sheetview change, ignore

            let [newState, oldStates] = this.states.add()

            window.dispatchEvent(new CustomEvent('router:popstate', {
                bubbles: true,
                composed: true,
                detail: {
                    path: newState.path,
                    state: newState,
                    oldStates: oldStates
                }
            }))

            this._changeRoute(oldStates, newState)
        })

        // timeout delay to let routes add first (since they also use setTimeout - see `add()`)
        setTimeout(()=>{
            // trigger initial route
            this._changeRoute([], this.states.current)

            // update current state if no path
            if( !this.states.current.path && opts.currentState ){
                this.states.current.update(opts.currentState)
            }
        })
    }

    // pushes new path/state onto stack (does not trigger route change)
    push(path, props={}){

        if( path instanceof Route )
            path = path.state ? path.state.props.path : path.rootPath

        props.path = path

        let [newState, oldStates] = this.states.add(props, true)
        
        window.dispatchEvent(new CustomEvent('router:push', {
            bubbles: true,
            composed: true,
            detail: {
                path: newState.path,
                state: newState,
                oldStates: oldStates
            }
        }))

        return [newState, oldStates]
    }

    // pushes new path/state and triggers route change
    goTo(path, props){
        let [newState, oldStates] = this.push(path, props)
        return this._changeRoute(oldStates, newState)
    }

    _changeRoute(oldStates, newState){

        let dir = oldStates.length == 0 || oldStates[0].num < newState.num ? 'forward' : 'back'

        let didMatch = false
        ROUTES.forEach(route=>{
            if( route._change(oldStates, newState, dir) )
                didMatch = true
        })

        // if none of the routes matched, change current state path back to the root
        if( !didMatch )
            return config.handleInvalidRoute(this.states.current, config)
        
        return true
    }

    add(path, onChange, opts={}){

        let route = new Route(path, onChange, {config, ...opts})
        let ordinal = route.patt.names.length

        this._routesToAdd = this._routesToAdd || {}

        // reduce delay if pattern contains wildcard
        // wildcards routes should be added first followed by routes with longer path params
        // this is a common UX pattern:
        // `list-of-things(/*)`     - the list view
        // `list-of-things/:id(/*)` - the view of a single item (often inside of the list view)
        if( ordinal > 0 && route.patt.names.includes('_') ){
            ordinal -= 1
        }

        this._routesToAdd[ordinal] = this._routesToAdd[ordinal] || []
        this._routesToAdd[ordinal].push(route)

        // we delay pushing routes to the stack to let catch more routes being added
        // we are going to push them onto the stack in order of number of params in the route
        // from smallest (none) to most params
        clearTimeout(this._addRoutes)
        this._addRoutes = setTimeout(()=>{
            // officially add the routes to the stack
            for( let ordinal in this._routesToAdd ){
                ROUTES.push(...this._routesToAdd[ordinal])
            }
            this._routesToAdd = null // dont add the same routes again
        }, 10)

        return route
    }

    get routes(){
        return ROUTES.map(route=>route.path)
    }

    get rootRoutes(){
        return ROUTES.map(route=>route.rootPath)
    }

}

// singleton
export default new Router()