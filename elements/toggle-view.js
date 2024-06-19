/*
    Generally used with `b-toggle-btn`
*/
import { LitElement, html, css } from 'lit'
import store, {forceStorageEventsLocally} from '../util/store'
forceStorageEventsLocally()


customElements.define('b-toggle-view', class extends LitElement{

    static properties = {
        key: {type: String},
        type: {type: String},
    }

    static styles = css`
        :host {
            display: contents;
        }
    `
    
    constructor(){
        super()
        this.onChange = this.onChange.bind(this)
    }

    connectedCallback(){
        super.connectedCallback()
        window.addEventListener('storage', this.onChange)
        this.parent = this.parentElement || this.getRootNode()?.host
        if( this.parent )
            this.parent.toggleView = this
        this.apply()
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        window.removeEventListener('storage', this.onChange)
        if( this.parent && this.parent.toggleView == this )
            delete this.parent.toggleView
    }

    onChange(e){
        let key = e.detail?.key || e.key
        if( !this.key || key != this.key ) return
        
        this.apply()
    }

    apply(){
        let val = localStorage.getItem(this.key)
        let hide = (this.type == 'hide' && val) || (this.type == 'show' && !val)

        if( this.parent )
            this.parent.hidden = hide
    }

    show(){
        let val = this.type == 'hide' ? null : true
        store(this.key, val)
        this.apply()
    }

    hide(){
        let val = this.type == 'hide' ? true : null
        store(this.key, val)
        this.apply()
    }

})

export default customElements.get('b-toggle-view')