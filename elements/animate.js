/*
    #  Animate

    Wrap around any element to add some basic animation on hover

    ```html-preview
    <b-animate scale><b-text>default</b-text></b-animate>
    <b-animate scale="1.4"><b-text>larger</b-text></b-animate>
    <b-animate scale="1.4" speed="500"><b-text>slower</b-text></b-animate>
    ```

    Props
    - `scale` (1.05)
    - `speed` (120ms)
*/
import { LitElement, html, css } from 'lit'

customElements.define('b-animate', class extends LitElement{

    static get properties(){return {
        scale: {type: Number},
        speed: {type: Number}
    }}

    static get styles(){return css`
        :host {
            display: contents !important;
        }

        :host([hidden]) {
            display: none !important;
        }

        @media (hover){
            ::slotted(*) {
                transition: var(--speed, 120ms) cubic-bezier(0.6, -0.28, 0.735, 0.045);
            }

            :host([scale]) ::slotted(*:hover),
            :host([scale]) ::slotted(*.popover-open) {
                transform: scale(var(--scale, 1.05));
            }
        }
    `}

    updated(){
        this.style.setProperty('--scale', this.scale||1.05)
        this.style.setProperty('--speed', (this.speed||120)+'ms')
    }

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-animate')