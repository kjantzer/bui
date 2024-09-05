/*
    # Get

    Shortcut to `this.model.get()` that also supports `defaultValue`. Won't fatally fail if no `this.model`

    ```js
    import 'bui/helpers/lit/get'
    
    this.get('some_key')
    this.get('some_key', 'default Value')
    ```
*/
import {LitElement} from 'lit'

LitElement.prototype.get = function(key, defaultVal=''){
    let val = defaultVal

    if( this.model && this.model.get )
        val = this.model.get(key)
    else if( this.model )
        val = this.model[key]

    return val === undefined ? defaultVal : val
}

