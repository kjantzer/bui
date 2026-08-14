/*
    # Mouse Scroll Horz Handle

    Either disable or enable the mouse scroll horz when the user hovers over the element.
*/
import { LitElement} from 'lit'
import '../helpers/lit/emitEvent'

customElements.define('b-mouse-scroll-horz-handle', class extends LitElement{

    static properties = {
        disable: {type: Boolean, reflect: true},
    }

    constructor(){
        super()
        this.mouseOver = this.mouseOver.bind(this)
        this.mouseLeave = this.mouseLeave.bind(this)
    }

    connectedCallback(){
        super.connectedCallback()
        this.container = this.parentElement || this.getRootNode()?.host
        this.container?.addEventListener('mouseenter', this.mouseOver)
        this.container?.addEventListener('mouseleave', this.mouseLeave)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.container?.removeEventListener('mouseenter', this.mouseOver)
        this.container?.removeEventListener('mouseleave', this.mouseLeave)
    }

    mouseOver(e){
        this.enable(this.disable?false:true);
    }

    mouseLeave(e){
        this.enable(this.disable?true:false);
    }

    enable(enable=true){
        this.emitEvent('mouse-scroll-horz-handle', {disable: !enable})
    }

})

export default customElements.get('b-mouse-scroll-horz-handle')