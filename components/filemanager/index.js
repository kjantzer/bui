import { LitElement, html, css } from 'lit'
import {repeat} from 'lit/directives/repeat.js'
// import Sortable from 'sortablejs'
import Dialog, { Notif } from '../../presenters/dialog'
import device from '../../util/device'
import '../../helpers/lit/willTakeAction'
import '../../elements/uploader'
import '../../elements/empty-state'


customElements.define('b-file-manager', class extends LitElement{

    static get properties(){return {
        sorting: {type: Boolean, reflect: true},
        row: {type: String},
        layout: {type: String},
        accept: {type: String},
        plainFilename: {type: Boolean},
        placeholder: {type: String},
        limit: {type: Number},
        disabled: {type: Boolean}
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

        :host(:not([sorting])) .drag {
            display: none;
        }
    `}

    constructor(){
        super()
        this.row = 'b-file-row'
        this.accept = '' // all files
        this.plainFilename = false // Allow special characters in filenames by default
        // this.sorting = true // turn of by default; should use `enableSorting
        this.placeholder = 'No files'
        this.limit = 0

        this.cache = new Map()
    }
    set row(val){
        let oldVal = this.row
        this.__row = val
    
        this.requestUpdate('row', oldVal)
    }
    
    get row(){ return this.__row || 'b-file-row'}
    
    get coll(){ return this.model && this.model.get('files') }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.disableSorting()
    }
    
    async onModelChange(model){
        
        this.cache.clear()
        this.disableSorting()

        if( model && model.collection ){
            this.coll.fetchSync()
        }
    }

    get shouldEnableSort(){
        return !device.isTouch && this.sorting && this.limit != 1
    }

    firstUpdated(){
        if( this.shouldEnableSort )
            this.enableSort()
    }

    get sortingEnabled(){ return !!this.sortable }

    disableSorting(){
        if( this.sortable ){
            this.sorting = false
            this.sortable.destroy()
            this.sortable = null

            let rows = Array.from(this.$$all(this.row))
            rows.forEach(row=>row.removeAttribute('sorting'))
        }

        return this.sortingEnabled
    }

    enableSorting(){

        return new Promise(resolve=>{
        
        if( this.sortingEnabled ) return console.warn('Sorting already enabled') && resolve(true)
        if( this.limit == 1 ) return console.warn('Limited to 1 file, nothing to sort') && resolve(false)

        import('sortablejs').then(({Sortable})=>{

            let wrapEl = this.$$('.files', true)
            let startIndex = 0

            // possible rows have "non rows" before them (empty-state, header, etc) like when used in b-table
            // so figure out when the first actual "row" starts so we can properly apply `newIndex`
            // NOTE: would be better if sortablejs could handle this? maybe it does?
            for( let el of wrapEl.children ){
                if( el.tagName.toLowerCase() == this.row ) break
                startIndex++
            }
        
            this.sortable = Sortable.create(wrapEl, {
                draggable: this.row,
                handle: '.drag',
                swapThreshold: 1,
                // https://github.com/SortableJS/Sortable/tree/master/plugins/OnSpill#revertonspill-plugin
                // revertOnSpill: true, // doesn't work with shadow dom
                // direction: 'vertical',
                onUpdate: this.onSort.bind(this)
            })

            this.sortable.startIndex = startIndex

            let rows = Array.from(this.$$all(this.row))
            rows.forEach(row=>row.setAttribute('sorting', ''))

            this.sorting = true

            resolve(this.sortingEnabled)

        })

        })
    }

    toggleSorting(){
        return this.sortingEnabled ? this.disableSorting() : this.enableSorting()
    }

    async onSort(e){
        let {item, oldIndex, newIndex} = e
        
        newIndex -= this.sortable.startIndex
        oldIndex -= this.sortable.startIndex

        let coll = this.coll
        coll.models.splice(newIndex, 0, coll.models.splice(oldIndex, 1)[0] );

        await Promise.all(coll.models.map((model,i)=>{
            let traits = model.get('traits') || {}
            traits.ordinal = i
            return model.saveSync({traits})
        }))
    }
    
    selectFiles(){ return this.uploader.selectFiles() }
    selectFile(){ return this.selectFiles() }

    render(){return html`
        ${this.renderUploader()}
            
        <div class="files" part="files">
        
            ${this.renderBeforeFiles()}

            ${this.renderFiles()}
            
            ${this.renderAfterFiles()}

            ${this.renderEmptyState()}

        </div>
    `}

    renderFiles(){return html`
        ${repeat(this.model?this.coll.models:[], (m) => m.id, (m, index) => this.renderFile(m))}
    `}

    renderUploader(){return html`
        <b-uploader 
            ?disabled=${this.disabled} 
            accept="${this.accept}" 
            ?plainFilename=${this.plainFilename} 
            @change=${this.onUpload} 
            ?multiple=${this.limit!=1}
            placeholder=${this.placeholder}
        ></b-uploader>
    `}

    renderBeforeFiles(){return ''}
    renderAfterFiles(){return ''}

    renderFile(m){ 
        
        let row = this.cache.get(String(m.id)) 
        
        if( !row )
            row = document.createElement(this.row)

        row.layout = this.layout
        row.part = 'file'
        row.model = m
        row.innerHTML = '<div class="drag" slot="drag"></div>'
        row.draggable = true

        // cache so we dont keep recreating
        this.cache.set(String(m.id), row)

        return row
    }

    renderEmptyState(){return html`
        <b-empty-state if="first" md part="empty-state">
            <slot name="placeholder">${this.placeholder}</slot>
        </b-empty-state>
    `}

    async onUpload(e){
        let uploader = e.currentTarget
        let {invalid} = e.detail

        // NOTE: if limit is 1, the server should destroy the old file and replace with this one
        if( this.limit > 1 && this.coll.length == this.limit )
            return Dialog.stopped(`File limit of ${this.limit} already reached`).notif()

        if( invalid )
            Dialog.warn(`${invalid.length} invalid files – allowed types: ${this.accept}${this.plainFilename ? ' Filename must also contain no special characters' :''}`).notif()

        if( uploader.files.length == 0 )
            return

        // .allowed may be true/false or a promise
        if( !await this.willTakeAction('upload-file').allowedPromise() ) return

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

