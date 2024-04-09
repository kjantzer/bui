import Btn from '../../elements/btn'
import Notif from '../notif'
import Menu from '../menu'
import toCSV from '../../util/toCSV'
import { downloadCSV } from '../../util/download'
import {titleize} from '../../util/string'

customElements.define('b-list-export-btn', class extends Btn{

    static get properties() { return {...super.properties,
        omitTitle: {type: Boolean, reflect: true},
        omitDescription: {type: Boolean, reflect: true}
    }}

    constructor(){
        super()
        this.setAttribute('clear', '')
        this.setAttribute('lg', '')
        this.icon = this.icon || 'file-excel'
        this.slot = this.slot || 'toolbar:after'
        this.title = this.title || "Export data to CSV file"
        this.addEventListener('click', this.export)

        this.omitTitle = false;
        this.omitDescription = false;
    }

    get list(){
        if( this.parentElement.tagName !== 'B-LIST' )
            throw new UIWarningError('`b-list-export-btn` must be a direct child of `b-list`')

        return this.parentElement
    }

    async export(){

        let list = this.list
        let data = list.dataSource.data
        let description = list.filters.toString() || 'No filters'

        let preset = undefined
        if( this.presets ){
            let presets = typeof this.presets == 'function' ? this.presets() : this.presets
            preset = await new Menu(presets.filter(o=>o)).popOver(this, {align: 'bottom-end'})
            if( preset === false ) return

            if( preset.db ) return this.exportDB(preset, {description})

            preset = preset.val
            description += ' | Export Preset: '+preset
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

        const opts = this.opts || {}

        if( preset ) opts.preset = preset

        if(!this.omitTitle){opts.title = titleize(list.key)}
        if(!this.omitDescription){opts.description = description}

        opts.from = this.list

        downloadCSV(toCSV(data, opts), filename)
    }

    async exportDB(preset, {description}={}){
        
        let list = this.list
        let filters = list.filters.toPostData()
        let url = list.coll.url

        let body = {filters: JSON.stringify(filters), download: preset.val}
        let q = new URLSearchParams(body)

        this.spin = true

        try{
            // TODO: support path override via preset?
            let resp = await fetch(url+'/download?'+q)

            if( resp.status != 200 )
                throw new Error(resp.statusText) // TODO: what if JSON error response?

            let headers = Object.fromEntries(resp.headers.entries())
            let data = await resp.text()

            let [_, filename] = headers['content-disposition']?.match(/filename=(.+)/) || []
            if( !filename ) list.key+'.csv'

            // TODO: detect JSON response and convert to csv?

            if(!this.omitDescription)
                data = description+`\n`+data

            if(!this.omitTitle)
                data = titleize(list.key)+`\n`+data

            return downloadCSV(data, filename)

        }finally{
            this.spin = false
        }
    }

})

export default customElements.get('b-list-export-btn')