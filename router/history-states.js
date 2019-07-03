
import HistoryState from './history-state'

export default class HistoryStates {
    constructor(){
        let storedData = sessionStorage.getItem('history-states')
        this.states = JSON.parse(storedData||'[]').map(props=>new HistoryState(this, JSON.parse(props)))

        this._current = history.state && history.state.num || -1

        this.add() // set initial state data
    }

    get length(){ return this.states.length }

    get current(){
        return this.get(this._current)
    }

    save(){
        sessionStorage.setItem('history-states', JSON.stringify(this.states))
    }

    get(num, create=false){
        if( !this.states[num] && create ){
            this.states[num] = new HistoryState(this, {num})
            // this.save()
        }

        return this.states[num]
    }

    add(props={}){

        let oldNum = this._current
        let num = history.state && history.state.num

        if( num == undefined ){
            num = ++this._current
            
            // remove trailing states as they are no longer valid
            this.states.splice(num+1).forEach(state=>{
                state.parent = null
            })
        }

        let state = this.get(num, true)
        
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