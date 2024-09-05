/*
    # Coll (property)

    Effectively sets up a `.coll` prop on all LitElements. The element will update anytime `.coll` is changed

    It also automatically calls `bindListeners` from the "listeners" helper

    > NOTE: also see ./model
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