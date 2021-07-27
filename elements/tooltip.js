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

    mouseX = e.clientX
    mouseY = e.clientY

    if( activeTooltip ){

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
    if( !activeTooltip || shownTooltip ) return

    let target = new MouseEvent('mousemove', {clientX: mouseX, clientY: mouseY})
    
    if( activeTooltip.target != 'mouse' )
        target = activeTooltip.triggerElement

    shownTooltip = new Popover(target, activeTooltip.innerHTML, {
        className: 'tooltip',
        align: activeTooltip.align,
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
        target: {type: String}
    }}

    constructor(){
        super()

        followMouse()

        this.onTrigger = this.onTrigger.bind(this)
        this.clearTrigger = this.clearTrigger.bind(this)

        // this.trigger = 'hover'
        this.delay = 1
        this.align = 'right-top'
        this.target = 'mouse'
    }

    // render(){return html``}

    get triggerElement(){
        if( !this._triggerElement ){

            if( this.target == 'parent' )
                this._triggerElement = this.parentElement
            else
                this._triggerElement = this.offsetParent || this.parentElement
        }
        
        return this._triggerElement
    }

    connectedCallback(){
        super.connectedCallback()

        setTimeout(()=>{
            console.log(this.triggerElement);
            this.triggerElement.addEventListener('mouseleave', this.clearTrigger)
            this.triggerElement.addEventListener('mouseenter', this.onTrigger)
        })
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.triggerElement.removeEventListener('mouseleave', this.clearTrigger)
        this.triggerElement.removeEventListener('mouseenter', this.onTrigger)
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