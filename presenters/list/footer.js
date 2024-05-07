import { css } from 'lit'
import Header from './header'

customElements.define('b-list-footer', class extends Header{

    static get sharedStyles(){ return [super.sharedStyles, css`
        :host > * {
            border-bottom: none;
            border-top: solid 1px var(--border-color, rgba(var(--theme-text-rgb), .1));
        }
    `]}

    constructor(){
        super()
        this.slot = "footer"
        this.onSelectionChange = this.onSelectionChange.bind(this)
    }

    showMenu(){} // reset header logic

    get models(){ return this.list?.currentModelsOrAll || this.coll?.models}
    
    connectedCallback(){
        super.connectedCallback()

        this.list?.removeEventListener('selection', this.onSelectionChange)

        this.list = this.parentElement?.tagName == 'B-LIST' ? this.parentElement : null
        this.list?.addEventListener('selection', this.onSelectionChange)
        this.list?.addEventListener('content-changed', this.onSelectionChange)
        this.coll = this.list?.coll
    }
    
    disconnectedCallback(){
        super.disconnectedCallback()
        this.list?.removeEventListener('selection', this.onSelectionChange)
        this.list?.removeEventListener('content-changed', this.onSelectionChange)
    }

    onSelectionChange(e){
        let {action, data} = e.detail
        this.onContentChanged()
    }

    onContentChanged(){
        clearTimeout(this._onContentChanged)
        this._onContentChanged = setTimeout(()=>{
            this.requestUpdate()
        }, 0)
    }
})

export default customElements.get('b-list-footer')