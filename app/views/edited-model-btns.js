import { LitElement, html, css } from 'lit'

customElements.define('b-edited-model-btns', class extends LitElement{

    static get properties(){return {
        changed: {type: Number, reflect: true},
        shownum: { type: Boolean },
        sm: {type: Boolean},
        xs: {type: Boolean}
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
        <slot name="before"></slot>
        <b-btn color="theme-gradient" @click=${this.save} ?sm=${this.sm} ?xs=${this.xs}>
            Save
            ${this.shownum&&this.changed>0?html` <b-text nobold>(${this.changed})</b-text>`:''}
        </b-btn>
        <b-btn clear @click=${this.cancel} ?sm=${this.sm} ?xs=${this.xs}>Cancel</b-btn>
        <slot></slot>
    `}

    async save(e){
        let btn = e.currentTarget
        if( btn.spin ) return

        if( this.willTakeAction('save-edited-model').allowed ){
            btn.spin = true
            await this.model.saveEdited({patch: true})
            .catch(err=>{
                // allow error to be supressed or handled somewhere else
                if( this.willTakeAction('save-edited-model-error', {err}).allowed )
                    throw err
            }).finally(_=>{
                btn.spin = false
            })
        }
            
    }

    cancel(){
        this.model.resetEdited()
    }

})

export default customElements.get('b-edited-model-btns')