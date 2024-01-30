// TODO: add css vars for padding, borders, etc
import { LitElement, html, css } from 'lit'

customElements.define('b-table-row', class extends LitElement{

    static styles = css`
        :host {
            display: grid;
        }

        :host([slot="header"]) {
            background: var(--theme-bgd-accent);
        }

        ::slotted(*) {
            padding: .75em;
        }

        ::slotted(*:not(:last-child)) {
            border-right: solid 1px var(--theme-bgd-accent);
        }
    `

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-table-row')