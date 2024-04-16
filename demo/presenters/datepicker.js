import { LitElement, html, css } from 'lit'
import View from './view'
import docs from 'bui/presenters/datepicker/README.md'
import Datepicker from 'bui/presenters/datepicker'

customElements.define('demo-presenter-datepicker', class extends View{

    static styles = [View.styles, css`
    
        b-datepicker {
            height: 500px;
        }
    `]

    static get title(){ return 'Datepicker' }

    get docs(){ return docs }

    renderContent(){ return html`
        <b-flex wrap>
            <b-paper compact overshadow inline>
                <b-datepicker @done=${this.onDatePickerDone}></b-datepicker>
            </b-paper>
        </b-flex>

        <br><br>
        <h2>Documentation</h2>
    `}

    onDatePickerDone(e){
        let {action, value} = e.detail
        console.log(action, value);
    }

})

export default customElements.get('demo-presenter-datepicker')