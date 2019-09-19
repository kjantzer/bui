import Route from './route'
import HistoryStates from './history-states'
import config, {normalizePath} from './config'

const ROUTES = []

export class Router {

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
            path = normalizePath(path)

        if( !path ){
            path = config.PATH_ROOT // empty string doesn't work
            data.title = data.title || config.APP_TITLE
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