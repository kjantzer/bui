import { LitElement, html, css } from 'lit-element'
import '../../elements/numeral'
import '../../elements/ts'
import '../../elements/text'
import '../../elements/flex'

const IMG_EXTENSIONS = ['jpg', 'jpeg', 'png', 'tiff', 'gif']

customElements.define('b-upload-file', class extends LitElement{

    static get properties(){return {
        file: {type: Object}
    }}

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            max-width: 100%;
        }

        .preview {
            --size: 4em;
            height: var(--size);
            width: var(--size);
            background: var(--theme-bgd-accent);
            padding: .125em;
            flex-shrink: 0;
        }

        b-file-icon {
            --size: 4em;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    `}

    get ext(){
        return this.file.name.split('.').pop().toLowerCase()
    }

    get isImg(){
        return IMG_EXTENSIONS.includes(this.ext)
    }

    get imgPreview(){
        return URL.createObjectURL(this.file)
    }

    render(){return html`

        <b-flex left gap=".5">
            <b-flex class="preview" center>
                ${this.isImg?html`
                    <img src=${this.imgPreview}>
                `:html`
                    <b-file-icon ext=${this.ext}></b-file-icon>
                `}
            </b-flex>

            <main>

                <b-text block clip>${this.file.name}</b-text>
                
                <b-text block sm muted clip>
                    modified <b-ts .date=${this.file.lastModified}></b-ts>
                </b-text>

                <b-text muted sm>
                    <b-bytes .num=${this.file.size}></b-bytes>
                </b-text>

            </main>
        </b-flex>
        
    `}

})

export default customElements.get('b-upload-file')