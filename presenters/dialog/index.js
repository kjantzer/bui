
const Dialog = require('./dialog').default;

module.exports = Dialog

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
		btns: ['dismiss']
  	}, opts))
}

Dialog.error = function(opts={}){
	return new Dialog(Object.assign({
		icon: 'cancel red',
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
		icon: 'ok green',
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
		validate: '',
		html: false,
		required: false,
		label: '',
		placeholder: '',
		helpText: '',
		w: 300,
		multiline: false,
		multiple: false,
		btns: ['cancel', 'save']
	}, opts)
	
	if( opts.msg )
		opts.msg = `<div>${opts.msg}</div>`
		
	opts.onResolve = function(resp, dialog){
		
		let control = dialog.$('form-control')
		
		if( !resp ) return resp
		
		if( control.isInvalid )
			throw Error('Invalid data')
		
		resp = opts.html ? control.value : (control.control.textValue || control.value)
		
		return resp
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
		validate="${opts.validate}"
		placeholder="${opts.placeholder}"
		${opts.html?'html':''}
		${opts.multiline?'multiline':''}
		${opts.required?'required':''}>${opts.val}</text-field>`
		
	if( opts.options )
		control = `<select-field
					placeholder="${opts.placeholder}"
					${opts.multiple?'multiple':''}
					></select-field>`
	
	opts.msg += `
			<form-control material="outline" label="${opts.label}" prefix="${opts.prefix}"suffix="${opts.suffix}">
				${control}
				<div slot="help">${opts.helpText}</div>
				${prefix}
				${suffix}
			</form-control>
			`
	
	let dialog = new Dialog(opts)
	
	control = dialog.$('form-control')
	
	if( opts.options )
		control.options = opts.options
	
	setTimeout(function(){	
		control.focus()
	},500)
	
	return dialog
}




window.dialogTest = async function(){
	
	let resp = await Dialog.prompt({
		title: 'New Thing',
		w: 400,
		placeholder: 'Number of units',
		validate: 'int',
		required: true,
		msg: 'To subscribe to this website, please enter your email address here. We will send updates occasionally.'
	}).modal()
	
	console.log(resp);
	
}

// TEMP
// setTimeout(dialogTest,2000)