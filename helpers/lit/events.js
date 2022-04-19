import {LitElement} from 'lit-element'

LitElement.prototype.emitEvent = function(eventName, detail=null, overrides={}){

    var event = new CustomEvent(eventName, Object.assign({
        bubbles: true,
        composed: true,
        detail: detail
    }, overrides));
    
    return this.dispatchEvent(event)
}