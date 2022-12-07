import {LitElement} from 'lit'

LitElement.prototype.get = function(key, defaultVal=''){
    let val = defaultVal

    if( this.model && this.model.get )
        val = this.model.get(key)
    if( this.model )
        val = this.model[key]

    return val === undefined ? defaultVal : val
}

