import { LitElement, html, css } from 'lit'
import '../../helpers/lit/selectors'
import { repeat } from 'lit/directives/repeat.js';
import bindPresenters, {Dialog, Popover} from './bind-presenters'
import Fuse from 'fuse.js'
import '../../elements/hr'
import '../form/controls/check-box'
import '../form/controls/select-field'
import {toMenu, isDivider} from './util'
import isLitHTML from '../../helpers/lit/isLitHTML'
import '../../helpers/lit/emitEvent'
import store from '../../util/store'
import uniq from '../../util/uniq'
import './item'

export {Dialog, Popover, toMenu, isDivider}

export const DefaultOpts = {
	selected: false,
	multiple: false,
	perpetual: false,
	search: 20, // true (always show) or number of results for it to show
	minW: false,
	width: null,
	autoSelectFirst: false,
	jumpNav: false, // true (always show) or number of results for it to show
	typeDelay: 700, // how long until typed characters reset
	hasMenuIcon: 'chevron_right',
	onSelect: ()=>{},
	onResultsFetched: ()=>{}
}

const SearchDefaults = {
	placeholder: 'Search',
	icon: 'search',
	parse: (row)=>{
		return {
			label: row.label || row.name || row.title || 'Unknown',
			val: row.val || row.id || null,
			description: row.description || ''
		}
	}
}

const ItemPreset = function(defaultOpts){
	return function(opts){
		opts = {...defaultOpts, ...opts}
		
		if( !opts.fn )
			delete opts.fn

		return opts
	}
}

const ItemsPresets = {
	edit: ItemPreset({label: 'Edit', icon: 'pencil', fn: 'edit'}),
	destroy: ItemPreset({label: 'Delete', icon: 'trash', fn: 'destroy'})
}

const ITEMS_QUERY_SELECTOR = '.menu-item:not([disabled]'

customElements.define('b-menu', class extends LitElement{

    static Items = ItemsPresets

	static handle(selected, handler, args){
		if( !selected ) return true

		if( !args )
			args = []
		else if( !Array.isArray(args) )
			args = [args]

		args.push(selected)

		if( selected.href )
			return window.open(selected.href)

		let selectdFn = selected.menuSelected?.fn || selected.fn

		if( selectdFn && typeof selectdFn == 'function'){
			setTimeout(()=>{ // move to end of call stack
				selectdFn.apply(handler, args)
			})
			return true
		}

		if( selectdFn && typeof handler[selectdFn] == 'function' ){
			setTimeout(()=>{ // move to end of call stack
				handler[selectdFn].apply(handler, args)
			})
			return true
		}
		
		return false // NOT handled
	}

    static styles = css`

        :host([hidden]) {
            display: none;
        }

        [hidden] {
            display: none;
        }

        :host {
            --hoverBgd: var(--b-menu-hover-bgd, var(--theme-bgd-accent, rgba(0,0,0,.1)));
            --hoverTextColor: inherit;
            --checkboxColor: var(--b-menu-checkbox-color, #e10050);
            --checkboxColorHover: var(--checkboxColor);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            user-select: none;
        }

        :host > header {
            padding: 1em;
            padding-bottom: 0;
        }

        :host > header[no-input] {
            padding: .75em 1em .25em;
        }

        .results {
            overflow-x: hidden;
            overflow-y: auto;
        }
        
        [heading] {
            padding: .75em 1em 0;
        }

		[heading]:has(+ .menu-divider) {
			padding-bottom: .5em;
		}

        .menu-search-bar {
            flex-shrink: 0;
            display: flex;
            position: relative;
            font-size: var(--b-menu-input-font-size, 1.1rem);
            border-bottom: solid 1px var(--theme-bgd-accent);
        }

        .menu-search-bar [hidden] {
            padding: 0;
        }

        .menu-search-bar input {
            width: auto;
            flex: 1;
            min-width: 2em;
            box-shadow: none;
            border: none;
            background: transparent;
            color: var(--b-menu-input-color, var(--theme-text));
            font-size: 1em;
            padding: .75em .5em .75em 2.3em;
            outline: none;
        }

        .menu-search-bar input::placeholder {
            color: var(--b-menu-color-accent, rgba(var(--theme-text-rgb), .5));
        }

        .menu-search-bar b-icon {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: calc(1.1 * var(--b-menu-input-font-size, .75rem));
        }

        .menu-search-bar b-spinner {
            position: absolute;
            right: .9em;
            top: 1em;
            padding-right: .1em;
            // background: rgba(238, 238, 238, .9);
        }

        alphabet-jump-nav ~ .menu-item {
            padding-right: 2.4em;
        }
        
        .results > b-hr {
            margin: 0;
        }
        
        .menu-divider {
            padding: 1em 1em .25em 1.1em;
            font-weight: normal;
            font-size: .9em;
            border-top: solid 1px var(--b-hr-bgd, rgba(0,0,0,.1));
            color: var(--b-menu-color-accent, rgba(var(--theme-text-rgb), .5));
        }

        .menu-divider:first-child {
            border-top: none;
        }

        .menu-divider:last-child {
            padding-bottom: 1em;
        }

		.menu-divider + b-hr {
			display: none;
		}
        
        .menu-text {
            padding: .5em 1em;
            user-select: text;
        }

        .menu-text[bgd],
        .menu-headingp[bgd],
        .menu-title[bgd] {
            background: var(--theme-bgd-accent2, #eee);
        }

        :host ~ .d-btns:empty {
            display: none;
        }

        :host-context(b-dialog) {
            margin: 0 -1em;
        }

        /*
            Presenters
        */

        :host(.grid-2) .results {
            display: grid;
            grid-template-columns: 1fr 1fr;

            .menu-title,
            .menu-text,
            .menu-divider,
            hr {
                grid-column-start: 1;
                grid-column-end: 3;
            }
        }

        :host(.grid-3) .results {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;

            .menu-title,
            .menu-text,
            .menu-divider,
            hr {
                grid-column-start: 1;
                grid-column-end: 4;
            }
        }

        :host(.grid-4) .results {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;

            .menu-title,
            .menu-text,
            .menu-divider,
            hr {
                grid-column-start: 1;
                grid-column-end: 5;
            }
        }

        :host(.grid-c)entered .results {
            .menu-item {
                justify-self: center;
            }
        }
    `

    constructor(menu=[], opts={}){

        super()

		this.opts = Object.assign({}, DefaultOpts, opts)
		this.menu = menu
		
		if( opts.multiple == undefined && this.opts.selected instanceof Array )
			this.opts.multiple = true
		
		let selected = this.opts.selected !== undefined ? this.opts.selected : []
		if( Array.isArray(selected) ) selected = selected.slice(0) // clone
		this.selected = selected

		if( this.opts.matching )
			this.matching(this.opts.matching)
	}

    firstUpdated(){
        if( this.opts.className )
            this.opts.className.split(' ').forEach(cn=>{
                this.classList.add(cn.trim())
            })

        if( this.opts.minW )
			this.style.minWidth = this.opts.minW
		
		if( this.opts.maxW )
			this.style.maxWidth = this.opts.maxW
		
		if( this.opts.width )
			this.style.width = this.opts.width
    }

    get promise(){
		if( !this._promise )
			this._promise = new Promise(resolve=>{this._resolve = resolve})
		return this._promise
	}

	set promise(val){
		this._promise = val
		if( !val )
			this._resolve = null
	}

	updateMenu(menu, selected){
		this.menu = menu
		if( selected != undefined )
			this.selected = selected
		this.requestUpdate()
	}

	set menu(menu){

		if( typeof menu == 'function' )
			menu = menu()
		else if( menu.toMenu )
			menu = menu.toMenu()
		else if( menu.toOptions )
			menu = menu.toOptions()

		// remove null/empty values
		menu = menu.filter(i=>i)

		if( !menu )
			menu = []

		menu = menu.map(val=>{
			
			if( typeof val == 'string' && ItemsPresets[val] )
				return ItemsPresets[val]()

			if( !isDivider(val) && ['string', 'number'].includes(typeof val) )
				return {label: val, val}

			if( val.val && !val.label )
				val.label = val.val

			return val
		})

		this.__menu = menu

		if( this.searchIsOn && !this.__origMenu )
			this.__origMenu = menu || []

		if( !this.searchUrl )
		this.__fuse = new Fuse(this.__menu, {
			keys: [{
				name: 'dataTitle',
				weight: 0.5
			},{
				name: 'label',
				weight: 0.3
			}, {
				name: 'description',
				weight: 0.2
			}],
			minMatchCharLength: 3,
			threshold: 0.4,
			location: 0,
			distance: 300,
		})
	}

	get menu(){
		return this.__menu || []
	}

	get displayMenu(){
		if( this.__filteredMenu )
			return this.__filteredMenu
		
		if( this.searchIsOn && !this.searchShouldShowAll )
			return this.menu.filter(m=>m.alwaysShow===true || m.selected)

		if( this.searchIsOn && this.hideUnselected )
			return this.menu.filter(m=>m.label===undefined || m.selected)

		// show search cache if empty menu
		if( this.searchIsOn && this.opts.search.cache && this.menu.length == 0 ){
			let menu = this.opts.search.cacheStore()
			if( menu.length > 0 ) menu = [{divider: 'Recents'}].concat(menu.map(item=>{
				item.noCache = true
				return item
			}))
			return menu
		}

		return this.menu
	}

	set selected(keys){

		// always store selected values as an array
		if( !Array.isArray(keys) )
			keys = [keys]

		let keyVals = keys.map(k=>k&&k.val||k)

		// store selected values as the actual values (not just the keys)
		this.__selected = this.menu.filter(m=>{

			if( m.val === undefined ) return false

			let matchedIndex = keyVals.indexOf(m.val)

			// select/deselect each value
			if( matchedIndex > -1 ){
				let mergeData = keys[matchedIndex]
				
				if( mergeData && typeof mergeData == 'object' )
                    Object.assign(m, mergeData)

				m.selected = true

			}else{
				delete m.selected
				delete m.selection
			}
			
			return m.selected
		})

		// keep values in the order that they were selected
		this.__selected = this.__selected.sort((a,b)=>{
			return keyVals.indexOf(a.val) - keyVals.indexOf(b.val)
		})
	}
	
	get selected(){
		return this.opts.multiple ? this.__selected : this.__selected[0]
	}

	toggleSelected(item, {fromSelection=true}={}){
		let index = this.__selected.indexOf(item)
				
		if( index > -1 && !fromSelection ){
			item.selected = false
			delete item.selection
			this.__selected.splice(index, 1)

			return false
		}else{

			// remove any items marked as "clearsAll"
			this.__selected = this.__selected.filter(item=>{
				if( item.clearsAll ){
					item.selected = false
					let checkbox = this.$$(`[index="${item.index}"] check-box`)
					if( checkbox ) checkbox.hidden = true
				}
				return !item.clearsAll
			})

			item.selected = true

			// if not already selected, select it now
			if( index == -1 )
				this.__selected.push(item)

			return true
		}
	}

	focusSearch({selectAll=false, delay=0, value}={}){
		setTimeout(()=>{
			let input = this.$$('.menu-search-bar input', true)
			if( input ){
				if( value !== undefined )
					input.value = value

				input.focus()
				if( selectAll ) input.select()
			}
		}, delay)
	}

	get searchIsOn(){
		let s = this.opts.search
		return s === true 
		|| (typeof s == 'object')
		|| (typeof s == 'function')
		|| (typeof s == 'number' && this.menu.length >= s)
	}

	get searchUrl(){
		if( this.opts.search && this.opts.search.url){
			
			// enable search cache by default unless turned off
			if( !this.opts.search.cacheStore && this.opts.search.cache !== false ){

				let cacheName = this.opts.search.url

				if( typeof this.opts.search.cache == 'string' )
					cacheName = this.opts.search.cache

				if( typeof cacheName == 'function') cacheName = cacheName()

				this.opts.search.cacheStore = this.opts.search.cacheStore || store.create('menu:'+cacheName, [])
			}
				

			return this.opts.search.url
		}
	}

	get searchShouldShowAll(){
		return this.opts.search&&this.opts.search.showAll!==false
	}

	get hideUnselected(){
		return this.opts.search&&this.opts.search.hideUnselected===true
	}

	get searchParse(){
		let parse = this.opts.search&&(this.opts.search.parse||this.opts.search.parseResult)
		if( typeof parse !== 'function' )
			parse = SearchDefaults.parse
		return parse
	}

	get searchIcon(){
		return (this.opts.search&&this.opts.search.icon) || SearchDefaults.icon
	}

	get searchPlaceholder(){
		return (this.opts.search&&this.opts.search.placeholder) || SearchDefaults.placeholder
	}

	get searchSpinner(){
		return this.$$('.menu-search-bar b-spinner', true)
	}

	get searchOpts(){ return this.opts.search||{}}

	searchExtendResults(menu, term){

		if( this.opts.search.extendResults )
			this.opts.search.extendResults.call(this, menu, term)

		let allowCreate = this.opts.search?.allowCreate

		if( allowCreate && term.length >= (allowCreate.termLength||4) ){

			let label = allowCreate.label
						? (typeof allowCreate.label == 'function' ? allowCreate.label(term) : allowCreate.label)
						: html`<b-text dim>Create:</b-text> <b-text xbold color="theme">${term}</b-text>`
				
			let extras = [
				'divider',
				{   icon: allowCreate.icon!==undefined?allowCreate.icon:'add_box',
					label,
					val: term,
					type: allowCreate.type || 'create',
					create: true,
					noCache: true
				},
				'divider'
			]

			if( label === false )
				extras = []

			if( menu.length > 6 )
				menu.splice(1, 0, ...extras)
			else
				menu.push(...extras)
		}
	}

	async fetchResults(term){

		// already in process of looking up this term
		if( term !== undefined && this._fetchingTerm === term )
			return

		this._fetchingTerm = term

		let url = this.searchUrl
		let encodedTerm = term === undefined ? '' : encodeURIComponent(term)

		// URL can be a dynamic function
		if( typeof url == 'function' )
			url = url(encodedTerm)
		else
			url += encodedTerm

		this.searchSpinner.hidden = false

		let resp = await fetch(url).then(resp=>resp.json())

		// looks like we started searching for another term before we got
		// this response back, so ignore the results
		if( term !== undefined && this._fetchingTerm !== term )
			return

		let menu = []

		// parse the search results to fit the expected "menu" structure
		if( Array.isArray(resp) )
			menu = resp.map(row=>this.searchParse(row)) 
		else
			menu = []

		// if( this.opts.search.extendResults )
		// 	this.opts.search.extendResults.call(this, menu, term)
		this.searchExtendResults(menu, term)

		if( menu.length == 0 )
			menu.push({text: `No results`})

		this.menu = menu

		this._fetchingTerm = null
		this.searchSpinner.hidden = true

		this.requestUpdate()

		if( this.opts.search.onResultsFetched)
			this.opts.search.onResultsFetched.call(this)
	}

	appendTo(el){
		el.appendElement(this)
		this.requestUpdate()
	}

	render(){

		let showJumpNav = this.opts.jumpNav === true
						|| (typeof this.opts.jumpNav == 'number' && this.displayMenu.length >= this.opts.jumpNav)

		this._active = this.opts.autoSelectFirst ? 0 : null

		return html`

			${this.opts.header?html`
			<header ?no-input=${this.searchOpts.input===false}>
				${this.opts.header}
			</header>
			`:''}

			${this.searchIsOn?html`
				<div class="menu-search-bar" ?hidden=${this.searchOpts.input===false}>
					<b-spinner hidden></b-spinner>
					${this.searchOpts.input!==false?html`
						<b-icon name="${this.searchIcon}"></b-icon>
						<input type="text" placeholder="${this.searchPlaceholder}" value=${this.opts.matching||''}>
					`:html`
						
					`}
				</div>
			`:''}

			<div class="results">
				
				${showJumpNav?html`
					<alphabet-jump-nav>
						<span style="color: red">'alphabet-jump-nav' custom element not loaded</span>
					</alphabet-jump-nav>`
				:''}

				
				${repeat(this.displayMenu, m=>m.val, (m,i)=>this.renderItem(m,i))}
			</div>

		`

		// update popover position
		if( this.presenter && this.presenter._updatePosition )
			this.presenter._updatePosition()

		return this
	}
	
	renderItem(m, i){

		if( isDivider(m) )
		// if( m == 'divider' || (m.label == 'divider' && m.val == 'divider') )
			return html`<b-hr></b-hr>`

		if( m.divider !== undefined )
			return html`<div class="menu-divider">${m.divider}</div>`
		
		if( m.html !== undefined )
			return html`<b-text heading block ?bgd=${m.bgd??false} class="menu-html" .html=${m.html}></b-text>`

		if( m.text !== undefined )
			return html`<b-text heading block sm dim ?bgd=${m.bgd??true} class="menu-text">${m.text}</b-text>`
		
		if( m.title )
			return html`<b-text heading block xbold ?bgd=${m.bgd??false} class="menu-title">${m.title}</b-text>`
		
		if( m.heading )
			return html`<b-text heading block xbold ?bgd=${m.bgd??false} class="menu-heading">${m.heading}</b-text>`

		return html`<b-menu-item 
			class="menu-item"
			.index=${i} 
			.model=${m} 
			.opts=${this.opts}
			?active=${this._active==i}
			@selection-changed=${this.selectOptionsChanged.bind(this)}
            @click=${this.onClick}
		></b-menu-item>`
	}

	selectOptionsChanged(e){
		let {val, index} = e.detail
		let data = this.displayMenu[index]
		data.selection = val

		if( !this.opts.multiple ){
			this._onSelect(data)
			this.resolve(data)
		}else{
			this.toggleSelected(data)
			this._onSelect(this.selected)
		}
	}

	clickItem(index){
		let el = this.$$(`.menu-item:nth-child(${index+1})`)
		if( el )
			el.click()
	}
	
	onClick(e){
		
		let target = e.target
		let shiftKey = e.detail?.shiftKey || e.shiftKey
		let metaKey = (e.metaKey || e.detail?.metaKey) || (e.ctrlKey || e.detail?.ctrlKey)

        // handled by item now
		// if( target.tagName == 'SELECT-FIELD' )
		// 	return

		e.stopPropagation()
		e.preventDefault()

		let didClickCheckbox = e.item?.target.tagName == 'CHECK-BOX'
		let didClickSelectField = e.item?.target.tagName == 'SELECT-FIELD' // NOTE: still needed?
		
		while(target && !target.classList.contains('menu-item')){
			target = target.parentElement
		}
		
		if( target ){
			if(target.hasAttribute('disabled')) return

            window.soundFX?.play('tinyTap', {gain: 0.3, ifMobile: true})
			
			
			let data = this.displayMenu[target.getAttribute('index')]

			if( data.selections && !data.selection ){
				// select second option if ctrl/cmd key held on click (but only if 2 options)
				let index = data.selections.length == 2 && metaKey ? 1 : 0;
				data.selection = data.selections[index]&&data.selections[index].val||data.selections[index]
			}
			
			if( data.menu )
				return this._itemMenu(target, data)

			if( this.opts.perpetual ){

				this._onSelect(data, {evt: e})
				
				// only perpetual in search mode...if menu is orig, then were't not showing search results
				if( this.opts.perpetual == 'search' && this.__origMenu == this.menu )
					this.resolve(data, {evt: e})
				else{
					this.focusSearch({selectAll:true})
				}

			} else if( this.opts.multiple ){

				if( data.clearsAll || (this.opts.multiple !== 'always' && !didClickCheckbox && !didClickSelectField && !shiftKey) ){
					this._onSelect([data])
					return this.resolve([data], {evt: e})
				}

				let isSelected = this.toggleSelected(data, {fromSelection:didClickSelectField})
				
				if( this.searchIsOn && this.hideUnselected ){
					this.requestUpdate()
					// update popover position
					if( this.presenter && this.presenter._updatePosition )
						this.presenter._updatePosition()
				}else if( isSelected ){
					target.classList.add('selected')
					target.setValue(data.selections?data.selection:true) // NOTE: not sure I like this very much
				}else{
					target.classList.remove('selected')
					target.setValue(data.selections?null:false)
				}
				
				this._onSelect(this.selected, {evt: e})
				
			}else{
				this._onSelect(data)
				this.resolve(data, {evt: e})
			}
		}
	}

	_onSelect(data, {evt}={}){

		// cache the selected result if 
		if( this.opts.search?.cache && !data.noCache ){

			let cache = this.opts.search.cacheStore()
			let cacheData = {...data}

			// make sure we dont save lit-html to local storage, it wont work right when we render
			if( isLitHTML(cacheData.label) )
				cacheData.label = cacheData.cacheLabel || cacheData.toolbarLabel || cacheData.val

			// track up to 10 items
			cache.push(cacheData)
			cache = uniq(cache, (a, b)=>a.val===b.val).reverse().slice(0,10)
			
			// save to cache
			this.opts.search.cacheStore(cache)
		}

		if( evt && data )
			data.evt = evt

		this.opts.onSelect&&this.opts.onSelect.call(this, data, {menu: this})
	}

	clear(){
		let input = this.$$('.menu-search-bar input', true)
		if( input )
			input.value = ''
		
		this.menu = this.__origMenu
		this.__filteredMenu = null
		this.requestUpdate()
	}

	async _itemMenu(target, data){
		let menu = new (this.constructor)(data.menu, data.menuOpts||{})

		let popoverOpts = data.menuOpts && data.menuOpts.popover || {}

		// use same overflow boundry as top level menu
		if( !popoverOpts.overflowBoundry )
			if( this.presenter.popper.reference.classList.contains('menu-item') )
				popoverOpts.overflowBoundry = 'window' // TODO: improve this
			else if( this.presenter.popper?.state?.scrollElement
			&& this.presenter.popper?.state?.scrollElement.offsetHeight > this.presenter.el.offsetHeight)
				popoverOpts.overflowBoundry = this.presenter.popper?.state?.scrollElement 
			else
				popoverOpts.overflowBoundry = 'window'

		if( !popoverOpts.align )
			popoverOpts.align = 'right-start'

		let val = await menu.popOver(target, popoverOpts) 
		if( val ){
			data.menuSelected = val
			this.resolve(data)
		}
	}
	
	// NOTE: event listener stems from a presenter
	onKeydown(e){

		if( (e.which >= 65 && e.which <= 90) // a-z
		|| (e.which >= 48 && e.which <= 57) // 0-9
		|| (e.which >= 96 && e.which <= 105) // numpad 0-9
		|| [8].includes(e.which) ){ // delete
			if( e.metaKey || e.ctrlKey )
				setTimeout(()=>{ // allow paste action to finish
					this.onLetterPress(e)
				},10)
			else
				this.onLetterPress(e)
			return;
		}
		
		if( e.code == 'Escape' ){
			this.resolve(false)
			return;
		}

		// if( e.target.tagName == 'INPUT' && ['ArrowLeft', 'ArrowRight'].includes(e.code) )
		if( ['ArrowLeft', 'ArrowRight'].includes(e.code) )
			return
		
		// stop processing the keypress unless it is one of these
		if( !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Space', 'Tab'].includes(e.code) ) return

		if( !this.opts.multiple && e.code == 'Space' ) return
		
		let items = this.$$all(ITEMS_QUERY_SELECTOR)
		let activeItem = items[this._active]

		// if active item has a menu open, dont perform any actions
		if( activeItem && activeItem.classList.contains('popover-open') )
			return

		if( this.opts.multiple && e.code == 'Space' ){
			if( activeItem ){
				activeItem.click()
				e.preventDefault()
				e.stopPropagation()
			}
			return
		}

		if( this.opts.multiple && e.code == 'Enter' ){

			// TODO: I think we should only click if item isn't already selected
			if( activeItem )
				activeItem.emitEvent('click', {shiftKey: e.shiftKey, metaKey: e.metaKey, ctrlKey: e.ctrlKey})
			else
				window.emitEvent('enter-on-no-item', {value: e.target.value, menu: this}, {context: this})

			if( e.ctrlKey || e.metaKey )
				this.resolve(this.selected)

			e.preventDefault()
			e.stopPropagation()
			return
		}

		if( e.code == 'Enter' ){
			if( activeItem )
				activeItem.click()
			else
				window.emitEvent('enter-on-no-item', {value: e.target.value, menu: this}, {context: this})
			
			e.preventDefault()
			e.stopPropagation()
			return
		}
		
		if( this._active == null )
			this._active = -1;
		
		this._active += ['ArrowUp', 'ArrowLeft'].includes(e.code) || (e.code == 'Tab' && e.shiftKey) ? -1 : 1;
		
		if( this._active < 0 )
			this._active = items.length - 1
			
		if( this._active >= items.length )
			this._active = 0
		
		this.setActiveItem(items[this._active])
		
		e.preventDefault()
		e.stopPropagation()
	}

	set active(index){

		if( index == null )
			index = 0;
		
		if( index < 0 )
			index = this.displayMenu.length - 1
			
		if( index >= this.displayMenu.length )
			index = 0
		
		this._active = index
		

		let items = this.$$all('.menu-item')
		
		if( items.length == 0 ) return

		this.setActiveItem(items[this._active])
	}

	setActiveItem(el){

		let items = Array.from(this.$$all(ITEMS_QUERY_SELECTOR))

		items.forEach(el=>el.removeAttribute('active'))

		if( typeof el === 'number' )
			el = items[el]
		
		this._active = null
		
		if( el ){
			this._active = items.indexOf(el)

			el.setAttribute('active', '')
			el.scrollIntoViewIfNeeded ? el.scrollIntoViewIfNeeded() : el.scrollIntoView()
		}
	}

	onLetterPress(e){

		// if( e.target.tagName == 'INPUT' ){
        if( this.shadowRoot.activeElement?.tagName == 'INPUT'){

			setTimeout(()=>{

				let val = this.shadowRoot.activeElement.value

				// interpret only 1 character as "empty"
				if( !val || val.length < 2 )
					val = ''

				if( val === this.__lastFilterVal ) return
				this.__lastFilterVal = val

				if( this.searchUrl ){

					// must stop typing for a moment before fetching results
					clearTimeout(this.__searchTermDelay)

					if( !val ){
						this.menu = this.__origMenu
						this.requestUpdate()

						// update popover position
						if( this.presenter && this.presenter._updatePosition )
							this.presenter._updatePosition()
							
						return
					}
					
					// no delay if paste keyboard shortcut
					let delay = e.key == 'v' && (e.metaKey||e.ctrlKey) ? 0 : 700
					this.__searchTermDelay = setTimeout(()=>{
						this.fetchResults(val)
					}, delay)

				}else{
					this.matching(val)
					this.requestUpdate()
					this.setActiveItem(this.opts.autoSelectFirst?0:null)
				}

			}, 0)

			return
		}

		let ts = new Date().getTime()

		if( !this._lastLetterPressTS || ts - this._lastLetterPressTS > this.opts.typeDelay )
			this._lastLetterPress = ''

		this._lastLetterPressTS = ts

		this._lastLetterPress += e.key

		let li = this.$$(`.menu-item[data-title^="${this._lastLetterPress}"]`)

		if( li )
			this.setActiveItem(li)
	}

	matching(val){
		let menu = null
		if( !val )
			return this.__filteredMenu = menu = null

		if( this.searchUrl ){
			setTimeout(()=>{
				this.fetchResults(val)
			})
		}else if( this.__fuse ){
			
			menu = this.__fuse.search(val)

			// if( this.opts.search && this.opts.search.extendResults )
			// 	this.opts.search.extendResults.call(this, menu, val)	
			this.searchExtendResults(menu, val)		
		}

		this.__filteredMenu = menu
	}
	
	
	resolve(data, {evt}={}){
		
		// if( this.opts.onSelect )
		// 	this.opts.onSelect(data)

		let didHandle = false

		if( evt && data )
			data.evt = evt

		if( this.opts.handler ){

			let handler = this.opts.handler
			let args = this.opts.handlerArgs

			// handler = [handler, arg1, arg2]
			if( Array.isArray(handler) ){
				args = handler.slice(1)
				handler = handler[0]
			}

			didHandle = this.constructor.handle(data, handler, args)
		}

		if( !didHandle && this._resolve ){
			this._resolve(data)
			this._resolve = null
		}
			
		if( this.presenter )
			this.presenter.close()
	}
	
	scrollToSelected(){
		setTimeout(()=>{
			let el = this.$$('.selected')
			el && this.setActiveItem(el)
		},0)
	}

	close(){
		this.presenter&&this.presenter.close()
		this.presenter = null
		this._resolve = null
		this.promise = null
	}

})

export default customElements.get('b-menu')

bindPresenters(customElements.get('b-menu'))