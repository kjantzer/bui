/*
    Creates shortcuts for selector querying
*/
import {LitElement} from 'lit-element'

LitElement.prototype.$ = function(query){
    return this.querySelector(query)
}

LitElement.prototype.$all = function(query){
    return this.querySelectorAll(query)
}

LitElement.prototype.$$ = function(query){
    return this.shadowRoot ? this.shadowRoot.querySelector(query) : this.querySelector(query)
}

LitElement.prototype.$$all = function(query){
    return this.shadowRoot ? this.shadowRoot.querySelectorAll(query) : this.querySelectorAll(query)
}