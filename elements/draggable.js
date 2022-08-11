/*
    Draggable - make the parent element (or custom target) draggable

    If `.target` isn't set, the parentElement will be used

    https://schema.org/
*/
import { LitElement, html, css } from 'lit'
import '../helpers/lit/will-take-action'

customElements.define('b-draggable', class extends LitElement{

    static properties = {
        disabled: {type: Boolean},
        url: {type: String}
    }

    static styles = css`
        :host(:not(.dragging)) .drag-msg {
            display: none;
        }

        .drag-msg {
            background: rgba(var(--theme-text-rgb), .7);
            z-index: 10000;
            color: var(--theme-bgd);
            border-radius: var(--radius);
        }
    `

    constructor(){
        super()
        this.disabled = false
        this.onDragStart = this.onDragStart.bind(this)
        this.onDragEnd = this.onDragEnd.bind(this)
    }

    firstUpdated(){
        if( !this.target )
            this.target = this.parentElement

        if( !this.target ){
            let root = this.getRootNode()
            this.target = root && root.host
        }
    }

    set target(val){
        if( this.target )
            this.unbind()

        this.__target = val
        this.bind()
    }

    get target(){ return this.__target }

    connectedCallback(){
        super.connectedCallback()
        if( this.target )
            this.bind()
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.unbind()
    }

    bind(){
        if( !this.target ) return console.warn('no target to bind')
        this.unbind()
        this.target.draggable = true
        this.target.addEventListener('dragstart', this.onDragStart)
        this.target.addEventListener('dragend', this.onDragEnd)
    }

    unbind(){
        if( !this.target ) return

        this.target.draggable = false
        this.target.removeEventListener('dragstart', this.onDragStart)
        this.target.removeEventListener('dragend', this.onDragEnd)
    }

    render(){return html`
        <slot name="msg">
            <b-empty-state class="drag-msg" sm>
                <b-text md>
                    <slot></slot>
                </b-text>
            </b-empty-state>
        </slot>
    `}

    onDragStart(e){
        if( this.disabled 
        || this.willTakeAction('drag', {drag: true, evt:e}).notAllowed
        ){
            e.preventDefault()
            e.stopPropagation()
            return
        }

        if( this.url )
            URL(e, this.url)

        this.target.classList.add('dragging')
        this.classList.add('dragging')
    }

    onDragEnd(e){
        this.target.classList.remove('dragging')
        this.classList.remove('dragging')
    }

})

export default customElements.get('b-draggable')

export function DownloadURL(e, filename, url){
    e.dataTransfer.setData('DownloadURL', [
        `application/octet-stream:${filename}:${url}`
    ]);
}

// TODO: set mimetype by extension?
export function DownloadContent(e, filename, content, {mimetype}={}){
    
    if( !mimetype && typeof content == 'object' && !Array.isArray(content) ){
        mimetype = 'application/json'
        content = JSON.stringify(content)

    }else if( !mimetype && Array.isArray(content) ){
        mimetype = 'text/csv'
        content = JSON.stringify(content)
    }

    if( !mimetype )
        mimetype = 'text/plain'

    let b64 = btoa(content)
        
    return DownloadURL(e, filename, `data:${mimetype};base64,${b64}`)
}


export function PlainText(e, text){
    e.dataTransfer.setData('text/plain', text);
}

// Navigates to the URL when dropping on the URL bar or browser page
export function URL(e, url){
    if( url[0] == '/' )
        url = location.protocol+'//'+location.host+url
    e.dataTransfer.setData('text/uri-list', url);
}

// https://schema.org/ImageObject
// https://json-ld.org/
export function jsonLD(e, type, data){
    data = Object.assign(data, {
        '@context': 'https://schema.org',
        '@type': type
    });

    e.dataTransfer.setData('application/ld+json', JSON.stringify(data));
}
