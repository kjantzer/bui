import { LitElement, html, css } from 'lit'

customElements.define('b-list-filter-view-input', class extends LitElement{

    static get styles(){return css`
        :host {
            display: grid;
            position:relative;
            padding: .5em;
        }

        form-control {
            margin:0;
        }

        b-btn.cancel {
            margin: -.5em -.5em -.5em 0;
            vertical-align: middle;
        }

        [empty] ~ b-btn.cancel {
            visibility: hidden;
        }

    `}

    constructor(opts){
        super()
        this.opts = opts
    }

    firstUpdated(){

        this.input = this.shadowRoot.querySelector('form-control')

        let value = this.filter.value

        if( value )
            this.input.value = value
    }

    render(){return html`
        <form-control material="filled" show="prefix,suffix">
            <text-field reset-invalid
                placeholder="${this.get('placeholder')}" 
                pattern=${this.get('pattern')}
                @enterkey=${this.onEnter}></text-field>
                
            <span slot="help">${this.get('helpText')}</span>
            <span slot="prefix">${this.get('prefix')}</span>
            <span slot="suffix">${this.get('suffix')}</span>
            <b-btn slot="suffix" class="cancel" icon="cancel-circled" text @click=${this.clearValue}></b-btn>
            
        </form-control>
    `}

    get(key, defaultVal=''){
        let val = this.opts[key]
        
        // legacy - should use viewOpts now
        if( val == undefined )
            val = this.filter.attrs[key]
        
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