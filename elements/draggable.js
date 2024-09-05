/*
    # Draggable

    Add as child of any element to make the parent element draggable

    ```html-preview
    <!-- div will be draggable -->
    <div>
        <b-draggable></b-draggable>
        Drag me
    </div>
    ```

    Initial code pulled from: https://stackoverflow.com/a/21569684/484780
*/
import { LitElement, html, css } from 'lit'
import '../helpers/lit/willTakeAction'
import store from '../util/store'

customElements.define('b-draggable', class extends LitElement{

    static properties = {
        disabled: {type: Boolean},
        key: {type: String} // defaults to tagname of target
    }

    static styles = css`
        :host {
            display: contents;
        }
    `

    constructor(){
        super()    
        this.disabled = false

        this.onStart = this.onStart.bind(this)
        this.onDone = this.onDone.bind(this)
        this.onLeave = this.onLeave.bind(this)
    }

    // shouldn't need to render anything 
    render(){return html`
        <slot></slot>
    `}

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

    set key(val){
        let oldVal = this.key
        this.__key = val
    
        this.requestUpdate('key', oldVal)
    }
    
    get key(){ return this.__key || this.target?.tagName }

    bind(){

        if( !this.target ) return

        this.unbind()

        this.cache = store.create('draggable-'+this.key, false)
        let settings = this.cache()

        if( settings ){

            let {left, top} = snapToEdge(this.target, settings)

            this.target.style.left = left+'px'
            this.target.style.top = top+'px'
        }

        this.styles = getComputedStyle(this.target)

        if( this.target && !this.target.draggableController )
            this.target.draggableController = this

        if( !['relative', 'absolute', 'fixed'].includes(this.styles.position) )
            this.target.style.position = 'relative'
        
        this.target.style.cursor = 'move'

        this.target.addEventListener('pointerdown', this.onStart, false)
        this.target.addEventListener('pointerup', this.onDone, false)
        this.target.addEventListener('pointerleave', this.onLeave, false) // if left window while dragging
    }

    unbind(){
        if( this.styles ){
            this.target.style.cursor = this.styles.cursor
            this.target.style.position = this.styles.position
        }

        this.styles = null

        if( this.target.draggableController == this )
            delete this.target.draggableController
        
        this.target.removeEventListener('mousedown', this.onStart, false)
        this.target.removeEventListener('mouseup', this.onDone, false)
        this.target.removeEventListener('mouseleave', this.onLeave, false)
    }

    onLeave(){
        clearTimeout(this._onLeave)
        this._onLeave = setTimeout(this.onDone, 300);
    }

    onStart(e){

        if( e.button !== 0 ) return // main button only

        let el = this.target
        let mouseX = e.clientX
        let mouseY = e.clientY
        let computedStyles = window.getComputedStyle(el)
            
        let elTop = parseFloat(computedStyles.top)
        let elLeft = parseFloat(computedStyles.left)

        var origX = mouseX - elLeft,
            origY = mouseY - elTop;
        
        document.onmousemove = (e)=>{

            clearTimeout(this._onLeave)

            let x = e.clientX - origX
            let y = e.clientY - origY
            
            // TODO: put edge limits?
            el.style.left = x+'px'
            el.style.top = y+'px'
        }
    }

    snapToEdge(){
        let {left, top} = snapToEdge(this.target, this.target.style)

        this.target.style.left = left+'px'
        this.target.style.top = top+'px'

        return {left, top}
    }

    onDone(){

        let {left, top} = this.snapToEdge()

        this.target.style.left = left+'px'
        this.target.style.top = top+'px'

        // remember position 
        this.cache({left, top})

        // stop watching mouse moves
        document.onmousemove = function(){}
        
        // TODO: emit event?
    }

})

export default customElements.get('b-draggable')

// TODO: move to ./util?
function snapToEdge(target, {left=0, top=0}={}){

    if( !target.offsetParent ) return {left, top}

    if( typeof left == 'string') left = parseInt(left)
    if( typeof top == 'string') top = parseInt(top)

    let maxLeft = target.offsetParent.clientWidth - target.clientWidth
    let maxTop = target.offsetParent.clientHeight - target.clientHeight

    if( left > maxLeft ) left = maxLeft
    if( top > maxTop ) top = maxTop
    if( top < 0) top = 0
    if( left < 0 ) left = 0

    return {left, top}
}