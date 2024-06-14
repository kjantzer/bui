// TODO: add css vars for padding, borders, etc
import { LitElement, html, css } from 'lit'

customElements.define('b-table-row', class extends LitElement{

    static styles = css`
        :host {
            display: block !important;
        }
        
        main {
            display: grid;
            grid-template-columns: var(--table-template-cols);
        }

        :host([hover]:hover),
        :host(.popover-open) {
            background-color: var(--theme-bgd-accent2);
        }

        :host([hidden]) {
            display: none !important;
        }

        :host([slot="header"]) {
            background: var(--theme-bgd-accent);
            border-color: rgba(var(--theme-text-rgb), .1) !important;
        }

        :host([slot="header"]) main ::slotted(*) {
            border-color: rgba(var(--theme-text-rgb), .1);
        }

        main ::slotted(*),
        main > *:not(slot) {
            padding: var(--table-cell-padding, .75em);
        }

        main ::slotted(b-btn),
        main > b-btn {
            padding: 0;
        }

        main ::slotted(*:not(:last-child)),
        main > *:not(slot):not(:last-child) {
            border-right: solid 1px var(--theme-bgd-accent);
        }

        [name="before"]::slotted(*) {
            padding-left: var(--table-cell-padding, .75em);
            padding-right: var(--table-cell-padding, .75em);
        }
    `

    render(){return html`
        <slot name="before"></slot>
        <main><slot></slot></main>
        <slot name="after"></slot>
    `}

})

export default customElements.get('b-table-row')