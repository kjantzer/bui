import {html} from 'lit'
import App from 'bui/app/tabbar'
import './overview'
import './elements'
import './presenters'
import './tools'
import './server'
import './components'

customElements.define('demo-main', class extends App{

    get views(){
        return html`
            demo-overview
            demo-elements
            demo-presenters
            demo-components
            demo-tools
            demo-server
        `
    }

})

export default customElements.get('demo-main')