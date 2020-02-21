import {html, render} from 'lit-html'
import {unsafeHTML} from 'lit-html/directives/unsafe-html'
import Popover from '../popover'
import Dialog from '../dialog'
import Panel from '../panel'
import Fuse from 'fuse.js'
import '../form-control/controls/check-box'
import '../form-control/controls/select-field'
import device from '../../util/device';

export const DefaultOpts = {
	selected: false,
	multiple: false,
	search: 20, // true (always show) or number of results for it to show
	minW: false,
	width: null,
	autoSelectFirst: false,
	jumpNav: false, // true (always show) or number of results for it to show
	typeDelay: 700, // how long until typed characters reset
	hasMenuIcon: 'right-open',
	onSelect: ()=>{}
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

const styles = require('./style.less')

export default class Menu {
	
	constructor(menu=[], opts={}){
		
		this.el = document.createElement('div')
		this.el.classList.add('b-menu')
		this.el.classList.add('nopadding')
		this.el.menu = this

		if( opts.className )
			opts.className.split(' ').forEach(cn=>{
				this.el.classList.add(cn.trim())
			})
		
		this.opts = Object.assign({}, DefaultOpts, opts)
		this.menu = menu
		
		if( opts.multiple == undefined && this.opts.selected instanceof Array )
			this.opts.multiple = true
		
		let selected = (this.opts.selected || [])
		if( Array.isArray(selected) ) selected = selected.slice(0) // clone
		this.selected = selected
		
		if( this.opts.minW )
			this.el.style.minWidth = this.opts.minW
		
		if( this.opts.width )
			this.el.style.width = this.opts.width
		
		this.el.addEventListener('click', this.onClick.bind(this))
		
		this.promise = new Promise(resolve=>{this._resolve = resolve})
	}

	set menu(menu){

		if( typeof menu == 'function' )
			menu = menu()

		this.__menu = menu

		if( this.searchUrl && !this.__origMenu )
			this.__origMenu = menu || []

		if( !this.searchUrl )
		this.__fuse = new Fuse(this.__menu, {
			keys: [{
				name: 'dataTitle',
				weight: 0.7
			},{
				name: 'label',
				weight: 0.5
			}, {
				name: 'description',
				weight: 0.3
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
			return []

		if( this.searchIsOn && this.hideUnselected )
			return this.menu.filter(m=>m.label===undefined || m.selected)

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

	toggleSelected(item){
		let index = this.__selected.indexOf(item)
				
		if( index > -1 && !item.selection ){
			item.selected = false
			this.__selected.splice(index, 1)
			return false
		}else{
			item.selected = true
			this.__selected.push(item)
			return true
		}
	}

	focusSearch(){
		let input = this.el.querySelector('.menu-search-bar input')
		input&&input.focus()
	}

	get searchIsOn(){
		let s = this.opts.search
		return s === true 
		|| (typeof s == 'object')
		|| (typeof s == 'number' && this.menu.length >= s)
	}

	get searchUrl(){
		return this.opts.search&&this.opts.search.url
	}

	get searchShouldShowAll(){
		return this.opts.search&&this.opts.search.showAll!==false
	}

	get hideUnselected(){
		return this.opts.search&&this.opts.search.hideUnselected===true
	}

	get searchParse(){
		let parse = this.opts.search&&this.opts.search.parse
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
		return this.__searchSpinner = this.__searchSpinner || this.el.querySelector('.menu-search-bar b-spinner')
	}

	async fetchResults(term){

		// already in process of looking up this term
		if( this._fetchingTerm === term )
			return

		this._fetchingTerm = term

		let url = this.searchUrl

		// URL can be a dynamic function
		if( typeof url == 'function' )
			url = url(term)
		else
			url += term

		this.searchSpinner.hidden = false

		let resp = await fetch(url).then(resp=>resp.json())

		// looks like we started searching for another term before we got
		// this response back, so ignore the results
		if( this._fetchingTerm !== term )
			return

		// parse the search results to fit the expected "menu" structure
		if( Array.isArray(resp) )
			this.menu = resp.map(row=>this.searchParse(row)) 
		else
			this.menu = []

		this._fetchingTerm = null
		this.searchSpinner.hidden = true

		this.render()
	}

	appendTo(el){
		el.appendElement(this.el)
		this.render()
	}

	render(){

		let showJumpNav = this.opts.jumpNav === true
						|| (typeof this.opts.jumpNav == 'number' && this.displayMenu.length >= this.opts.jumpNav)

		this._active = this.opts.autoSelectFirst ? 0 : null

		render(html`

			${this.searchIsOn?html`
				<div class="menu-search-bar">
					<b-icon name="${this.searchIcon}"></b-icon>
					<b-spinner hidden></b-spinner>
					<input type="text" placeholder="${this.searchPlaceholder}">
				</div>
			`:''}

			<div class="results">
				
				${showJumpNav?html`
					<alphabet-jump-nav>
						<span style="color: red">'alphabet-jump-nav' custom element not loaded</span>
					</alphabet-jump-nav>`
				:''}

				${this.displayMenu.map((m,i)=>this.renderItem(m,i))}
			</div>

		`, this.el)

		// update popover position
		if( this.presenter && this.presenter._updatePosition )
			this.presenter._updatePosition()

		return this
	}
	
	renderItem(m, i){
		
		if( m == 'divider' || (m.label == 'divider' && m.val == 'divider') )
			return html`<b-hr></b-hr>`

		if( m.divider )
			return html`<div class="menu-divider">${m.divider}</div>`
		
		if( m.text )
			return html`<div class="menu-text">${m.text}</div>`
		
		if( m.title )
			return html`<div class="menu-title"><h2>${m.title}</h2></div>`

		// capture menu item index for use in resolve (if so desired)
		m.index = i

		let icon = ''
		
		if( m.icon && typeof m.icon == 'string' )
			icon = html`<b-icon name="${m.icon}"></b-icon>`
		else if( m.icon ) 
			icon = html`<span class="icon">${m.icon}</span>`

		let checkbox = (this.opts.multiple && !m.clearsAll) || m.selected ? html`<check-box ?checked=${m.selected}></check-box>` : ''
		let menuIcon = m.menu && this.opts.hasMenuIcon ? html`<b-icon class="has-menu" name="${this.opts.hasMenuIcon}"></b-icon>` :''

		if( m.selections ){
			let selections = m.selections
			
			if( this.opts.multiple)
				selections = [{label: 'unset', val:''}].concat(selections)

			checkbox = html`<select-field 
							.options=${selections} 
							placeholder="unset"
							@change=${this.selectOptionsChanged.bind(this)}
							.selected=${m.selection}
							></select-field>`
		}

		if( m.attrs && typeof m.attrs == 'object' )
			console.warn('`attrs` unsupported right now')
		// TODO: support this some how?
		// if( m.attrs && typeof m.attrs == 'object' ){
		// 	for(let key in m.attrs)
		// 		el.setAttribute(key, m.attrs[key])
		// }

		let extras = ''
		if( m.extras ){
			extras = m.extras
				.filter(elName=>customElements.get(elName))
				.map(elName=>{
					let el = document.createElement(elName)
					el.item = m
					el.classList.add('menu-item-extra')
					return el
				})
		}

		let dataTitle = (m.dataTitle || m.label+' '+m.description).trim().toLowerCase()

		return html`
			<div class="menu-item ${m.className}" val=${m.val} index=${i}
				data-title=${dataTitle}
				?active=${this._active==i}
				?icon-only=${!m.label && !m.description} ?selected=${m.selected}>
				${checkbox}
				${icon}
				${m.view&&m.view instanceof HTMLElement ?m.view:html`
					<span class="mi-content">
						<div class="mi-label">${unsafeHTML(m.label||'')}</div>
						<div class="mi-description">${unsafeHTML(m.description||'')}</div>
					</span>
				`}
				${extras}
				${menuIcon}
			</div>
		`
	}

	selectOptionsChanged(e){
		let val = e.currentTarget.value
		let data = this.displayMenu[e.currentTarget.parentElement.getAttribute('index')]
		data.selection = val

		if( !this.opts.multiple )
			this.resolve(data)
		else
			this.toggleSelected(data)
	}
	
	onClick(e){
		
		let target = e.target

		if( target.tagName == 'SELECT-FIELD' )
			return

		let didClickCheckbox = target.tagName == 'CHECK-BOX'
		
		while(target && !target.classList.contains('menu-item')){
			target = target.parentElement
		}
		
		if( target ){
			
			let data = this.displayMenu[target.getAttribute('index')]

			if( data.selections && !data.selection )
				data.selection = data.selections[0]&&data.selections[0].val||data.selections[0]
			
			if( data.menu )
				return this._itemMenu(target, data)

			if( this.opts.multiple ){

				if( data.clearsAll || (this.opts.multiple !== 'always' && !didClickCheckbox) ){
					return this.resolve([data])
				}

				let isSelected = this.toggleSelected(data)
				
				if( this.searchIsOn && this.hideUnselected ){
					this.render()
					// update popover position
					if( this.presenter && this.presenter._updatePosition )
						this.presenter._updatePosition()
				}else if( isSelected ){
					target.classList.add('selected')
					target.querySelector('check-box').checked = true
				}else{
					target.classList.remove('selected')
					target.querySelector('check-box').checked = false
				}
				
				this.opts.onSelect&&this.opts.onSelect(this.selected)
				
			}else{
				this.resolve(data)
			}
		}
	}

	async _itemMenu(target, data){
		let menu = new Menu(data.menu, data.menuOpts||{})

		let popoverOpts = data.menuOpts && data.menuOpts.popover || {}
		let val = await menu.popover(target, popoverOpts) 
		if( val ){
			data.menuSelected = val
			this.resolve(data)
		}
	}
	
	onKeydown(e){

		if( (e.which >= 65 && e.which <= 90) // a-z
		|| (e.which >= 48 && e.which <= 57) // 0-9
		|| [8].includes(e.which) ){ // delete
			this.onLetterPress(e)
			return;
		}
		
		if( e.code == 'Escape' ){
			this.resolve(false)
			return;
		}

		if( e.target.tagName == 'INPUT' && ['ArrowLeft', 'ArrowRight'].includes(e.code) )
			return
		
		if( !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.code) ) return
		
		let items = this.el.querySelectorAll('.menu-item')
		let activeItem = items[this._active]

		// if active item has a menu open, dont perform any actions
		if( activeItem && activeItem.classList.contains('popover-open') )
			return

		if( e.code == 'Enter' ){
			if( activeItem )
				activeItem.click()
			
			e.preventDefault()
			e.stopPropagation()
			return
		}
		
		if( this._active == null )
			this._active = -1;
		
		this._active += ['ArrowUp', 'ArrowLeft'].includes(e.code) ? -1 : 1;
		
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
		

		let items = this.el.querySelectorAll('.menu-item')
		
		if( items.length == 0 ) return

		this.setActiveItem(items[this._active])
	}

	setActiveItem(el){

		let items = Array.from(this.el.querySelectorAll('.menu-item'))

		items.forEach(el=>el.removeAttribute('active'))

		if( typeof el === 'number' )
			el = items[el]
		
		this._active = null
		
		if( el ){
			this._active = items.indexOf(el)

			el.setAttribute('active', '')
			el.scrollIntoViewIfNeeded()
		}
	}

	onLetterPress(e){

		if( e.target.tagName == 'INPUT' ){

			setTimeout(()=>{

				let val = e.target.value

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
						this.render()

						// update popover position
						if( this.presenter && this.presenter._updatePosition )
							this.presenter._updatePosition()
							
						return
					}
					
					this.__searchTermDelay = setTimeout(()=>{
						this.fetchResults(val)
					}, 700)

				}else{
					if( !val )
						this.__filteredMenu = null
					else
						this.__filteredMenu = this.__fuse.search(val)
					
					this.render()
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

		let li = this.el.querySelector(`.menu-item[data-title^="${this._lastLetterPress}"]`)

		if( li )
			this.setActiveItem(li)
	}
	
	resolve(data){
		
		// if( this.opts.onSelect )
		// 	this.opts.onSelect(data)
		
		if( this._resolve )
			this._resolve(data)
			
		if( this.presenter )
			this.presenter.close()
	}
	
	scrollToSelected(){
		setTimeout(()=>{
			let el = this.el.querySelector('.selected')
			el && this.setActiveItem(el)
		},0)
	}
/*
	Presenters
*/
	popover(target, opts={}){

		if( opts.adjustForMobile && device.isMobile && !device.isiPad )
			return this.modal(Object.assign({
				btns: ['cancel','done'],
				anchor: this.searchIsOn ? 'top' : 'center'
			}, (typeof opts.adjustForMobile == 'object' ? opts.adjustForMobile : {})))
		
		this.render()
		
		let onClose = opts.onClose
		opts.onClose = ()=>{
			onClose&&onClose()
			
			if( this.opts.multiple )
				this.resolve(this.selected)
			else
				this.resolve(false)
		}
		
		opts.onKeydown = this.onKeydown.bind(this)
		
		this.presenter = new Popover(target, this.el, opts)

		this.scrollToSelected()

		if( this.searchIsOn )
			this.focusSearch()

		return this.promise
	}
	
	modal(opts={}, mobileOpts){
		if( mobileOpts && device.isMobile && device.minScreenSize <= 699 )
			return this.panel(mobileOpts)
		else
			return this.panel(opts)
	}

	actionsheet(opts={}){
		return this.panel(Object.assign({
			type: 'actionsheet'
		}, opts))
	}

	panel(opts={}){
		
		this.render()
		
		opts = Object.assign({
			type: 'modal',
			animation: 'scale'			
		}, opts)

		opts.onKeydown = this.onKeydown.bind(this)
		
		let onClose = opts.onClose
		opts.onClose = ()=>{
			onClose&&onClose()
			
			this.presenter = null
			
			if( this.opts.multiple )
				this.resolve(this.selected)
			else
				this.resolve(false)
		}
		

		let dialog = new Dialog({
			icon: opts.icon||'',
			title: opts.title||'',
			view: this.el,
			btns: opts.btns||false
		})
		this.presenter = new Panel(dialog.el, opts)
		this.presenter.open()

		// if dialog btn clicked, take action
		dialog.promise.then(btn=>{
			if( btn )
				this.presenter.close()
			else
				this.resolve(false)
		})

		this.scrollToSelected()
		
		if( this.searchIsOn )
			this.focusSearch()

		return this.promise
	}
}