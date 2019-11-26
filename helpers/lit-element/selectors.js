/*
    Creates shortcuts for selector querying
*/
import {LitElement} from 'lit-element'

LitElement.prototype.$ = function(query){
    return this.querySelector(query)
}

LitElement.prototype.$$ = function(query){
    return this.shadowRoot ? this.shadowRoot.querySelector(query) : this.querySelector(query)
}