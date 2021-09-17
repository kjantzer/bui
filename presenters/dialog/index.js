
import Dialog from './element'
import Prompt from './prompt'
import bindPresenters, {Notif, Panel, Popover} from './bind-presenters'

export default Dialog
export {Notif, Panel, Popover}

export function registerPreset(name, defaults){
	Dialog[name] = function(opts={}){

		let defaultOpts = defaults

		if( typeof defaultOpts == 'function' )
			defaultOpts = defaultOpts(opts)
		
		if( typeof opts == 'string' ){
			opts = {body: opts}

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
	btns: ['cancel', 'yes']
}})

registerPreset('confirmDelete', opts=>{ return {
	icon: opts.title||opts.msg||opts.body?'trash':'',
	accent: opts.title||opts.msg||opts.body?'red':'',
	noContent: true,
	btns: ['cancel', 'delete']
}})

registerPreset('warn', {
	pretitle: 'Warning',
	icon: 'attention-1',
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
	icon: 'attention-circle',
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
	icon: 'ok-circled',
	accent: 'green',
	color: 'inverse',
	btns: ['dismiss']
})
