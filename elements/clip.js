import { LitElement, html, css } from 'lit-element'

customElements.define('b-clip', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    `}

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-clip')