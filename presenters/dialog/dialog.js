import {render, TemplateResult} from 'lit-html';
const Panel = require('../panel').default
const Popover = require('../popover').default
const makeBtn = require('./make-btn')

const styles = require('./style.less')

const cancelBtns = ['dismiss', 'cancel', 'no']

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
		opts.className.split(' ').forEach(className=>className&&this.el.classList.add(className));

		let [iconName, iconClass] = (opts.icon||'').split(' ')
		
		// FIXME: animation needs added
		let icon = opts.icon ? `<b-icon name="${iconName}" class="${iconClass||''} animated speed-2 flipInY"></b-icon>` : ''
		let btns = opts.btns ? opts.btns.map(btn=>makeBtn(btn)).join("\n") : ''
		
		this.el.innerHTML = `<div class="d-icon">${icon}</div>
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
			else
				this.el.querySelector('.d-msg').appendChild(this.opts.view)
		}
		
		this.el.addEventListener('click', this.onClick.bind(this), true)
		
		this.promise = new Promise(resolve=>{ this._resolve = resolve })
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
		
		if( target.currentTarget )
			target = target.currentTarget
		
		let onClose = opts.onClose
		opts.onClose = ()=>{
			onClose&&onClose()
			this.resolve(false)
		}
		
		opts.onKeydown = this.onKeydown.bind(this)
		
		if( this.opts.icon )
			this.el.classList.add('sideicon')
		
		this.presenter = new Popover(target, this.el, opts)
		return this.promise
	}
	
	modal(opts={}){

		if( this.opts.icon )
			this.el.classList.add('sideicon')
			
		return this.panel(opts) // might need to reactivate Modal below

		// opts.view = this.el,
		// opts.className = 'md-modal dialog '+(opts.className||'')
		// opts.btns = false
		// opts.onKeydown = this.onKeydown.bind(this)
		
		// this.presenter = new Modal(opts)
		// return this.promise
	}

	panel(opts={}){

		opts = Object.assign({
			type: 'modal',
			animation: 'scale',
			disableBackdropClick: true
		})

		opts.onKeydown = this.onKeydown.bind(this)

		let onClose = opts.onClose
		opts.onClose = ()=>{
			onClose&&onClose()
			this.resolve(false)
		}

		this.presenter = new Panel(this.el, opts).open()
		return this.promise
	}
	
	notif(opts){
		opts = Object.assign({
			autoClose: this.opts.btns ? false : 3000,
			clickRemoves: !this.opts.btns,
			onAutoClose: ()=>{ this.resolve(false) }
		}, opts)
		
		this.el.classList.add('sideicon')
		
		this.presenter = app.msgs.add(this.el, opts)
		return this.promise
	}
}