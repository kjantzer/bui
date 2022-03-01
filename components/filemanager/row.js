import { LitElement, html, css } from 'lit-element'
import Previewer from '../../presenters/previewer'
import Dialog from '../../presenters/dialog'
import download from '../../util/download'
import Palette from './palette'
import './preview'

customElements.define('b-file-row', class extends LitElement{

    static get properties(){return {
        layout: {type: String, reflect: true},
        overshadow: {type: Boolean},
        palette: {type: Boolean}
    }}

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
        }

        img {
            background: var(--theme-text-accent);
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            flex-shrink: 0;
            min-height: var(--img-height, var(--img-min-height, 240px));
            max-height: var(--img-height, var(--img-max-height, 100%));
            border-radius: var(--radius) var(--radius) 0 0;
            padding: .5em;
            box-sizing: border-box;
            object-fit: contain;
            pointer-events: none;
        }

        [name="drag"]::slotted(*){
            position: absolute;
            width: 100%;
            height: 100%;
        }

        .res {
            position: absolute;
            top: 2px;
            left: 2px;
        }

        .pages, .duration {
            position: absolute;
            top: 2px;
            right: 2px;
        }

        section {
            padding: 1rem;
            box-sizing: border-box;
            min-width: 0;
        }

        :host([layout="mini-row"]) {
            --img-min-height: 2em;
            --file-icon-size: 2em;
        }

        :host([layout="mini-row"]) main {
            display: grid;
            grid-template-columns: auto 1fr;
        }

        :host([layout="mini-row"]) img {
            border-radius: var(--radius) 0 0 var(--radius);
            width: 6em;
        }

        .palette {
            position: absolute;
            top: 2px;
            left: 2px;
        }

        @media (min-width: 600px) {
            :host([layout="row"]) main {
                display: grid;
                grid-template-columns: auto 1fr;
            }

            :host([layout="row"]) img {
                border-radius: var(--radius) 0 0 var(--radius);
                width: 400px;
            }
        }
    `}

    constructor(){
        super()
        this.overshadow = true
        this.palette = false

        this.addEventListener('dragstart', this.onDragStart)
    }

    render(){return html`
        <b-paper compact ?overshadow=${this.overshadow}>

            <main>
                <b-file-preview class="img" part="preview" icon="${this.model.isVideo?'play':''}"
                @preview=${this.preview}
                @contextmenu=${this.showMenu}>
                    <slot name="drag"></slot>
                    <img src="${this.model.previewURL}" draggable="false">
                    
                    ${this.model.isVideo?html`
                    
                        <b-label filled="black" class="duration" xs>
                            <b-timer time=${this.model.duration*1000}></b-timer>
                        </b-label>

                        <b-label xs class="res" filled="black" ?hidden=${!this.model.resolution}>
                            ${this.model.resolution}</b-label>

                    `:''}

                    ${this.model.isAudio?html`
                    
                        <b-label filled="black" class="duration" xs>
                            <b-timer time=${this.model.duration*1000}></b-timer>
                        </b-label>

                    `:''}

                    ${this.model.isDocument?html`
                    <b-label xs class="pages" filled="black" ?hidden=${!(this.model.pages>1)}>
                            ${this.model.pages} pages</b-label>
                    `:''}

                    ${this.palette&&this.model.traits.palette?html`
                        <b-btn text icon="format-color-fill" class="palette" @click=${this.viewPalette}></b-btn>
                    `:''}

                    <slot name="preview">${this.renderPreviewContent()}</slot>                    

                </b-file-preview>

                <section part="content"><slot name="content">${this.renderContent()}</slot></section>
            </main>

        </b-paper>
    `}

    renderPreviewContent(){ return '' }
    renderContent(){ return ''}

    showMenu(){}

    preview(){
        Previewer.open(this.model)
    }

    download(){
        if( this.willTakeAction('download').notAllowed ) return
        download(this.model.downloadURL)
    }

    async destroy(e){
        
        if( this.willTakeAction('delete').notAllowed ) return

        if( await Dialog.confirmDelete().popover(e) ){
            this.model.destroySync()
            this.remove()
        }
    }

    viewPalette(e){
        Palette.open(this.model.traits.palette, e.currentTarget||e)
    }

    onDragStart(e){
        if( this.willTakeAction('download', {drag: true}).notAllowed ) return
        enableDragAndDropDownload(e.dataTransfer, this.model)   
    }

})

export default customElements.get('b-file-row')

// https://web.dev/datatransfer/
// drag and drop outside of the browser!
export function enableDragAndDropDownload(dataTransfer, model){
    
    let filename = model.get('orig_filename')
    let host = location.protocol+'//'+location.host
    let url = host+model.downloadURL

    dataTransfer.setData('DownloadURL', [
        `application/octet-stream:${filename}:${url}`
    ]);

    dataTransfer.setData('text/plain', host+model.displayURL);

    // Navigates to the URL when dropping on the URL bar or browser page
    dataTransfer.setData('text/uri-list', host+model.displayURL);

    // https://schema.org/ImageObject
    // NOTE: this needs improved, file may not be an image
    const data = {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        thumbnail: host+model.previewURL,
        contentUrl: url,
        // datePublished: '2010-08-08',
        description: model.get('description'),
        name: filename,
        height: model.height,
        width: model.width
    };

    dataTransfer.setData('application/ld+json', JSON.stringify(data));
}