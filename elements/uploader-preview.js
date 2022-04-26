import { LitElement, html, css } from 'lit-element'
import './numeral'
import './flex'
import '../util/file.ext'

customElements.define('b-uploader-preview', class extends LitElement{

    static styles = css`
        :host {
            display: block;
        }

        :host([hidden]) { display: none; }
    `

    constructor(){
        super(...arguments)

        this.placeholder = 'Drop file to attach'

        // listen for bubbling b-uploader change events
        this.addEventListener('change', this.onFileChange)
        this.addEventListener('upload-done', this.onFileChange)
    }

    onFileChange(){
        this.update()
    }
    
    connectedCallback(){
        super.connectedCallback()
        this.uploader = this.querySelector('b-uploader')
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.uploader = null
    }

    get files(){
        return this.uploader?.files || []
    }

    render(){return html`
        <slot></slot>
        
        <b-text ?hidden=${this.files.length>0} link @click=${this.selectFile}>
            <slot name="placeholder">
                <b-text sm italic muted link>${this.placeholder}</b-text>
            </slot>
        </b-text>

        ${this.files.map(file=>html`
            <b-native-file-preview part="file" .file=${file} @click=${this.removeFile}></b-native-file-preview>
        `)}
    `}

    selectFile(){
        this.uploader?.selectFile()
    }

    removeFile(e){
        this.uploader.removeFile(e.currentTarget.file)
    }

})

export default customElements.get('b-uploader-preview')



// import { LitElement, html, css } from 'lit-element'

customElements.define('b-native-file-preview', class extends LitElement{

    static properties = {
        file: {type: Object}
    }

    static styles = css`
        :host {
            display: contents;
        }

        img {
            height: 1.5em;
            max-width: 4em;
        }

        b-file-icon {
            --size: 1.5em;
        }
    `

    render(){return html`
        <b-flex left gap=".5">
            
            ${this.isImg?html`
                <img src="${URL.createObjectURL(this.file)}">
            `:html`
                <b-file-icon ext=${this.file.ext}></b-file-icon>
            `}

            <b-text clip>${this.file.name}</b-text>

            <b-text muted=2>
                <b-bytes .num=${this.file.size}></b-bytes>
            </b-text>
            
        </b-flex>
    `}

    get isImg(){
        return ['jpg', 'jpeg', 'png', 'gif', 'tif'].includes(this.file.ext.toLowerCase())
    }

})

// export default customElements.get('b-native-file-preview')