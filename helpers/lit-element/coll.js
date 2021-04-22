/*
    Tells the element to update when a new backbone coll
    is assigned
*/
import {LitElement} from 'lit'

Object.defineProperty(LitElement.prototype, 'coll', {

    set: function(val){
        const oldVal = this.coll
        
        if( oldVal != val ){
            
            if( oldVal && this.unbindListeners)
                this.unbindListeners()

            this.__coll = val
            
            this.bindListeners&&this.bindListeners()

            this.requestUpdate('coll', oldVal)
            this.onCollChange&&this.onCollChange(val)
        }
    },

    get: function(){ return this.__coll }

})