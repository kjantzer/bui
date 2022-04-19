/*
    Tells the element to update when a new backbone model
    is assigned
*/
import {LitElement} from 'lit-element'

Object.defineProperty(LitElement.prototype, 'model', {

    set: async function(val){
        const oldVal = this.model
        
        if( oldVal != val ){
            
            if( oldVal && this.unbindListeners)
                this.unbindListeners()

            this.__model = val
            
            this.bindListeners&&this.bindListeners()

            // does this "need" to be after request update?
            this.onModelChange && await this.onModelChange(val, oldVal)
            this.requestUpdate('model', oldVal)
            // this.onModelChange&&this.onModelChange(val, oldVal)
        }
    },

    get: function(){ return this.__model }

})