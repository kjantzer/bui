import { LitElement, html, css } from 'lit'

customElements.define('b-list-filters-sidebar-filter', class extends LitElement{

    // static listeners = {
    //     model: {'change': 'requestUpdate'}
    // }

    static styles = css`
        :host {
            display: block;
            position:relative;
        }

        /*:host(:hover),*/
        :host(.popover-open) {
            background-color: var(--theme-bgd-accent2);
        }

        b-btn {
            margin: -1em -.5em -1em 0;
            --padding: .25em .5em;
        }

        b-icon {
            font-size: 1.25em;
            vertical-align: middle;
            margin-left: -.25rem;
            margin-right: .25rem;
        }
    `

    constructor(){
        super()
        this._requestUpdate = this._requestUpdate.bind(this)
    }

    render(){return html`
        <b-grid gap=".25" cols=1>
            <b-flex>
                <b-text bold sm color=${this.model.isActive?'text':'text'}>
                    <b-icon square name=${this.model.icon} ?hidden=${!this.model.icon}></b-icon>
                    ${this.model.label}
                </b-text>

                <b-btn sm clear color="gray" ?hidden=${!this.model.isActive} @click=${this.clearFilter}>Clear</b-btn>
            </b-flex>

            <b-text heading dim ?hidden=${!this.model.isActive}>${this.model.valueLabel}</b-text>

        </b-grid>
        
    `}

    _requestUpdate(){
        this.requestUpdate()
    }

    onModelChange(model, oldModel){
        oldModel?.off('change', this._requestUpdate)
        model?.off('change', this._requestUpdate)
        model.on('change', this._requestUpdate)
    }

    connectedCallback(){
        super.connectedCallback()
        // clearTimeout(this._unbind)
        this.model.off('change', this._requestUpdate)
        this.model.on('change', this._requestUpdate)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        // this._unbind = setTimeout(()=>{
            this.model.off('change', this._requestUpdate)
        // },1000)
    }

    clickMenu(){
        this.model.showMenu(this, {align: 'right'})
    }

    clearFilter(e){
        e.stopPropagation()
        this.model.value = null
    }

})

export default customElements.get('b-list-filters-sidebar-filter')