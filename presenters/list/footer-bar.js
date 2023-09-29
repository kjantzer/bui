import { LitElement, html, css } from 'lit'
import '../../elements/theme'

export default class extends LitElement{

    static properties = {
        theme: {type: String}
    }

    static listeners = {
        coll: {'sync': 'onContentChanged'}
    }

    static styles = css`
        :host {
            display: block;
            position:relative;
            padding: 1em;
            background: var(--theme-bgd);
            border-radius: 4px;
            margin: 0.25em;
            margin-top: 0;
        }

        :host([hidden]) { display: none; }
    `

    constructor(){
        super()
        this.onSelectionChange = this.onSelectionChange.bind(this)
        this.theme = 'inverse'
    }

    firstUpdated(){
        if( this.slot ) return
        
        if( this.list )
            this.slot = 'footer'
    }

    connectedCallback(){
        super.connectedCallback()

        this.list?.removeEventListener('selection', this.onSelectionChange)

        this.list = this.parentElement?.tagName == 'B-LIST' ? this.parentElement : null
        this.list?.addEventListener('selection', this.onSelectionChange)
        this.coll = this.list?.coll
    }
    
    disconnectedCallback(){
        super.disconnectedCallback()
        this.list?.removeEventListener('selection', this.onSelectionChange)
    }

    render(){return html`
        <b-theme mode="${this.theme}"></b-theme>
        <slot></slot>
    `}

    onSelectionChange(e){
        let {action, data} = e.detail
        this.onContentChanged()
    }

    onContentChanged(){
        setTimeout(()=>{
            this.requestUpdate()
        }, 0)
    }

   
}