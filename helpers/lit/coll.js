/*
    # .coll (property)

    Effectively sets up a `.coll` prop on all LitElements. The element will update anytime `.coll` is changed

    It also automatically calls `bindListeners` from the "listeners" helper

    ```js
    class El extends LitElement {
        render(){return html`
            ${this.coll?.length}
        `}
    }
    
    el = new El()
    el.coll = coll1
    el.coll = coll2
    ```

    > NOTE: also see ./model
*/
import {LitElement} from 'lit'

Object.defineProperty(LitElement.prototype, 'coll', {

    set: function(val){
        const oldVal = this.coll
        
        if( oldVal != val ){
            
            if( oldVal && this.unbindListeners)
                this.unbindListeners()

            // TODO: consider linking element to coll?
            // if( oldVal && oldVal.parentElement == this )
            //     oldVal.parentElement = null

            // if( val && !val.parentElement )
            //     val.parentElement = this

            this.__coll = val
            
            this.bindListeners&&this.bindListeners()

            this.requestUpdate('coll', oldVal)
            this.onCollChange&&this.onCollChange(val)

            // support lit controllers
            this.__controllers?.forEach((c) => c.onCollChange?.(val, oldVal));
        }
    },

    get: function(){ return this.__coll }

})