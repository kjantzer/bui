import { LitElement, html, css } from 'lit'
import './db'
import './api'
import './realtime'
import './model'
import './filemanager'
import './search'

customElements.define('demo-server', class extends LitElement{

    static get title(){ return 'Server' }
    static get icon(){ return 'storage' }
    static get path(){ return 'server(/:tab)' }

    static get styles(){return css`
        :host {
            height: 100%;
            display: grid;
            grid-template-rows: 1fr;
            position:relative;
            overflow: hidden;
        }
    `}

    render(){return html`
        <b-tabs key="server" layout="left" >
            <b-router-controller rootpath="server/"></b-router-controller>

            demo-server-api
            demo-server-db
            demo-server-model
            demo-server-search
            demo-server-filemanager
            demo-server-realtime
        </b-tabs>
    `}

})

export default customElements.get('demo-server')