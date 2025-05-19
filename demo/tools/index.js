import { LitElement, html, css } from 'lit'
import './utils'
import './lit'
import './backbone'

import './util'
import './helpers'
import './pi-pico'

customElements.define('demo-tools', class extends LitElement{

    static get title(){ return 'Tools' }
    static get icon(){ return 'construction' }
    static get path(){ return 'tools(/:tab)' }

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
        <b-tabs key="tools" layout="left" >
            <b-router-controller rootpath="tools/"></b-router-controller>

            demo-utils
            demo-lit-helpers
            demo-backbone-helpers

            demo-util
            demo-helpers
            demo-components-pipico
        </b-tabs>
    `}

})

export default customElements.get('demo-tools')