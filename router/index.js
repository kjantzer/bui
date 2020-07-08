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

    start(opts={}){

        opts = Object.assign({
            currentState: null,
            requireState: false
        }, opts)

        this.states = new HistoryStates()

        // listen for state changes and change routes accordingly
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

        // trigger initial route
        this._changeRoute([], this.states.current)

        // update current state if no path
        if( !this.states.current.path && opts.currentState ){
            this.states.current.update(opts.currentState)
        }
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
        this._changeRoute(oldStates, newState)
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
            config.handleInvalidRoute(this.states.current, config)
    }

    add(path, onChange){
        let route = new Route(path, onChange)
        ROUTES.push(route)
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