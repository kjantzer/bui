/*
	A subclass of Dialog that supports variable prompt inputs
*/
import Dialog from './element'
import { html, css } from 'lit-element'
import device from '../../util/device'
import mobileAsyncFocus from '../../util/mobileAsyncFocus'

customElements.define('b-dialog-prompt', class extends Dialog{

    static get styles(){return [super.styles, css`
        form-handler {
			display: grid;
			gap: .5em;
		}

		:host(:not([notext])) form-handler {
			margin-top: 1em;
		}
    `]}

    constructor(opts={}){

		opts = Object.assign({
			material: 'filled',
			btns: ['cancel', 'save']
		}, opts)

        super(opts)

		if( opts.prompts )
			this.prompts = opts.prompts.map((p,i)=>makePrompt(p, i, opts))
		else
        	this.prompts = [makePrompt(opts, 0, opts)]


		if( opts.autoFocus !== false ){

			setTimeout(()=>{this.focus()}, 200)
			
			if( device.isiOS )
				mobileAsyncFocus(this)
		}
    }

    renderView(){return html`
		<form-handler @submit=${this.onSubmit}>
			${this.prompts}
		</form-handler>
	`}

	onSubmit(e){
		// if valid, blur the field so "enter" keypress fires correctly on Dialog
		if( !e.target.isInvalid )
			e.target.blur()
	}

	focus(){
		if( this.formHandler.controls.length > 0 )
			this.formHandler.controls[0].focus()
	}

    resolve(resp){

		if( this.formHandler.isInvalid && resp )
			return false

		let returnResp = this.btns.length > 2
		let vals = this.formHandler.values

		// no button selected
		if( !resp ) return super.resolve(returnResp ? [resp] : resp)
		
		if( this.formHandler.controls.length == 1 ){
			let control = this.formHandler.controls[0]
			vals = this.html ? control.value : (control.control.textValue || control.value)
		}

		resp = returnResp ? [resp, vals] : vals

		return super.resolve(resp)

    }

})

export default customElements.get('b-dialog-prompt')


function makePrompt(opts, i=0, globalOpts){

	// must be custom lit-html
	if( opts.getHTML )
		return opts

    opts = Object.assign({
		key: 'prompt-'+i,
		val: '',
		prefix: '',
		suffix: '',
		pattern: '',
		html: false,
		required: false,
		label: '',
		placeholder: '',
		helpText: '',
		w: false,
		type: '',
		multiline: false,
	}, opts)
	
	return html`
	<form-control material="${globalOpts.material}"
		key="${opts.key}"
		show=${opts.label?'':'suffix prefix'}
		prefix="${opts.prefix}"
		suffix="${opts.suffix}"
		style="${opts.w?`width:${opts.w}px;`:''}"
	>
		<text-field
			pattern="${opts.pattern}"
			placeholder="${opts.placeholder}"
			?html=${opts.html}
			?multiline=${opts.multiline}
			?required=${opts.required}
			.value=${opts.val}></text-field>

		${opts.helpText?html`<div slot="help">${opts.helpText}</div>`:''}
		${opts.label?html`<span slot="label">${opts.label}</span>`:''}
		<span slot="prefix">${opts.prefix}</span>
		<span slot="suffix">${opts.suffix}</span>
		
	</form-control>
	`
}