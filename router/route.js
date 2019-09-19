import UrlPattern from 'url-pattern' // https://github.com/snd/url-pattern 
import {normalizePath} from './config'

export default class Route {
    
    constructor(path, onChange){
        
        path = normalizePath(path)
        this.path = path
        this.patt = new UrlPattern(path)

        this.onChange = onChange
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
            this.onChange(oldState, newState, dir)
    }
}