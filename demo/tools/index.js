import { LitElement, html, css } from 'lit-element'
import './util'
import './helpers'

customElements.define('demo-tools', class extends LitElement{

    static get title(){ return 'Tools' }
    static get icon(){ return 'wrench' }
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
        <b-tabs-router path="tools/" key="tools" layout="left" >
            demo-util
            demo-helpers
        </b-tabs-router>
    `}

})

export default customElements.get('demo-tools')