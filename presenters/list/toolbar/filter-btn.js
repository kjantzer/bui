import { LitElement, html, css } from 'lit'
import {unsafeHTML} from 'lit/directives/unsafe-html.js'
import '../../../elements/label'
import device from '../../../util/device'

customElements.define('b-list-filter-btn', class extends LitElement{

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

        b-label {
            grid-area: unset;
            color: var(--toolbarTextColor);
            margin: -0.5em 0px;
            position: relative;
            top: -0.5em;
            /* opacity: .4; */
        }

        b-icon {
            font-size: .8em;
            vertical-align: baseline;
            color: var(--toolbarTextColor);
            opacity: .4;
        }

        b-btn:not([active]) {
            color: var(--toolbarTextColor);
            opacity: .4;
        }

        b-btn[active] {
            font-weight: bold;
        }

        b-btn[active] b-label {
            color: var(--theme);
        }

        :host([larger]) b-btn {
            --padding: .5em;
            opacity: 1;
        }

        :host([larger]) b-btn:not([active]) b-label {
            opacity: .7;
        }

        :host([larger]) b-btn:not([active]) div {
            opacity: .4;
        }

        :host([larger]) b-btn[active] {
            box-shadow: 0 0 0 1px var(--theme) inset;
        }

        :host([larger]) b-btn[active] b-label {
            color: var(--theme);
        }

        :host([larger]) b-label {
            font-size: .8rem;
            margin: 0;
            line-height: 1em;
        }

        :host([larger]) div {
            font-size: 1.2rem;
        }
    `}

    render(){return html`
        <b-btn text ?active=${this.filter.isActive} @click=${this.showMenu}>
            <main>
                <b-label xs>${this.filter.label}</b-label>
                <div>
                    ${this.filter.icon?html`<b-icon name="${this.filter.icon}"></b-icon>`:''}
                    ${unsafeHTML(this.filter.valueLabel)}
                </div>
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
            opts.align = 'right'
            opts.overflowBoundry = 'window'
        }

        this.filter.showMenu(e.currentTarget, opts)
    }

})

export default customElements.get('b-list-filter-btn')