
const Dialog = require('./dialog').default;

module.exports = Dialog

Dialog.waiting = function(opts={}){
	return new Dialog(Object.assign({
		icon: 'spinner',
		title: 'Processing...',
		msg: '',
		btns: false
  	}, opts))
}

Dialog.confirm = function(opts={}){
	return new Dialog(Object.assign({
		// icon: 'trash text-red',
		title: 'Continue?',
		msg: 'Are you sure?',
		btns: ['cancel', 'ok']
  	}, opts))
}

Dialog.confirmDelete = function(opts={}){
	return new Dialog(Object.assign({
		icon: opts.title||opts.msg?'trash red':'',
		btns: ['cancel', 'delete']
  	}, opts))
}

Dialog.alert = function(opts={}){
	return new Dialog(Object.assign({
		icon: 'info-circled',
		btns: ['dismiss']
  	}, opts))
}

Dialog.error = function(opts={}){
	return new Dialog(Object.assign({
		icon: 'alert red',
		btns: ['dismiss']
  	}, opts))
}

Dialog.warn = function(opts={}){
	return new Dialog(Object.assign({
		icon: 'attention-1 orange',
		btns: ['dismiss']
  	}, opts))
}

Dialog.success = function(opts={}){
	return new Dialog(Object.assign({
		icon: 'ok-circled green',
		title: 'Success',
		btns: ['dismiss']
  	}, opts))
}

Dialog.prompt = function(opts={}){
	
	opts = Object.assign({
		val: '',
		msg: '',
		prefix: '',
		suffix: '',
		pattern: '',
		html: false,
		required: false,
		label: '',
		placeholder: '',
		helpText: '',
		w: 300,
		type: '',
		multiline: false,
		multiple: false,
		btns: ['cancel', 'save'],
		onSubmit(val, control, blur){}
	}, opts)
	
	if( opts.msg )
		opts.msg = `<div>${opts.msg}</div>`
		
	opts.onResolve = function(resp, dialog){
		
		let control = dialog.$('form-control')

		control.removeEventListener('change', onSubmit)
		
		if( !resp ) return opts.btns.length > 2 ? [resp] : resp
		
		if( control.isInvalid )
			throw Error('Invalid data')
		
		let val = opts.html ? control.value : (control.control.textValue || control.value)
		
		return opts.btns.length > 2 ? [resp, val] : val
	}
	
	let prefix = ''
	let suffix = ''
	
	if( opts.prefix.match(/^icon/) ){
		prefix = `<span slot="prefix" class="${opts.prefix}"></span>`
		opts.prefix = ''
	}
	
	if( opts.suffix.match(/^icon/) ){
		suffix = `<span slot="suffix" class="${opts.suffix}"></span>`
		opts.suffix = ''
	}
	
	let control = `<text-field
		pattern="${opts.pattern}"
		placeholder="${opts.placeholder}"
		${opts.html?'html':''}
		${opts.multiline?'multiline':''}
		${opts.required?'required':''}>${opts.val}</text-field>`
	
	if( opts.type )
		control = `<input
					slot="control"
					type=${opts.type} 
					pattern="${opts.pattern}" 
					placeholder="${opts.placeholder}"
					value="${opts.val}"
					autocomplete="off"
					${opts.required?'required':''}>`

	if( opts.options )
		control = `<select-field
					placeholder="${opts.placeholder}"
					${opts.multiple?'multiple':''}
					></select-field>`
	
	opts.msg += `
			<form-control material="filled" 
			${opts.label?`label="${opts.label}"`:''} 
			show="suffix prefix"
			prefix="${opts.prefix}"
			suffix="${opts.suffix}">
				${control}
				<div slot="help">${opts.helpText}</div>
				${prefix}
				${suffix}
			</form-control>
			`
	
	let dialog = new Dialog(opts)
	
	control = dialog.$('form-control')

	let onSubmit = (e)=>{
		if( ['TEXT-FIELD', 'INPUT'].includes(e.target.tagName) ){
			// if onSubmit given, dont close input...let function do that if 
			if( opts.onSubmit ){
				let val = opts.html ? control.value : (control.control.textValue || control.value)
				let blur = function(){ control.control.blur() }
				opts.onSubmit(val, control, blur)
			}
			else{
				control.control.blur()
			}
		}
	}

	control.addEventListener('change', onSubmit)
	
	if( opts.options )
		control.options = opts.options
	
	setTimeout(function(){	
		control.focus()
	},500)
	
	return dialog
}
