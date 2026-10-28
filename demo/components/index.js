import { LitElement, html, css } from 'lit'
import '../../presenters/nav-view'
import './search'
import './comments'
import './filebrowser'
import './filemanager'
import './tag-list'
import './screen-record'
import '../tools/pi-pico'
import docs from '../../components/README.md'
import printViewDocs from '../../components/print-view/README.md'
import metadataDocs from '../../components/metadata/README.md'
import onixDocs from '../../util/onix/README.md'
import marcDocs from '../../util/marc/README.md'

customElements.define('demo-components', class extends LitElement{

    static get title(){ return 'Components' }
    static get icon(){ return 'view_sidebar' }
    static get path(){ return 'components(/*)' }

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
        <b-nav-view key="components">
            <b-router-controller rootpath="components/"></b-router-controller>
            
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
            demo-components-pipico

            <div title="Print View" path="print-view" id="print-view">
                <!-- <b-paper> -->
                    <b-h1>Print View</b-h1>
                    <demo-markdown-docs .docs=${printViewDocs}></demo-markdown-docs>
                <!-- </b-paper> -->
            </div>

            <div title="Metadata" path="metadata" id="metadata">
                <b-h1>Metadata</b-h1>
                <demo-markdown-docs .docs=${metadataDocs}></demo-markdown-docs>
            </div>

            <div title="ONIX" path="onix" id="onix">
                <b-h1>ONIX</b-h1>
                <demo-markdown-docs .docs=${onixDocs}></demo-markdown-docs>
            </div>

            <div title="MARC" path="marc" id="marc">
                <b-h1>MARC</b-h1>
                <demo-markdown-docs .docs=${marcDocs}></demo-markdown-docs>
            </div>

        </b-nav-view>
    `}

})

export default customElements.get('demo-components')