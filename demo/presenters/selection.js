import { LitElement, html, css } from 'lit'
import View from './view'
import docs from 'bui/presenters/selection/README.md'
//import screenshot from 'bui/presenters/selection/screenshot.gif'
import Selection from 'bui/presenters/selection'
import {bindLongPress} from 'bui/util/touch-events'

customElements.define('demo-presenter-selection', class extends View{

    static get title(){ return 'Selection' }

    static get styles(){return [super.styles, css`
        b-grid > div {
            height: 100px;
            background: var(--theme-bgd-accent);
        }

        b-grid > div[isselected] {
            background: var(--theme);
        }

        .control {
            margin: -1em 0 1em;
        }
        
        b-grid {
            margin-bottom: 2em;
        }
    `]}

    get docs(){ return docs }

    firstUpdated(){
        this.selection = new Selection(this.shadowRoot.querySelector('b-grid'), 'div', {
            onBegin: this.requestUpdate.bind(this),
            onEnd: this.requestUpdate.bind(this),
            onChange: this.update.bind(this)
        })

        Array.from(this.shadowRoot.querySelectorAll('b-grid > div')).forEach(el=>{
            bindLongPress(el, {touchOnly: false, event: 'longpress'})
        })
    }

    beginSelection(e){
        this.selection.begin(e)
    }

    cancelSelection(){
        this.selection.end()
    }

    renderContent(){ return html`

        <b-text block align="right" class="control">
        ${this.selection&&this.selection.isOn?html`
            <b-text muted>${this.selection.result.length} selected</b-text>
            <b-btn text @click=${this.cancelSelection}>Cancel</b-btn>
        `:html`
            <b-btn text @click=${this.beginSelection}>Turn on Selection</b-btn>
        `}
        </b-text>

        <b-grid cols="4" cols-mobile="2" @longpress=${this.beginSelection}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </b-grid>
        
    `}

})

export default customElements.get('demo-presenter-selection')