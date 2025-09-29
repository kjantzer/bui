/*
    # Table Row

    See `<b-table>` for how to use
*/
// TODO: add css vars for padding, borders, etc
import { LitElement, html, css } from 'lit'

customElements.define('b-table-row', class extends LitElement{

    static styles = css`
        :host {
            display: block;
        }
        
        main {
            display: grid;
            grid-template-columns: var(--table-template-cols);
            grid-column: 1 / -1;
            height: 100%;
        }

        :host([hover]:hover),
        :host(.popover-open) {
            background-color: var(--theme-bgd-accent2);
        }

        :host([hover]:hover) ::slotted([sticky]),
        :host(.popover-open) ::slotted([sticky]) {
            background-color: var(--theme-bgd-accent2);
        }

        :host([hidden]) {
            display: none !important;
        }

        :host([slot="header"]), :host(.header) {
            background: var(--theme-bgd-accent);
            border-color: rgba(var(--theme-text-rgb), .1) !important;
        }

        :host([slot="header"]) main,
        :host(.header) main {
            align-items: center;
        }

        :host([slot="header"]) main ::slotted(*),
        :host(.header) main ::slotted(*) {
            border-color: rgba(var(--theme-text-rgb), .1);
        }

        main ::slotted(*),
        main > *:not(slot) {
            min-width: 0;
            padding: var(--table-cell-padding, .75em);
            align-self: stretch;
        }

        :host([dense]) ::slotted(*),
        :host([dense]) main > *:not(slot) {
            padding-top: .25em;
            padding-bottom: .25em;
        }

        main ::slotted(b-btn),
        main > b-btn {
            padding: 0;
            --radius: 0;
        }

        main ::slotted(*:not(:last-child)),
        main > *:not(slot):not(:last-child) {
            border-right: solid 1px var(--table-border-color, var(--theme-bgd-accent));
        }

        :host([spacer]) {
            height: 2px;
            background: var(--table-border-color, var(--theme-bgd-accent));
        }

        [name="before"]::slotted(*) {
            padding-left: var(--table-cell-padding, .75em);
            padding-right: var(--table-cell-padding, .75em);
        }

        ::slotted([colspan]) {
            grid-column: 1/-1 !important;
        }

        ::slotted([icon="add_box"][cell="no"]) {
            position: absolute;
            right: 0;
            bottom: -1em;
        }

        :host-context(b-table:not(:hover)) ::slotted([icon="add_box"][cell="no"]:not(.popover-open)) {
            display: none;
        }

        ::slotted([sticky]) {
            position: sticky;
            left: 0;
            background: var(--theme-bgd);
            z-index: 20;
        }

        ::slotted([sticky="right"]) {
            right: 0;
            left: auto;
            border-left: solid 1px var(--table-border-color, var(--theme-bgd-accent));
            margin-left: -1px;
        }

        :host([slot="header"]) ::slotted([sticky]) {
            background: var(--theme-bgd-accent);
        }
        
    `

    render(){return html`
        <slot name="before"></slot>
        <main><slot></slot></main>
        <slot name="after"></slot>
    `}

})

export default customElements.get('b-table-row')