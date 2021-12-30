/*
	Popover
*/
import Popper from 'popper.js'
import device from '../../util/device'

const styles = require('./style.less')

export const DefaultOpts = {
	align: 'bottom',
	className: '',
	clickToggles: true,
	closeOnHide: true,
	maxHeight: 'auto',
	maxHeightThreshold: 400,
	maxWidth: '',
	width: '',
	flip: true,
	overflowBoundry: 'scrollParent',
	onClose: ()=>{},
	onKeydown: e=>{}
}

const OpenPopovers = []
let WatchingClicks = false
let WatchingKeyboard = false

const WatchClicks = function(e){
		
	let found = false
	let close = []
	let target = e.path ? e.path.find(el=>el.popover) : e.target

	// the clicked target already has a popover and has the "toggle" setting, so close the current popover
	if( target && target.popover && typeof target.popover != 'function' 
	&& target.popover.view != target && target.popover.opts.clickToggles ){
		target.popover._close()
		e.preventDefault()
		e.stopPropagation()
		return false
	}
	
	// close all popovers not part (nested) within the clicked target
	OpenPopovers.slice(0).reverse().forEach(dd=>{
		if( !found && !dd.contains(target) ){
			close.push(dd)
			
		// as soon as one of the popovers is nested, all others that follow will be nested, no reason to continue testing
		}else{
			found = true
		}
	})
	
	close.forEach(dd=>dd._close())
}

const WatchKeyboard = function(e){
	let popover = OpenPopovers.slice(0).pop()
	popover._onKeydown(e)
}

export function closeAllPopovers(){
	OpenPopovers.forEach(dd=>{
		dd.close()
	})
}

export default class Popover {
	
	constructor(target, view, opts={}){
		
		opts = Object.assign({}, DefaultOpts, opts)
		
		if( !WatchingClicks ){
			WatchingClicks = true
			window.addEventListener(device.isMobile?'touchend':'mousedown', WatchClicks, !device.isMobile)
		}
		
		if( !WatchingKeyboard ){
			WatchingKeyboard = true
			window.addEventListener('keydown', WatchKeyboard, !device.isMobile)
		}
		
		if( typeof view == 'string' ){

			if( customElements.get(view) ){
				view = document.createElement(view)
			}else{
				let _view = document.createElement('div')
				_view.classList.add('tooltip')
				_view.innerHTML = view
				view = _view
			}
		}
		
		if( window.Backbone && view instanceof window.Backbone.View )
			view = view.el

		this.opts = opts
		this.view = view
		
		this.view.classList.add('__view') // DEPRECATED
		this.view.setAttribute('in-popover', '')
		
		this.el = document.createElement('div')
		this.el.classList.add('popover')
		this.el.innerHTML = '<span class="__arrow" x-arrow><span class="__arrow" x-arrow></span></span>'
		this.el.appendChild(view)
		document.body.append(this.el)

		if( this.opts.inverse )
			this.el.classList.add('inverse')
		
		if( this.opts.className ){
			this.opts.className.trim()
								.split(' ')
								.forEach(className=> className ? this.el.classList.add(className.trim()) : null);
		}
		
		this.el.popover = this
		this.view.popover = this
		
		this.positionOver(target)
		
		// watch for the view to add elements so we can adjust position
		this.mutationObserver = new MutationObserver(this.viewMutated.bind(this));
		this.mutationObserver.observe(this.view, { attributes: true, childList: true, subtree: false });
		
		// keep track of open popovers so we can remove them later
		OpenPopovers.push(this)
	}

	positionOver(target){

		this.clearTarget()
		let opts = this.opts

		if( !target ) return

		if( target instanceof MouseEvent 
		|| target instanceof KeyboardEvent 
		|| target instanceof PointerEvent ){
			target = this.createInvisiblePlaceholderTarget(target)
		}

		this.target = target
		this.target.popover = this

		if( this.target._popoverTarget )
			this.target._popoverTarget.classList.add('popover-open')
		else
			this.target.classList.add('popover-open')

		if( !this.popper ){

			// set position of the popover using Popper
			this.popper = new Popper(target, this.el, {
				placement: opts.align,
				removeOnDestroy: true,
				onCreate: this._onPositionCreate.bind(this),
				onUpdate: this._onPositionUpdate.bind(this),
				modifiers: {
					inner: {
						enabled: opts.inner || false
					},
					offset: {
						enabled: opts.offset?true:false,
						offset: opts.offset
					},
					flip: {
						enabled: opts.flip
					},
					preventOverflow: {
						enabled: opts.preventDefault !== undefined ? opts.preventDefault : true, // FIXME: confusing naming and not sure it works
						boundariesElement: opts.overflowBoundry || 'scrollParent',
						// priority: []
						priority: ['top', 'bottom'].includes(opts.align) ? ['left', 'right'] : ['top', 'bottom']
					}
				}
			});

		}else{
			this.popper.reference = target
			this.popper.update()
		}
	}

	createInvisiblePlaceholderTarget(e){
		let target = document.createElement('div')
		target._popoverTarget = (e._popoverTarget || e.currentTarget)
		target.classList.add('popover-invisible-placeholder')
		target.style.position = 'absolute'
		
		if( e instanceof MouseEvent || e instanceof PointerEvent ){

			if( !Object.isFrozen(e) ){
				e._popoverTarget = target._popoverTarget
				Object.freeze(e)
			}

			target.style.left = e.clientX+'px'
			target.style.top = e.clientY+'px'

		}else if( e instanceof KeyboardEvent ){
			// https://stackoverflow.com/a/16210994/484780
			let root = e.target.getRootNode() // shadowRoot or window
			let range = root.getSelection().getRangeAt(0)
			let rect = range.getBoundingClientRect()

			target.style.left = rect.x+'px'
			target.style.top = rect.y+'px'
			target.style.height = rect.height+'px'
		}

		document.body.appendChild(target)
		return target
	}
	
	contains(target){
		if( !target ) return false
		if( this.el.contains(target) )
			return true
		
		// let parentPopover = this.parentPopover
		// if( parentPopover && parentPopover.contains(target) )
		// 	return true
		
		let targetParent = target.parentElement && target.parentElement.popover
		if( targetParent && this.el.contains(targetParent.target) )
			return true
			
		return false
	}
	
	get parentPopover(){
		let parentPopover = false
		let parent = this.target
		while(parent && !parentPopover){
			parent = parent.parentElement
			if( parent && parent.popover )
				parentPopover = parent
		}
		return parentPopover
	}
	
	get isNested(){
		return !!this.parentPopover
	}
	
	viewMutated(mutationsList, observer){
		this._updatePosition()
	}

	clearTarget(){
		if( !this.target ) return

		this.target.popover = null

		if( this.target.classList.contains('popover-invisible-placeholder') ){
			if( this.target._popoverTarget )
				this.target._popoverTarget.classList.remove('popover-open')
				
			this.target.remove()
		}else
			this.target.classList.remove('popover-open')

		this.target = null
	}
	
	close(){
		
		if( !this.target || !this.target.popover ) return;
		
		this.el.popover = null
		this.view.popover = null
		this.view.removeAttribute('in-popover', '')

		this.mutationObserver.disconnect()
		this.popper.destroy()

		this.clearTarget()
		
		// remove this from the list of open popovers as well as all popovers after it
		var indx = OpenPopovers.indexOf(this)
	    if( indx > -1){
	        OpenPopovers.splice(indx).forEach((dd,i)=>{
				if( i > 0 ) dd._close() // close all popovers nested inside of this one
			})
		}
		
		// no more popovers, remove event listners
		if( OpenPopovers.length == 0 ){
			WatchingClicks = false
			window.removeEventListener(device.isMobile?'touchend':'mousedown', WatchClicks, true)
			
			WatchingKeyboard = false
			window.removeEventListener('keydown', WatchKeyboard, !device.isMobile)
		}
	}
	
	// internal close method that also triggers the onClose callback
	_close(){
		this.close()
		this.opts.onClose&&this.opts.onClose()
	}
	
	_updatePosition(){
		this.popper.update()
	}
	
	_onPositionCreate(data){
		this._setDimensions(data)
	}
	
	_onPositionUpdate(data){
		if( data.hide && this.opts.closeOnHide )
			this._close()
	}

	_setDimensions(data){

		let arrowH = data.arrowElement.offsetHeight
		let top = data.offsets.reference.top
		// NOTE: bottom of element in relation to top of window
		let bottom = data.offsets.reference.bottom

		data.instance.modifiers.forEach(m=>{
			if( m.name == 'preventOverflow' && m.boundaries ){

				let offset = (window.outerHeight * .035)

				// TODO: needs improvement when alignmen is not bottom-*
				let h = (window.innerHeight) - bottom - (arrowH*2) - offset

				// if the popover view becomes less than 1/4 of the screen
				// calc height from the top (alignment will switch)
				if( h <= window.innerHeight/4 )
					h = top - (arrowH*2) - offset

				this.maxHeight = h
				this.view.style.width = this.opts.width||this.view.style.width
				this.view.style.maxWidth = this.opts.maxWidth||this.view.style.maxWidth
			}
		})
	}
	
	_onKeydown(e){
		if( this.opts.onKeydown )
			this.opts.onKeydown(e)
	}
	
	set maxHeight(val){
		if( this.opts.maxHeight != 'auto' )
			this.view.style.maxHeight = this.opts.maxHeight
		else if( this.opts.maxHeight !== false )
			this.view.style.maxHeight = val+'px'
	}
	
}