import { LitElement, html, css } from 'lit-element'
import ListHeader from '../../presenters/list/header'

customElements.define('b-fileexplorer-file', class extends LitElement{

    static get styles(){return [ListHeader.sharedStyles, css`

        :host {
            margin-left: .5rem;
            margin-right: .5rem;
        }
        
        b-file-icon {
            --size: 1.4em;
            margin: -.5rem 0;
            vertical-align: middle;
        }

        :host > * {
            border-bottom: none;
        }

        :host > *:first-child {
            border-radius: 4px 0 0 4px;
        }

        :host > *:last-child {
            border-radius: 0 4px 4px 0;
        }

        :host(:nth-child(even)) > * {
            background-color: var(--theme-bgd-accent2);
        }

        @media (hover){
            :host(:hover) > * {
                background-color: var(--theme-bgd-accent)
            }
        }
    `]}

    static header(){ return html`
        <div w="40px">Type</div>
        <div w="minmax(40%, 1fr)">Name</div>
        <div w="100px">Type</div>
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
            <b-ts .date=${this.model.get('date')}></b-ts>
        </b-text>
    `}

    firstUpdated(){
        this.addEventListener('dblclick', this.open)
    }

    async open(e){
        if( this.model.get('type') == 'd' )
            return this.emitEvent('navto', this.model)

        let filename = this.model.get('name')
        console.log('open file?', filename);
    }

})

export default customElements.get('b-fileexplorer-file')