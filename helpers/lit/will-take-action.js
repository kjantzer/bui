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

LitElement.prototype.willTakeAction = function(name, detail={}){
    
    let action = Object.assign({
        model: this.model,
        target: this
    }, detail, {name: name, allowed: true})

    this.emitEvent('will-take-action', {action})
    
    // add alias
    action.notAllowed = !action.allowed

    return action
}