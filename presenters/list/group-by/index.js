import { LitElement, html, css } from 'lit'
import {live} from 'lit/directives/live.js'
import scrollbars from '../../../helpers/scrollbars'
import {applyGrouping} from './util'
import '../../../elements/sortable'
import '../../../elements/details'

export {applyGrouping}

customElements.defineShared('b-list-group-by', class extends LitElement{

    static styles = css`
        :host {
            display: block;
            position:relative;
            overflow: auto;
        }

        :host([hidden]) { display: none; }

        :host([in-popover]) {
            padding: 1em;
            width: 320px;
        }

        :host([slot="sidebar:left"]) {
            grid-row: 2 / -1;
            grid-column: 1;
            padding: 1em;
            border-right: solid 2px var(--theme-bgd-accent);
            width: 200px;
        }

        :host([slot="sidebar:right"]) {
            padding: 1em;
            border-left: solid 2px var(--theme-bgd-accent);
            width: 200px;
        }

        .option {
            padding: .5em;
            padding-left: .25em;
            box-shadow: 0 0 0 1px var(--theme-bgd-accent) inset;
            border-radius: 4px;
            color: var(--theme-text-dim);
        }

        .option:has([checked]) {
            color: var(--theme-text);
            background: var(--theme-bgd-accent);
        }
        
        check-box {
            margin: -.3em 0;
            pointer-events: none;
        }

        ${scrollbars.hide()}
    `

    get _storeKey(){ return 'b-list:'+this.list?.key+':groupBy' }

    get list(){
        let el = this
        let list = null
        while(el && !list ){
            el = el.parentElement || el.getRootNode()?.host
            if( el.tagName == 'B-LIST' )
                list = el
        }

        return list
    }

    get valuesSelected(){
        return this.value.filter(v=>v[1]).map(v=>v[0])
    }

    set value(val){
        let oldVal = this.value
        this.__value = val

        localStorage.setItem(this._storeKey, JSON.stringify(this.__value))
        
        this._createValuesList()
    
        this.requestUpdate('value', oldVal)
    }
    
    get value(){ return Array.from(this.__value ?? (JSON.parse(localStorage.getItem(this._storeKey)) || [])) }

    firstUpdated(){
        // this.makeSortable()
        this.value = this.value
    }
    
    _createValuesList(){

        let groupByList = (this.value || []).map(([val, on])=>{
            let data = this.values.find(d=>d.val==val)
            if( !data ) return null

            return {
                on,
                ...data
            }
        }).filter(d=>d)

        // add any new values we dont have yet
        groupByList.push(...this.values.filter(v=>{
            return !groupByList.find(d=>d.val==v.val)
        }))

        
        this.valuesList = groupByList
    }

    connectedCallback(){
        super.connectedCallback()

        let list = this.list
        if( list?.coll ) list.coll.groupByView = this
    }

    set values(val){
        let oldVal = this.values
        this.__values = val

        this._createValuesList()

        this.requestUpdate('values', oldVal)
    }
    
    get values(){ return this.__values || [] }

    render(){return html`
        <b-grid cols=1 gap="1">
            
            <b-text xbold>Data Grouping</b-text>
            
            <b-grid cols=1 gap=" " class="options" @change=${this.onChange}>
                <b-sortable item=".option" @sort-changed=${this.onSort}></b-sortable>

            ${this.valuesList?.map(d=>html`
                
                <b-flex .val=${d.val} class="option" gap=0 left @click=${this._toggle}>
                    <check-box ?checked=${live(d.on)}></check-box>
                    <b-text>${d.label}</b-text>
                </b-flex>

            `)}
            </b-grid>

            <b-details noicon display-contents>
                <b-text dim link italic sm toggles><b-icon name="info"></b-icon>&nbsp;Tips</b-text>
                <b-text dim italic sm>Drag values to change the order of grouping</b-text>
                <b-text dim italic sm>Note: table data may not change if there are no differences for the selected group bys.</b-text>
            </b-details>

        </b-grid>
    `}

    _toggle(e){
        e.currentTarget.querySelector('check-box')?.toggle()
    }

    saveSelection(){
        let options = Array.from(this.$$all('.option'))

        this.value = options.map(el=>{
            return [el.val, el.querySelector('check-box').checked||0]
        })

        // this.model.set('groupBy', groupBy)
        // this.model.store(this.model.toJSON())

        this.list?.reload() // NOTE: or should be event?
    }

    onChange(e){
        // if checkbox change
        if( e.detail ) this.onSort(e)
    }

    onSort(e){
        this.saveSelection()
    }

})

export default customElements.get('b-list-group-by')
