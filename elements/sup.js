/*
    DEPRECATED
*/
import { LitElement, html, css } from 'lit-element'

customElements.define('b-sup', class extends LitElement{

    static get styles(){return css`
        :host {
            display: inline-block;
            color: var(--b-sup-color, rgba(0,0,0,.4));
            vertical-align: super;
            font-size: .8em;
            margin-top: -1em;
        }

        :host([hidden]) { display: none; }
    `}
 
    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-sup')