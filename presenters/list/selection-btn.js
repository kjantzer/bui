import Btn from '../../elements/btn'
import Notif from '../notif'

customElements.define('b-list-selection-btn', class extends Btn{

    constructor(){
        super()
        this.setAttribute('text', '')
        this.icon = 'check'

        if( this.parentElement.tagName == 'B-LIST')
            this.slot = 'toolbar:before'

        this.title ="Select data"

        this.addEventListener('click', this.beginSelection)
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