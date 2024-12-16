/*
    # Toggle View
    
    Generally used with `b-toggle-btn`

    ```html-preview
    <b-flex>
        <b-toggle-view key="demo" type="hide"></b-toggle-view>
        I will be hidden if you click on the toggle button
    </b-flex>
    <b-flex>
        <b-toggle-view key="demo" type="show"></b-toggle-view>
        I'm hidden until you click toggle button
    </b-flex>
    ```

    ### Types
    - `show` - view is hidden by default
    - `hide` - view is shown by default
    - `other-value` - any string; will be applied as an attribute
*/
import { LitElement, html, css } from 'lit'
import LocalStoreController from '../helpers/lit/local-store-controller'


customElements.define('b-toggle-view', class extends LitElement{

    localStore = new LocalStoreController(this)

    static properties = {
        key: {type: String},
        type: {type: String},
    }

    static styles = css`
        :host {
            display: contents;
        }
    `

    connectedCallback(){
        super.connectedCallback()
        // manually set target, else use the parent element or host element
        this.parent = this.target || this.parentElement || this.getRootNode()?.host
        if( this.parent )
            this.parent.toggleView = this
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        if( this.parent && this.parent.toggleView == this )
            delete this.parent.toggleView
    }

    storeChange(){
        this.apply()
    }

    get active(){ return !!this.value }
    get value(){ return this.localStore.value }

    apply(){
        let val = this.value

        // default logic is to show/hide
        // else, apply the type as an attribute
        if( this.type && !['show', 'hide'].includes(this.type) ){
            this.parent.toggleAttribute(this.type, !!val)
            return
        }

        let hide = (this.type == 'hide' && val) || (this.type == 'show' && !val)

        if( this.parent )
            this.parent.hidden = hide
    }

    show(){
        let val = this.type == 'hide' ? null : true
        this.localStore.value = val
        this.apply()
    }

    hide(){
        let val = this.type == 'hide' ? true : null
        this.localStore.value = val
        this.apply()
    }

    enable(){ return this.show() }
    disable(){ return this.hide() }

})

export default customElements.get('b-toggle-view')