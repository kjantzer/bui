
import HistoryState from './history-state'

export default class HistoryStates {
    constructor(){
        let storedData = sessionStorage.getItem('history-states')
        this.states = JSON.parse(storedData||'[]').map(props=>new HistoryState(this, JSON.parse(props)))

        this._current = history.state && history.state.num || -1

        // set initial state data
        this.add({
            path: location.pathname+location.hash+location.search
        })
    }

    get length(){ return this.states.length }

    get current(){
        let state = this.get(this._current)
        if( !state ){
            this._current = this.length-1
            state = this.get(this._current)
        }

        return state
    }

    save(){
        sessionStorage.setItem('history-states', JSON.stringify(this.states))
    }

    get(num, create=false, props={}){
        if( !this.states[num] && create ){
            props.num = num
            this.states[num] = new HistoryState(this, props)
        }

        return this.states[num]
    }

    add(props={}, push=false){
        
        let oldNum = this._current
        let num = history.state && history.state.num

        if( num == undefined || push ){
            num = ++this._current
            
            // remove trailing states as they are no longer valid
            this.states.splice(num+1).forEach(state=>{
                state.parent = null
            })
        }
        // else if( push )
        //     num++

        let state = this.get(num, true, props) // or create
        
        if( push )
            state.push(props)
        else
            state.update(props)

        this._current = state.num

        let step = oldNum > this._current ? -1 : 1;
        
        let oldStates = []
        // console.log(oldNum, this._current);
        while(oldNum != this._current){
            let oldState = this.get(oldNum)
            if( oldState )
                oldStates.push(oldState)
            oldNum += step
        }

        // console.log(oldStates);

        return [state, oldStates]
    }
}