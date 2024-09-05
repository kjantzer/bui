/*
    # Selectors

    Creates shortcuts for selector querying the shadow dom

    ```js
    import 'bui/helpers/lit/selctors'

    this.$('.class') // one in DOM
    this.$all('.class') // all in DOM

    this.$$('.class') // one in shadow DOM
    this.$$all('.class') // all in shadow DOM
    ```

    #### Caching

    Pass `true` or a key string as second arg to cache the result

    ```js
    let el = this.$$('.class', true)
    ```
*/
import {LitElement} from 'lit'

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