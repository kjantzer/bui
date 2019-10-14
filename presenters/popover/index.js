/*
	Popover
*/
import Popper from 'popper.js'

const styles = require('./style.less')

export const DefaultOpts = {
	align: 'bottom',
	className: '',
	clickToggles: true,
	closeOnHide: true,
	maxHeight: 'auto',
	maxHeightThreshold: 400,
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
	if( target && target.popover && target.popover.view != target && target.popover.opts.clickToggles ){
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

export default class Popover {
	
	constructor(target, view, opts={}){
		
		opts = Object.assign({}, DefaultOpts, opts)
		
		if( !WatchingClicks ){
			WatchingClicks = true
			window.addEventListener('click', WatchClicks, true)
		}
		
		if( !WatchingKeyboard ){
			WatchingKeyboard = true
			window.addEventListener('keydown', WatchKeyboard, true)
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
		this.target = target
		this.view = view
		
		this.target.classList.add('popover-open')
		this.view.classList.add('__view')
		
		this.el = document.createElement('div')
		this.el.classList.add('popover')
		this.el.innerHTML = '<span class="__arrow" x-arrow><span class="__arrow" x-arrow></span></span>'
		this.el.appendChild(view)
		document.body.append(this.el)
		
		if( this.opts.className ){
			this.opts.className.split(' ').forEach(className=>this.el.classList.add(className));
		}
		
		this.target.popover = this
		this.el.popover = this
		this.view.popover = this
		
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
		
		// watch for the view to add elements so we can adjust position
		this.mutationObserver = new MutationObserver(this.viewMutated.bind(this));
		this.mutationObserver.observe(this.view, { attributes: true, childList: true, subtree: false });
		
		// keep track of open popovers so we can remove them later
		OpenPopovers.push(this)
	}
	
	contains(target){
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
	
	close(){
		
		if( !this.target.popover ) return;
		
		this.target.popover = null
		this.el.popover = null
		this.view.popover = null
		
		this.mutationObserver.disconnect()
		this.popper.destroy()
		this.target.classList.remove('popover-open')
		
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
			window.removeEventListener('click', WatchClicks, true)
			
			WatchingKeyboard = false
			window.removeEventListener('keydown', WatchKeyboard, true)
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
		
		let arrowH = data.arrowElement.offsetHeight
		let top = data.offsets.reference.top
		let bottom = data.offsets.reference.bottom

		data.instance.modifiers.forEach(m=>{
			if( m.name == 'preventOverflow' && m.boundaries ){

				let h = (m.boundaries.height || window.innerHeight) - bottom - (arrowH*2)

				if( bottom > m.boundaries.height/2 )
					h = top - (arrowH*2)	

				this.maxHeight = h
				this.view.style.maxWidth = this.opts.maxWidth||''
			}
		})
	}
	
	_onPositionUpdate(data){
		if( data.hide && this.opts.closeOnHide )
			this._close()
	}
	
	_onKeydown(e){
		if( this.opts.onKeydown )
			this.opts.onKeydown(e)
	}
	
	set maxHeight(val){
		if( this.opts.maxHeight != 'auto' )
			this.view.style.maxHeight = this.opts.maxHeight
		else if( this.opts.maxHeight !== false /*&& this.view.offsetHeight > this.opts.maxHeightThreshold*/ )
			this.view.style.maxHeight = val
	}
	
}