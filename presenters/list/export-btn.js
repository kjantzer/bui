import Btn from '../../elements/btn'
import Notif from '../notif'
import toCSV from '../../util/toCSV'
import { downloadCSV } from '../../util/download'

customElements.define('b-list-export-btn', class extends Btn{

    constructor(){
        super()
        this.setAttribute('text', '')
        this.setAttribute('pill', '')
        this.icon = 'file-excel'
        this.slot = 'toolbar:after'
        this.title ="Export data to CSV file"

        this.addEventListener('click', this.export)
    }

    export(){
        if( this.parentElement.tagName !== 'B-LIST' )
            return console.warn('`b-list-export-btn` must be a direct child of `b-list`')

        let list = this.parentElement
        let data = list.dataSource.data

        if( data.length == 0 )
            return Notif.alert('No data to export', {autoClose: 2000})
        
        let filename = list.key+'-'+(new Date().getTime())+'.csv'
        downloadCSV(toCSV(data, {
            title: list.key,
            description: list.filters.toString()
        }), filename)
    }

})

export default customElements.get('b-list-export-btn')