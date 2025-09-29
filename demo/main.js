import {html, css} from 'lit'
import App from 'bui/app/tabbar'
import './overview'
import './elements'
import './presenters'
// import './tools'
import './server'
import './components'
import './tools/docs'

customElements.define('demo-main', class extends App{

    static styles = [App.styles, css`
        :host {
            --b-app-tab-bar-bgd: var(--theme-bgd) !important;
            background: none !important;
        }

        b-tabs::part(tab-bar) {
            border-right: none;
        }

        b-tabs::part(content) {
            background: none;
            box-shadow: var(--theme-shadow-1);
            margin-top: 2px;
            border-radius: 12px 0 0 0;
        }
    `]

    get views(){
        return html`
            demo-overview
            demo-elements
            demo-presenters
            demo-components
            demo-all-docs
            demo-server
        `
    }

})

export default customElements.get('demo-main')