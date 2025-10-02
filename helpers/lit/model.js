/*
    # .model (property)

    Effectively sets up a `.model` prop on all LitElements. The element will update anytime `.model` is changed

    It also automatically calls `bindListeners` from the "listeners" helper

    > NOTE: also see ./coll
*/
import {LitElement} from 'lit'

Object.defineProperty(LitElement.prototype, 'model', {

    set: async function(val){
        const oldVal = this.model
        
        if( oldVal != val ){
            
            if( oldVal && this.unbindListeners)
                this.unbindListeners()

            // TODO: consider linking element to model?
            // if( oldVal && oldVal.parentElement == this )
            //     oldVal.parentElement = null

            // if( val && !val.parentElement )
            //     val.parentElement = this

            this.__model = val

            if( val && val.id )
                this.setAttribute('model', val.id)
            else
                this.removeAttribute('model')
            
            // does this "need" to be after request update?
            this.onModelChange && await this.onModelChange(val, oldVal)
            
            // support lit controllers
            this.__controllers?.forEach((c) => c.onModelChange?.(val, oldVal));

            this.requestUpdate('model', oldVal)
            // this.onModelChange&&this.onModelChange(val, oldVal)

            // do this at end so `onModelChange` can choose to update/set other models for listeners
            this.bindListeners&&this.bindListeners()
        }
    },

    get: function(){ return this.__model }

})