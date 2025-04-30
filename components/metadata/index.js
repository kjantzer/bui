import { LitElement, html, css } from 'lit'
import Dialog from '../../presenters/dialog'
import Menu from '../../presenters/menu'
import '../../presenters/form/control'
import '../../presenters/form/controls/text-field'
import '../../elements/text'
import '../../elements/text-divider'
import '../../elements/btn'
import { capitalize } from '../../util/string'

customElements.define('b-metadata', class extends LitElement{

    static get properties(){return {
        attr: {type: String},
        values: {type: Array},
        custom: {type: String},
        opts: {type: Object},
        add: {type: String},
        save: {type: Boolean},
        material: {type: String}
    }}

    constructor(){
        super()
        this.material = 'filled'
        this.attr = 'metadata'
        this.save = true
        this.opts = {}
    }

    get allowCustom(){
        return this.custom || this.values.length == 0 
    }

    createRenderRoot() {
        return this;
    }

    static get styles(){return css`
        :host {
            display: contents;
        }
    `}

    async performUpdate(){
        if( this.values?.fetchSync )
            await this.values.fetchSync({once: true})

        return super.performUpdate()
    }

    get metadata(){
        let metadata = this.data

        let data = []
        for( let key in metadata ){

            let spec = this.values?.find ? this.values.find(m=>m.key?.toLowerCase?.()==key) : null

            let val = {
                key, 
                val: metadata[key]||'',
            }

            if( spec && spec.options )
                val.options = [{label: 'Remove', icon:'trash', val: null, clearsAll: true}, '-'].concat(spec.options)

            data.push(val)
        }

        return data
    }

    get data(){
        return this.model?.get(this.attr) || {}
    }

    labelFor(key){
        return this.opts.formatLabel ? this.opts.formatLabel(key) : capitalize(key)
    }

    contentFor(key){
        return this.opts.contentFor ? this.opts.contentFor(key) : ''
    }

    renderItem(t){ return html`
        <form-control key="${t.key}" ${this.opts.table?'':`material="${this.material}"`} part="control" no-handler>
                
            ${t.options?html`
            <select-field .value=${t.val} .options=${t.options} multiple
                placeholder=${this.opts.placeholder||'select'}
                @change=${this.clearMeta}
            ></select-field>
            `:html`
            <text-field .value=${t.val} 
                nowrap
                placeholder=${this.opts.placeholder}
                @blur=${this.clearMeta}></text-field>
            `}

            ${this.opts.table?'':html`
                <b-text slot="label">${this.labelFor(t.key)}</b-text>
            `}
            
            ${this.contentFor(t.key)}
            
        </form-control>
    `}

    render(){return html`
    
        ${this.metadata.map(t=>html`

            ${this.opts.table?html`
            <b-table-row>
                
                <b-text semibold>${this.labelFor(t.key)}</b-text>

                ${this.renderItem(t)}
            </b-table-row>
            `:html`
                ${this.renderItem(t)}
            `}
        
            

            
        `)}

        <b-btn icon="add_box" clear @click=${this.addMeta} title="${this.add?'':'Add Metadata'}">
            ${this.add}
        </b-btn>
    `}

    async addMeta(e){

        let key = null
        let {clickTarget} = e

        if( this.values ){

            let values = this.values

            if( this.values?.fetchSync ){
                await this.values.fetchSync({once: true})
            }

            // if( values.map )
            values = values.map(m=>m.key===undefined?m:m.key)

            values = values.filter(v=>!this.metaExists(v))
            
            if( this.allowCustom )
                values.push('-', {label: this.custom||'Custom', val: 'custom', icon: 'pencil'})

            if( this.values?.manage ){
                values.push('-', {label: 'Manage', icon: 'settings_material', fn: ()=>{
                    this.values.manage()
                }})
            }

            key = await new Menu(values).popOver(clickTarget)
            if( !key ) return

            if( key.fn ) return key.fn.call()

            key = key.val
        }

        if( !key || key == 'custom' )
            key = await Dialog.prompt({
                placeholder: (this.custom||'Metadata')+' label/name',
                btns: ['cancel', 'add']
            }).popOver(clickTarget)

        key = key && key.trim()

        if( !key ) return

        key = key.toLowerCase() // TODO: remove spaces?

        if( this.metaExists(key) )
            throw new UIWarningError('That metadata already exists')

        this._saveMeta(key, '')
        this.requestUpdate()

        setTimeout(()=>{
            let el = this.$$(`[key="${key}"]`)
            el && el.focus()
        })
    }

    metaExists(key){
        if( key.val )
            key = key.val

        return this.data[key.toLowerCase()] != undefined
    }

    clearMeta(e){
        this.saveMeta({currentTarget:e.currentTarget.parentElement})
    }

    saveMeta(e){
        let control = e.currentTarget

        if( control.tagName !== 'FORM-CONTROL') return

        let key = control.key
        let val = control.value||null

        this._saveMeta(key, val)
    }

    _saveMeta(key, val){

        let data = {...this.data}

        if( val === null || (Array.isArray(val) && val.length == 0 ) ){
            val = null
            delete data[key]
        }
        else
            data[key] = val

        if( Object.keys(data).length == 0 )
            data = null

        if( this.save === false )
            this.model.editAttr(this.attr, data)
        else
            this.model.saveSync({[this.attr]:data}, {patch:true})

        // meta will be removed
        if( !val )
            this.requestUpdate()
    }
    

})

export default customElements.get('b-metadata')