import { LitElement, html, css } from 'lit-element'
import Previewer from '../../presenters/previewer'
import Dialog from '../../presenters/dialog'
import download from '../../util/download'

customElements.define('c-file-row', class extends LitElement{

    static get properties(){return {
        layout: {type: String, reflect: true},
        overshadow: {type: Boolean}
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

        .duration {
            position: absolute;
            bottom: 2px;
            left: 2px;
        }

        .res {
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

                </b-file-preview>

                <section part="content"><slot name="content">${this.renderContent()}</slot></section>
            </main>

        </b-paper>
    `}

    renderContent(){ return ''}

    showMenu(){}

    preview(){
        Previewer.open(this.model)
    }

    download(){
        download(this.model.downloadURL)
    }

    async destroy(e){
        if( await Dialog.confirmDelete().popover(e) ){
            this.model.destroySync()
            this.remove()
        }
    }

})

export default customElements.get('c-file-row')