/*
    DragDrop - make the parent element (or custom target) draggable and/or a dropzone

    If `.target` isn't set, the parentElement will be used

    https://schema.org/
*/
import { LitElement, html, css } from 'lit'
import '../../helpers/lit/willTakeAction'
import DragDropPreview from './preview'
import * as dataTransfer from './datatransfer'

export {dataTransfer, DragDropPreview}

// make sure "dragend" fires immediately
document.addEventListener("dragover", e=>e.preventDefault(), false);

// keep track of data and preview element while dragging (so drop zones can use the data)
let DragData
let DragPreview

// empty pixel for hiding default drag image
let DragEmptyImg = document.createElement('img')
DragEmptyImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // preload

customElements.define('b-dragdrop', class extends LitElement{

    static properties = {
        disabled: {type: Boolean},
        url: {type: String},
        drag: {type: Boolean},
        drop: {type: Boolean},
        preview: {type: String},

        // "any", "true" or ['allowed', 'drag', 'tagnames']
        dragMatchesDrop: {type: Object} // NOTE: not a big fan of this name...not very clear
    }

    static styles = css`
        :host(:not(.dragging)) .drag-msg {
            display: none;
        }

        :host(:not(.dragover)) [name="dropmsg"] {
            display: none;
        }

        .drag-msg {
            background: rgba(var(--theme-text-rgb), .7);
            z-index: 10000;
            color: var(--theme-bgd);
            border-radius: var(--radius);
        }

        .drag-msg b-text {
            color: var(--theme-bgd);
        }
    `

    constructor(){
        super()

        this.preview = false // 'b-dragdrop-preview'
        this.disabled = false

        // default is drag, but no drop zone support
        this.drag = true
        this.drop = false
        this.dragMatchesDrop = true

        this.onDragStart = this.onDragStart.bind(this)
        this.onDrag = this.onDrag.bind(this)
        this.onDragEnd = this.onDragEnd.bind(this)
        this.onDragEnter = this.onDragEnter.bind(this)
        this.onDragLeave = this.onDragLeave.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.onWindowDragLeave = this.onWindowDragLeave.bind(this)
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
        if( !this.target ) return //console.warn('no target to bind')
        this.unbind()

        if( this.drag ){
            this.target.draggable = true
            this.target.addEventListener('dragstart', this.onDragStart)
            this.target.addEventListener('drag', this.onDrag)
            this.target.addEventListener('dragend', this.onDragEnd)
        }

        if( this.drop ){
            this.target.addEventListener('dragenter', this.onDragEnter)
            this.target.addEventListener('dragleave', this.onDragLeave)
            this.target.addEventListener('drop', this.onDrop)
        }
    }

    unbind(){
        this._enterCount = 0

        if( !this.target ) return

        this.target.draggable = false
        this.target.removeEventListener('dragstart', this.onDragStart)
        this.target.removeEventListener('drag', this.onDrag)
        this.target.removeEventListener('dragend', this.onDragEnd)

        this.target.removeEventListener('dragenter', this.onDragEnter)
        this.target.removeEventListener('dragleave', this.onDragLeave)
        this.target.removeEventListener('drop', this.onDrop)
    }

    render(){return html`
        <slot name="msg">
            <b-empty-state class="drag-msg" overlay>
                <b-text md>
                    <slot></slot>
                </b-text>
            </b-empty-state>
        </slot>
        <slot name="dropmsg"></slot>
    `}

    willTakeAction(actionName, e){
        let detail = {drag: true, evt:e, data: DragData, preview: DragPreview}
        let action = super.willTakeAction(actionName, detail, {composed: false, bubbles: false})

        if( action.preview)
            action.preview.data = DragData

        // tell preview when enter/leave (but make sure leave is called before enter)
        if( actionName == 'enter' && action.preview?.onEnter ){
            clearTimeout(this._previewUpdate)
            this._previewUpdate = setTimeout(()=>{
                action.preview.onEnter(action)
                this._previewUpdate = null
            })
        }else if( actionName == 'leave' && action.preview?.onLeave && !this._previewUpdate){
            clearTimeout(this._previewUpdate)
            action.preview.onLeave(action)
        }

        return action
    }

    onDragStart(e){

        window.addEventListener('dragleave', this.onWindowDragLeave)

        let action = this.disabled ? false : this.willTakeAction('dragged', e)

        if( this.disabled || action.notAllowed ){
            e.preventDefault()
            e.stopPropagation()
            return
        }

        DragData = {
            model: this.target.model,
            srcTarget: this.target,
            ...(action.data || {})
        }

        if( this.url )
            dataTransfer.url(e, this.url)

        if( this.preview !== 'false' && this.preview !== false ){
            DragPreview = document.createElement(this.preview)
            if( DragPreview.matchSize ){
                DragPreview.style.width = this.target.clientWidth+'px'
                DragPreview.style.minHeight = this.target.clientHeight+'px'
            }
            DragPreview.data = DragData
            document.body.appendChild(DragPreview)

            // hide default drag img
            e.dataTransfer.setDragImage(DragEmptyImg, 0, 0);
        }

        this.target.classList.add('dragging')
        this.classList.add('dragging')
    }
    
    onDrag(e){
        // make the preview follow the dragging cursor
        if( DragPreview )
        requestAnimationFrame(()=>{
            if( DragPreview && e.clientX && e.clientY ){
                DragPreview.style.left = e.clientX+'px'
                DragPreview.style.top = e.clientY+'px'
            }
        })
    }

    onDragEnter(e){

        this._enterCount++ // keep track of entering children

        // must not be from a dragdrop
        if( !DragData || !DragData.srcTarget ) return

        // can't drop onto it self
        if( this.target == DragData.srcTarget ) return this._disallowDrop = true

        // only allow enter/drop if src target matches (either same as dropzone, or array of matches)
        if( this.dragMatchesDrop && this.dragMatchesDrop != 'any' ){

            // many drag sources supported
            if( Array.isArray(this.dragMatchesDrop) )
                this._disallowDrop = !this.dragMatchesDrop.includes(DragData.srcTarget.tagName.toLowerCase())
            
            // only allow same drag/drop targets
            else if( [true, 1, '1', 'true'].includes(this.dragMatchesDrop) )
                this._disallowDrop = this.target.tagName.toLowerCase() != DragData.srcTarget.tagName.toLowerCase()
            else
                this._disallowDrop = this.dragMatchesDrop != DragData.srcTarget.tagName.toLowerCase()
        }

        if( this._disallowDrop || this.disabled || this.willTakeAction('enter', e).notAllowed )
            return this._disallowDrop = true
        
        this.target.classList.add('dragover')
        this.classList.add('dragover')
    }

    onDragLeave(e){
        this._enterCount-- // fires when entering/leaving children

        if( this._enterCount != 0 ) return // still within drop area (children)

        this.target.classList.remove('dragover')
        this.classList.remove('dragover')
        this.willTakeAction('leave', e)
    }

    onDrop(e){

        this.onDragLeave()

        // drag enter disallowed dropzone
        if( this._disallowDrop ){
            delete this._disallowDrop
            return
        }

        if( this.disabled || this.willTakeAction('dropped', e).notAllowed ){
            e.preventDefault()
            e.stopPropagation()
        }
    }

    onDragEnd(e){

        window.removeEventListener('dragleave', this.onWindowDragLeave)

        this.target.classList.remove('dragging')
        this.classList.remove('dragging')
        
        DragData = undefined

        if( DragPreview ){
            DragPreview.remove()
            DragPreview = undefined
        }

        e.stopPropagation()
    }

    onWindowDragLeave(e){
        this.onDragEnd(e)
    }

})

export default customElements.get('b-dragdrop')