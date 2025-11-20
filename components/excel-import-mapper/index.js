/*
    Excel Import Mapper

    TODO:
    - consider rename? table- or csv-?
    - support serverless mapping if file is csv file?
*/
import { LitElement, html, css } from 'lit'
import Panel from '../../presenters/panel'
import Dialog from '../../presenters/dialog'
import Menu from '../../presenters/menu'
import Fuse from 'fuse.js'
import scrollbars from '../../helpers/scrollbars'
import {titleize} from '../../util/string'
import numToAlpha from '../../util/numToAlpha'

export {Dialog, Menu}

customElements.defineShared('b-excel-import-mapper', class extends LitElement {

    static title = 'Excel Import'

    static styles = css`

        :host {
            display: grid;
            grid-template-rows: auto 1fr;
        }
        
        main {
            display: grid;
            grid-template-columns: 300px 1fr;
            overflow: hidden;
        }

        main > div {
            overflow: auto;
        }

        ${scrollbars.hide('main > div')}

        .unused > b-grid {
            min-height: 100%;
            padding: var(--gutter);
            padding-top: 1em;
            box-sizing: border-box;
        }

        .file-info {
            text-align: center;
        }

        b-label {
            font-weight: normal;
            font-size: 1em;
            justify-self: flex-start;
        }

        b-table {
            align-self: flex-start;
            max-height: 100%;
            overflow: auto !important;
        }

        b-table.preview > b-table-row > :first-child {
            background: var(--b-table-header-bgd, var(--theme-bgd-accent));
        }

        b-table-row > b-flex > :is(b-btn, b-toggle-btn){
            margin: -1em -.5em;
        }

        b-toggle-btn:not([active]) {
            opacity: .5;
        }
        
        .mapped {
            display: grid;
            align-items: center;
            justify-content: flex-end;
        }

        .mapped b-label {
            margin: -.5em 0;
        }
    `

    constructor(){
        super(...arguments)

        this.url = ''
        this.pastMappingsUrl = ''
        this.allowedHeaders = []
        this.requiredHeaders = []
        this.mappingAlternatives = {}
    }

    async open(file, uploader){

        let data = await uploader.upload({url: this.url})

        if( data.error )
            throw new UIWarningError(data.error.message)

        if( !this.panel )
            new Panel(this, {
                title: this.constructor.title,
                //controller: 'sales-import', 
                type: 'modal',
                disableBackdropClick: true,
                width: 'calc(100% - 2em)', height: 'calc(100% - 2em)',
            })

        this.uploader = uploader
        this.model = data
        this.file = file

        this.applyMapping()

        this.panel.open()
    }

    close(){ this.panel?.close()}

    applyMapping(){

        this._map = {}
        this._usedHeaders = {}

        if( !this.model ) return

        let allowed = this.allowedHeaders
        let header = this.model.header

        allowed.forEach(allowedKey=>{

            // already used
            if( this._usedHeaders[allowedKey] ) return

            let perfectMatch = header[allowedKey]
            if( perfectMatch ){
                this._map[allowedKey] = allowedKey
                this._usedHeaders[allowedKey] = allowedKey
                return
            }

            let altKey = this.mappingAlternatives[allowedKey]?.find(k=>header.includes(k))
            if( altKey ){
                this._map[altKey] = allowedKey
                this._usedHeaders[allowedKey] = altKey
                return
            }

            let headerFuseData = header.filter(k=>!this._map[k]).map(k=>{return {k}})
            let fuse = new Fuse(headerFuseData, {
                includeScore: true,
                threshold: .35,
                keys: [{
                    name: 'k',
                    weight: 0.5
                }],
            })

            let fuseMatch = fuse.search(allowedKey)

            if( fuseMatch.length && fuseMatch[0].score <= .5){
                
                let headerKey = fuseMatch[0].item.k
                this._map[headerKey] = allowedKey
                this._usedHeaders[allowedKey] = headerKey
            }

        })
    }

    isMapped(k){ return !!this._map[k] }
    headerUsed(k){ return !!this._usedHeaders[k] }

    async confirmImport(btn){
        return await Dialog.confirm({
            title: 'Import the File',
            body: `With ${Object.keys(this._map).length} of the ${Object.keys(this.model.preview[0]).length} columns mapped`,
            btns: ['cancel', {label: 'Import', color: 'theme'}]
        }).popOver(btn, {overflowBoundry: 'window'}) ? true : false
    }

    onImportComplete(resp){
        this.close()
    }

    onImportError(err){
        throw err
    }

    async import(e){
        let btn = e.currentTarget
        let progress
        if( btn.spin ) return
        
        let confirm = await this.confirmImport(btn)
        if( confirm === false ) return

        // no real "options" to send to server, so just send empty object
        if( confirm instanceof Element || confirm === true ) confirm = {}

        try{
            let url = this.url
            btn.spin = true

            progress = Dialog.realtimeProgress(url, {
                title: html`Creating import <b-timer running></b-timer>`,
                body: `Uploading file...`,
            }, {anchor: 'top', width: '300px'})

            let resp = await fetch.json(url, {
                method: 'POST',
                body: {tmpFile: this.model.tmpFile, tmpSrcFile: this.model.tmpSrcFile, mapping: this._map, opts: confirm}
            })
            
            this.onImportComplete(resp)

        }catch(err){
            this.onImportError(err)
        }finally{
            btn.spin = false
            progress.resolve()
        }
    }

    get headerVals(){
        let vals = [...(this.model?.header||[])]

        // add cell label here in case we sort next
        vals = vals.map((k,i)=>{return {k, i, label: numToAlpha(i)}})

        if( localStorage.getItem(this.tagName+'mapping-sort') )
            vals = vals.sort((a,b)=>a.k.localeCompare(b.k))

        return vals
    }

    render(){return html`
        <b-panel-toolbar>
            <b-btn slot="close-btn" clear @click=${this.close}>Cancel</b-btn>
        </b-panel-toolbar>
        <main @sort-changed=${this.onSortChange}>

            <div class="unused">
            <b-grid cols=1 gap="2">

                <b-grid cols=1 gap=" " class="file-info">
                    <b-text semibold md>${this.file?.name}</b-text>
                    <b-text><b-num .num=${this.model?.numRows}></b-num> rows</b-text>
                    <b-text dim>Modified <b-ts .date=${this.file?.lastModifiedDate}></b-ts></b-text>
                </b-grid>

                <b-btn lg block pill color="theme-gradient" @click=${this.import} ?disabled=${!this.canImport}>Import</b-btn>

                <b-table rounded>
                    <b-table-row slot="header">
                        <b-text bold >Available Datapoints</b-text>
                    </b-table-row>
                    <b-table-row>
                        <b-flex left wrap gap=".5" style="min-height: 1.2em;">
                        <b-sortable item=".header-key" group=${this.tagName}></b-sortable>
                            ${this.allowedHeaders.map(k=>this.renderBadge(k))}
                        </b-flex>
                    </b-table-row>
                </b-table>

                <b-text sm dim>
                <b-details>
                    <b-text toggles semibold>Instructions</b-text>
                    <b-grid cols=1 gap="1">
                    <b-text italic heading>
                        Drag unused data points to the corresponding table cell to map data. You can double click mapped tokens to remove.
                    </b-text>
                    <b-text italic heading>
                        Auto mapping is done based on exact field names, hard-coded alternative names (ie description=>copy), and then finally fuzzy matching.
                    </b-text>
                    </b-grid>
                </b-details>
                </b-text>
            </b-grid>
            </div>
            
            <b-table rounded class="preview">
                <b-table-row slot="header" sticky>
                    <b-text w="3em" semibold sticky label="Cell"></b-text>

                    <b-flex w="minmax(160px, 1fr)">
                        <b-text semibold>Mapping</b-text>
                        <b-btn clear icon="settings" @click=${this.mappingOptions} ?hidden=${!this.pastMappingsUrl}></b-btn>
                    </b-flex>
                    
                    <b-flex w="minmax(200px, 1fr)">
                        <b-text semibold>Header</b-text>
                        <b-toggle-btn clear key=${this.tagName+'mapping-sort'} icon="filter_list" 
                            @change=${this.sortDataChange}
                            tooltip="Sort fields"
                            ></b-toggle-btn>
                    </b-flex>
                    <b-text semibold w="minmax(300px, 3fr)">Row 1</b-text>
                    <b-text semibold w="minmax(300px, 3fr)">Row 2</b-text>
                    <b-text semibold w="minmax(300px, 3fr)">Row 3</b-text>
                </b-table-row>
            

                ${this.headerVals.map(d=>html`
                <b-table-row .key=${d.k}>

                    <b-text semibold sticky align="center">${d.label}</b-text>
                    
                    <div class="mapped">
                        <b-sortable item=".header-key" group=${this.tagName}></b-sortable>
                        ${this.renderBadge(d.k, true)}
                    </div>

                    <b-text semibold>${titleize(d.k)}</b-text>

                    ${this.model.preview?.map(row=>html`
                        <b-text>${row[d.k]}</b-text>
                    `).slice(0,3)}

                </b-table-row>
                `)}
            </b-table>

        </main>
    `}

    sortDataChange(){
        this.requestUpdate()
    }

    get canImport() {
        if( this.requiredHeaders?.length )
            return this.requiredHeaders.every(k=>{
                if( Array.isArray(k) )
                    return k.some(k=>this.headerUsed(k))
                return this.headerUsed(k)
            })

        return true
    }

    isRequired(k){
        return this.requiredHeaders?.flatMap(k=>k).includes(k)
    }

    renderBadge(k, mapped=false){ 

        let doRender = false

        if( mapped ){
            doRender = this.isMapped(k)
            k = this._map[k]
        }else
            doRender = !this.headerUsed(k)

        return doRender?html`
            <b-label badge="theme" ?muted=${!this.isRequired(k)} class="header-key" ?mapped=${mapped} @dblclick=${this.onTokenDblClick}>${k}</b-label>
        `:''
    }

    onTokenDblClick(e){
        
        if( !e.currentTarget.hasAttribute('mapped') ) return

        let token = e.currentTarget
        let key = token.textContent
        let fromKey = e.currentTarget.parentElement.parentElement.key
        
        delete this._map[fromKey]
        delete this._usedHeaders[key]

        this.requestUpdate()
    }

    onSortChange(e){

        let toKey = e.detail.to?.parentElement?.key
        let fromKey = e.detail.from?.parentElement?.key
        let headerKey = e.detail.item.textContent
        
        if( toKey ){
            this._map[toKey] = headerKey
            this._usedHeaders[headerKey] = toKey
        }
        
        if( fromKey ){
            delete this._map[fromKey]
        }

        if( !toKey ){
            delete this._usedHeaders[headerKey]
        }
        
        this.requestUpdate()
    }

    mappingOptions(e){

        this.pastMappings ||= []

        if( !this.pastMappingsUrl ) throw new UIWarningError('Past mappings URL not set')

        // fetch now, hopefully fetched before user selects "reuse" menu item
        fetch.json(this.pastMappingsUrl).then(resp=>{
            this.pastMappings = resp
        }).catch(err=>{})

        new Menu([
            {label: 'Clear Mapping', fn: 'clearMapping'},
            {label: 'Apply Auto Map', fn: 'autoMap', description: 'This is done by default'},
            '-',
            {label: 'Reuse Past Mapping', fn: 'reuseMapping', menu: ()=>{
                if( !this.pastMappings.length ) return [{text: 'None found (or failed to fetch)'}]

                return this.pastMappings.map(d=>{
                    return {
                        ...d,
                        label: Object.keys(d.mapping).length+` fields for: ${d.partner}`,
                        description: d.file,
                        extras: [
                            html`<b-text dim><b-ts .date=${d.ts_created}></b-ts></b-text>`
                        ]
                    }
                })
            }}
        ], {handler: this}).popOver(e.currentTarget)
    }

    reuseMapping(selected){
        let mapping = selected.menuSelected.mapping
        this._map = mapping
        this._usedHeaders = {}

        for( let k in mapping ){
            this._usedHeaders[mapping[k]] = k
        }

        this.requestUpdate()
    }

    clearMapping(){
        this._map = {}
        this._usedHeaders = {}
        this.requestUpdate()
    }

    autoMap(){
        this.applyMapping()
        this.requestUpdate()
    }

})

export default customElements.get('b-excel-import-mapper')