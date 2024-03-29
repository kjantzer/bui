import { LitElement, html, css } from 'lit'
import Popover from './index'

customElements.defineShared('b-popover-view', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            width: 300px;
            padding: 1em;
            padding-bottom: .5em;
        }
    `}

    constructor(){
        super()
        this.addEventListener('mouseover', this.stopAutoClose)
    }

    async open(id, target, opts){
        this.opts = opts
        this.close()

        let resp = this.load(id)

        new Popover(target, this, opts)

        return resp
    }

    load(id){
        if( id && id.url && id.fetch )
            this.model = id
    }

    close(){
        this.stopAutoClose()
        
        if( this.popOver ){
            this.popOver.close()
            this.model = null // no reason to clear model if we didn't actually close
        }
    }

    // deprecated - use `openIfHoveringContinues`
    openIfHovered(...args){
        return this.openIfHoveringContinues(...args)
    }
    
    openIfHoveringContinues(id, target, {delay=700, opts}={}){

        const onMouseOut = function(){ 
            this.autoClose()
            clearTimeout(target._openIfHoveredTimeout)
            target.removeEventListener('mouseout', onMouseOut)
            target.removeEventListener('click', onMouseOut)
        }.bind(this)


        target.addEventListener('mouseout', onMouseOut, {once: true})
        target.addEventListener('click', onMouseOut, {once: true})
        this.addEventListener('mouseout', this.close.bind(this), {once: true})

        target._openIfHoveredTimeout = setTimeout(()=>{
            
            this.open(id, target, opts)

        }, delay)
    }

    stopAutoClose(){
        clearTimeout(this._autoCloseTimeout)
    }

    autoClose(delay=300){
        this._autoCloseTimeout = setTimeout(()=>{
            this.close()
        }, delay)
    }

})

export default customElements.get('b-popover-view')