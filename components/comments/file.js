import { LitElement, html, css } from 'lit'
import FileRow from '../filemanager/row'

customElements.define('b-comment-file', class extends FileRow{

    static styles = [FileRow.styles, css`
        :host {
            --img-height: 3em;
        }

        b-file-preview { 
            width: 4em !important;
        }

        [part="size"] { display: none; }

        b-file-icon {
            --size: 1.4em;
        }
    `]

    renderPreviewContent(){ return html`
        <b-file-icon slot="bottom-left" ext=${this.model.get('ext')}></b-file-icon>
    `}

    renderContent(){ return html`

        <b-text clip sm block heading>${this.model.origFilenameLabel}</b-text>
        <b-text muted=2 block sm>
            <b-bytes .num=${this.model.get('size')}></b-bytes>
        </b-text>        
    `}

})

export default customElements.get('b-comment-file')