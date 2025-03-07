import { LitElement, html, css } from 'lit'
import ListHeader from '../../presenters/list/header'
import {bindLongPress} from '../../util/touch-events'

customElements.define('b-filebrowser-file', class extends LitElement{

    static get styles(){return [ListHeader.sharedFinderStyles, css`

        :host {
            user-select: none;
        }

        b-file-icon {
            --size: 1.4em;
            vertical-align: middle;
        }

        b-icon[name="folder"],
        b-icon[name="dns"] {
            color: var(--theme);
            font-size: 1.2em;
        }

        :host(.popover-open) .name {
            color: var(--theme);
        }
        
        [dot] {
            margin-left: -.5em; 
            background-color: var(--color);
            align-self: baseline;
        }
        /*b-ts { color: var(--theme-text-accent); }*/

        :host([age="0"]) { --color: var(--red); }
        :host([age="-1"]) { --color: var(--orange); }
        :host([age="-2"]) { --color: var(--yellow); }
        
        :host([age="-3"]) { --color: var(--theme-text-accent); }
        :host([age="-4"]) { --color: var(--theme-text-accent); }
        :host([age="-5"]) { --color: var(--theme-text-accent); }

    `]}

    static header(){ return html`
        <b-flex sep w="minmax(40%, 1fr)" label="Path"><slot name="name"></slot></b-flex>
        <div sep w="180px">Date</div>
        <div sep w="120px">Size</div>
    `}

    render(){return html`
        
        <b-flex sep left>
            <div>
            ${this.model.get('type')=='d'?html`
                <b-icon name="${this.model.get('host')?'dns':'folder'}"></b-icon>
            `:html`
                <b-file-icon ext="${this.model.get('ext')}"></b-file-icon>
            `}

            </div>

            <b-text clip class="name">${this.model.get('name')}</b-text>

        </b-flex>

        ${this.renderMore?.()}
        
        <b-flex sep left gap="0">
            <b-label dot></b-label>
            <b-ts .date=${this.model.get('date')} format="MM/DD/YYYY LT" trackAge="day" .trackAgeTarget=${this}></b-ts>
        </b-flex>

        <b-text sep>
            ${this.model.get('type')=='d'?'—':html`
            <b-bytes num=${this.model.get('size')}></b-bytes>
            `}
        </b-text>

    `}

    firstUpdated(){
        bindLongPress(this, {touchOnly: false, event: 'longpress', delay: 250})

        this.addEventListener('dblclick', this.open)
        this.addEventListener('longpress', this.onLongPress)
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