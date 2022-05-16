import { LitElement, html, css } from 'lit'
import device from '../../util/device'
import './tips'

customElements.define('b-search-popup-empty-results', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            height: 100%;
        }

        b-code {
            color: var(--theme-bgd);
            background-color: var(--theme-text);
        }

        b-empty-state {
            color: var(--theme-text-accent);
        }
    `}

    render(){return html`

        ${this.list.coll.length==0&&this.list.coll.term?html`

            <b-empty-state>No results found</b-empty-state>

        `:device.isMobile?'':html`
            <b-empty-state sm>
                <b-search-popup-tips></b-search-popup-tips>
            </b-empty-state>
        `}
    `}

})

export default customElements.get('b-search-popup-empty-results')