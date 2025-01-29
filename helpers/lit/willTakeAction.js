/*
    # willTakeAction
    
    Emits with a specially formatted `detail` object for informing parent views of the action
    and providing them the opportunity to cancel/disallow

    `this.willTakeAction(actionName, detail)`

    ```js
    // before taking action...
    if( !this.willTakeAction('delete').allowed ) return
    if( this.willTakeAction('delete').notAllowed ) return

    let action = this.willTakeAction('show-menu', {menu: [...]})
    if( action.allowed )
        console.log(action.menu) // could be different if parent changed it
    ```

    ```html
    <child-el @will-take-action=${onAction}></child-el>
    ```

    ```js
    onAction(e){
        let {action} = e.detail

        if( action == 'delete' )
            action.allowed = false

        if( action == 'show-menu' )
            action.menu = action.menu.filter(d=>d.val!='delete')
    }
    ```
*/
import {LitElement} from 'lit'
import './emitEvent'

export const willTakeAction = function(name, detail={}, eventOpts={}){
    
    let action = Object.assign({
        model: this.model,
        target: this
    }, detail, {name: name, allowed: true})

    // allows for `action == 'name'` instead of `action.name == 'name'`
    action.toString = function(){return this.name}

    this.emitEvent(name, {action}, eventOpts)

    if( action.allowed )
        this.emitEvent('will-take-action', {action}, eventOpts)
    
    // add alias
    action.notAllowed = !action.allowed

    return action
}

LitElement.prototype.willTakeAction = willTakeAction
window.willTakeAction = willTakeAction