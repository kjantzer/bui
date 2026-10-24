/*
    An active list filter in the toolbar: "Label: value"

    Click to change it (emits `open-filter`; see ./filters-view.js), ✕ to clear it
*/
import { LitElement, html, css } from 'lit'
import {unsafeHTML} from 'lit/directives/unsafe-html.js'

customElements.define('b-list-filter-chip', class extends LitElement{

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
    `

    connectedCallback(){
        super.connectedCallback()
        this.refresh ||= ()=>this.requestUpdate()
        this.filter?.on('change', this.refresh)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.filter?.off('change', this.refresh)
    }

    render(){return html`
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
