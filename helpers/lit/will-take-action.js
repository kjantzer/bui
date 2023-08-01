/*
    Let parent elements detect action and optional modify/deny action

    Example:
    
    if( !this.willTakeAction('action-name').allowed ) return

    ```
    // on the parent element:
    @will-take-action=this.onTakeAction

    onTakeAction(e){
        let {action} = e.detail
        action.allowed = false
    }
    ```
*/
import {LitElement} from 'lit'
import './events'

export const willTakeAction = function(name, detail={}, eventOpts={}){
    
    let action = Object.assign({
        model: this.model,
        target: this
    }, detail, {name: name, allowed: true})

    this.emitEvent(name, {action}, eventOpts)

    if( action.allowed )
        this.emitEvent('will-take-action', {action}, eventOpts)
    
    // add alias
    action.notAllowed = !action.allowed

    return action
}

LitElement.prototype.willTakeAction = willTakeAction
window.willTakeAction = willTakeAction