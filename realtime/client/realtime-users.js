import { LitElement, html, css } from 'lit'
import '../../elements/avatar'

let realtime = null
let currentUserID = null

customElements.define('b-realtime-users', class extends LitElement{

    static set realtime(val){ realtime = val }
    static set currentUserID(val){ currentUserID = val }

    static get properties(){return {
        key: {type: String, reflect: true},
        max: {type: Number, reflect: true},
        test: {type: Boolean}
    }}

    parseData(data){

        if( this.test )
            return data
        
        let uniq = new Map()

        data.forEach(d=>{
            let id = d.attrs.id || new Date().getTime()
            
            if( currentUserID == id )
                return

            if( !uniq.get(id) )
                uniq.set(id, d)
        })

        return Array.from(uniq.values())
    }

    renderUser(m){
        let render = this.renderer && this.renderer(m)

        if( render && render.constructor.name !== 'TemplateResult'){
            render = null
            console.warn('`renderer` must return `lit-html`')
        }

        if( !render ){
            let name = m.attrs&&m.attrs.name
            let initials = name ? name.split(' ').map(s=>s[0]).filter(s=>s).slice(0,2).join('') : '?'
            render = html`<b-avatar class="avatar" initials="${initials}" title=${name}></b-avatar>`
        }

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
            --size: 1.4em;
        }

        /* most likely in a b-panel-toolbar */
        :host([slot="middle"]) {
            --size: 1.2em;
            vertical-align: text-bottom;
            margin: 0 0 0 .25em;
        }

        b-avatar,
        .avatar {
            border-radius: var(--size);
            --size: var(--size);
            /* box-shadow: rgba(0,0,0,.2) 0 0 2px */
        }

        b-avatar:not(:first-child),
        .avatar:not(:first-child) {
            margin-left: calc(var(--size) / -1.7);
        }
    `}

    get key(){ return this.__key }

    set key(key){
        let oldKey = this.key

        this.closeRealtime()

        this.__key = key

        if( this.isConnected )
            this.openRealtime()

        this.requestUpdate('key', oldKey)
    }

    connectedCallback(){
        super.connectedCallback()

        // allow for the key first to change
        this._openRealtimeDelay = setTimeout(()=>{
            this.openRealtime()
        },300)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.closeRealtime()
    }

    openRealtime(){
        if( this.model )
            this.closeRealtime()

        if( !this.key ) return

        this.model = realtime.views.open(this.key, this.data)
        this.model.on('change', this.onChange)
    }

    closeRealtime(){
        clearTimeout(this._openRealtimeDelay)
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