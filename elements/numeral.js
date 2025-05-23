/*
    # Numeral

    Uses numeral.js to format and display numbers

    ```html-preview
    <b-flex left wrap>
        <b-num num="10000"></b-num>
        <b-num-large num="10000"></b-num-large>
        <b-currency-acct num="-279"></b-currency-acct>

        <!-- custom format -->
        <b-num num="1000.37" format="0,0.[00]"></b-num>
    </b-flex>
    ```
*/
import { LitElement, html, css } from 'lit'
import numeral from 'numeral'

/*
    TODO: consider swap out numeral for `toLocaleString`

    Ex:
    // cash
    3.75.toLocaleString('en-US', { style: 'currency', currency: 'USD' }
    // bytes to megabytes
    (7061153*1e-6).toLocaleString('en-US', { style: 'unit', unit: 'megabyte', notation:'compact'})
*/
customElements.define('b-numeral', class extends LitElement{

    static get properties(){return {
        format: {type: String, reflect: true},
        num: {type: Number, reflect: true},
        placeholder: {type: String},
        prefix: {type: String},
        suffix: {type: String},
        ranges: {type: Array}
    }}

    set num(val){
        let oldVal = this.num
        this.__num = val
    
        this.requestUpdate('num', oldVal)
        
        if( !this._title && this.title )
            this._title = this.title||''

        if( !this.hasAttribute('notitle') )
            this.title = ((this._title||'')+` `+(val||'')).trim()
        
        this.applyRange()
    }
    
    get num(){ return this.__num}

    static get styles(){return css`
        :host {
            display: inline-block;
        }

        :host([muted]) [part] {
            color: var(--theme-text-accent);
        }
    `}

    get defaultFormat(){ return '0.[0]a' } 

    constructor(){
        super()
        this.format = this.defaultFormat
    }

    firstUpdated(){

        let num = this.textContent
        if( num )
            num = parseFloat(num)
        
        if( num && !isNaN(num) )
            this.num = num
    }

    get numeral(){
        let num = this.num
        if( !num ) return this.placeholder || num
        return numeral(num).format(this.format)
    }

    render(){return html`
        <b-text nobold part="prefix" ?hidden=${!this.prefix}>${this.prefix}</b-text>
        ${this.numeral}<slot></slot>
        <b-text nobold part="suffix" ?hidden=${!this.suffix}>${this.suffix}</b-text>
    `}

    applyRange(){
        let num = this.num
        let range = null

        this.ranges?.forEach((v,i)=>{
            if( num >= v )
                range = i+1
        })
        
        if( range )
            this.setAttribute('range', range)
        else
            this.removeAttribute('range')
    }

})

const Numeral = customElements.get('b-numeral')
export default Numeral


customElements.define('b-bytes', class extends Numeral{
    get defaultFormat(){ return '0.00 b' }
})

customElements.define('b-currency', class extends Numeral{
    get defaultFormat(){ return '(0,0.[00])' }

    render(){return html`
        <slot name="currency"><b-text part="prefix">$</b-text></slot>${this.numeral}<slot></slot>
    `}
})

customElements.define('b-currency-acct', class extends Numeral{
    get defaultFormat(){ return '($0,0.[00])' }

    render(){return html`
        ${this.numeral}<slot></slot>
    `}
})

customElements.define('b-currency-acct-lg', class extends Numeral{
    get defaultFormat(){ return '($0.[0]a)' }

    render(){return html`
        ${this.numeral}<slot></slot>
    `}
})

customElements.define('b-currency-acct-sm', class extends Numeral{
    get defaultFormat(){ return '($0,0.[0000])' }

    render(){return html`
        ${this.numeral}<slot></slot>
    `}
})

customElements.define('b-currency-acct-xs', class extends Numeral{
    get defaultFormat(){ return '($0,0.[000000])' }

    render(){return html`
        ${this.numeral}<slot></slot>
    `}
})

customElements.define('b-currency-large', class extends Numeral{
    get defaultFormat(){ return '0.[0]a' }

    render(){return html`
        <slot name="currency"><b-text nobold part="prefix">$</b-text></slot>${this.numeral}<slot></slot>
    `}
})

customElements.define('b-num', class extends Numeral{
    get defaultFormat(){ return '0,0' }
})

customElements.define('b-num-acct', class extends Numeral{
    get defaultFormat(){ return '(0,0.[00])' }
})

customElements.define('b-decimal', class extends Numeral{
    get defaultFormat(){ return '0,0.[00]' }
})

customElements.define('b-num-large', class extends Numeral{
    get defaultFormat(){ return '0.[0]a' }
})

customElements.define('b-num-acct-lg', class extends Numeral{
    get defaultFormat(){ return '(0.[0]a)' }
})

customElements.define('b-time', class extends Numeral{
    get defaultFormat(){ return '00:00:00' }
})


customElements.define('b-percent', class extends Numeral{
    get defaultFormat(){ return '0.[00]' }

    set num(num){ super.num = num }
    get num(){ return this.__num <= 1 && !this.hasAttribute('raw') ? this.__num * 100 : this.__num }

    render(){return html`
        <slot name="percent"></slot>${this.numeral}<slot><b-text nobold part="suffix">%</b-text></slot>
    `}
})