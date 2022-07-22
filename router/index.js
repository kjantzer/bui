import Route from './route'
import HistoryStates from './history-states'
import config, {normalizePath} from './config'

const ROUTES = []

export class Router {

    // NOTE: this must be setup before anything uses router.add()

    // have not seen you use pvt properties yet but it was mentioned recently
    #delay
    
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

    start(opts={}){

        opts = Object.assign({
            currentState: null,
            requireState: false
        }, opts)

        this.states = new HistoryStates()

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
        }, this.#delay)
        // this does seem to work, but I imagine there is a better way
        // will try other ways
    }
    _post

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

    add(path, onChange){
        let route = new Route(path, onChange, config)

        let delay = route.patt.names.length * 10
        // thinking is that reset delay every time
        // then maike it available for the setTimeout...
        this.#delay = delay

        // reduce delay if pattern contains wildcard
        // wildcards routes should be added first followed by routes with longer path params
        // this is a common UX pattern:
        // `list-of-things(/*)`     - the list view
        // `list-of-things/:id(/*)` - the view of a single item (often inside of the list view)
        if( this.#delay > 0 && route.patt.names.includes('_') )
            this.#delay -= 1

        setTimeout(()=>{
            ROUTES.push(route)
        }, this.#delay)

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