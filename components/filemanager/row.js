import { LitElement, html, css } from 'lit'
import './preview'
import {FileRowMixin, enableDragAndDropDownload} from './row-mixin'

export {enableDragAndDropDownload} // legacy export

customElements.define('b-file-row', class extends FileRowMixin(LitElement){

    static get properties(){return {
        layout: {type: String, reflect: true},
        overshadow: {type: Boolean},
        palette: {type: Boolean},
        nodrag: {type: Boolean},
    }}

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
        }

        .img {
            background: var(--theme-text-accent);
            padding: .5em;
            border-radius: var(--radius) var(--radius) 0 0;
        }

        img {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            flex-shrink: 0;
            min-height: var(--img-height, var(--img-min-height, 240px));
            max-height: var(--img-height, var(--img-max-height, 100%));
            border-radius: var(--radius) var(--radius) 0 0;
            box-sizing: border-box;
            object-fit: contain;
            pointer-events: none;
        }

        img[audio] {
            object-fit: none;
        }

        img[hidden] { visibility: hidden; }

        [part="preview"] b-file-icon {
            display: none;
            position: absolute;
            --size: calc(.5 * var(--img-height, var(--img-min-height, 240px)));
        }
        
        img[hidden] ~ b-file-icon {
            display: inline-block;
        }

        [name="drag"]::slotted(*){
            position: absolute;
            width: 100%;
            height: 100%;
            cursor: move;
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

        :host([layout="mini-row"]) b-file-preview {
            border-radius: var(--radius) 0 0 var(--radius);
            width: 6em;
        }

        :host([layout="mini-row"]) .drag-msg {
            font-size: 1em;
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
                width: var(--preview-width, 400px);
            }
        }

        :host(:not([sorting])) b-dragdrop .sort { display: none; }
        :host([sorting]) b-dragdrop .drag { display: none; }
    `}

    constructor(){
        super()
        this.overshadow = true
        this.palette = false
    }

    onWillTakeDragAction(e){
        // nothing by default
    }

    render(){return html`
        
        ${this.renderDragdrop()}

        <b-paper compact ?overshadow=${this.overshadow}>

            <main>
                <b-file-preview class="img" part="preview" icon="${this.model.isVideo?'play_arrow':''}"
                @preview=${this.preview}
                @contextmenu=${this.showMenu}>
                    <slot name="drag"></slot>

                    <img src="${this.model.previewURL}" draggable="false" onerror="this.hidden=true" onload="this.hidden=false" ?audio=${this.model.isAudio}>

                    <b-file-icon ext=${this.model.get('ext')}></b-file-icon>
                    
                    ${this.model.isVideo?html`
                    
                        <b-label slot="top-right" filled="black" xs part="duration">
                            <b-timer .startAt=${this.model.duration*1000} fixed></b-timer>
                        </b-label>

                        <b-label slot="top-left" xs filled="black" part="resolution" ?hidden=${!this.model.resolution}>
                            ${this.model.resolution}</b-label>

                    `:''}

                    ${this.model.isAudio?html`
                    
                        <b-label slot="top-right" filled="black" xs part="duration">
                            <b-timer .startAt=${this.model.duration*1000} fixed></b-timer>
                        </b-label>

                    `:''}

                    ${this.model.isImg?html`
                    
                        <b-label filled="black" xs slot="top-left" part="size">
                            ${this.model.width}
                            &nbsp;<b-text dim>x</b-text>&nbsp;
                            ${this.model.height}
                            &nbsp;<b-text dim>px</b-text>
                        </b-label>

                        ${this.model.get('ext')=='gif'?html`
                        <b-label slot="top-right" filled="black" xs>
                            GIF${this.model.get('traits')?.pages>1?`/${this.model.get('traits').pages}`:''}
                        </b-label>

                            ${this.model.get('traits')?.loop!==undefined?html`
                                <b-label slot="bottom-right" filled="black" xs title="Loops">
                                    <b-icon name="loop"></b-icon>
                                    ${this.model.get('traits')?.loop===0?'':this.model.get('traits')?.loop}
                                </b-label>
                            `:''}
                        `:''}

                        ${this.model.get('traits')?.exif?.image?.Make?html`
                            <b-label slot="bottom-left" filled="black" xs title="Photograph">
                                <b-icon name="photo_camera"></b-icon>
                                &nbsp;${this.model.get('traits')?.exif?.image?.Make}
                            </b-label>
                        `:''}

                    `:''}

                    ${this.model.isNonStandardDocument?html`
                    
                        <b-label filled="black" xs slot="top-left" part="size">
                            ${this.model.width}
                            &nbsp;<b-text dim>x</b-text>&nbsp;
                            ${this.model.height}
                            &nbsp;<b-text dim>in</b-text>
                        </b-label>

                    `:''}

                    ${this.model.isDocument?html`
                    <b-label xs class="pages" filled="black" ?hidden=${!(this.model.pages>1)} slot="top-right" part="pages">
                        ${this.model.pages} pages
                    </b-label>
                    `:''}

                    ${this.model.get('ext')=='psd'?html`
                    <b-label xs class="pages" filled="black" ?hidden=${!(this.model.get('traits')?.layers>1)} slot="top-right" part="pages">
                        ${this.model.get('traits')?.layers} layers
                    </b-label>
                    `:''}

                    ${this.model.isEpub?html`

                        ${this.model.get('traits')?.content?.$?.version?html`
                        <b-label slot="top-left" xs filled="black" part="version">${this.get('ext')?.toUpperCase()} ${this.model.get('traits')?.content?.$?.version}</b-label>
                        `:''}

                    <b-label xs filled="black" ?hidden=${!(this.model.chapters>1)} slot="top-right" part="pages">
                        ${this.model.chapters} chapters
                    </b-label>
                    `:''}
                    

                    ${this.renderPreviewContent()}
                    <slot name="preview"></slot>

                </b-file-preview>

                <section part="content"><slot name="content">${this.renderContent()}</slot></section>
            </main>

        </b-paper>
    `}

    renderPreviewContent(){ return '' }
    renderContent(){ return ''}

    showMenu(){}

})

export default customElements.get('b-file-row')