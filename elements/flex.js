import { LitElement, html, css } from 'lit'

customElements.define('b-flex', class extends LitElement{

    static get styles(){return css`
        :host {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            min-width: 0;
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
        :host([gap=" "]) { gap: .5ch; }
        :host([gap=".25"]) { gap: .25rem; }
        :host([gap=".5"]) { gap: .5rem; }
        :host([gap="1"]) { gap: 1rem; }
        :host([gap="2"]) { gap: 2rem; }

        /* comma separated list! */
        :host([gap=","]){ row-gap: 0ch; column-gap: 0ch; }
        :host([gap=","]) ::slotted(*:not(:last-child))::after {
            content: ', ';
            display: inline;
            margin-left: -0.35ch;
            margin-right: 0.75ch;
        }

        :host([gap="/"]){ row-gap: 0ch; column-gap: 0ch; }
        :host([gap="/"]) ::slotted(*:not(:last-child))::after {
            content: ' / ';
            display: inline;
            margin-left: -0.25ch;
            margin-right: 0.35ch;
        }

        :host([gap-col="0"]), :host([gap-col="none"]) { column-gap: 0; }
        :host([gap-col=" "]) { column-gap: .5ch; }
        :host([gap-col=".25"]) { column-gap: .25rem; }
        :host([gap-col=".5"]) { column-gap: .5rem; }
        :host([gap-col="1"]) { column-gap: 1rem; }
        :host([gap-col="2"]) { column-gap: 2rem; }

        :host([gap-row="0"]), :host([gap-row="none"]) { row-gap: 0; }
        :host([gap-row=" "]) { row-gap: .5ch; }
        :host([gap-row=".25"]) { row-gap: .25rem; }
        :host([gap-row=".5"]) { row-gap: .5rem; }
        :host([gap-row="1"]) { row-gap: 1rem; }
        :host([gap-row="2"]) { row-gap: 2rem; }

        :host ::slotted(*) {
            min-width: 0;
            min-height: 0;
        }

        :host ::slotted([noshrink]) {
            flex-shrink: 0;
        }

        :host ::slotted([grow]) {
            flex-grow: 1;
        }

        :host ::slotted([end]) {
            margin-left: auto;
        }
    `}

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-flex')