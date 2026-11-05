import { LitElement, html, css } from 'lit'
import {ifDefined} from 'lit/directives/if-defined.js'
import '../../presenters/form/handler'
import '../../presenters/form/control'
import '../../presenters/form/controls/text-editor'
import '../../helpers/lit/willTakeAction'
import device from '../../util/device'
import mobileAsyncFocus from '../../util/mobileAsyncFocus'
import '../../elements/uploader-preview'

let extensions = []
let TOKENS = []

customElements.define('b-write-comment', class extends LitElement{

    static set extensions(val){
        
        if( !Array.isArray(val) )
            val = [val]

        val.forEach(ext=>{
            let ce = customElements.get(ext.options.tag)
            if( ce && ce.gleanData )
                TOKENS.push({tagName: ext.options.tag, elementClass: ce})
        })

        extensions = val
    }

    static get properties(){return {
        placeholder: {type: String},
        uploads: {type: Object},
        compose: {type: Boolean, reflect: true} // (looks like the comment row's compose field: a rounded box)
    }}

    constructor(){
        super()
        this.placeholder = 'Write a comment'
    }

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            min-width: 0;
        }

        form-handler {
            display: contents;
        }

        form-control {
            display: block;
            /* margin-top: -.65em; */
        }

        form-control b-btn {
            margin: -.5em 0 -.5em 0;
            align-self: flex-end;
        }

        [empty] b-btn {
            pointer-events: none;
            visibility: hidden;
        }

        text-editor {
            --padY: 0;
            /* padding-top: 0; */
            /* align-self: flex-end; */
        }

        b-uploader-preview {
            margin-top: .25em;
        }

        /* compose: the field you clicked, now typing in it */
        :host([compose]) form-control {
            padding: .45em .5em .45em 1em; /* (with the editor's 1.4 line height: as tall as the field's) */
            border-radius: 1.3em;
            border: solid 1px transparent; /* (the same size as the field's, so nothing shifts) */
            background: var(--theme-bgd-accent);
        }

        /* a round send btn at the end of the field (keeps its height) */
        :host([compose]) form-control b-btn {
            --radius: 50%;
            --padding: 0;
            --color: var(--theme);
            width: 1.9em;
            height: 1.9em;
            margin: calc((1.4em / .9 - 1.9em) / 2) 0; /* (centered on a 1.4 line, at its .9em font size) */
            font-size: .9em;
        }
    `}

    render(){return html`
        <form-handler .model=${this.model} store="${(this.model||this.coll).url()}" @save-comment=${this.saveCommentRequested}>

            <form-control material=${ifDefined(this.compose ? undefined : '')} key="comment">
                
                <text-editor placeholder="${this.placeholder}${this.compose ? '…' : ''}"
                    .extensions=${extensions}
                    @submit=${this.save}
                    @esckey=${this.onEscape}
                    @blur=${this.onBlur}></text-editor>

                <b-btn sm color=${this.compose ? 'theme' : 'theme-gradient'} @click=${this.save} icon="${this.model?'pencil':'send'}" slot="suffix" class="save-btn"></b-btn>

            </form-control>

            <slot name="after"></slot>

            ${this.model||!this.uploads?'':html`
            <b-uploader-preview>
                <b-uploader multiple append placeholder="Drop to attach" @change=${this.onFileAdd}></b-uploader>
            </b-uploader-preview>
            `}

        </form-handler>
    `}

    connectedCallback(){
        super.connectedCallback()
        
        if( this.hasAttribute('auto-focus') )
            setTimeout(() => {
                this.focus()
            },100);
    }

    focus(){
        let el = this.formHandler.get('comment')
        if( device.isMobile )
			mobileAsyncFocus(el, {delay: 1000})
        else
            el.focus()
    }

    onBlur(){
        // emit cancel even when an empy "new comment" is blurred
        if( this.coll && this.formHandler.get('comment').value == '' )
            this.emitEvent('canceled', {model: this.model})
    }

    onEscape(){
        
        // writing a new comment
        if( this.coll )
            this.formHandler.values = {comment:''}
        
        // editing an existing
        if( this.model ){
            this.model.resetEdited()
            this.formHandler.values = {comment: this.model.get('comment')}
        }

        this.emitEvent('canceled', {model: this.model})
    }

    saveCommentRequested(e){
        e.stopPropagation()
        e.preventDefault()
        this.save(e.detail)
    }

    async save(opts){
        let {comment} = this.formHandler.values
        
        if( !comment ) return

        let comment_plain = this.formHandler.get('comment').textValue

        let meta = this.model?.get('meta') || {
            path: location.pathname
        }

        // mentions, hashtags, etc
        TOKENS.forEach(({tagName, elementClass})=>{

            let elements = Array.from(this.formHandler.get('comment').control.shadowRoot.querySelectorAll(tagName))
            let tokenData = elementClass.gleanData(elements)

            if( tokenData )
                meta = {...meta, ...tokenData}
        })

        if( this.meta ){
            meta = Object.assign(meta, (typeof this.meta == 'function' ? this.meta() : this.meta))
        }

        let attrs = {comment, comment_plain, meta}

        if( !await this.willTakeAction('save-comment', {attrs, opts}).allowedPromise() ) return

        if( this.model ){
            this.model.saveSync(attrs, {patch: true})
        }else{
            let [model] = await this.coll.createSync(attrs, {wait: true})
            let uploader = this.$$('b-uploader')

            // upload any files attached; realtime sync will push the file data to all clients (including this one)
            if( uploader && uploader.files.length > 0 ){
                let resp = await uploader.upload({url: model.url()+'/files'})

                // if upload failed, delete the saved comment and display error
                // the typed comment will still be in the "write comment" box so nothing is lost
                if( !resp || resp.error ){
                    await model.destroySync()
                    throw new UIError(resp.error||'Hmm...upload error')
                }
            }
            
            this.formHandler.values = {comment:''}
        }

        this.emitEvent('saved', {model: this.model})
    }

})

export default customElements.get('b-write-comment')