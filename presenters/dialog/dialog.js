import {render, TemplateResult} from 'lit-html';
import device from '../../util/device';
import Panel from '../panel'
import Popover from '../popover'
import makeBtn, {cancelBtns} from './make-btn'

// FIXME: this module needs to be refactored using lit-element to better apply styles
const styles = require('./style.less')

export default class Dialog {
	constructor(opts={}){
		
		this.opts = opts = Object.assign({
			icon:'',
			title:'',
			msg:'',
			view: null,
			w: null,
			btns:['dismiss'],
			className: '',
		}, opts)
		
		this.el = document.createElement('div')
		
		opts.className += ' nopadding dialog'

		if( this.opts.icon )
			opts.className += ' sideicon'

		opts.className.split(' ').forEach(className=>className&&this.el.classList.add(className));

		let [iconName, iconClass] = (opts.icon||'').split(' ')
		
		// FIXME: animation needs added
		let icon = opts.icon ? `<b-icon name="${iconName}" class="${iconClass||''}"></b-icon>` : ''
		let btns = opts.btns ? opts.btns.map(btn=>makeBtn(btn)).join("\n") : ''

		if( opts.icon === 'spinner' )
			icon = `<b-spinner></b-spinner>`
		else if( opts.icon && opts.icon[0] == '<' )
			icon = opts.icon
		else if( customElements.get(opts.icon) )
			icon = `<${opts.icon}></${opts.icon}>`

		this.el.innerHTML = `${typeof styles === 'string'?`<style>${styles}</style>`:''}
							<div class="d-icon">${icon}</div>
							<h2 class="d-title">${opts.title}</h2>
							<div class="d-msg">${opts.msg}</div>
							<div class="d-btns">${btns}</div>`;
		if(opts.msg instanceof TemplateResult){
			render(opts.msg, this.el.querySelector('.d-msg'));
		}
		
		if( this.opts.w )
			this.el.style.width = (typeof this.opts.w == 'number') ? this.opts.w+'px' : this.opts.w;
		
		if( this.opts.view ){
			if( !this.opts.icon && !this.opts.title && !this.opts.msg ){

				if( this.opts.view instanceof HTMLElement ){
					this.el.innerHTML = `<div class="d-btns">${btns}</div>`
					this.el.prepend(this.opts.view)
				}else{
					this.el.innerHTML = `${this.opts.view}<div class="d-btns">${btns}</div>`
				}
			}
			else{
				this.el.querySelector('.d-msg').classList.add('custom-view')
				this.el.querySelector('.d-msg').appendChild(this.opts.view)
			}
		}
		
		this.el.addEventListener('click', this.onClick.bind(this), true)
		
		this.promise = new Promise(resolve=>{ this._resolve = resolve })
	}

	set title(str){
		this.opts.title = str
		let el = this.el.querySelector('.d-title')
		if( el )
			el.innerHTML = str
	}

	set msg(str){
		this.opts.msg = str
		let el = this.el.querySelector('.d-msg')
		if( el )
			el.innerHTML = str
	}

	set btns(btns){
		this.opts.btns = btns
		btns = btns ? btns.map(btn=>makeBtn(btn)).join("\n") : ''
		let el = this.el.querySelector('.d-btns')
		if( el )
			el.innerHTML = btns
	}

	set icon(icon){
		this.opts.icon = icon
		let [iconName, iconClass] = (icon||'').split(' ')
		icon = this.opts.icon ? `<b-icon name="${iconName}" class="${iconClass||''} animated speed-2 flipInY"></b-icon>` : ''

		if( this.opts.icon === 'spinner' )
			icon = `<b-spinner></b-spinner>`
		
		let el = this.el.querySelector('.d-icon')
		if( el )
			el.innerHTML = icon
	}
	
	onClick(e){
		
		let el = e.target
		
		if( el.tagName == 'B-BTN' ){
			
			let index = Array.from(el.parentElement.children).indexOf(el)
			let btnInfo = this.opts.btns[index]
			this.resolveBtn(btnInfo)
		}
	}
	
	onKeydown(e){
		
		let btnInfo = undefined
	
		if( e.code == 'Escape' ){
			btnInfo = this.opts.btns.find(btn=>cancelBtns.includes(btn))
		
		}else if( e.code == 'Enter' ){
			btnInfo = this.opts.btns.find(btn=>!cancelBtns.includes(btn))
		}
		
		if( btnInfo != undefined ){

			// let other views finish with keydown before we process (ex: Dialog.prompt)
			setTimeout(()=>{
				if( document.activeElement == document.body )
					this.resolveBtn(btnInfo)
			}, 0);
		}
	}
	
	resolveBtn(btnInfo){
		if( cancelBtns.includes(btnInfo) )
			btnInfo = false
		
		if( this.resolve(btnInfo) === true )
			this.close()
	}
	
	resolve(resp){
		if( this.opts.onResolve ){
			
			try{
				resp = this.opts.onResolve(resp, this)
			}catch(err){
				console.log('failed to resolve');
				return false
			}
		}
		
		if( this._resolve )
			this._resolve(resp)
			
		return true
	}
	
	close(){
		if( this.presenter )
			this.presenter.close()
	}
	
	$(str){
		return this.el.querySelector(str)
	}
	
	$$(str){
		return this.el.querySelectorAll(str)
	}
	
	/*
		Presenters
	*/
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
		
		opts.onKeydown = this.onKeydown.bind(this)
		
		this.presenter = new Popover(target, this.el, opts)

		// layout timing issue on Safari (mac and iOS)... this will fix it for now
		setTimeout(()=>{
			this.presenter._updatePosition()
		})

		return this.promise
	}
	
	modal(opts={}, mobileOpts){
		if( mobileOpts && device.isMobile )
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

		opts = Object.assign({
			type: 'modal',
			animation: 'scale',
			disableBackdropClick: true
		}, opts)

		opts.onKeydown = this.onKeydown.bind(this)

		let onClose = opts.onClose
		opts.onClose = ()=>{
			onClose&&onClose()
			this.resolve(false)
		}

		this.presenter = new Panel(this.el, opts)
		this.presenter.open()
		return this.promise
	}
	
	notif(opts){
		opts = Object.assign({
			autoClose: this.opts.btns ? false : 3000,
			clickRemoves: !this.opts.btns,
			onAutoClose: ()=>{ this.resolve(false) }
		}, opts)
		
		this.presenter = app.msgs.add(this.el, opts)
		return this.promise
	}
}