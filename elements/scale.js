import { LitElement, html, css } from 'lit-element'
import hidDevice from '../util/hidDevice'

customElements.define('b-scale', class extends LitElement{

    // https://www.hogentogler.com/fairbanks/29824c-shipping-scale.asp
    get scale(){ return hidDevice.fairbanksScale }

    static get properties(){return {
        weight: {type: Number, reflect: true},
        unit: {type: String, reflect: true},
        integers: {type: Number},
        decimals: {type: Number}
    }}

    static get styles(){return css`
        :host {
            display: inline-block;
            position:relative;
            padding-right: .5rem;
        }

        .status {
            position: absolute;
            top: 0;
            /* right: -.5em; */
        }
    `}

    constructor(){
        super(...arguments)
        this.onChange = this.onChange.bind(this)

        this.integers = 1
        this.decimals = 2
        this.weight = 0
        this.unit = 'lb'
    }

    get weightFormated(){
        return (this.weight||0)
            .toFixed(this.decimals)
            .padStart(this.decimals+1+this.integers, '0')
    }

    render(){return html`
        <b-text ?link=${!this.scale.isConnected} @click=${this.requestDevice} title="${this.scale.isConnected?'':'Scale Offline'}">
            
            <span part="weight">${this.weightFormated}</span> <b-text muted part="unit">${this.unit}</b-text>

            ${this.scale.isConnected?'':html`
                <b-label filled="red" dot class="status"></b-label>
            `}
        </b-text>
    `}

    async firstUpdated(){
        // connect to the scale if already requested and "paired" with this browser
        await this.scale.connect()
        this.update()
    }

    connectedCallback(){
        super.connectedCallback()
        this.scale.on('change', this.onChange)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.scale.on('change', this.onChange)
    }

    onChange({weight, unit, isNegative}){
        this.weight = weight
        if( unit )
            this.unit = unit
    }

    requestDevice(){
        this.scale.requestDevice()
    }

})

export default customElements.get('b-scale')
