import { LitElement, html, css } from 'lit-element'
import ListHeader from '../../presenters/list/header'

customElements.define('b-filebrowser-file', class extends LitElement{

    static get styles(){return [ListHeader.sharedFinderStyles, css`

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

    `]}

    static header(){ return html`
        <div w="40px">Type</div>
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

        <b-text clip>${this.model.get('name')}</b-text>

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
    }

    async open(e){
        clearTimeout(this._clicktimeout)
        return this.emitEvent('navto', {model:this.model})
    }

})

export default customElements.get('b-filebrowser-file')