import { LitElement, html, css } from 'lit'
import {until} from 'lit/directives/until.js';

customElements.define('b-until', class extends LitElement{

    static get properties(){return {
        value: {type: Object},
        placeholder: {type: String}
    }}

    render(){return html`
        ${this.value?until(this.value, html`<slot></slot>`):html`<slot></slot>`}
    `}

})