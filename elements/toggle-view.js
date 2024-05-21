/*
    Generally used with `b-toggle-btn`
*/
import { LitElement, html, css } from 'lit'
import {forceStorageEventsLocally} from '../util/store'
forceStorageEventsLocally()


customElements.define('c-toggle-view', class extends LitElement{

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
        this.apply()
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        window.removeEventListener('storage', this.onChange)
    }

    onChange(e){
        if( !this.key || e.detail.key != this.key ) return
        if( !this.show && !this.hide )
        
        this.apply()
    }

    apply(){
        let val = localStorage.getItem(this.key)
        let hide = (this.type == 'hide' && val) || (this.type == 'show' && !val)

        let parent = this.parentElement

        if( parent )
            parent.hidden = hide
    }

})

export default customElements.get('c-toggle-view')