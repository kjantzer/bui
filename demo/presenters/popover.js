import { LitElement, html, css } from 'lit-element'
import View from './view'
import docs from 'bui/presenters/popover/README.md'

customElements.define('demo-presenter-popover', class extends View{

    static get title(){ return 'Popover' }

    static get styles(){return [super.styles, css`
        
    `]}

    get docs(){ return docs }


    renderContent(){ return html`

    `}

})

export default customElements.get('demo-presenter-popover')
