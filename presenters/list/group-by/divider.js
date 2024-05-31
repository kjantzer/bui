import { LitElement, html, css } from 'lit'
import {sharedStyles} from '../header'

customElements.define('b-group-by-divider', class extends LitElement{

    static styles = [sharedStyles(':host'), css`
        :host {
            display: contents;
            --list-cell-padding-y: .25em;
            --list-cell-hover-bgd: var(--theme-bgd-accent);
            grid-column: 1/-1;
        }

        ::slotted(*) {
            background: var(--theme-bgd-accent);
        }

        :host([level="1"]) {
            position: var(--level-1-sticky, static);
            top: 0em;
            background: var(--theme-bgd);
            z-index: 10;
        }

        :host ::slotted(.end) {
            grid-column-end: -1; 
            text-align: right;
            justify-content: flex-end;
            background: var(--theme-bgd-accent);
        }

        :host([level="1"]) {
            background: var(--theme-bgd-accent)
        }

        :host([level="1"]) ::slotted(.label) {
            font-weight: bold;
            text-align: left;
        }

        :host([level="2"]) {
            position: var(--level-2-sticky, static);
            top: calc(1 * var(--row-height));
            /*top: 97px;*/
            background: var(--theme-bgd-accent);
            z-index: 10;
        }

        :host([level="2"]) ::slotted(.label) {
            text-align: left;
        }

        :host([level="3"]) {
            position: var(--level-3-sticky, static);
            top: calc(2 * var(--row-height));
            /*top: 97px;*/
            background: var(--divider-bgd, var(--theme-bgd-accent));
            z-index: 10;
        }

        :host([level="3"]) ::slotted(.label) {
            text-align: left;
            color: var(--theme-text-dim);
            font-style: italic;
        }

        ::slotted(.label) {
            /*padding-left: .5rem !important;*/
            --list-cell-sticky-bgd: var(--divider-bgd, var(--theme-bgd-accent));
        }
    `]

    updated(){
        let level = this.model.groupParent?.level??(this.model.level||1)
        this.setAttribute('level', level)
    }

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-group-by-divider')