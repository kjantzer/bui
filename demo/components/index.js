import { LitElement, html, css } from 'lit-element'
import './search'
import './comments'
import docs from '../../components/README.md'

customElements.define('demo-components', class extends LitElement{

    static get title(){ return 'Components' }
    static get icon(){ return 'cube' }
    static get path(){ return 'components(/:tab)' }

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
        <b-tabs-router path="components/" key="components" layout="left" >
            <div title="About">
                <b-paper>
                    <b-h1>Components</b-h1>
                    <demo-markdown-docs notoc .docs=${docs}></demo-markdown-docs>
                </b-paper>
            </div>
            demo-presenter-search
            demo-components-comments
        </b-tabs-router>
    `}

})

export default customElements.get('demo-components')