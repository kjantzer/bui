/*
    An active list filter in the toolbar: "Label: value"

    Click to change it (emits `open-filter`; see ./filters-view.js), ✕ to clear it
    A pinned filter that isn't applied shows just its label (outlined)
*/
import { LitElement, html, css } from 'lit'
import {unsafeHTML} from 'lit/directives/unsafe-html.js'

customElements.define('b-list-filter-chip', class extends LitElement{

    static properties = {
        filter: {attribute: false}
    }

    static styles = css`
        :host {
            display: inline-flex;
            align-items: center;
            max-width: 22rem;
            border-radius: 2em;
            background: color-mix(in srgb, var(--theme) 14%, transparent);
            color: var(--theme-text);
            font-size: .9em;
            line-height: 1.2;
            cursor: pointer;
            user-select: none;
        }

        @media (hover) {
            :host(:hover) {
                background: color-mix(in srgb, var(--theme) 22%, transparent);
            }
        }

        .text {
            padding: .3em .2em .3em .75em;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .value {
            font-weight: 600;
        }

        .clear {
            flex-shrink: 0;
            display: grid;
            place-items: center;
            width: 1.6em;
            height: 1.6em;
            margin-right: .15em;
            border-radius: 50%;
            color: var(--theme-text-accent);
        }

        @media (hover) {
            .clear:hover {
                background: color-mix(in srgb, var(--theme-text) 12%, transparent);
                color: var(--theme-text);
            }
        }

        .clear b-icon {
            font-size: .8em;
        }

        /* pinned, not applied */
        :host([inactive]) {
            background: none;
            box-shadow: inset 0 0 0 1px var(--theme-bgd-accent2);
            color: var(--theme-text-accent);
        }

        @media (hover) {
            :host([inactive]:hover) {
                background: var(--theme-bgd-accent);
                color: var(--theme-text);
            }
        }

        :host([inactive]) .text {
            padding-right: .75em;
        }
    `

    connectedCallback(){
        super.connectedCallback()
        this.refresh ||= ()=>this.requestUpdate()
        this.listenTo(this.filter)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.listenTo(null)
    }

    // (re-listen when given a different filter)
    willUpdate(changed){
        if( changed.has('filter') && this.isConnected )
            this.listenTo(this.filter)
    }

    listenTo(filter){
        if( this.__listening == filter ) return
        this.__listening?.off('change', this.refresh)
        this.__listening = filter
        filter?.on('change', this.refresh)
    }

    updated(){
        this.toggleAttribute('inactive', !this.filter.isActive)
    }

    render(){
        if( !this.filter.isActive ) return html`
            <span class="text" @click=${this.open}>${this.filter.label}</span>
        `

        return html`
        <span class="text" title=${this.filter.label+': '+stripTags(this.filter.valueLabel)} @click=${this.open}>
            ${this.filter.label}: <span class="value">${unsafeHTML(String(this.filter.valueLabel ?? ''))}</span>
        </span>
        <span class="clear" title="Clear" @click=${this.clear}><b-icon name="close"></b-icon></span>
    `}

    open(){
        this.dispatchEvent(new CustomEvent('open-filter', {bubbles: true, composed: true}))
    }

    clear(e){
        e.stopPropagation()
        this.filter.value = null
    }

})

function stripTags(s){
    return String(s ?? '').replace(/<[^>]+>/g, '')
}

export default customElements.get('b-list-filter-chip')
