import { LitElement, html, css } from 'lit'
import Label from '../../../../elements/label'
import '../../../form/controls/token-text-field'

customElements.define('b-list-filter-view-tokens', class extends LitElement{

    static get styles(){return css`
        :host {
            display: grid;
            position:relative;
            padding: .5em;
        }

        form-control {
            display: block;
            width: 90vh;
            color: var(--brown-400);
        }
    `}

    constructor(opts){
        super()
        this.opts = opts
    }

    // firstUpdated(){

    //     this.input = this.shadowRoot.querySelector('form-control')

    //     let value = this.filter.value

    //     if( value )
    //         this.input.value = value
    // }

    get tokens(){

        return [
            {label: 'OR', attrs:{type:'condition'}},
            {label: 'AND', attrs:{type:'condition'}},
            {label: '(', attrs:{type:'group'}},
            {label: ')', attrs:{type:'group'}},
            {label: '>', attrs:{type:'operator'}},
            {label: '<', attrs:{type:'operator'}},
            {label: '>=', attrs:{type:'operator'}},
            {label: '<=', attrs:{type:'operator'}},
            {label: '=', attrs:{type:'operator'}},
            {label: '!=', attrs:{type:'operator'}},
            {label: 'print_rights', attrs:{type:'field'}},
            {label: 'audio_rights', attrs:{type:'field'}},
            {label: 'ebook_rights', attrs:{type:'field'}},
        ]
    }

    get tokenOptions(){
        return {
            autoComplete: {
                minLength: 1
            }
        }
    }

    // get cleanedVal(){

    //     let tokens = this.tokens
    //     let lines = this.$$('form-control').value
    //     let getToken = label=>tokens.find(t=>t.label==label)

    //     lines.map(line=>{
    //         let prevObj = null
    //         return line.map(o=>{

    //             if( o.label ){
    //                 let token = getToken(o.label)
    //                 if( !token ) return ''

                    
    //             }

    //             return o
    //         })
    //     })

    // }

    render(){return html`
        <form-control material="filled">
            <token-text-field 
                token-name="b-list-filter-view-token"
                .tokens=${this.tokens}
                .options=${this.tokenOptions}
            ></token-text-field>
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

export default customElements.get('b-list-filter-view-tokens')


customElements.define('b-list-filter-view-token', class extends Label{

    static get styles(){return [super.styles, css`

        :host([data-type]) {
            margin-bottom: .25em !important;
            font-weight: bold !important;
        }
        
        :host([data-type="condition"]) { --bgd: var(--red-400); }
        
        :host([data-type="operator"]) {
            --bgd: var(--theme-bgd);
            --color: var(--theme-text);
        }
        
        :host([data-type="field"]) { 
            --color: var(--deep-purple);
            --bgd: var(--theme-bgd);
            font-weight: bold !important;
        }
    `]}

})
