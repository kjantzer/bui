/*
    Creates shortcuts for selector querying
*/
import {LitElement} from 'lit-element'

LitElement.prototype.$ = function(query, cache=false){
    if( cache === true ) cache = '$.'+query
    if( cache && this[cache] ) return this[cache]
    let el = this.querySelector(query)
    if( cache ) this[cache] = el
    return el
}

LitElement.prototype.$all = function(query){
    return this.querySelectorAll(query)
}

LitElement.prototype.$$ = function(query, cache=false){
    if( cache === true ) cache = '$$.'+query
    if( cache && this[cache] ) return this[cache]
    let el = this.shadowRoot ? this.shadowRoot.querySelector(query) : this.querySelector(query)
    if( cache ) this[cache] = el
    return el
}

LitElement.prototype.$$all = function(query){
    return this.shadowRoot ? this.shadowRoot.querySelectorAll(query) : this.querySelectorAll(query)
}