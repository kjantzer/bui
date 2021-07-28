/*
    Tooltip (uses Popover to display)
*/
import { LitElement, html, css } from 'lit-element'
import Popover from 'popover'

let mouseX = 0;
let mouseY = 0;
let followingMouse = false
let activeTooltip;
let shownTooltip;
let showTooltipTimeout;

function followMouse(){
    if( followingMouse ) return
    followingMouse = true
    window.addEventListener('mousemove', onMouseMove)
}

function onMouseMove(e){

    // continue to show tooltip with small mouse movement
    if( shownTooltip
    && Math.abs(e.clientX-mouseX) < 20 
    && Math.abs(e.clientY-mouseY) < 20 )
        return    
        
    hideTooltip()

    // track current location of the mouse
    mouseX = e.clientX
    mouseY = e.clientY

    // if a tooltip has become activated, show it when the mouse stops moving
    if( activeTooltip ){

        // use delay from the tooltip
        let delay = activeTooltip.delay
        
        // treat as seconds (convert to MS)
        if( delay < 10 )
            delay = delay * 1000

        showTooltipTimeout = setTimeout(()=>{
            showTooltip()
        }, delay)
    }
}

function showTooltip(){
    // no active tooltip or one is already shown, dont show another
    if( !activeTooltip || shownTooltip ) return

    // default target is the mouse location (native-like)
    let target = new MouseEvent('mousemove', {clientX: mouseX, clientY: mouseY})
    
    if( activeTooltip.target != 'mouse' )
        target = activeTooltip.triggerElement

    shownTooltip = new Popover(target, activeTooltip.innerHTML, {
        className: 'tooltip',
        align: activeTooltip.align,
        // TODO: support `maxW` ?
    })
}

function hideTooltip(){
    clearTimeout(showTooltipTimeout)

    if( shownTooltip ){
        shownTooltip.close()
        shownTooltip = null
    }
}

customElements.define('b-tooltip', class extends LitElement{

    static get properties(){return {
        delay: {type: Number},
        align: {type: String},
        target: {type: String}, // target to align tooltip to
        trigger: {type: String} // what should trigger the tooltip? (parent, offset)
    }}

    constructor(){
        super()

        // begin following mouse when first tooltip is created
        followMouse()

        this.onTrigger = this.onTrigger.bind(this)
        this.clearTrigger = this.clearTrigger.bind(this)

        // default settings
        this.delay = 1 // second
        this.align = 'right-top'
        this.target = 'mouse'
        this.trigger = 'parent'

        // if denoted as a "label", then use different defaults
        if( this.hasAttribute('label') ){
            this.delay = 0
            this.target = 'parent'
            this.align = 'top'
        }
    }

    get triggerElement(){
        // the element that triggers this toolip as 'active'
        if( !this._triggerElement ){

            if( this.trigger == 'parent' )
                this._triggerElement = this.parentElement || this.getRootNode().host
            else
                this._triggerElement = this.offsetParent || this.parentElement || this.getRootNode().host
        }
        
        return this._triggerElement
    }

    connectedCallback(){
        super.connectedCallback()

        setTimeout(()=>{
            this.triggerElement.addEventListener('mouseleave', this.clearTrigger)
            this.triggerElement.addEventListener('mouseenter', this.onTrigger)
        })
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.triggerElement.removeEventListener('mouseleave', this.clearTrigger)
        this.triggerElement.removeEventListener('mouseenter', this.onTrigger)
        this._triggerElement = null
    }

    clearTrigger(){
        if( activeTooltip != this ) return
        
        hideTooltip()
        activeTooltip = null
    }

    onTrigger(){
        activeTooltip = this;
    }

})

export default customElements.get('b-tooltip')