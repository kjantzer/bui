import App from 'bui/presenters/tabs/app'
import './overview'
import './elements'
import './presenters'
import './util'
import './server'

customElements.define('demo-main', class extends App{

    get views(){
        return `
            demo-overview
            demo-elements
            demo-presenters
            demo-util
            demo-server
        `
    }

})

export default customElements.get('demo-main')