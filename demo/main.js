import {html} from 'lit-element'
import App from 'bui/presenters/tabs/app'
import './overview'
import './elements'
import './presenters'
import './tools'
import './server'

customElements.define('demo-main', class extends App{

    get views(){
        return html`
            demo-overview
            demo-elements
            demo-presenters
            demo-tools
            demo-server
        `
    }

})

export default customElements.get('demo-main')