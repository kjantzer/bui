import { LitElement, html, css } from 'lit'
import colorScheme from '../util/color-scheme'

customElements.define('b-qr-code', class extends LitElement{

    static properties = {
        size: {type: Number},
        value: {type: String},
        img: {type: String},
        color: {type: String}
    }

    static styles = css`
        :host {
            display: inline-block;
        }
    `

    constructor(){
        super()
        this.size = 300
        this.color = 'theme'
    }

    firstUpdated(){
        import('qr-code-styling').then((QRCodeStyling)=>{
            this.qrCode = new QRCodeStyling.default()
            this.qrCode.append(this)
            this.requestUpdate()
        })
    }

    updated(){

        let color = colorScheme.getCssVar('--'+this.color) || this.color || '#000'

        this.qrCode?.update({
            width: this.size,
            height: this.size,
            data: this.value,
            image: this.img,
            dotsOptions: {
                color: color,
                type: 'rounded'
            },
            cornersSquareOptions: {
                // type: 'extra-rounded'
            },
            backgroundOptions: {
                color: 'transparent',
            },
            imageOptions: {
                crossOrigin: 'anonymous',
                margin: 5
            }
        })
    }

    render(){return html`
        <slot></slot>
    `}

    download(opts={}){
        this.qrCode?.download({extension: 'svg', ...opts})
    }

})

export default customElements.get('b-qr-code')