import { LitElement, html, css } from 'lit-element'
import Previewer from '../../presenters/previewer'
import Dialog from '../../presenters/dialog'
import download from '../../util/download'

customElements.define('c-file-row', class extends LitElement{

    static get properties(){return {
        layout: {type: String}
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

        section {
            padding: 1rem;
        }

        @media (min-width: 700px) {
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

    render(){return html`
        <b-paper compact overshadow>

            <main>
                <b-file-preview class="img" part="preview" @preview=${this.preview} @contextmenu=${this.showMenu}>
                    <slot name="drag"></slot>
                    <img src="${this.model.previewURL}" draggable="false">
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