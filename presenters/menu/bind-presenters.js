import Notif from '../notif'
import Panel from '../panel'
import Popover from '../popover'
import device from '../../util/device'

export {Notif, Panel, Popover}

export default function bindPresenters(Menu){
    Object.assign(Menu.prototype, presenters)
}

const presenters = {

    popOver(target, opts={}){

		if( this.__filteredMenu && this.__filteredMenu.length == 0 ){
			this.promise = null
			return Promise.resolve(false)
		}

		if( this.presenter && this.presenter instanceof Popover ){
			this.presenter.positionOver(target)
			return this.promise
		}

		if( opts.btns )
			return this.panel({target, ...opts})

		if( opts.adjustForMobile && device.isMobile && !device.isTablet ){
			let modalOpts = {btns: ['cancel','apply']}

			if( this.searchIsOn )
				modalOpts.anchor = 'top'
			
			if( typeof opts.adjustForMobile == 'object' )
				modalOpts = Object.assign(modalOpts, opts.adjustForMobile)

			return this.modal(modalOpts)
		}
		
		this.render()

		// NOTE: this is rather hacky, but we'll leave for now
		if( this.searchOpts.autoFetch ){
			this.fetchResults()
		}
		
		let onClose = opts.onClose
		opts.onClose = ()=>{
			onClose&&onClose()
			this.presenter = null
			
			if( this.opts.multiple )
				this.resolve(this.selected)
			else
			setTimeout(()=>{ // let submenu resolve
				this.resolve(false)
			})
		}
		
		if( !opts.onKeydown)
			opts.onKeydown = this.onKeydown.bind(this)
		
		this.presenter = new Popover(target, this.el, opts)

		this.scrollToSelected()

		if( this.searchIsOn )
			this.focusSearch({selectAll: !!this.opts.matching})

		return this.promise
	},
	
	modal(opts={}, mobileOpts){
		if( mobileOpts && device.isMobile && device.isSmallDevice )
			return this.panel(mobileOpts)
		else
			return this.panel(opts)
	},

	actionsheet(opts={}){
		return this.panel(Object.assign({
			type: 'actionsheet'
		}, opts))
	},

	panel(opts={}){
		
		this.render()
		
		opts = Object.assign({
			type: 'modal',
			// animation: 'scale'
		}, opts)

		if( !opts.onKeydown )
			opts.onKeydown = this.onKeydown.bind(this)
		
		let onClose = opts.onClose
		opts.onClose = ()=>{
			onClose&&onClose()
			
			this.presenter = null
			
			if( this.opts.multiple && !opts.btns )
				this.resolve(this.selected)
			else
				setTimeout(()=>{ // let submenu resolve
					this.resolve(false)
				})
		}
		

		let dialog = new Dialog({
			icon: opts.icon||'',
			title: opts.title||'',
			body: opts.body||'',
			view: this.el,
			btns: opts.btns||false
		})

		// if target was given, popover the target
		if( opts.target ){
			this.presenter = new Popover(opts.target, dialog, opts)
		}else{
			this.presenter = new Panel(dialog, opts)
			this.presenter.open()
		}

		// if dialog btn clicked, take action
		dialog.promise.then(btn=>{

			if( btn && !btn.isCancelBtn && this.opts.multiple )
				this.resolve(opts.btns.length>2?[btn, this.selected]:this.selected)

			else if( btn )
				this.resolve(btn)
				// this.presenter.close()
			else
				this.resolve(false)
		})

		this.scrollToSelected()
		
		if( this.searchIsOn )
			this.focusSearch({delay: 300, selectAll: !!this.opts.matching})

		return this.promise
	}
}