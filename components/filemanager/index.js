import { LitElement, html, css } from 'lit-element'
import {repeat} from 'lit-html/directives/repeat'
import Sortable from 'sortablejs'
import Dialog, { Notif } from '../../presenters/dialog'
import device from '../../util/device'
import '../../helpers/lit-element/will-take-action'
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
        coll: {'add remove reset': 'update'}
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

        b-empty-state {
            grid-column: 1/-1;
        }

        [part="files"] {
            display: grid;
            grid-template-columns: 1;
            gap: 1em;
        }
    `}

    constructor(){
        super()
        this.row = 'b-file-row'
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

    get shouldEnableSort(){
        return !device.isTouch && this.sort && this.limit != 1        
    }

    firstUpdated(){
        if( this.shouldEnableSort )
        this.sortable = Sortable.create(this.$$('.files'), {
            draggable: this.row,
            handle: '.drag',
            swapThreshold: 1,
            // https://github.com/SortableJS/Sortable/tree/master/plugins/OnSpill#revertonspill-plugin
            // revertOnSpill: true, // doesn't work with shadow dom
            // direction: 'vertical',
            onUpdate: this.onSort.bind(this)
        })
    }

    async onSort(e){
        console.log('on sort');
        let {item, oldIndex, newIndex} = e
        let coll = this.coll
        coll.models.splice(newIndex, 0, coll.models.splice(oldIndex, 1)[0] );

        await Promise.all(coll.models.map((model,i)=>{
            let traits = model.get('traits') || {}
            traits.ordinal = i
            return model.saveSync({traits})
        }))
    }
    
    get uploader(){ return this.$$('b-uploader', '__uploader') }
    
    selectFiles(){ return this.uploader.selectFiles() }
    selectFile(){ return this.selectFiles() }

    render(){return html`
        <b-uploader accept="${this.accept}" @change=${this.onUpload} ?multiple=${this.limit!=1}></b-uploader>
            
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

        if( this.shouldEnableSort)
            row.innerHTML = '<div class="drag" slot="drag"></div>'
        else
            row.draggable = true

        return row
    }

    renderEmptyState(){return html`
        <b-empty-state must-be="first" static md part="empty-state">
            <slot name="placeholder">${this.placeholder}</slot>
        </b-empty-state>
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

        if( !this.willTakeAction('upload-file').allowed ) return

        let formData = null

        try{
            if( this.formData )
                formData = await this.formData(this.model, this.coll, {uploader})

        }catch(err){
            if( err instanceof Error )
                throw err

            return // bail on upload if non-error thrown
        }

        let url = typeof this.coll.url == 'function' ? this.coll.url() : this.coll.url
        let resp = await uploader.upload({url, formData})

        if( !resp || resp.error ){
            return Dialog.warn({msg: (resp&&resp.error)||'Error', btns: false, pretitle: ''}).notif()
        }else{
            this.uploadComplete(resp)
        }
    }

    uploadComplete(model){
        return this.coll.add(model)
    }

})

export default customElements.get('b-file-manager')

