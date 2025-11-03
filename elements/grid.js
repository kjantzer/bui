/*
    # Grid

    A simplifed element for displaying common grid layouts

    ```html-preview
    <b-grid>
        <b-text>col 1 equal</b-text>
        <b-text>col 2 equal</b-text>

        <b-grid cols="auto,1">
            <b-text>col 1 auto</b-text>
            <b-text>col 2 fills the rest</b-text>
        </b-grid>
    </b-grid>
    ```

    ### Props
    - `cols` - some predefined (1-8, "2,1", "1,2", "auto,1", "1,auto")
    - `gap` - some gap adjustments (0, " ", .5, 1, 2)
    - `gap-row` - set uniq gap for the row (^same values)
*/
import { LitElement, html, css } from 'lit'
import {mediaQuery} from '../util/mediaQueries'

customElements.define('b-grid', class extends LitElement{

    static get styles(){return css`
        :host {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: max-content;
            align-content: flex-start;
            gap: 1em;
            min-width: 0;
        }

        :host([hidden]) {
            display: none;
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

        :host([rows="1"]) { grid-template-rows: 1fr; }
        :host([rows="2"]) { grid-template-rows: repeat(2, 1fr); }
        :host([rows="3"]) { grid-template-rows: repeat(3, 1fr); }
        :host([rows="4"]) { grid-template-rows: repeat(4, 1fr); }
        :host([rows="5"]) { grid-template-rows: repeat(5, 1fr); }
        :host([rows="6"]) { grid-template-rows: repeat(6, 1fr); }
        :host([rows="7"]) { grid-template-rows: repeat(7, 1fr); }
        :host([rows="8"]) { grid-template-rows: repeat(8, 1fr); }

        /* two-thirds, one-third */
        :host([cols="2,1"]) { grid-template-columns: 2fr 1fr; }
        :host([cols="1,2"]) { grid-template-columns: 1fr 2fr; }

        /* half, quarter, quarter */
        :host([cols="2,1,1"]) { grid-template-columns: 2fr 1fr 1fr; }
        :host([cols="1,1,2"]) { grid-template-columns: 1fr 1fr 2fr; }

        :host([cols="auto,auto"]) { grid-template-columns: auto auto; }
        :host([cols="auto,1"]) { grid-template-columns: auto 1fr; }
        :host([cols="1,auto"]) { grid-template-columns: 1fr auto; }

        :host([rows="auto,1"]) { grid-template-rows: auto 1fr; }
        :host([rows="1,auto"]) { grid-template-rows: 1fr auto; }

        :host([rows="2,1"]) { grid-template-rows: 2fr 1fr; }
        :host([rows="1,2"]) { grid-template-rows: 1fr 2fr; }

        ${mediaQuery('sm', css`
            :host([cols-mobile="1"]) { grid-template-columns: 1fr; }
            :host([cols-mobile="2"]) { grid-template-columns: repeat(2, 1fr); }
            :host([cols-mobile="3"]) { grid-template-columns: repeat(3, 1fr); }
            :host([cols-mobile="2,1"]) { grid-template-columns: 2fr 1fr; }
            :host([cols-mobile="1,2"]) { grid-template-columns: 1fr 2fr; }

            :host([cols-mobile]) ::slotted([colspan]),
            :host([cols-mobile]) [colspan] {grid-column: 1/-1 !important;}

            :host([rows-mobile="auto,1"]) { grid-template-rows: auto 1fr; }
            :host([rows-mobile="1,auto"]) { grid-template-rows: auto 1fr; }
        `)}

        :host([gap="0"]), :host([gap="none"]) { gap: 0; }
        :host([gap="gutter"]) { gap: var(--gutter, 1em); }
        :host([gap=" "]) { gap: .5ch; }
        :host([gap=".17"]) { gap: .17em; }
        :host([gap=".25"]) { gap: .25em; }
        :host([gap=".5"]) { gap: .5em; }
        :host([gap="1"]) { gap: 1em; }
        :host([gap="2"]) { gap: 2em; }

        :host([gap-col="0"]), :host([gap-col="none"]) { column-gap: 0; }
        :host([gap-col="gutter"]) { column-gap: var(--gutter, 1em); }
        :host([gap-col=" "]) { column-gap: .5ch; }
        :host([gap-col=".25"]) { column-gap: .25em; }
        :host([gap-col=".5"]) { column-gap: .5em; }
        :host([gap-col="1"]) { column-gap: 1em; }
        :host([gap-col="2"]) { column-gap: 2em; }

        :host([gap-row="0"]), :host([gap-row="none"]) { row-gap: 0; }
        :host([gap-row="gutter"]) { row-gap: var(--gutter, 1em); }
        :host([gap-row=" "]) { row-gap: .5ch; }
        :host([gap-row=".25"]) { row-gap: .25em; }
        :host([gap-row=".5"]) { row-gap: .5em; }
        :host([gap-row="1"]) { row-gap: 1em; }
        :host([gap-row="2"]) { row-gap: 2em; }

        :host([align="start"]) { justify-items: flex-start; }
        :host([align="center"]) { justify-items: center; }
        :host([align="end"]) { justify-items: flex-end; }

        ::slotted([colspan]) { grid-column: 1/-1; }
        ::slotted([colspan="2"]) { grid-column: span 2; }
        ::slotted([colspan="3"]) { grid-column: span 3; }
        ::slotted([colspan="4"]) { grid-column: span 4; }
        ::slotted([colspan="5"]) { grid-column: span 5; }
        ::slotted([colspan="6"]) { grid-column: span 6; }

        ::slotted([rowspan]) { grid-row: 1/-1; }
        ::slotted([rowspan="2"]) { grid-row: span 2; }
        ::slotted([rowspan="3"]) { grid-row: span 3; }
        ::slotted([rowspan="4"]) { grid-row: span 4; }
        ::slotted([rowspan="5"]) { grid-row: span 5; }
        ::slotted([rowspan="6"]) { grid-row: span 6; }

        ${mediaQuery('sm', css`
            ::slotted([colspan-mobile]) { grid-column: 1/-1; }
            ::slotted([colspan-mobile="2"]) { grid-column: span 2; }
            ::slotted([colspan-mobile="3"]) { grid-column: span 3; }
            ::slotted([colspan-mobile="4"]) { grid-column: span 4; }
            ::slotted([colspan-mobile="5"]) { grid-column: span 5; }
            ::slotted([colspan-mobile="6"]) { grid-column: span 6; }

            ::slotted([rowspan-mobile]) { grid-row: 1/-1; }
            ::slotted([rowspan-mobile="2"]) { grid-row: span 2; }
            ::slotted([rowspan-mobile="3"]) { grid-row: span 3; }
            ::slotted([rowspan-mobile="4"]) { grid-row: span 4; }
            ::slotted([rowspan-mobile="5"]) { grid-row: span 5; }
            ::slotted([rowspan-mobile="6"]) { grid-row: span 6; }
        `)}
    `}

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-grid')