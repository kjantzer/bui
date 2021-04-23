/*
    DEPRECATED
*/
import { LitElement, html, css } from 'lit-element'

customElements.define('b-sub', class extends LitElement{

    static get styles(){return css`
        :host {
            display: inline;
            position:relative;
            color: var(--b-sub-color, rgba(0,0,0,.4));
            font-size: .8em;
            font-weight: normal;
        }

        :host([ondark]) {
            color: rgba(255,255,255,.4);
        }
    `}

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-sub')