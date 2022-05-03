import { LitElement, html, css } from 'lit-element'

customElements.define('b-flex', class extends LitElement{

    static get styles(){return css`
        :host {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1em;
        }

        :host([hidden]) {
            display: none;
        }

        :host([wrap]) {
            flex-wrap: wrap;
        }

        :host([top]) {
            align-items: flex-start;
        }
        
        :host([bottom]) {
            align-items: flex-end;
        }

        :host([left]) {
            justify-content: flex-start;
        }

        :host([right]) {
            justify-content: flex-end;
        }

        :host([center]) {
            justify-content: center;
        }

        :host([inline]) {
            display: inline-flex;
        }

        :host([col]) {
            flex-direction: column;
            align-items: flex-start;
        }

        :host([col][stretch]) {
            align-items: stretch;
        }

        :host([col][left]) {
            align-items: flex-start;
        }

        :host([col][right]) {
            align-items: flex-end;
        }

        :host([col][center]) {
            align-items: center;
        }

        :host([col][left][center]) {
            align-items: flex-start;
            justify-content: center;
        }

        :host([gap="0"]), :host([gap="none"]) { gap: 0; }
        :host([gap=".25"]) { gap: .25em; }
        :host([gap=".5"]) { gap: .5em; }
        :host([gap="1"]) { gap: 1em; }
        :host([gap="2"]) { gap: 2em; }

        :host ::slotted(*) {
            min-width: 0;
            min-height: 0;
        }

        :host ::slotted([noshrink]) {
            flex-shrink: 0;
        } 
    `}

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-flex')