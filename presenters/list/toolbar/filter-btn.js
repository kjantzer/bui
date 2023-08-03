import { LitElement, html, css } from 'lit'
import {unsafeHTML} from 'lit/directives/unsafe-html.js'
import '../../../elements/text'
import device from '../../../util/device'

customElements.define('b-list-filter-btn', class extends LitElement{

    static properties = {
        full: {type: Boolean}
    }

    static get styles(){return css`
        :host {
            display: inline-block;
        }

        b-btn {
            --color: var(--toolbarTextColor);
        }

        main {
            display: inline-grid;
            line-height: 1.2em;
            margin-bottom: -.25em;
        }

        .label {
            grid-area: unset;
            color: var(--toolbarTextColor);
            margin: -0.5em 0px;
            position: relative;
            top: -0.5em;
            line-height: 1em;
            font-size: .9em;
            /* opacity: .4; */
        }

        b-icon {
            font-size: .8em;
            vertical-align: baseline;
            color: var(--toolbarTextColor);
            opacity: .8;
        }

        b-btn:not([active]) {
            color: var(--toolbarTextColor);
            opacity: .8;
        }

        b-btn:not([active]).popover-open {
            opacity: 1;
        }

        b-btn[active] {
            font-weight: bold;
        }

        b-btn[active] .label {
            color: var(--theme);
        }

        :host([larger]) b-btn {
            --padding: .5em;
            opacity: 1;
        }

        :host([larger]) b-btn:not([active]) .label {
            opacity: .7;
        }

        :host([larger]) b-btn:not([active]) div {
            opacity: .8;
        }

        :host([larger]) b-btn[active] {
            box-shadow: 0 0 0 1px var(--theme) inset;
        }

        :host([larger]) b-btn[active] .label {
            color: var(--theme);
        }

        :host([larger]) .label {
            font-size: 1rem;
            margin: 0;
            line-height: 1em;
        }

        :host([larger]) div {
            font-size: 1.2rem;
        }

        :host([full]) main {
            display: grid;
            gap: 1em;
            grid-template-columns: auto 1fr;
        }

        :host([full]) b-btn {
            display: block;
            --padding: .5em;
            opacity: 1;
        }

        :host([full]) b-btn::part(main) {
            align-items: unset;
        }

        :host([full]) b-btn:not([active]) .label {
            opacity: .7;
        }

        :host([full]) b-btn:not([active]) div {
            opacity: .8;
        }

        :host([full]) b-btn[active] {
            box-shadow: 0 0 0 1px var(--theme) inset;
        }

        :host([full]) b-btn[active] .label {
            color: var(--theme);
        }
    `}

    render(){return html`
        <b-btn text ?active=${this.filter.isActive} @click=${this.showMenu}>
            <main>
                ${this.full?html`
                    <b-text class="">${this.filter.label}: </b-text>
                `:html`
                    <b-text xs ucase bold class="label">${this.filter.label}</b-text>
                `}
                <b-text block caps>
                    ${this.filter.icon?html`<b-icon name="${this.filter.icon}"></b-icon>`:''}
                    ${unsafeHTML(this.filter.valueLabel)}
                </b-text>
            </main>
        </b-btn>
    `}

    connectedCallback(){
        super.connectedCallback()
        this.update = this.update.bind(this)
        this.filter.on('change', this.update)
        this.requestUpdate()
        // this.addEventListener('filter-changed', this.update, true)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.filter.off('change', this.update)
        // this.removeEventListener('filter-changed', this.update, true)
    }

    showMenu(e){
        let opts = {}

        if( this.hasAttribute('larger') && !device.isSmallDevice ){
            // opts.align = 'right'
            opts.overflowBoundry = 'window'
        }

        this.filter.showMenu(e.currentTarget, opts)
    }

})

export default customElements.get('b-list-filter-btn')