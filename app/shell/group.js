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
    - `collapse-key` - clicking the label collapses the group (its items hide); remembered in this browser by the key.
      A rail keeps it collapsed (its divider line toggles it too)
      - `textaction` - the label's text has its own click (ex: opens a menu); the rest of the row and its chevron collapse
*/
import { LitElement, html, css } from 'lit'
import localStore from '../../util/store'

const storeKey = key=>'b-app-sidebar-group:collapsed:'+key

function isCollapsed(key){
    try{ return !!localStore(storeKey(key)) }catch(err){ return false }
}

customElements.define('b-app-sidebar-group', class extends LitElement{

    static properties = {
        label: {type: String},
        rail: {type: Boolean, reflect: true},
        collapseKey: {type: String, attribute: 'collapse-key'},
        collapsed: {type: Boolean, reflect: true},
        textaction: {type: Boolean}
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

        /* collapsible (collapse-key): click the label; a chevron shows on hover, and while collapsed */
        :host([collapse-key]) .label {
            cursor: pointer;
            user-select: none;
        }

        .chevron {
            display: none;
            flex-shrink: 0;
            width: .4em;
            height: .4em;
            margin: 0 .2em 0 -.75em;
            border: solid currentColor;
            border-width: 0 1.5px 1.5px 0;
            transform: rotate(45deg) translate(-.1em, -.1em); /* (pointing down: open) */
            opacity: 0;
            transition: opacity 150ms, transform 150ms;
        }

        :host([collapse-key]:not([rail])) .chevron {
            display: block;
        }

        :host([collapse-key]:not([rail])) .label:hover .chevron,
        :host([collapsed]:not([rail])) .chevron {
            opacity: 1;
        }

        :host([collapsed]) .chevron {
            transform: rotate(-45deg); /* (pointing right: collapsed) */
        }

        :host([collapse-key]:not([rail]):not([textaction])) .label:hover {
            color: var(--theme-text);
        }

        :host([collapsed]) ::slotted(:not([slot])) {
            display: none;
        }

    `

    willUpdate(changed){
        if( changed.has('collapseKey') )
            this.collapsed = !!this.collapseKey && isCollapsed(this.collapseKey)
    }

    render(){return html`
        ${this.label?html`<div class="label" part="label" @click=${this.onLabelClick}><i class="chevron"></i><span class="text" part="label-text">${this.label}</span><slot name="label-end"></slot></div>`:''}
        <slot></slot>
    `}

    // collapse/expand (not from the label-end btns, or the text when it has its own action)
    onLabelClick(e){
        if( !this.collapseKey ) return
        let path = e.composedPath()
        if( path.some(el=>el.slot == 'label-end') ) return
        if( this.textaction && path.some(el=>el.getAttribute?.('part') == 'label-text') ) return
        this.toggleCollapsed()
    }

    toggleCollapsed(collapsed=!this.collapsed){
        this.collapsed = collapsed
        try{ localStore(storeKey(this.collapseKey), collapsed || null) }catch(err){}
    }

})

export default customElements.get('b-app-sidebar-group')
