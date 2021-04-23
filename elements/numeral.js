import { LitElement, html, css } from 'lit-element'
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
        num: {type: Number, reflect: true}
    }}

    set num(val){
        let oldVal = this.num
        this.__num = val
    
        this.requestUpdate('num', oldVal)
        this.title = this._title+` `+val
    }
    
    get num(){ return this.__num}

    static get styles(){return css`
        :host {
            display: inline-block;
        }
    `}

    get defaultFormat(){ return '0.[0]a' } 

    constructor(){
        super()
        this.format = this.defaultFormat
    }

    firstUpdated(){

        this._title = this.title

        let num = this.textContent
        if( num )
            num = parseFloat(num)
        
        if( num && !isNaN(num) )
            this.num = num
    }

    get numeral(){
        let num = this.num
        if( !num ) return num
        return numeral(num).format(this.format)
    }

    render(){return html`
        ${this.numeral}
    `}

})

const Numeral = customElements.get('b-numeral')
export default Numeral


customElements.define('b-bytes', class extends Numeral{
    get defaultFormat(){ return '0.00b' }
})

customElements.define('b-currency', class extends Numeral{
    get defaultFormat(){ return '$0,0.00' }
})
