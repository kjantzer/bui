import {LitElement} from 'lit-element'

LitElement.prototype.emitEvent = function(eventName, detail=null, overrides={}){

    var event = new CustomEvent(eventName, Object.assign({
        bubbles: true,
        composed: true,
        detail: detail
    }, overrides));
    
    return this.dispatchEvent(event)
}

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
LitElement.prototype.willTakeAction = function(name, detail={}){
    let action = Object.assign({}, detail, {name: name, allowed: true})
    this.emitEvent('will-take-action', {action})
    action.notAllowed = !action.allowed
    return action
}