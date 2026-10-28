/*
    Nav View Link - an extra item in a <b-nav-view> bar that runs an action instead of showing a section
    (ex: open another panel). Looks like the section items in every mode.

    ```html
    <b-nav-view-link icon="timeline" label="Timeline" slot="menu:after:apps" @click=${...}></b-nav-view-link>
    <b-nav-view-link icon="search" label="Search" slot="menu:after" narrow-only @click=${...}></b-nav-view-link>
    ```

    - `external` - opens another view (ex: a different panel); shows a ↗ so it's clear it leaves this view
    - `narrow-only` - only shown when the nav view is narrow (bottom tab bar)
    - `keep` - never moved into the tab bar's "More" menu
*/
import { LitElement, html, css } from 'lit'
import '../../elements/icon'
import itemStyles from './item-styles'

customElements.define('b-nav-view-link', class extends LitElement{

    static properties = {
        icon: {type: String},
        label: {type: String},
        external: {type: Boolean, reflect: true}
    }

    static styles = [itemStyles, css`
        :host {
            display: contents;
        }

        :host([narrow-only]) {
            display: none;
        }

        /* narrow (set by b-nav-view): */
        :host([narrow])([narrow-only]) {
            display: contents;
        }
    

        .item {
            position: relative;
        }

        /* end of the row in the sidebar list; a corner badge when icon over label (see bar.js) */
        .external {
            position: var(--nav-item-external-position, static);
            top: .35em;
            right: .35em;
            margin-left: auto;
            --size: 1em;
            opacity: .8;
        }

        .item b-icon.external {
            font-size: inherit;
            width: auto;
            color: var(--theme-text-accent);
        }

        /* moved into the tab bar's "More" menu (set by the bar) */
        :host([hidden]),
        :host([overflowed]) {
            display: none !important;
        }
    `]

    render(){return html`
        <button class="item" part="item">
            ${this.icon?html`<b-icon name=${this.icon}></b-icon>`:''}
            <span>${this.label}</span>
            ${this.external?html`<b-icon name="call_made" class="external"></b-icon>`:''}
        </button>
    `}

})

export default customElements.get('b-nav-view-link')
