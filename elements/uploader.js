import { LitElement, html, css } from 'lit-element';
import AJAX from '../util/ajax.js';
import '../util/file.ext.js'
import resizeImg from '../util/resizeImg'
import '../helpers/lit-element/events'

export class UploaderElement extends LitElement {

    static get properties() { return {
        url: {type: String},
        disabled: {type: Boolean},
        accept: {type: String},
        multiple: {type: Boolean},
        placeholder: {type: String},
        files: {type: Array},
        resize: {type: Object},
        dragging: {type: Boolean, reflect: true },
        uploading: {type: Boolean, reflect: true }
    }}

    static get styles(){ return css`
        :host {
            --hoverBgd: rgba(255,236,179 ,.7);
            --uploadingBgd: rgba(238,238,238 ,.8);
            --progressBgd: var(--hoverBgd);
            --hoverColor: currentColor;
            --uploadingColor: currentColor;
            background: var(--hoverBgd);
            width: 100%;
            height: 100%;
            display: block;
            position: absolute;
            z-index: 1000;
            left: 0;
            top: 0;
            visibility: hidden;
            /* pointer-events: none; */
        }

        :host([dragging]),
        :host([uploading]) {
            visibility: visible;
        }

        .placeholder {
            color: var(--hoverColor)
        }

        .progress {
            color: var(--uploadingColor)
        }

        .placeholder,
        .progress {
            position: absolute;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
        }
        
        :host([uploading]) {
            background: var(--uploadingBgd);
        }

        :host(:not([dragging])) .placeholder,
        :host(:not([uploading])) .progress {
            display: none;
        }

        .progress > div {
            position: relative
        }

        .progress .bar {
            position: absolute;
            height: 100%;
            left: 0;
            background: var(--progressBgd);
        }

        .choose {
            display: none;
        }
    `}

	constructor(){
		super()

        this.url = '';
        this.disabled = false
        this.accept = '';
        this.multiple = false
        this.resize = false
        this.placeholder = 'Drop to upload';
        this.files = []
        this._numUploading = 0
        this._numUploaded = 0
        this._fileProgress = 0
        this.dragging = false
        this.uploading = false

        ;['dragenter', 'dragleave', 'dragover', 'drop'].forEach(fn=>{
            this[fn] = this['_'+fn].bind(this)
        })
	}

    get progress(){
        
        if( this.shouldUploadTogether )
            return this._fileProgress

        let progress = this.files.length > 0 ? this._numUploaded * 100 : 0    
        progress += this._fileProgress
        return progress > 0 ? (progress / (this.files.length * 100) * 100) : 0
    }

    get autoUpload(){ return this.hasAttribute('auto-upload') }

    render(){ return html`
        <input class="choose" type="file" @click=${e=>e.stopPropagation()} @change=${this._inputChange} accept=${this.accept} ?multiple=${this.multiple}>
        <div class="placeholder">${this.placeholder}</div>
        <div class="progress">
            <div class="bar" style="width:${this.progress}%"></div>
            <div>
                <b-spinner></b-spinner>
                ${this.uploadMsg}
            </div>
        </div>
    `}

    get uploadMsg(){
        if( this.progress == 100 )
            return 'Processing...'

        if( this.shouldUploadTogether ){
            return `Uploading ${this.files.length}`
        }else{
            return `Uploading ${this._numUploading} of ${this.files.length}`
        }
    }

    connectedCallback(){
        super.connectedCallback();
        if( this.parent ) return
        this.parent = this.parentElement || this.getRootNode().host
        this.parent.addEventListener('dragenter', this.dragenter, true)
        this.addEventListener('dragleave', this.dragleave, true)
        this.addEventListener('dragover', this.dragover, true)
        this.addEventListener('drop', this.drop, true)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.parent.removeEventListener('dragenter', this.dragenter)
        this.removeEventListener('dragleave', this.dragleave)
        this.removeEventListener('dragover', this.dragover)
        this.removeEventListener('drop', this.drop)
        this.parent = null;
    }

    _acceptFile(file){
        let doAccept = true
        let accept = this.accept
        if( !accept ) return true
        return accept.split(',').find(patt=>{
            patt = patt.trim()
            if( patt[0] == '.' )
                return new RegExp(patt+'$').test(file.name)
            else
                return new RegExp(patt).test(file.type)
        })
    }

    chooseFile(){
        if( this.disabled ) return
        this.shadowRoot.querySelector('.choose').click()
    }

    // alias
    selectFile(){ this.chooseFile() }
    selectFiles(){ this.chooseFile() }

    _drop(e){
        e.preventDefault()
        this.dragging = false
        // let files = new Files(e.dataTransfer)
        this._selectFiles(e.dataTransfer.files, {
            append: (e.metaKey||e.ctrlKey)
        })
    }

    _inputChange(e){
        this._selectFiles(e.target.files)
    }

    _selectFiles(files, {append=false}={}){

        if( this.uploading ) return

        files = Array.from(files)
        
        // NOTE: should we bail out with error?
        if( !this.multiple )
            files = files.slice(0,1)

        let valid = []
        let invalid = []

        files.forEach(file=>{
            if( !this._acceptFile(file) )
                return invalid.push(file)

            if( append ){
                // attempt to skip duplicates
                let dupe = this.files.find(_file=>{
                    return file.name == _file.name
                        && file.size == _file.size
                        && file.lastModified == _file.lastModified
                })

                if( !dupe )
                    valid.push(file)

            }else{
                valid.push(file)
            }
        })

        if( append )
            this.files.push(...valid)
        else
            this.files = valid

        this.emitEvent('change', {invalid: invalid.length > 0 ? invalid : false})

        if( this.autoUpload && this.url ){
            this.upload()
        }
    }

    clear(){
        this.files = []
        this.emitEvent('change', {invalid: false})
    }

    _dragover(e){
        e.preventDefault() // needed to allow `drop` event to trigger
    }

    _dragenter(e){
        if( this.disabled 
        || this.hidden
        || !e.dataTransfer.types.includes('Files')
        || window.getComputedStyle(this).display == 'none'
        ) return
        
        this.dragging = true
    }

    _dragleave(e){
        this.dragging = false
    }

    get shouldUploadTogether(){
        return this.getAttribute('multiple') == 'together'
    }

    async upload({ url='', method='POST', fileKey='file', formData={} }={}){

        if( this.uploading )
            throw new Error("Already uploading")

        url = url || this.url
        
        if( !url )
            throw new Error("Missing URL")

        this._numUploading = 0
        this._numUploaded = 0
        this._fileProgress = 0
        this.uploading = true

        let resp = []
        
        // upload all files together
        // NOTE: long term I think I want this the default
        if( this.shouldUploadTogether ){

            let _formData = new FormData();

            // append all files to form data for upload
            for( let i in this.files ){
                _formData.append(fileKey, this.files[i])
            }

            try{

                let req = new AJAX(method, url)
                
                req.on('progress', e=>{
                    this._fileProgress = Math.round(e.loaded / e.total * 100)
                    this.requestUpdate()
                })

                resp = await req.send(_formData)

            }catch(e){
                resp.push({error: e, files: this.files})
            }

        }else{

        for( let i in this.files ){

            let file = this.files[i]
            let _formData = new FormData();
                        
            if( this.resize )
                file = await resizeImg(file, this.resize)

            _formData.append(fileKey, file)
            _formData.append('totalFiles', this.files.length)
            _formData.append('fileNum', parseInt(i)+1)

            for( let key in formData ){
                if( typeof formData[key] === 'function' )
                    _formData.append(key, formData[key](file))
                else if( typeof formData[key] === 'object' )
                    _formData.append(key, JSON.stringify(formData[key]))
                else
                    _formData.append(key, formData[key])
            }

            this._numUploading++
            this.requestUpdate()

            try{

                let req = new AJAX(method, url)
                
                req.on('progress', e=>{
                    this._fileProgress = Math.round(e.loaded / e.total * 100)
                    this.requestUpdate()
                })

                let uploadResp = await req.send(_formData)

                this._numUploaded++
                this.requestUpdate()

                resp.push(uploadResp)

            }catch(e){
                console.log(e);
                resp.push({error: e, file: file})
            }
        }
        }

        this._numUploading = 0
        this._numUploaded = 0
        this._fileProgress = 0
        this.files = []
        this.uploading = false

        this.emitEvent('upload-done', resp)

        // NOTE: is this really better than determining with `this.multiple`?
        return this.files.length > 1 ? resp : resp[0]
    }

}
    
customElements.define('b-uploader', UploaderElement)

// WIP for uploading directories
class Files {

    constructor(dataTransfer){
        this.getFiles(dataTransfer)
    }

    async getFiles(dataTransfer){
        if( dataTransfer.items[0].webkitGetAsEntry ){

            Array.from(dataTransfer.items).forEach(async item=>{

                item = item.webkitGetAsEntry()

                if( item.isFile ){
                    console.log('file', item);
                }else{
                    console.log('dir', item);

                    let items = await Files.getDirItems(item)
                    console.log(items);
                }
            })


        }
    }

    static async getDirItems(item){

        let entries = await dirEntries(item)
        
        let items = await Promise.all(entries.map(async entry=>{
            if( entry.isFile )
                return await entryFile(entry)
            else
                return await Files.getDirItems(entry)
        }))

        return {
            name: item.name,
            items: items
        }
    }
}


const entryFile = entry=>{
    return new Promise(resolve=>{
        entry.file(file=>{
            resolve(file)
        })
    })
}

const dirEntries = dir=>{
    return new Promise(resolve=>{
        dir.createReader().readEntries(entries=>{
            resolve(entries)
        });
    })
}