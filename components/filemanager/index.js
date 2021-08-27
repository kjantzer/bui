import { LitElement, html, css } from 'lit-element'
import {repeat} from 'lit-html/directives/repeat'
import Sortable from 'sortablejs'
import Dialog, { Notif } from '../../presenters/dialog'
import device from '../../util/device'
import '../../elements/uploader'
import '../../elements/empty-state'


customElements.define('b-file-manager', class extends LitElement{

    static get properties(){return {
        sort: {type: Boolean},
        row: {type: String},
        accept: {type: String},
        placeholder: {type: String},
        limit: {type: Number}
    }}

    static get listeners(){return {
        coll: {'add remove': 'update'}
    }}

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
        }

        :host([hidden]) {
            display: none !important;
            background-color: red;
        }
    `}

    constructor(){
        super()
        this.accept = '' // all files
        this.sort = true
        this.placeholder = 'No files'
        this.limit = 0        
    }
    
    get coll(){ return this.model && this.model.get('files') }
    
    async onModelChange(model){
        if( model ){
            await this.coll.fetchSync()
        }
    }

    firstUpdated(){
        if( !device.isTouch && this.sort && this.limit != 1)
        this.sortable = Sortable.create(this.$$('.files'), {
            draggable: this.row,
            handle: '.drag',
            swapThreshold: 1,
            // direction: 'vertical',
            onUpdate: this.onSort.bind(this)
        })
    }

    async onSort(e){
        let {item, oldIndex, newIndex} = e
        let coll = this.coll
        coll.models.splice(newIndex, 0, coll.models.splice(oldIndex, 1)[0] );

        await Promise.all(coll.models.map((model,i)=>{
            let traits = model.get('traits') || {}
            traits.ordinal = i
            return model.saveSync({traits})
        }))
    }

    render(){return html`
        <b-uploader accept="${this.accept}" @change=${this.onUpload}></b-uploader>
            
        <div class="files" part="files">
        
            ${this.renderBeforeFiles()}

            ${repeat(this.model?this.coll.models:[], (m) => m.id, (m, index) => this.renderFile(m))}
            
            ${this.renderAfterFiles()}

            ${this.renderEmptyState()}

        </div>
    `}

    renderBeforeFiles(){return ''}
    renderAfterFiles(){return ''}

    renderFile(m){ 
        let row = document.createElement(this.row)
        row.part = 'file'
        row.model = m
        row.innerHTML = '<div class="drag" slot="drag"></div>'
        return row
    }

    renderEmptyState(){return html`
        <b-empty-state must-be="first" static md>${this.placeholder}</b-empty-state>
    `}

    async onUpload(e){
        let uploader = e.currentTarget
        let {invalid} = e.detail

        if( this.limit > 0 && this.coll.length == this.limit )
            return Dialog.stopped(`File limit of ${this.limit} already reached`).notif()

        if( invalid )
            Dialog.warn(`${invalid.length} invalid files – allowed types: ${this.accept}`).notif()

        if( uploader.files.length == 0 )
            return

        let url = typeof this.coll.url == 'function' ? this.coll.url() : this.coll.url
        let resp = await uploader.upload({url})

        if( !resp || resp.error ){
            return Dialog.warn({msg: (resp&&resp.error)||'Error', btns: false, pretitle: ''}).notif()
        }else{
            // TODO: make optional?
            this.coll.add(resp)
        }
    }

})

export default customElements.get('b-file-manager')

