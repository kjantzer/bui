import { LitElement, html, css } from 'lit-element'
import View from './view'
import docs from 'bui/presenters/search-popup/README.md'

customElements.define('demo-presenter-search-popup', class extends View{

    static get title(){ return 'Search Popup' }
    static get id(){ return 'search-popup' }

    static get styles(){return [super.styles, css`
        
    `]}

    get docs(){ return docs }


    renderContent(){ return html`

    `}

})

export default customElements.get('demo-presenter-search-popup')
