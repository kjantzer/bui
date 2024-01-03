/*
    Tells the element to update when a new backbone model
    is assigned
*/
import {LitElement} from 'lit'

Object.defineProperty(LitElement.prototype, 'model', {

    set: async function(val){
        const oldVal = this.model
        
        if( oldVal != val ){
            
            if( oldVal && this.unbindListeners)
                this.unbindListeners()

            this.__model = val

            if( val && val.id )
                this.setAttribute('model', val.id)
            else
                this.removeAttribute('model')
            
            // does this "need" to be after request update?
            this.onModelChange && await this.onModelChange(val, oldVal)
            this.requestUpdate('model', oldVal)
            // this.onModelChange&&this.onModelChange(val, oldVal)

            // do this at end so `onModelChange` can choose to update/set other models for listeners
            this.bindListeners&&this.bindListeners()
        }
    },

    get: function(){ return this.__model }

})