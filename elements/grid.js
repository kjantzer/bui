import { LitElement, html, css } from 'lit-element'

customElements.define('b-grid', class extends LitElement{

    static get styles(){return css`
        :host {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1em;
            min-width: 0;
        }

        ::slotted(*) {
            min-width: 0;
            min-height: 0;
        }

        /* standard/simple colums */
        :host([cols="1"]) { grid-template-columns: 1fr; }
        :host([cols="2"]) { grid-template-columns: repeat(2, 1fr); }
        :host([cols="3"]) { grid-template-columns: repeat(3, 1fr); }
        :host([cols="4"]) { grid-template-columns: repeat(4, 1fr); }
        :host([cols="5"]) { grid-template-columns: repeat(5, 1fr); }
        :host([cols="6"]) { grid-template-columns: repeat(6, 1fr); }
        :host([cols="7"]) { grid-template-columns: repeat(7, 1fr); }
        :host([cols="8"]) { grid-template-columns: repeat(8, 1fr); }

        /* two-thirds, one-third */
        :host([cols="2,1"]) { grid-template-columns: 2fr 1fr; }
        :host([cols="1,2"]) { grid-template-columns: 1fr 2fr; }

        /* half, quarter, quarter */
        :host([cols="2,1,1"]) { grid-template-columns: 2fr 1fr 1fr; }
        :host([cols="1,1,2"]) { grid-template-columns: 1fr 1fr 2fr; }

        @media (max-width:699px){
            :host([cols-mobile="1"]) { grid-template-columns: 1fr; }
            :host([cols-mobile="2"]) { grid-template-columns: repeat(2, 1fr); }
            :host([cols-mobile="3"]) { grid-template-columns: repeat(3, 1fr); }
            :host([cols-mobile="2,1"]) { grid-template-columns: 2fr 1fr; }
            :host([cols-mobile="1,2"]) { grid-template-columns: 1fr 2fr; }

            :host([cols-mobile]) ::slotted([colspan]) {grid-column: 1/-1;}
        }

        :host([gap="0"]), :host([gap="none"]) { gap: 0; }
        :host([gap=".5"]) { gap: .5em; }
        :host([gap="1"]) { gap: 1em; }
        :host([gap="2"]) { gap: 2em; }

        :host([align="start"]) { justify-items: flex-start; }
        :host([align="center"]) { justify-items: center; }
        :host([align="end"]) { justify-items: flex-end; }

        ::slotted([colspan]) { grid-column: 1/-1; }
        ::slotted([colspan="2"]) { grid-column: span 2; }
        ::slotted([colspan="3"]) { grid-column: span 3; }
        ::slotted([colspan="4"]) { grid-column: span 4; }
        ::slotted([colspan="5"]) { grid-column: span 5; }
        ::slotted([colspan="6"]) { grid-column: span 6; }
    `}

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-grid')