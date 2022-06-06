import {LitElement} from 'lit'

export const emitEvent = function(eventName, detail=null, overrides={}){

    var event = new CustomEvent(eventName, Object.assign({
        bubbles: true,
        composed: true,
        detail: detail
    }, overrides));
    
    return this.dispatchEvent(event)
}

LitElement.prototype.emitEvent = emitEvent
window.emitEvent = emitEvent.bind(window)
document.emitEvent = emitEvent.bind(document)