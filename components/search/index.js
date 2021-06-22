import { LitElement, html, css } from 'lit-element'
import Panel, {register as panelRegister} from '../../presenters/panel'
import Notif from '../../presenters/notif'
import Popover from '../../presenters/popover'
import '../../helpers/lit-element/shared'
import device from '../../util/device'
import store from '../../util/store'
import mobileAsyncFocus from '../../util/mobileAsyncFocus'
import './result'
import './empty-view'
import './divider'
import Tips from './tips'
import Coll from './models'

const maxHeight = '96%';
const maxHistoryDefault = 120
export const filters = {
    search: {hideIcon: true},
    auto_open: {
        values: [
            {label: 'Yes', val:''},
            {label: 'No', val: false},
            {text: 'Should single results be opened?'}
        ],
        // no filtering, this filter is used as a search "setting"
        filterBy(m, val, key){ return true}
    }
}

export function shortcuts(){
    return panelRegister.shortcuts
}

export default class extends LitElement{

    static get properties(){return {
        state: {type: String, reflect: true}
    }}

    open({
        term='',
        placeholder=null,
        url=null,
        filters=null,
        fromShortcut= null
    }={}){

        /* 
            We will focus the input "onOpen", but iOS (and maybe android?)
            wont focus and open keyboard async (after the tap is over)
        */
        if( device.isiOS )
            mobileAsyncFocus(this)

        this.panel = this.panel || new Panel(this, {
            title: 'Search',
            anchor: device.isMobile ? 'top': 'center',
            closeOnEsc: true,
            width: device.isMobile ? '100%' :'640px',
            height: device.isMobile ? '50%' : '540px',
            type: 'search-popup',
            animation: 'scale',// 'drop'
        })

        this.panel.open()

        this.defaultUrl = this.defaultUrl || this.url
        this.defaultPlaceholder = this.defaultPlaceholder || this.placeholder
        
        this.coll.url = this.url = url || this.defaultUrl
        this.placeholder = placeholder || this.defaultPlaceholder

        setTimeout(()=>{

            if( fromShortcut && this.shortcutsTrigger
            && fromShortcut == this.shortcutsTrigger ){
                this.term = this.shortcutsTrigger
            }else if( term ){
                this.term = term
            }

            if( filters ){
                
                if( !this.origFilters() ){
                    this.origFilters(this.list.filters.value())
                }

                this.list.filters.update(filters)

            }else{
                
                let origFilters = this.origFilters()
                if( origFilters ){
                    this.list.filters.reset(origFilters)
                    this.origFilters(null)
                }                
            }
        })
    }

    static get properties(){ return {
        fetching: {type: Boolean, reflect: true},
        url: {type: String, reflect: true},
        placeholder: {type: String, reflect: true},
        minTermLength: {type: Number},
        typeDelay: {type: Number}
    }}

    constructor(){
        super()
        this.fetching = false
        this.minTermLength = 3
        this.typeDelay = 400

        this.key = 'b-search-popup'
        this.placeholder = 'What are you looking for?'
        this.url = '/api/search'

        this.emptyView = 'b-search-popup-empty-results'
        this.resultView = 'b-search-popup-row'
        this.dividerView = 'b-search-popup-results-divider'
        this.filters = filters

        this.origFilters = store.create('b-search-popup:'+this.key+':origional-filters')
        this.history = store.create('b-search-popup:'+this.key+':history', [])
        this.settings = store.create('b-search-popup:'+this.key+':settings', {
            maxHistory: maxHistoryDefault,
            enlarge: false
        })
    }

    get shortcutsTrigger(){ return '/' }
    get shortcuts(){ return shortcuts() }

    get coll(){
        return this.__coll = this.__coll || new Coll(this.url)
    }

    static get styles(){return css`
        :host {
            display: grid;
            height: 100%;
            position:relative;
            grid-template-rows: auto 1fr;
            overflow: hidden;
        }

        .searchbox {
            font-size: 1.2em;
            padding: 1rem;
            display: block;
            border-bottom: solid 1px var(--theme-bgd-accent);
        }

        @media (min-width: 699px) {
            .searchbox {
                font-size: 1.6em;
            }
        }

        .searchbox [name="search"]{
            margin-right: .5rem;
            transition: 0;
            transition-delay: 300ms;
        }

        text-field[empty] ~ [name="cancel-circled"] {
            display: none;
        }

        /* increase hit size */
        .searchbox [name="cancel-circled"]{
            padding: .5em;
            margin: -.5em;
        }

        .searchbox [name="cancel-circled"]:not(:hover) {
            opacity: .5
        }

        .searchbox b-spinner {
            /* --size: 1em; */
            position: absolute;
            z-index: 100;
            /* background: var(--theme-bgd); */
            visibility: hidden;
            transition: 0;
            transition-delay: 300ms;
        }

        /* tranition delay is added to keep the spinner from 
            quickly hiding and reshowing
        */
        :host([fetching]) .searchbox  b-spinner { visibility: visible; transition-delay: 0ms; }
        :host([fetching]) .searchbox [name="search"] { visibility: hidden; transition-delay: 0ms; }

        b-list {
            grid-template-rows: auto 1fr auto auto;
        }

        b-list::part(toolbar) {
            order: 3;
            box-shadow: none;
            border-top: solid 1px var(--theme-bgd-accent);
        }

        b-list::part(list){
            padding: .5em;
        }
        
        b-list::part(row) {
            padding: .5em;
            box-sizing: border-box;
            border-radius: 5px;
        }

        b-list::part(row).active {
            background-color: red;
        }

    `}

    render(){return html`
        
        <header>

            <form-control show="prefix" class="searchbox" .value=${this._term}>
                <text-field slot="control"
                    placeholder="${this.placeholder}"
                    @keyup=${this.onKeyUp}
                    @paste=${this.onPaste}
                    @change=${this.onChange}
                ></text-field>
                <b-icon name="search" slot="prefix"></b-icon>
                <b-icon name="cancel-circled" slot="suffix" @click=${this.clear}></b-icon>
                <b-spinner slot="prefix"></b-spinner>
            </form-control>

        </header>

        <b-list
            key="${this.key}"
            empty="${this.emptyView}"
            row="${this.resultView}"
            divider="${this.dividerView}"
            .filters=${this.filters}
            .coll=${this.coll}
            @select-result=${this.selectResult}
            @go-to-result=${this.goToResult}
        >
        
            <span slot="toolbar:refresh"></span>
            <span style="display: none;" slot="spinner"></span>

            ${this.renderToolbarButtons()}

        </b-list>
    `}

    renderToolbarButtons(){return html`
        ${device.isMobile?html`
            <b-btn slot="toolbar:after" @click=${this.close} lg color="theme">Done</b-btn>
        `:html`
            <b-btn slot="toolbar:after" @click=${this.showTips} icon="lightbulb" text></b-btn>
            <b-btn slot="toolbar:after" @click=${this.enlarge} icon="resize-full" text></b-btn>
        `}
    `}

    showTips(e){
        new Popover(e.currentTarget, Tips.shared)
    }

    close(){
        this.panel&&this.panel.close()
    }

    firstUpdated(){
        this.fc = this.shadowRoot.querySelector('form-control')
        this.coll.reset(this.history()||[])
        this.state = 'empty'
        // window.addEventListener('focus-'+this.key, this.focus.bind(this))

        if( !device.isMobile && this.settings().enlarge )
            this.enlarge()
    }

    focus(){
        this.fc.focus()

        // do not select the shortcut trigger (this way the user can begin typing a shortcut)
        if( this.shortcuts && this._term == this.shortcutsTrigger )
            this.fc.control.select({start:1})
        else
            this.fc.control.select()
    }

    blur(){
        this.fc.blur()
    }

    clear(){
        this.fc.value = ''
        this._term = ''
        this.coll.term = ''
        this.list.term = ''
        this.coll.reset(this.history()||[])
        this.state = 'empty'
        this.focus()
        setTimeout(()=>{
            this.list.reload()
        })
    }

    onOpen(){
        this.focus()
    }

    set term(val){
        if( this.fc )
            this.fc.value = val
        this._search(val)
    }

    onPaste(e){
        let val = e.currentTarget.currentValue
        this._search(val)
    }

    // TODO: use panel `onKeyUp` option so we dont have to be focused in the search box
    onKeyUp(e){
        let val = e.currentTarget.currentValue 
        let metaKey = e.metaKey || e.ctrlKey || e.altKey

        if( e.key == 'Enter' && device.isMobile )
            return this._search(val)

        if( e.key == 'Enter' )
            return this.goToSelected(e)
        
        if( metaKey && ['ArrowUp', 'ArrowDown'].includes(e.key) )
            return this.enlarge()

        if( e.key == 'ArrowDown' )
            return this.selectNext()
        
        if( e.key == 'ArrowUp' )
            return this.selectPrev()

        this._search(val)
    }

    _selectResult(result, {scrollTo=true}={}){
        let active = this.list.$$('[part="row"][active]')
        let first = this.list.$$('[part="row"]')
        
        if( result == 'first' )
            result = first
        else if( result == 'next' )
            result = active?active.nextElementSibling:first
        else if( result == 'prev' )
            result = active?active.previousElementSibling:first

        if( result ){
            active && active.removeAttribute('active')
            result.setAttribute('active', '')
            
            if( scrollTo )
                result.scrollIntoViewIfNeeded(false)
        }
    }

    selectResult(e){ this._selectResult(e.detail, {scrollTo:false}) }
    selectNext(){ this._selectResult('next') }
    selectPrev(){ this._selectResult('prev') }

    goToSelected(e){
        let active = this.list.$$('[part="row"][active]')
        
        if( !active ) return
        let metaKey = e && (e.metaKey || e.ctrlKey)
        if( this.goTo(active.model, metaKey) !== false ){
            this.trackHistory(active.model)
            this.close()
        }
    }

    goToResult(e){
        this._selectResult(e.detail)
        this.goToSelected(e)
    }

    goTo(selected, metaKey){
        Notif.alert('Cannot open yet')
        return false
    }

    trackHistory(data){

        if( data.type == 'shortcut' )
            return;
        
        data = Object.assign({}, data, {
            _historyTs: new Date().getTime()
        })
        
        // remove data points added by BUI
        delete data.coll
        delete data.collection
        delete data.search
        delete data.searchMatches

        let history = this.history() || []
        history.unshift(data)        

        let ids = []
        let deduped = []

        history.forEach(d=>{
            let id = d.id+'-'+d.type
            if( ids.includes(id) ) return
            ids.push(id)
            deduped.push(d)
        })

        history = deduped.slice(0, this.settings().maxHistory||maxHistoryDefault)

        this.history(history)
    }

    enlarge(){
        if( !this.panel ) return

        // remember what the initial panel height was
        if( !this.__initialPanelHeight )
            this.__initialPanelHeight = this.panel.height
        
        this.panel.height = this.panel.height == maxHeight ? this.__initialPanelHeight : maxHeight

        let settings = this.settings()
        settings.enlarge = this.panel.height==maxHeight
        this.settings(settings)
    }

    _search(val){

        // term didnt' change, no reason to fetch results again
        if( val == this._term ) return

        this._term = val

        this.fetching = false
        clearTimeout(this._fetchDelay)

        if( !this._term ) return this.clear()

        if( this.shortcuts && this._term[0] == this.shortcutsTrigger ){
            this.list.filters.searchOptions = {minMatchCharLength: 1}
            return this._loadShortcuts()
        }else{
            this.list.filters.searchOptions = {minMatchCharLength: this.minTermLength}
            this.list.term = ''
        }

        if( this._term.length < this.minTermLength ) return

        // delay fetching in case user types another character
        // this.fetching = true
        this._fetchDelay = setTimeout(this.fetchResults.bind(this), this.typeDelay)
    }

    async _loadShortcuts(){

        this.coll.reset(this.shortcuts.map(s=>{
            s.type = 'shortcut'
            return s
        }))

        this.state = 'shortcuts'

        this.list.term = this._term.slice(1) // remove leading "trigger"

        setTimeout(()=>{
            if( !this.list.term )
                this.list.reload()
        })

        setTimeout(()=>{
            this._selectResult('first')
        })
    }


    async fetchResults(){
        
        this.fetching = true
        this.coll.term = this._term
        await this.list.refresh()
        this.fetching = false

        this.state = 'results'
        
        this._selectResult('first')

        if( this.coll.length == 1 && this.shouldAutoOpen ){
            this.goToSelected()
        }
    }

    get shouldAutoOpen(){
        if( this.list.filters && this.list.filters.get('auto_open') )
            return this.list.filters.get('auto_open').value !== false
        
        return true
    }

    static bindShortcut(key='k'){

        if( typeof key == 'string' )
            key = [key]

        let shouldOpen = function(e){
            return key.includes(e.key) && (e.metaKey || e.ctrlKey)
        }

        if( typeof key == 'function' )
            shouldOpen = key

        window.addEventListener('keydown', e=>{
            if( shouldOpen(e) ){
                e.preventDefault()
                this.shared.open({
                    fromShortcut: e.key
                })
            }
        })

    }

}