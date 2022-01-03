import { LitElement, html, css } from 'lit-element'
import '../../elements/uploader'
import './file'
import '../../util/sum'

customElements.define('b-upload-view', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
        }
    `}

    constructor(){
        super()
        this.files = []
        this.addEventListener('change', this.onFilesChange)
        this.addEventListener('upload-done', this.onFilesChange)
    }

    connectedCallback(){
        super.connectedCallback()
        this.uploader = this.uploader || this.querySelector('b-uploader')
    }

    onFilesChange(){
        this.files = this.uploader.files
        this.update()
    }

    render(){return html`
        <b-paper dense>
            
            <slot></slot>            
            <b-flex gap=".25" col>
                <b-empty-state static must-be="last" sm>Drop files here</b-empty-state>
                ${this.files.map(file=>html`
                    <b-upload-file .file=${file}></b-upload-file>        
                `)}
            </b-flex>


            <b-flex col gap=0 stretch ?hidden=${this.files.length==0} >
                <div><b-hr></b-hr></div>
                <b-flex>

                    <div>
                        
                        <b-text>
                            ${this.files.length}
                            <b-text muted> at </b-text>
                            <b-bytes .num=${this.totalSize}></b-bytes>
                        </b-text>

                    </div>

                    <div>
                        <b-btn @click=${this.clear} clear>Cancel</b-btn>
                        <b-btn @click=${this.upload} color="theme">Upload</b-btn>
                    </div>

                </b-flex>
            </b-flex>
        </b-paper>
    `}

    get totalSize(){
        return this.files.sum(file=>file.size)
    }

    upload(){
        this.uploader.upload()
    }

    clear(){
        this.uploader.clear()
    }

})

export default customElements.get('b-upload-view')