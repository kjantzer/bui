import { LitElement, html, css } from 'lit'
import View from '../presenters/view'
import docs from 'bui/components/search/README.md'

customElements.define('demo-presenter-search', class extends View{

    static get title(){ return 'Search' }
    static get id(){ return 'search' }

    static get styles(){return [super.styles, css`
        
    `]}

    get docs(){ return docs }


    renderContent(){ return html`

    `}

})

export default customElements.get('demo-presenter-search')
