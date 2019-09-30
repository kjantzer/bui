import { LitElement, html, css } from 'lit-element'
import '../../elements/avatar'

let realtime = null

customElements.define('b-realtime-users', class extends LitElement{

    static get properties(){return {
        key: {type: String, reflect: true},
        max: {type: Number, reflect: true}
    }}

    parseData(data){
        return data
    }

    renderUser(m){
        let render = this.renderer && this.renderer(m)

        if( render && render.constructor.name !== 'TemplateResult'){
            render = null
            console.warn('`renderer` must return `lit-html`')
        }

        if( !render )
            render = html`<b-avatar class="avatar" initials="?"></b-avatar>`

        return render
    }

    onChange(data){
        this.users = this.parseData(data)
        this.update()
    }

    constructor(){
        super()
        this.key = ''
        this.max = 3
        this.users = []
        this.onChange = this.onChange.bind(this)
    }

    static get styles(){return css`
        :host {
            display: inline-block;
            --theSize: 1.4em;
        }

        /* most likely in a b-panel-toolbar */
        :host([slot="middle"]) {
            --theSize: 1.2em;
            vertical-align: text-bottom;
            margin: 0 0 0 .25em;
        }

        .avatar {
            border-radius: var(--theSize);
            --size: var(--theSize);
            /* box-shadow: rgba(0,0,0,.2) 0 0 2px */
        }

        .avatar:not(:first-child) {
            margin-left: calc(var(--size) / -1.7);
        }
    `}

    get key(){ return this.__key }

    set key(key){
        let oldKey = this.key
        this.__key = key

        if( this.isConnected )
            this.openRealtime()

        this.requestUpdate('key', oldKey)
    }

    connectedCallback(){
        super.connectedCallback()
        this.openRealtime()
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.closeRealtime()
    }

    static set realtime(val){
        realtime = val
    }

    openRealtime(){
        if( this.model )
            this.closeRealtime()

        if( !this.key ) return

        this.model = realtime.views.open(this.key, this.data)
        this.model.on('change', this.onChange)
    }

    closeRealtime(){
        this.users = []
        if( !this.model ) return
        realtime.views.close(this.key)
        this.model.off('change', this.onChange)
        this.model = null
    }
    
    showUser(i){
        if( this.users.length > this.max )
            i++
        return i < this.max
    }

    render(){return html`
        <main>
            
            ${this.users.map((m,i)=>!this.showUser(i)?'':this.renderUser(m))}
            ${this.users.length>this.max?html`
                <b-avatar class="avatar" initials="+${this.users.length-this.max+1}" color="#555" bgd="#ddd"></b-avatar>
            `:''}

        </main>
    `}

})

export default customElements.get('b-realtime-users')