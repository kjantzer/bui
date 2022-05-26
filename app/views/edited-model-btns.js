import { LitElement, html, css } from 'lit'

customElements.define('b-edited-model-btns', class extends LitElement{

    static get properties(){return {
        changed: {type: Number, reflect: true},
        shownum: { type: Boolean }
    }}

    static get styles(){ return css`

        :host {
            display: inline-flex;
            flex-wrap: nowrap;
            flex-shrink: 0;
        }

        b-btns {
            flex-shrink: 0;
        }

        :host(:not([changed])), :host([changed="0"]) { display: none; }
    `}

    static get listeners(){return {
        model: {
            'edited': 'refresh'
        }
    }}

    firstUpdated(){
        this.shouldChangeSlot = !this.slot
    }

    onModelChange(){
        this.refresh()
    }

    refresh(){
        this.changed = this.model && this.model.numberEditedAttrs()

        if( this.shouldChangeSlot && this.parentElement && this.parentElement.tagName == 'B-PANEL-TOOLBAR' )
            this.slot = this.changed ? 'close-btn' : ''
    }

    render(){return html`
        <b-btn color="theme-gradient" @click=${this.save}>
            Save
            ${this.shownum&&this.changed>0?html` <b-text nobold>(${this.changed})</b-text>`:''}
        </b-btn>
        <b-btn clear @click=${this.cancel}>Cancel</b-btn>
    `}

    save(e){
        this.model.saveEdited({patch: true})
    }

    cancel(){
        this.model.resetEdited()
    }

})

export default customElements.get('b-edited-model-btns')