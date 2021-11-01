import { LitElement, html, css } from 'lit-element'
import View from './view'
import docs from 'bui/presenters/calendar/README.md'

customElements.define('demo-presenter-calendar', class extends View{

    static get title(){ return 'Calendar v2' }

    static get styles(){return [super.styles, css`
        
    `]}

    get docs(){ return docs }


    renderContent(){ return html`

    `}

})
