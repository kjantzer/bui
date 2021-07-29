import { LitElement, html, css } from 'lit-element'

customElements.define('b-flex', class extends LitElement{

    static get styles(){return css`
        :host {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1em;
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

        :host([gap="0"]), :host([gap="none"]) { gap: 0; }
        :host([gap=".5"]) { gap: .5em; }
        :host([gap="1"]) { gap: 1em; }
        :host([gap="2"]) { gap: 2em; }
    `}

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-flex')