import {html, css} from 'lit'
import App from 'bui/app/tabbar'
import './overview'
import './elements'
import './presenters'
import './tools'
import './server'
import './components'

customElements.define('demo-main', class extends App{

    static styles = [App.styles, css`
        :host {
            background-color: var(--theme-bgd);
        }
    `]

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