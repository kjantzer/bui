import { LitElement, html, css } from 'lit-element'

customElements.define('b-flex', class extends LitElement{

    static get styles(){return css`
        :host {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        :host([inline]) {
            display: inline-flex;
        }

        :host([col]) {
            flex-direction: column;
            align-items: flex-start;
        }

        :host([col][center]) {
            align-items: center;
        }
    `}

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-flex')