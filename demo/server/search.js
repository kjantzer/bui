import { LitElement, html, css } from 'lit'
import View from '../presenters/view'
import docs from '../../server/search/README.md'

customElements.define('demo-server-search', class extends View{

    static get title(){ return 'Search' }
    static get id(){ return 'search' }

    static get styles(){return [super.styles, css`
        
    `]}

    get docs(){ return docs }


    renderContent(){ return html`

    `}

})

export default customElements.get('demo-server-search')
