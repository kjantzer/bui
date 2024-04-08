import Btn from '../../elements/btn'

customElements.define('b-list-minimize-btn', class extends Btn{

    constructor(){
        super()
        this.setAttribute('clear', '')
        this.setAttribute('lg', '')
        this.icon = this.icon || 'unfold_more'
        this.slot = this.slot || 'toolbar:after'
        this.title = this.title || "Minimize table"
        this.addEventListener('click', this.toggle)
    }

    get list(){
        if( this.parentElement.tagName !== 'B-LIST' )
            throw new UIWarningError('`b-list-minimize-btn` must be a direct child of `b-list`')

        return this.parentElement
    }

    async toggle(){
        if( this.list )
            this.list.toggleAttribute('minimized', !this.list.hasAttribute('minimized'))
    }

})

export default customElements.get('b-list-minimize-btn')