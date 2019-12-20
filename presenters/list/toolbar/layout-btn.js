import Btn from '../../../elements/btn'

customElements.define('b-list-layout-btn', class extends Btn{

    firstUpdated(){
        this.setIcon()
        this.addEventListener('click', e=>{
            this.layouts.next()
        })
    }

    setIcon(){
        this.icon = this.layouts.get(this.layouts.active)
    }

    connectedCallback(){
        super.connectedCallback()
        this.setIcon = this.setIcon.bind(this)
        this.layouts.on('change', this.setIcon)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.layouts.off('change', this.setIcon)
    }

})

export default customElements.get('b-list-layout-btn')