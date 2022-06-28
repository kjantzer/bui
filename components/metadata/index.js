import { LitElement, html, css } from 'lit'
import Dialog from '../../presenters/dialog'
import Menu from '../../presenters/menu'
import '../../presenters/form/control'
import '../../presenters/form/controls/text-field'
import '../../elements/text'
import '../../elements/text-divider'
import '../../elements/btn'

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

    static get styles(){return css`
        :host {
            display: contents;
        }

        form-control {
            min-width: 60px;
        }
    `}

    get metadata(){
        let metadata = this.data

        let data = []
        for( let key in metadata ){
            data.push({
                key, val: metadata[key]
            })
        }

        return data
    }

    get data(){
        return this.model?.get(this.attr) || {}
    }

    labelFor(key){
        return this.opts.formatLabel ? this.opts.formatLabel(key) : key
    }

    contentFor(key){
        return this.opts.contentFor ? this.opts.contentFor(key) : ''
    }

    render(){return html`
    
        ${this.metadata.map(t=>html`
        
            <form-control key="${t.key}" material="${this.material}">
                <text-field .value=${t.val} 
                    nowrap
                    placeholder=${this.opts.placeholder}
                    @blur=${this.clearMeta}></text-field>
                <b-text capitalize slot="label">${this.labelFor(t.key)}</b-text>
                ${this.contentFor(t.key)}
            </form-control>
        `)}

        <b-btn icon="add_box" clear @click=${this.addMeta} title="${this.add?'':'Add Metadata'}">
            ${this.add}
        </b-btn>
    `}

    async addMeta(e){

        let key = null

        if( this.values ){

            let values = this.values.filter(v=>!this.metaExists(v))
            
            if( this.allowCustom )
                values.push('-', {label: this.custom||'Custom', val: 'custom', icon: 'pencil'})

            key = await new Menu(values).popover(e.clickTarget)
            if( !key ) return
            key = key.val
        }

        if( !key || key == 'custom' )
            key = await Dialog.prompt({
                placeholder: (this.custom||'Metadata')+' label/name',
                btns: ['cancel', 'add']
            }).popover(e.clickTarget)

        key = key && key.trim()

        if( !key ) return

        key = key.toLowerCase() // TODO: remove spaces?

        if( this.metaExists(key) )
            throw new UIWarningError('That metadata already exists')

        this._saveMeta(key, '')
        this.update()

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

        let data = this.data

        if( val === null )
            delete data[key]
        else
            data[key] = val

        if( Object.keys(data).length == 0 )
            data = null

        if( this.save === false )
            this.model.editAttr({[this.attr]:data})
        else
            this.model.saveSync({[this.attr]:data}, {patch:true})

        // meta will be removed
        if( !val )
            this.update()
    }
    

})

export default customElements.get('b-metadata')