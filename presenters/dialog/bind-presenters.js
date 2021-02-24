/*
	After binding the presenters, Dialogs can be opened/presented like:

	new Dialog().modal()
	new Dialog().notif()
	new Dialog().popover()
	new Dialog().actionsheet()
*/
import Notif from '../notif'
import Panel from '../panel'
import Popover from '../popover'
import device from '../../util/device'

export default function bindPresenters(Dialog){
    Object.assign(Dialog.prototype, presenters)
}

const presenters = {

	popover(target, opts={}){

		if( opts.adjustForMobile && device.is_mobile )
			return this.modal((typeof opts.adjustForMobile == 'object' ? opts.adjustForMobile : {}))
		
		if( target.currentTarget )
			target = target.currentTarget
		
		let onClose = opts.onClose
		opts.onClose = ()=>{
			onClose&&onClose()
			this.resolve(false)
		}
		
        if( this.onKeydown )
		    opts.onKeydown = this.onKeydown.bind(this)
		
		this.presenter = new Popover(target, this, opts)

		// layout timing issue on Safari (mac and iOS)... this will fix it for now
		setTimeout(()=>{
			this.presenter._updatePosition()
		})

		return this.promise
	},
	
	modal(opts={}, mobileOpts){
		if( mobileOpts && device.isMobile )
			return this._panel(mobileOpts)
		else
			return this._panel(opts)
	},

	actionsheet(opts={}){
		return this._panel(Object.assign({
			type: 'actionsheet'
		}, opts))
	},

	_panel(opts={}){

		opts = Object.assign({
			type: 'modal',
			animation: 'scale',
			disableBackdropClick: true
		}, opts)

		// opts.onKeydown = this.onKeydown.bind(this)

		let onClose = opts.onClose
		opts.onClose = ()=>{
			onClose&&onClose()
			this.resolve(false)
		}

		this.presenter = new Panel(this, opts)
		this.presenter.open()
		return this.promise
	},
	
	notif(opts){
		opts = Object.assign({
			autoClose: this.btns.length>0 ? false : 3000,
			closeOnClick: this.btns.length==0,
			onClose: ()=>{ this.resolve(false) }
		}, opts)
		
		opts.view = this
		
		this.presenter = new Notif(opts)

		return this.promise
	}
}
