
import Dialog from './element'
import Prompt from './prompt'
import bindPresenters, {Notif, Panel, Popover} from './bind-presenters'

export default Dialog
export {Notif, Panel, Popover}

export function registerPreset(name, defaults){
	Dialog[name] = function(opts){

		let defaultOpts = defaults

		if( typeof defaultOpts == 'function' )
			defaultOpts = defaultOpts(opts)
		
		if( !opts || typeof opts == 'string' ){
			opts = opts ? {body: opts} : {}

			if( defaultOpts.btns && defaultOpts.btns.length == 1 )
				opts.btns = false
		}

		return new Dialog(Object.assign({}, defaultOpts, opts))
	}
}

bindPresenters(Dialog)

Dialog.prompt = (opts)=>{ return new Prompt(opts) }

registerPreset('waiting', {
	icon: 'spinner',
	title: 'Processing...',
	color: 'inverse',
	btns: false
})

registerPreset('spinner', {
	icon: 'spinner',
	btns: false,
	color: 'inverse',
	noContent: true,
})

registerPreset('alert', {
	color: 'inverse',
	btns: ['dismiss']
})

registerPreset('confirm', {
	title: 'Continue?',
	body: 'Are you sure?',
	btns: ['cancel', 'ok']
})

registerPreset('confirmYes', opts=>{ return {
	// icon: opts.title||opts.msg||opts.body?'trash':'',
	// accent: opts.title||opts.msg||opts.body?'red':'',
	noContent: true,
	btns: opts?.btns||['cancel', 'yes']
}})

registerPreset('confirmDelete', opts=>{ return {
	icon: opts&&(opts.title||opts.msg||opts.body)?'trash':'',
	accent: opts&&(opts.title||opts.msg||opts.body)?'red':'',
	noContent: true,
	btns: opts?.btns||['x', {label: 'Delete', color: 'red', icon: 'trash', muted: true}]
}})

registerPreset('warn', {
	pretitle: 'Warning',
	icon: 'warning',
	accent: 'orange',
	color: 'inverse',
	edge: true,
	btns: ['dismiss']
})

registerPreset('stopped', {
	pretitle: 'Ooops...',
	icon: 'block',
	accent: 'red',
	color: 'inverse',
	edge: true,
	btns: ['dismiss']
})

registerPreset('error', {
	pretitle: 'Error',
	icon: 'error',
	accent: 'red',
	color: 'inverse',
	edge: true,
	btns: ['dismiss']
})

registerPreset('fatal', {
	pretitle: 'Error',
	icon: 'alert',
	color: 'red',
	accent: 'red',
	edge: true,
	toast: true,
	btns: ['x']
})

registerPreset('info', {
	icon: 'info-circled',
	accent: 'blue',
	color: 'inverse',
	btns: ['dismiss']
})

registerPreset('success', {
	icon: 'check_circle',
	accent: 'green',
	color: 'inverse',
	btns: ['dismiss']
})
