import { LitElement, html, css } from 'lit'
import View from './view'
import docs from 'bui/presenters/datepicker/README.md'
import Datepicker from 'bui/presenters/datepicker'

customElements.define('demo-presenter-datepicker', class extends View{

    static get title(){ return 'Datepicker' }

    get docs(){ return docs }

    renderContent(){ return html`

        <b-paper compact overshadow inline>
            <b-datepicker></b-datepicker>
        </b-paper>

        <br><br>
        <h2>Documentation</h2>
    `}

})

export default customElements.get('demo-presenter-datepicker')