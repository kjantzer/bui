/*
    DEPRECATED
*/
import { LitElement, html, css } from 'lit'

customElements.define('b-clip', class extends LitElement{

    static get styles(){return css`
        :host {
            display: inline-block;
            max-width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            vertical-align: text-bottom;
        }
    `}

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-clip')