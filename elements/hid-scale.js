/*
    # HID Scale

    Uses `util/hidDevice` to connect and use a common shipping scale: https://www.hogentogler.com/fairbanks/29824c-shipping-scale.asp

    Will show the weight of the scale. If no scale connected, can be clicked to prompt connecting to one.

    ```html-preview
    <b-hid-scale></b-hid-scale>
    ```

    ```js
    render(){ return html`
        <b-hid-scale @change=${this.onScaleChange} @stable=${this.onScaleStable}></b-hid-scale>
    `}

    onScaleStable(){
        console.log(scaleEl.weight)
    }
    ```
*/
import { LitElement, html, css } from 'lit'
import hidDevice from '../util/hidDevice'
import '../helpers/lit/emitEvent'

customElements.define('b-hid-scale', class extends LitElement{

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
        this.onStable = this.onStable.bind(this)

        this.integers = 1
        this.decimals = 2
        this.weight = 0
        this.unit = 'lb'
    }

    // alias
    get value(){ return this.weight }

    get weightFormated(){
        return (this.weight||0)
            .toFixed(this.decimals)
            .padStart(this.decimals+1+this.integers, '0')
    }

    updated(){
        this.toggleAttribute('connected', this.scale.isConnected)
        this.toggleAttribute('weight', this.weight)
    }

    render(){return html`
        <b-text ?link=${!this.scale.isConnected} @click=${this.requestDevice}>

            ${this.scale.isConnected?'':html`
                <b-tooltip label>Scale Offline</b-tooltip>
            `}
            
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
        this.scale.on('stable', this.onStable)

        let {weight, unit, isNegative} = this.scale.value || {}

        // update to current weight if already set
        this.weight = weight || 0

        if( unit )
            this.unit = unit
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.scale.off('change', this.onChange)
        this.scale.off('stable', this.onStable)
    }

    onChange({weight, unit, isNegative}){
        this.weight = weight
        if( unit )
            this.unit = unit
        
        this.emitEvent('change', arguments[0])
    }

    onStable(result, prevResult){
        this.emitEvent('stable', result, prevResult)
    }

    requestDevice(e){
        e.stopPropagation()
        this.scale.requestDevice()
    }

})

export default customElements.get('b-hid-scale')
