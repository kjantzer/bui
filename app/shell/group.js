/*
    # App Sidebar Group

    Labeled section of `<b-app-sidebar-item>`s; the label becomes a divider line when the sidebar is a rail

    ```html
    <b-app-sidebar-group label="Browse">
        <b-app-sidebar-item ...></b-app-sidebar-item>
    </b-app-sidebar-group>
    ```
*/
import { LitElement, html, css } from 'lit'

customElements.define('b-app-sidebar-group', class extends LitElement{

    static properties = {
        label: {type: String},
        rail: {type: Boolean, reflect: true}
    }

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 1px;
            flex-shrink: 0;
        }

        .label {
            font-size: var(--font-size-xs, .75em);
            font-weight: 600;
            letter-spacing: .06em;
            text-transform: uppercase;
            color: var(--theme-text-accent);
            padding: 1rem .65rem .35rem;
            white-space: nowrap;
            overflow: hidden;
        }

        :host(:first-child) .label {
            padding-top: .25rem;
        }

        /* rail: text fades out and a divider line fades in (same height, so nothing below moves) */
        .label {
            position: relative;
            transition: color 150ms 70ms;
        }

        .label::after {
            content: '';
            position: absolute;
            left: .65rem;
            width: calc(1.4em / .75); /* icon width (label is a smaller font) */
            top: calc(50% + .3rem); /* middle of the text */
            height: 1px;
            background: rgba(var(--theme-text-rgb), .2);
            opacity: 0;
            transition: opacity 150ms;
        }

        :host([rail]) .label {
            color: transparent;
            transition: color 100ms;
        }

        :host([rail]) .label::after {
            opacity: 1;
        }

    `

    render(){return html`
        ${this.label?html`<div class="label" part="label">${this.label}</div>`:''}
        <slot></slot>
    `}

})

export default customElements.get('b-app-sidebar-group')
