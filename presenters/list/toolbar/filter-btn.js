import { LitElement, html, css } from 'lit-element'
import {unsafeHTML} from 'lit-html/directives/unsafe-html'
import '../../../elements/label'

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
        }

        b-label {
            grid-area: unset;
            color: var(--toolbarTextColor);
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
        // this.addEventListener('filter-changed', this.update, true)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.filter.off('change', this.update)
        // this.removeEventListener('filter-changed', this.update, true)
    }

    showMenu(e){
        this.filter.showMenu(e.currentTarget)
    }

})

export default customElements.get('b-list-filter-btn')