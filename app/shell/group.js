/*
    # App Sidebar Group

    Labeled section of `<b-app-sidebar-item>`s; the label becomes a divider line when the sidebar is a rail

    ```html
    <b-app-sidebar-group label="Browse">
        <b-btn slot="label-end" icon="add" clear pill sm></b-btn>
        <b-app-sidebar-item ...></b-app-sidebar-item>
    </b-app-sidebar-group>
    ```

    - `slot="label-end"` - shown at the right of the label (ex: an add btn); hidden when a rail
    - parts: `label` (the row), `label-text` (just the text; ex: to make only the text clickable)
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
            display: flex;
            align-items: center;
            gap: .25rem;
        }

        .label .text {
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        /* (doesn't make the label taller) */
        ::slotted([slot="label-end"]) {
            margin: -.5rem -.35rem -.5rem auto;
            flex-shrink: 0;
            transition: opacity 150ms;
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

        :host([rail]) ::slotted([slot="label-end"]) {
            opacity: 0;
            pointer-events: none;
        }

    `

    render(){return html`
        ${this.label?html`<div class="label" part="label"><span class="text" part="label-text">${this.label}</span><slot name="label-end"></slot></div>`:''}
        <slot></slot>
    `}

})

export default customElements.get('b-app-sidebar-group')
