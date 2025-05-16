/*
    # Pointer Events

    Improve click/tap events to know when the pointer is released while still over the element

    The default `pointerup` event will fire when the pointer is released, even if it was released outside the element.
    This will create new `pointerrelease` and `pointercancel` events to handle this use case.

    ```html
    <b-text 
        @pointerdown=${(e) => console.log('pointerdown')}
        @pointerrelease=${(e) => console.log('released within element')}
        @pointercancel=${(e) => console.log('canceled')}
    >
        Click Me and check console
        <b-pointer-events></b-pointer-events>
    </b-text>
    ```
*/
import { LitElement, html, css } from 'lit'

customElements.define('b-pointer-events', class extends LitElement{

    static styles = css`
        :host {
            display: none;
        }
    `

    constructor(){
        super()
        // this.click = this.click.bind(this)
        this.pointerdown = this.pointerdown.bind(this)
        this.pointerup = this.pointerup.bind(this)
        this.pointerleave = this.pointerleave.bind(this)
        this.touchmove = this.touchmove.bind(this)

    }

    connectedCallback(){
        super.connectedCallback()
        this.el = this.parentElement
        this.elRoot = this.el.getRootNode()
        this.bind()
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.unbind()
    }
    
    bind(){
        if( !this.el ) return
        // this.el.addEventListener('click', this.click, true)
        this.el.addEventListener('pointerleave', this.pointerleave)
        this.el.addEventListener('pointerdown', this.pointerdown)
        this.el.addEventListener('pointerup', this.pointerup)
        this.el.addEventListener('touchmove', this.touchmove)
    }

    unbind(){
        if( !this.el ) return
        // this.el.removeEventListener('click', this.click, true)
        this.el.removeEventListener('pointerleave', this.pointerleave)
        this.el.removeEventListener('pointerdown', this.pointerdown)
        this.el.removeEventListener('pointerup', this.pointerup)
        this.el.removeEventListener('touchmove', this.touchmove)
        this.el = null
    }

    set isPointerDown(val){
        let oldVal = this.isPointerDown
        this.__isPointerDown = val
    
        this.el.toggleAttribute('pointerdown', val)
    }
    
    get isPointerDown(){ return this.__isPointerDown}

    // click(e){
    //     e.stopPropagation()
    // }

    pointerdown(e){
        this.isPointerDown = true
    }
    
    pointerup(e){
        // if pointer is still considered down (wasn't cancelled), fire pointerup event
        if( this.isPointerDown ){
            this.isPointerDown = false
            this.el.emitEvent('pointerrelease', e)
        }
    }

    // does not fire on touch devices until touch released
    pointerleave(e){

        if( this.isPointerDown ){
            this.el.emitEvent('pointercancel', e)
        }

        this.isPointerDown = false
    }

    // for touch devices
    touchmove(e){
        if(! this.isPointerDown ) return;

        const touch = e.touches[0];
        const target = this.elRoot.elementFromPoint(touch.clientX, touch.clientY);

        // no longer touching over the element
        if( target !== this.el ){
            this.pointerleave(e)
        }
        
    }

})

export default customElements.get('b-pointer-events')