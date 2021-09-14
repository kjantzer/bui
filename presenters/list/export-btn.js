import Btn from '../../elements/btn'
import Notif from '../notif'
import Menu from '../menu'
import toCSV from '../../util/toCSV'
import { downloadCSV } from '../../util/download'

customElements.define('b-list-export-btn', class extends Btn{

    static get properties() { return {...super.properties,
        omitTitle: {type: Boolean, reflect: true},
        omitDescription: {type: Boolean, reflect: true}
    }}

    constructor(){
        super()
        this.setAttribute('text', '')
        this.setAttribute('pill', '')
        this.icon = this.icon || 'file-excel'
        this.slot = this.slot || 'toolbar:after'
        this.title = this.title || "Export data to CSV file"
        this.addEventListener('click', this.export)

        this.omitTitle = false;
        this.omitDescription = false;
    }

    async export(){
        if( this.parentElement.tagName !== 'B-LIST' )
            return console.warn('`b-list-export-btn` must be a direct child of `b-list`')

        let list = this.parentElement
        let data = list.dataSource.data
        let description = list.filters.toString() || 'No filters'

        let preset = undefined
        if( this.presets ){
            let presets = typeof this.presets == 'function' ? this.presets() : this.presets
            preset = await new Menu(presets.filter(o=>o)).popover(this, {align: 'bottom-end'})
            if( preset === false ) return
            preset = preset.val
            description += ' | Preset: '+preset
        }

        if( list.selection.isOn ){
            data = list.selection.result.models
            description += ' | User manually selected rows'
        }

        if( typeof this.data == 'function' )
            data = this.data()

        if( data.length == 0 )
            return Notif.alert('No data to export', {autoClose: 2000})
        
        let filename = list.key+'-'+(new Date().getTime())+'.csv'

        if( typeof this.filename == 'function' )
            filename = this.filename()

        const opts = {preset}
        if(!this.omitTitle){opts.title = list.key}
        if(!this.omitDescription){opts.description = description}

        downloadCSV(toCSV(data, opts), filename)
    }

})

export default customElements.get('b-list-export-btn')