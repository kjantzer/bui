import { LitElement, html, css } from 'lit'
import RoutedView from '../../app/views/routed'
import Panel, {register as panelRegister} from 'panel'
// import mobileAsyncFocus from '../../util/mobileAsyncFocus' // TODO:
import device from '../../util/device'
import CollMap from '../../util/collmap'
import Coll from './models'
import './row'
import './divider'
import './detail'

export function shortcuts(){
    return panelRegister.shortcuts
}

const DEFAULT_PANEL_WIDTH = device.isSmall ? '100%' : '640px'
const DEFAULT_PANEL_HEIGHT = device.isiOS || device.isSmall? '50%' : '680px'
const MAX_PANEL_HEIGHT = 'calc(100% - 1em)'
const MAX_PANEL_WIDTH = '800px'
const USER_HISTORY_TERM = 'user-history'

let anchor = device.isMobile ? 'top': 'center'

if( device.isChromeOS && device.isTablet && device.isLandscape ){
    anchor = 'left'
    width = '50%'
    height = '100%'
}

export function register(opts={}){
    Panel.register('b-global-search', {
        anchor,
        width: DEFAULT_PANEL_WIDTH,
        height: DEFAULT_PANEL_HEIGHT,
        closeOnEsc: true,
        type: 'search-popup',
        animation: 'scale',// 'drop'
        ...opts
    })
}

customElements.define('b-global-search', class extends RoutedView {

    static title = 'Search'
    static icon = 'search'
    static path = 'search(/:searchSet)'

    static properties = {
        searchSet: {state: true},
        expanded: {type: Boolean}
    }

    static styles = [RoutedView.styles, css`
        :host {
            display: grid;
            height: 100%;
            position:relative;
            grid-template-rows: auto 1fr;
            overflow: hidden;
            --radius: 1em !important;
        }

        .searchbox {
            font-size: 1.2em;
            padding: 1rem;
            display: block;
            border-bottom: solid 1px var(--theme-bgd-accent);
        }

        @media (min-width: 599px) {
            .searchbox {
                font-size: 1.6em;
            }
        }

        .searchbox .search-icon {
            margin-right: .5rem;
            transition: 0;
            /*transition-delay: 300ms;*/
        }

        text-field[empty] ~ [icon="close"] {
            display: none;
        }

        .searchbox [icon="close"]:after {
            content: '';
            display: block;
            position: absolute;
            width: 150%;
            height: 150%;
            left: -25%;
            top: -25%;
        }

        .searchbox [icon="close"]:not(:hover) {
            opacity: .3;
        }

        .result-type-label {
            position: absolute;
            left: 1em;
        }

        .searchbox b-spinner {
            position: absolute;
            /*--size: 1em;*/
            visibility: hidden;
        }

        .searchbox b-spinner[spin] {
            visibility: visible;
        }

        .searchbox b-spinner[spin] ~ b-icon {
            visibility: hidden;
        }

        /* tranition delay is added to keep the spinner from 
            quickly hiding and reshowing
        */
        :host([fetching]) .searchbox  b-spinner { visibility: visible; transition-delay: 0ms; }
        :host([fetching]) .searchbox [name="search"] { visibility: hidden; transition-delay: 0ms; }

        b-list {
            grid-template-rows: auto 1fr auto;
            grid-template-areas: 
                "sidebarleft header sidebarright"
                "sidebarleft list sidebarright"
                "sidebarleft footer sidebarright"
                "toolbar toolbar toolbar";
        }
        

        b-list b-text[slot="header"] {
            padding: .5em 1em 0;
            /*border-bottom: solid 1px var(--theme-bgd-accent);*/
        }
    `]

    constructor(opts){
        super()
        this.fetching = false
        this.minTermLength = 3
        this.typeDelay = 400

        this.key = 'b-global-search-popup'
        this.placeholder = opts.placeholder || 'Search or type command'
        this.url = opts.url || '/api/search'

        this.coll = new Coll()
        this.coll.url = this.url

        this.searchSets = new CollMap({}, {appendKey: true})
        this.resultRender = new CollMap({}, {appendKey: true})

        this.searchSets.set('/ ', {
            icon: 'apps',
            label: 'Apps (and shortcuts)',
            menu: shortcuts()
        })

        if( opts.searchSets )
            this.searchSets.set(opts.searchSets)

        this.searchSets.set('/', {
            icon: 'apps',
            label: 'Available Search Commands',
            menu: this.searchSets.map((d,k)=>{
                return {
                    label: d.label,
                    key: k, // for searching
                    val: d, 
                    icon: d.icon, 
                    type: 'searchSet'
                }
            })
        })

        if( opts.resultRender )
            this.resultRender.set(opts.resultRender)

        this.filters = !opts.filters || device.isSmall ? {} : {...filters, ...opts.filters||{}}
    }

    spin(spin=true){
        this.$$('b-spinner', true)?.spin(spin)
    }

    set fetching(val){
        this.__fetching = val
        this.spin(val)
    }

    get fetching(){ return this.__fetching }

    updated(){
        this.panel.width = this.expanded ? MAX_PANEL_WIDTH : DEFAULT_PANEL_WIDTH
        this.panel.height = this.expanded ? MAX_PANEL_HEIGHT : DEFAULT_PANEL_HEIGHT
    }

    firstUpdated(){
        this.expanded = this.$$('b-toggle-view')?.active
    }

    get shouldAutoOpen(){ return this.list?.filters.get('auto_open').value !== false }

    render(){return html`
        <b-toggle-view key="global-search:expanded" type="expanded"></b-toggle-view>

        <header>

            <form-control show="prefix" class="searchbox">
                <text-field slot="control"
                    placeholder="${this.placeholder}"
                    @keyup=${this.onKeyUp}
                    @paste=${this.onPaste}
                    @change=${this.onChange}
                ></text-field>
                
                <b-text slot="prefix" @click=${this.availableCommands} link>
                    <b-spinner></b-spinner>
                    <b-icon class="search-icon" name=${this.searchSet?.icon||'search'} ></b-icon>
                </b-text>
                
                <b-text slot="prefix" class="lookup-label" gradient @click=${this.clearLookup} ?hidden=${!this.lookupValue}>
                    ${this.lookupValue}:&nbsp;
                </b-text>

                <b-btn icon="close" pill squareicon sm slot="suffix" @click=${this.clearBtn}></b-btn>

            </form-control>

        </header>

        <b-list
            placeholder=${this.searchSet?.label||'No results'}
            key="${this.key}"
            row="b-global-seach-row"
            divider="b-global-search-row-divider"
            .filters=${this.filters}
            .coll=${this.coll}

            @filter-change=${this.onFilterChange}
            @select-result=${this.selectResult}
            @go-to-result=${this.goToSelected}
        >

            <b-text slot="header" xbold xs ucase ?hidden=${!this.searchSet}>
                <b-flex>
                    <b-text>${this.searchSet?.label}</b-text>
                    <b-text nobold italic caps dim clip>${this.searchSet?.description}</b-text>
                </b-flex>
            </b-text>
        
            <span slot="toolbar:refresh"></span>
            <span style="display: none;" slot="spinner"></span>

            <b-toggle-btn slot="toolbar:after" ?hidden=${device.isSmall}
                key="global-search:expanded" type="expanded" clear icon="unfold_more"></b-toggle-btn>

            <b-global-search-row-detail slot="sidebar:right" class="show-detail" ?hidden=${anchor=='top'}
                .model=${this.activeModel}></b-global-search-row-detail>

        </b-list>
    `}

    get input(){ return this.$$('.searchbox', true) }

    focus(){
        this.input.focus()

        // do not select the shortcut trigger (this way the user can begin typing a shortcut)
        if( this.searchSet )
            this.input.control.select({start:1})
        else
            this.input.control.select()
    }

    blur(){
        this.input.blur()
    }

    set fetchMore(val){ 
        // console.log('more', val);
        if( !this.list?.dataSource ) return
        this.list.dataSource.opts.fetch = val ? 'more' : true
    }

    clearBtn(){ return this.clear({refresh: true})}

    clear({refresh=false}={}){

        this.input.value = ''
        this._term = ''
        this.__active = null
        this.coll.term = USER_HISTORY_TERM
        this.coll.url = this.url
        this.list.term = ''
        this.searchSet = null
        this.coll.reset([])

        this.route?.update({
            path: this.makePath(null)
        })

        this.focus()
        setTimeout(()=>{
            this.fetchMore = this.coll.term == USER_HISTORY_TERM
            refresh ? this.list.refresh() : this.list.reload()
        })
    }

    availableCommands(){
        this.input.value = '/'
        this._search(this.input.value)
        this.focus()
    }

    onOpen(state){
        
        // check for a searchSet key in the url
        let searchSet = decodeURIComponent(state?.params?.searchSet||state.props.searchSet||'')
        let [_searchSet, term] = searchSet?.split('_')
        searchSet = _searchSet

        // if valid, activate it now
        if( searchSet && this.searchSets.get(searchSet) ){
            this.searchSet = this.searchSets.get(searchSet)
            this.input.value = searchSet+(term||'')
            this._search(this.input.value)
        // else, clear the key from the url
        }else {
            if( searchSet ){
                this.route?.update({
                    path: this.makePath(null)
                })
            }

            if( state.props?.fromKeyboardShortcut )
                this.clear()

            this.coll.term = USER_HISTORY_TERM
            this.fetchMore = true
        }

        if( !this.input.value && this.coll.hasFetched )
            this.list?.refresh()

        this.focus()
    }

    toggleEnlarge(e){
        e?.stopPropagation?.()
        this.$$('b-toggle-btn')?.click()
    }

    onPaste(e){
        this._keydownSearch()
    }

    onKeydown(e){
        // let val = this.input?.control?.currentValue 
        let metaKey = e.metaKey || e.ctrlKey || e.altKey

        if( e.key == 'ArrowDown' && metaKey )
            return this.toggleEnlarge(e)

        if( e.key == 'ArrowUp' && metaKey )
            return this.toggleEnlarge(e)

        if( e.key == 'Enter' && device.isMobile )
            return this._keydownSearch()

        if( e.key == 'Enter' )
            return this.goToSelected(e)
        
        if( metaKey && ['ArrowUp', 'ArrowDown'].includes(e.key) )
            return this.enlarge()

        if( e.key == 'ArrowDown' )
            return this.selectNext()
        
        if( e.key == 'ArrowUp' )
            return this.selectPrev()

        this._keydownSearch()
    }

    enlarge(){}

    _keydownSearch(){
        setTimeout(()=>{
            this._search(this.input?.control?.currentValue)
        }, 20)
    }

    set active(val){
        
        let oldActive = this.activeModel
        if( oldActive )
            oldActive.trigger('active', false)

        this.__active = val

        let newActive = this.activeModel
        if( newActive )
            newActive.trigger('active', true)

        this.requestUpdate(newActive, oldActive)
    }
    
    get active(){ return this.__active }

    get activeModel(){
        return this.list?.currentModels[this.active] || undefined
    }

    _selectResult(modelOrIndex, {scrollTo=true}={}){
        let index = modelOrIndex?.fetch ? this.coll.indexOf(modelOrIndex) : modelOrIndex
        
        if( index < 0 )
            index = this.list.currentModels.length
        if( index > this.list.currentModels.length - 1 )
            index = 0

        this.active = index

        if( scrollTo !== false )
            this.activeModel?.trigger('scrollto')
    }

    selectResult(e){ this._selectResult(e.detail, {scrollTo:false}) }
    selectNext(){ this._selectResult((this.active??-1)+1) }
    selectPrev(){ this._selectResult((this.active??-1)-1) }

    goToSelected(e){
        let model = this.activeModel

        if( !model ) return

        if( model?.get('type') == 'searchSet' ){
            this.input.value = model.get('val').key

            this._search(this.input.value)
            this.focus()
            return
        }

        // FIXME:
        goToSelected.call(this, model.toJSON(), e?.metaKey||e?.ctrlKey)
    }

    _search(val){

        // term didnt' change, no reason to fetch results again
        if( val == this._term ) return

        this._term = val

        this.fetching = false
        clearTimeout(this._fetchDelay)

        if( !this._term ) return this.clear({refresh: true})

        // was a result set requested?
        if( this.searchSets.get(this._term) ){
            this.searchSet = this.searchSets.get(this._term)
            this.fetchMore = false
        }else if( this.searchSet?.key && this._term && !this._term.match(new RegExp('^'+this.searchSet.key)) ){
            this.searchSet = null
        }

        // has a result set been activated? perform different logic
        if( this.searchSet ){

            this.searchSetTerm = this._term.substr(this.searchSet.key.length).trim()

            // track the selected search set in the url
            this.route?.update({
                path: this.makePath({
                    searchSet: encodeURIComponent(this.searchSet.key+(this.searchSetTerm?'_'+this.searchSetTerm:''))
                })
            })

            if( this.searchSet.menu ){

                this.coll.reset(this.searchSet.menu)
                this.list.term = this.searchSetTerm
                // this.list.filters.searchOptions.minMatchCharLength = 1
                this.list.filters.searchOptions = {
                    ...this.list.filters.searchOptions,
                    minMatchCharLength: 1,
                }

                setTimeout(()=>{
                    if( !this.list.term )
                        this.list.reload()
                })

                setTimeout(()=>{
                    this._selectResult(0)
                })

                return
            }else{
                this.coll.term = ''
            }

            this.list.term = ''
            this.coll.reset()
            this.list.reload()
        }

        this.list.filters.searchOptions = {
            ...this.list.filters.searchOptions,
            minMatchCharLength: this.minTermLength,
        }

        if( this._term.length < this.minTermLength ) return

        // delay fetching in case user types another character        
        // unless we just set the searchSet and no term is set to search yet
        let delay = this.searchSet && !this.searchSetTerm ? 0 : this.typeDelay
        this._fetchDelay = setTimeout(this.fetchResults.bind(this), delay)
    }

     async fetchResults(){
        
        this.fetching = true

        if( this.searchSet ){
            this.coll.url = this.searchSet.url
            this.coll.term = this.searchSetTerm.trim()
        }else{
            this.coll.url = this.url
            this.coll.term = this._term //|| USER_HISTORY_TERM
        }

        this.fetchMore = this.coll.term == USER_HISTORY_TERM

        // clear results, to make it obvious?
        this.coll.reset([])
        this.list.reload()
        
        await this.list.refresh()
        this.fetching = false

        this.state = 'results'
        
        this._selectResult(1)

        if( this.coll.length == 1 && this.shouldAutoOpen ){
            this.goToSelected()
        }
    }


})

export default customElements.get('b-global-search')



function bindShortcut(key='k'){

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

            goTo('search', {fromKeyboardShortcut: true, searchSet: e.key})
        }
    })

}

bindShortcut(['k', 'o', '/'])



function goToSelected(selected, metaKey){

    let url, props;

    if( selected.url ) url = selected.url
    
    let id = selected.id
    let type = selected.result_type

    // if( selected.shortcut == 'lookup-filter' ){
    //     this.list.filters.update({lookup: selected.val})
    //     this.clear()
    //     return false
    // }

    if( type == 'book' )
        // v5
        if( window.app ){
            return app.editBook(selected.id)
        }
        else
            url = 'book/'+selected.book_id

    if( type == 'person' )
        url = 'person/'+id

    if( type == 'deal' )
        url = 'deal/'+id
    
    if( type == 'contract' )
        url = 'contract/'+id
    
    if( type == 'user' )
        url = 'account/'+id

    // assume product search means inventory
    if( ['product', 'inventory'].includes(type) )
        url = 'inventory/'+id
    
    if( ['shipment', 'shipment-by-name'].includes(type) )
        url = 'shipments/'+id
    
    if( type == 'events' ) // DEPRECATED
        url = 'event/'+id

    if( ['event'].includes(type)){
        url = `${selected.event_type_record}-record/${id}`
    }
    
    if( type == 'entity' )
        url = 'entity/'+id
    
    if( type == 'contacts' )
        url = 'contact/'+id

    if( type == 'series' )
        url = 'series/'+id

    if( type == 'order' ){
        if( window.app )
            return app.lookupOrder(selected.order_id)
        
        url = 'order/'+selected.order_id
    }

    if( selected.type == 'shortcut' ){
        url = selected.url
        props = selected.props
    }

    if( metaKey )
        return window.open('/'+url)
    else if( url ){
        goTo(url, props)
        this.panel?.close()
        return
    }

    throw new UIWarningError('Cannot open yet')
}

let filters = {
    options: {sidebar: false},
    search: {
        hideIcon: true,
        threshold: .1,
        data(m){ return {
            label: m.get('label'),
            title: m.get('title'),
            sortTitle: m.get('sortTitle'),
            key: m.get('key')
        }}
    },
    auto_open: {
        label: 'Auto Open',
        values: [
            {label: 'Yes', val: ''},
            {label: 'No', val: false},
            {text: 'Auto open when only result matches'}
        ],
        filterBy(){ return true }
    }
}
