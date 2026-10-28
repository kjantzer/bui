import { LitElement, html, css } from 'lit'
import '../../presenters/nav-view'
import './db'
import './api'
import './realtime'
import './model'
import './filemanager'
import './search'

customElements.define('demo-server', class extends LitElement{

    static get title(){ return 'Server' }
    static get icon(){ return 'storage' }
    static get path(){ return 'server(/*)' }

    static get styles(){return css`
        :host {
            height: 100%;
            display: grid;
            grid-template-rows: 1fr;
            position:relative;
            overflow: hidden;
        }

        /* (b-nav-view doesn't pad its sections; the doc pages are plain divs/sections) */
        b-nav-view {
            --contentPadding: var(--view-gutter, 2em);
        }
    `}

    render(){return html`
        <b-nav-view key="server">
            <b-router-controller rootpath="server/"></b-router-controller>

            demo-server-api
            demo-server-db
            demo-server-model
            demo-server-search
            demo-server-filemanager
            demo-server-realtime
        </b-nav-view>
    `}

})

export default customElements.get('demo-server')