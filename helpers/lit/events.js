/*
    # Events

    To simplify event dispatching from inside the shadow dom, an `emitEvent`
    method has been added to lit-element. It uses `CustomEvent` and `dispatchEvent`

    ```js
    this.emitEvent(eventName[, detail])
    this.emitEvent('element-event', {id: 1})
    ```

    The emitted event will have `bubbles: true` and `composed: true` so that the even
    will bubble up and out of the shadow dom
*/
import {LitElement} from 'lit'

export const emitEvent = function(eventName, detail=null, overrides={}){

    var event = new CustomEvent(eventName, Object.assign({
        bubbles: true,
        composed: true,
        detail: detail
    }, overrides));
    
    let _this = overrides.context || this
    return _this.dispatchEvent?.(event)
}

LitElement.prototype.emitEvent = emitEvent
window.emitEvent = emitEvent.bind(window)
document.emitEvent = emitEvent.bind(document)