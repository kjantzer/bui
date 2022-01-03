import Btn from '../../elements/btn'
import Store from '../../util/store'

customElements.define('b-panel-fullscreen-btn', class extends Btn{

    constructor(...args){
        super(...args)
        this.icon = "resize-full"

        this.addEventListener('click', this.fullscreen)
    }

    connectedCallback(){
        super.connectedCallback()

        if( !this.hasAttribute('slot') )
            this.slot = "right"

        setTimeout(()=>{

            if( !this.panel && this.parentElement && this.parentElement.panel )
                this.panel = this.parentElement.panel

            if( this.panel ){
                if( !this.height )
                    this.height = Store.create('b-panel-fullscreen:'+this.panel.view.tagName, this.panel.opts.height)

                this.panel.height = this.height()
            }
        })
    }

    set panel(panel){

        if( this.panel )
            delete this.panel.fullscreen

        this.__panel = panel
        this.panel.fullscreen = this.fullscreen.bind(this)
    }

    get panel(){ return this.__panel }

    _disconnectedCallback(){
        super.disconnectedCallback()

        if( this.panel ){
            this.panel.fullscreen = null
            this.panel = undefined            
        }
    }

    fullscreen({close=false, toggle=true}={}){

        if( !this.panel ) return

        if( close && this.panel.height != '100%')
            return this.panel.close()
        
        if( !toggle && this.panel.height == '100%')
            return

        this.panel.height = this.panel.height == '100%' ? this.panel.opts.height : '100%';
        this.height(this.panel.height)
    }

})

export default customElements.get('b-panel-fullscreen-btn')