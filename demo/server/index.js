import { LitElement, html, css } from 'lit'
import './db'
import './api'
import './realtime'

customElements.define('demo-server', class extends LitElement{

    static get title(){ return 'Server' }
    static get icon(){ return 'database' }
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
        <b-tabs-router path="server/" key="server" layout="left" >
            demo-server-db
            demo-server-api
            demo-server-realtime
        </b-tabs-router>
    `}

})

export default customElements.get('demo-server')