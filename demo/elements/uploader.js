import { LitElement, html, css } from 'lit'
import View from '../presenters/view'
import Dialog from 'bui/presenters/dialog'
import 'bui/elements/uploader'
import 'bui/elements/uploader-preview'
import docs from '../../docs/uploader.md'

customElements.define('demo-elements-uploader', class extends View{

    static get title(){ return 'Uploader' }

    static get styles(){return [super.styles, css`
        
    `]}

    get docs(){ return docs}

    
    renderContent(){ return html`

        <b-grid cols=2 cols-mobile=1>
        <b-paper outline>

            <b-text md xbold>Simple Uploader</b-text>

            <b-uploader multiple @change=${this.onUpload}></b-uploader>
                    
            <div>Drag and drop a file here to upload<br><br></div>

            <b-btn onclick="this.previousElementSibling.previousElementSibling.chooseFile()">Or select a file</b-btn>
        </b-paper>

        <b-paper outline>

            <b-text md xbold>Uploader with Preview</b-text><br><br>

            <b-uploader-preview>
                <b-uploader multiple></b-uploader>
            </b-uploader-preview>
                    
            <!-- <div>Drag and drop a file here to upload<br><br></div> -->

            <!-- <b-btn onclick="this.previousElementSibling.previousElementSibling.chooseFile()">Or select a file</b-btn> -->
        </b-paper>

        </b-grid>

        <br><br>

    `}

    async onUpload(e){
        let uploader = e.currentTarget
        let filenames = uploader.files.map(f=>f.name)
        
        console.log('upload the file', uploader.files);

        if( await Dialog.confirm({
            title: 'Confirm Upload',
            msg: filenames.join('<br>'),
            btns: ['cancel', {label: 'Upload', color: 'theme'}]
        }).modal() )
            console.log('yes, upload');
    }
})