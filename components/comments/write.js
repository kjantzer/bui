import { LitElement, html, css } from 'lit'
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
        uploads: {type: Object}
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
    `}

    render(){return html`
        <form-handler .model=${this.model} store="${(this.model||this.coll).url()}">

            <form-control material="" key="comment">
                
                <text-editor placeholder="${this.placeholder}"
                    .extensions=${extensions}
                    @submit=${this.save}
                    @esckey=${this.onEscape}
                    @blur=${this.onBlur}></text-editor>

                <b-btn sm color="theme-gradient" @click=${this.save} icon="${this.coll?'send':'pencil'}" slot="suffix"></b-btn>
            </form-control>

            ${this.model||!this.uploads?'':html`
            <b-uploader-preview>
                <b-uploader multiple placeholder="Drop to attach"></b-uploader>
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

    async save(){
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

        if( this.model ){
            this.model.saveSync({comment, comment_plain, meta}, {patch: true})
        }else{
            let [model] = await this.coll.createSync({comment, comment_plain, meta}, {wait: true})
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