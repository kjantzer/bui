import {css} from 'lit'
import Btn from '../../elements/btn'
import Notif from '../notif'

customElements.define('b-list-selection-btn', class extends Btn{

    static styles = [Btn.styles, css`

        :host {
            order: 100;
        }
    `]

    constructor(){
        super()
        this.setAttribute('clear', '')
        this.setAttribute('lg', '')
        this.icon = 'library_add_check'

        if( this.parentElement.tagName == 'B-LIST')
            this.slot = 'toolbar:after'

        if( this.parentElement.tagName == 'B-LIST-HEADER' )
            this.slot = 'selection'

        this.tooltip ="Toggle selection"

        this.addEventListener('click', this.beginSelection)
    }

    connectedCallback(){
        super.connectedCallback()
        let list = this.list
        if( list ){
            // auto set list options if not already set
            list.listOptions = list.listOptions || {}
            list.listOptions.selection = true
        }
    }

    get list(){
        let el = this
        let list = null
        while(el.parentElement && !list ){
            el = el.parentElement
            if( el.tagName == 'B-LIST' )
                list = el
        }

        return list
    }

    beginSelection(){

        if( this.list.selection?.isOn )
            return this.list.selection.end()

        let list = this.list
        let data = list.dataSource.data

        if( !list )
            return console.warn('`b-list-selection-btn` must be a child of `b-list`')

        if( typeof this.data == 'function' )
            data = this.data()

        if( data.length == 0 )
            return Notif.alert('No data to select', {autoClose: 2000})

        list.selection.begin()
    }

})

export default customElements.get('b-list-selection-btn')