import View, {html} from '../presenters/view'
import docs from 'bui/components/screen-record/README.md'
import ScreenRecord from 'bui/components/screen-record'

customElements.define('demo-components-screen-record', class extends View{

    static title = 'Screen Record'
    static icon = 'screen_share'
    docs = docs

    renderDocsHeader(){ return html`

        <b-btn color="theme-gradient" @click=${this.showScreenRecord}>Open Screen Record</b-btn>

    `}

    showScreenRecord(){
        ScreenRecord.shared.open()
    }

})