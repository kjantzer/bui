import { LitElement, html, css } from 'lit'
import ListHeader from '../../presenters/list/header'

customElements.define('b-filebrowser-file', class extends LitElement{

    static get styles(){return [ListHeader.sharedFinderStyles, css`

        :host {
            user-select: none;
        }

        b-file-icon {
            --size: 1.4em;
            margin: -.5rem 0;
            vertical-align: middle;
        }

        b-icon[name="folder"] {
            color: var(--theme);
            font-size: 1.2em;
            margin: -.5rem 0;
        }

        :host(.popover-open) .name {
            color: var(--theme);
        }

    `]}

    static header(){ return html`
        <div w="32px"></div>
        <div w="minmax(40%, 1fr)">Name</div>
        <div w="120px">Size</div>
        <div w="180px">Date</div>
    `}

    render(){return html`

        <div>
        ${this.model.get('type')=='d'?html`
            <b-icon name="folder"></b-icon>
        `:html`
            <b-file-icon ext="${this.model.get('ext')}"></b-file-icon>
        `}

        </div>

        <b-text clip class="name">${this.model.get('name')}</b-text>

        <b-text>
            ${this.model.get('type')=='d'?'—':html`
            <b-bytes num=${this.model.get('size')}></b-bytes>
            `}
        </b-text>

        <b-text>
            <b-ts .date=${this.model.get('date')} format="MMM D, YYYY LT"></b-ts>
        </b-text>
    `}

    firstUpdated(){
        this.addEventListener('dblclick', this.open)
        this.addEventListener('click', this.onClick)
        this.addEventListener('contextmenu', this.onClick)
    }

    onClick(e){
        this.emitEvent('clickitem', {model: this.model, target: this, originalEvent:e})
    }

    open(e){
        return this.emitEvent('navto', {model:this.model})
    }

})

export default customElements.get('b-filebrowser-file')