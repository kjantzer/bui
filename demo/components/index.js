import { LitElement, html, css } from 'lit'
import './search'
import './comments'
import './filebrowser'
import './filemanager'
import './tag-list'
import './screen-record'
import docs from '../../components/README.md'
import printViewDocs from '../../components/print-view/README.md'
import metadataDocs from '../../components/metadata/README.md'

customElements.define('demo-components', class extends LitElement{

    static get title(){ return 'Components' }
    static get icon(){ return 'view_sidebar' }
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
                <!-- <b-paper> -->
                    <b-text-divider bottom thick>
                        <b-text gradient xbold xxl>Components</b-text>
                    </b-text-divider>
                    <br>
                    
                    <demo-markdown-docs notoc .docs=${docs}></demo-markdown-docs>

                <!-- </b-paper> -->
            </div>

            demo-presenter-search
            demo-components-comments
            demo-components-filemanager
            demo-components-filebrowser
            demo-components-tag-list
            demo-components-screen-record

            <div title="Print View" path="print-view" id="print-view">
                <!-- <b-paper> -->
                    <b-h1>Print View</b-h1>
                    <demo-markdown-docs .docs=${printViewDocs}></demo-markdown-docs>
                <!-- </b-paper> -->
            </div>

            <div title="Metadata" path="metadata" id="metadata">
                <!-- <b-paper> -->
                    <b-h1>Metadata</b-h1>
                    <demo-markdown-docs .docs=${metadataDocs}></demo-markdown-docs>
                <!-- </b-paper> -->
            </div>

        </b-tabs-router>
    `}

})

export default customElements.get('demo-components')