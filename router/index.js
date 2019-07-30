import UrlPattern from 'url-pattern' // https://github.com/snd/url-pattern 
import HistoryStates from './history-states'

const ROUTES = []
const APP_TITLE = document.title
const PATH_PREFIX = location.pathname+'#/'

export class Router {

    // normalize path (always begin with `/#/`)
    // TODO: allow for prefix to be set by developer
    static normalizePath(path){
        return path ? PATH_PREFIX+path.replace(/^[#\/]+/, '') : path
    }

    start(opts={}){

        opts = Object.assign({
            requireState: false
        }, opts)

        this.states = new HistoryStates()

        // listen for state changes and change routes accordingly
        window.addEventListener('popstate', e=>{
            
            if( opts.requireState && !e.state ) return // probably a sheetview change, ignore

            let [newState, oldStates] = this.states.add()
            this._changeRoute(oldStates, newState)
        })

        // trigger initial route
        this._changeRoute([], this.states.current)
    }

    // pushes new path/state onto stack (does not trigger route change)
    push(path, data={}){

        if( path instanceof Route )
            path = path.state ? path.state.path : path.rootPath
        else
            path = Router.normalizePath(path)

        if( !path ){
            path = '/' // empty string doesn't work
            data.title = data.title || APP_TITLE
        }

        history.pushState(data, null, path)

        if( data.title )
            document.title = data.title
            
        return this.states.add(data)
    }

    // pushes new path/state and triggers route change
    goTo(path, data){
        let [newState, oldStates] = this.push(path, data)
        this._changeRoute(oldStates, newState)
    }

    _changeRoute(oldStates, newState){

        let dir = oldStates.length == 0 || oldStates[0].num < newState.num ? 'forward' : 'back'

        ROUTES.forEach(route=>{
            route._change(oldStates, newState, dir)
        })
    }

    add(path, enter, exit){
        new Route(path, enter, exit)
    }

    get routes(){
        return ROUTES.map(route=>route.path)
    }

    get rootRoutes(){
        return ROUTES.map(route=>route.rootPath)
    }

}

export class Route {
    
    constructor(path, onChange){
        
        path = Router.normalizePath(path)
        this.path = path
        this.patt = new UrlPattern(path)

        this.change = onChange

        ROUTES.push(this)
    }

    get params(){
        return this.state ? this.state.params : {}
    }

    get rootPath(){
        return this.patt.ast[0].value
    }

    get isCurrent(){
        return this.state&&this.state.isCurrent
    }

    update(props){
        this.state&&this.state.update(props)
    }

    matches(state){

        // array of states, get the last matched state in the list
        if( Array.isArray(state) ){
            let matchedState = null
            for(let i in state){
                if( this.matches(state[i]) )
                    matchedState = state[i]
            }
            return matchedState
        }

        let params = state ? this.patt.match(state.path?state.path:state) : false
        if( params ){
            this.state = state
            state.params = params
            return state
        }
        return null
    }

    _change(oldState, newState, dir){

        oldState = this.matches(oldState)
        newState = this.matches(newState)

        if( oldState || newState )
            this.change(oldState, newState, dir)
    }
}

// singleton
export default new Router()