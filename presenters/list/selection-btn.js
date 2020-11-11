import Btn from '../../elements/btn'
import Notif from '../notif'

customElements.define('b-list-selection-btn', class extends Btn{

    constructor(){
        super()
        this.setAttribute('text', '')
        this.setAttribute('pill', '')
        this.icon = 'check'
        this.slot = 'toolbar:before'
        this.title ="Select data"

        this.addEventListener('click', this.beginSelection)
    }

    beginSelection(){
        if( this.parentElement.tagName !== 'B-LIST' )
            return console.warn('`b-list-selection-btn` must be a direct child of `b-list`')

        let list = this.parentElement
        let data = list.dataSource.data

        if( typeof this.data == 'function' )
            data = this.data()

        if( data.length == 0 )
            return Notif.alert('No data to select', {autoClose: 2000})

        list.selection.begin()
    }

})

export default customElements.get('b-list-selection-btn')