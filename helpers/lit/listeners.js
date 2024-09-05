/*
    # Listeners
    
    Adds support for listening to Backbone  Model/Collection/Relation`
    events and responding. Most events should just be calling `requestUpdate` which
    will rerender the view.

    Updates `connectedCallback` and `disconnectedCallback`

    ```javascript
    import 'bui/helpers/lit/listeners'

    static get listeners(){ return {
        'model': {
            'change reset': 'requestUpdate'
        },
        'some-relation': {
            'reset': 'requestUpdate'
        }
    }}

    // ^ equivalent to:
    this.model.on('change reset', this.requestUpdate.bind(this))
    this.model.get('some-relation').on('reset', this.requestUpdate.bind(this))
    ```
*/
import { LitElement } from "lit";
import {Model, Collection} from 'backbone'

const LitElement_connectedCallback = LitElement.prototype.connectedCallback
const LitElement_disconnectedCallback = LitElement.prototype.disconnectedCallback

LitElement.prototype.__listenerModelFor = function(key){
    let m = null 
    if( key == 'model' )
        m = this.model
        
    else if( key == 'coll' || key == 'collection' )
        m = this.coll || this.collection
    
    else if( this.model && this.model.get )
        m = this.model.get(key)

    if( !m && this[key] )
        m = this[key]

    if( !m )
        return null
    
    if( m instanceof Model || m instanceof Collection )
        return m

    if( m.trigger && m.on ) // Backbone.Events
        return m

    return null
}

LitElement.prototype.bindListeners = function(){
    if( this.constructor.listeners ){
        let listeners = this.constructor.listeners
        
        for(let key in listeners){

            let m = this.__listenerModelFor(key);
            let events = listeners[key]
				
			if( !m )
				continue

            for(let event in events ){

                m.off(event, null, this)

                let fnName = events[event]
                let fn = this[fnName]

                if( !fn ) continue

                // custom inline function so no args are passed to `requestUpdate`
                if( fnName == 'requestUpdate' )
                    fn = function(){ this.requestUpdate() }.bind(this)

                m.on(event, fn, this)
            }
        }
    }else if( this.listeners ){
        console.warn('BUI: `get listeners()` should be static')
    }
}

LitElement.prototype.unbindListeners = function(){
    if( this.constructor.listeners ){
        let listeners = this.constructor.listeners
        
        for(let key in listeners){
            let m = this.__listenerModelFor(key);
            if( !m ) continue;
            m.off(null, null, this)
        }
    }
}

LitElement.prototype.connectedCallback = function(){
    LitElement_connectedCallback.apply(this, arguments)
    this.bindListeners()
}

LitElement.prototype.disconnectedCallback = function(){
    LitElement_disconnectedCallback.apply(this, arguments)
    this.unbindListeners()
}