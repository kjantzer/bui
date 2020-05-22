import { LitElement, html, css } from 'lit-element'
import numeral from 'numeral'

customElements.define('b-numeral', class extends LitElement{

    static get properties(){return {
        format: {type: String, reflect: true},
        num: {type: Number, reflect: true}
    }}

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
