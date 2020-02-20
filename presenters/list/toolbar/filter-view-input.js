import { LitElement, html, css } from 'lit-element'
import moment from 'moment'

customElements.define('b-list-filter-view-input', class extends LitElement{

    static get styles(){return css`
        :host {
            display: grid;
            position:relative;
            padding: .25em;
        }

        form-control {
            margin:0;
        }

    `}

    firstUpdated(){

        this.input = this.shadowRoot.querySelector('form-control')

        let value = this.filter.value

        if( value )
            this.input.value = value
    }

    render(){return html`
        <b-btn text md @click=${this.clearValue}>Clear</b-btn>

        <form-control material="filled" style="width:${this.get('width'), '200px'}">
            <text-field reset-invalid placeholder="${this.get('placeholder')}" @enterkey=${this.onEnter}></text-field>
        </form-control>
    `}

    get(key, defaultVal=''){
        let val = this.filter.attrs[key]
        return val != undefined ? val : defaultVal
    }

    get value(){
        let value = ''

        // editors not setup yet, so just use the value from the filter object
        if( !this.input )
            return this.filter.value

        return this.input.value
    }

    set value(val){
        if( this.input ) 
            this.input.value = val
    }

    /*
        We do a bunch of fancy logic to display a label that is hopefully
        the easy to scan while taking up the least amount of space
    */
    get label(){
        return this.value || this.get('defaultLabel', 'unset')
    }

    onEnter(){
        this.close()
    }

    clearValue(){
        this.value = null
        this.close()
    }

})

export default customElements.get('b-list-filter-view-input')