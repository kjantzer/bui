/*
	A subclass of Dialog that supports variable prompt inputs
*/
import Dialog from './element'
import { html, css } from 'lit-element'
import device from '../../util/device'
import mobileAsyncFocus from '../../util/mobileAsyncFocus'
import '../form/controls/text-field'
import '../form/control'
import '../form/handler'

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
			btns: ['cancel', 'save'],
			//onSubmit(val, control, blur){}
		}, opts)

        super(opts)
		this.opts = opts

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
		<form-handler @submit=${this.onSubmit} .model=${this.opts.model}>
			${this.prompts}
		</form-handler>
	`}

	onSubmit(e){

		if( e.target.isInvalid ) return

		if( this.opts.onSubmit ){
			let control = e.target
			let blur = function(){ control.blur() }
			return this.opts.onSubmit(this.value, control, blur)
		}
		
		// if valid, blur the field so "enter" keypress fires correctly on Dialog
		e.target.blur()
	}

	focus(){
		if( this.formHandler.controls.length > 0 )
			this.formHandler.controls[0].focus()
	}

	get value(){
		let vals = this.formHandler.values

		if( this.formHandler.controls.length == 1 ){
			let control = this.formHandler.controls[0]
			vals = this.html ? control.value : (control.control.textValue || control.value)
		}

		return vals
	}

    resolve(resp){

		if( this.formHandler.isInvalid && resp )
			return false

		let returnResp = this.btns.length > 2
		let vals = this.value

		// no button selected
		if( !resp ) return super.resolve(returnResp ? [resp] : resp)

		resp = returnResp ? [resp, vals] : vals

		return super.resolve(resp)

    }

})

export default customElements.get('b-dialog-prompt')


function makePrompt(opts, i=0, globalOpts){

	// must be custom lit-html
	if( opts.getHTML )
		return opts

	if( opts == 'divider' )
		return html`<b-hr></b-hr>`

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

	if( opts.type == 'switch' )
	return html`
		<check-box 
			key="${opts.key}"
			type="switch"
			.value=${opts.val}
			label="${opts.label}"
		></check-box>
	`

	let control = html`
		<text-field
			pattern="${opts.pattern}"
			placeholder="${opts.placeholder}"
			type="${opts.type}"
			?html=${opts.html}
			?multiline=${opts.multiline}
			?required=${opts.required}
			.value=${opts.val}></text-field>
	`

	if( opts.options ){
		control = html`
			<select-field
				placeholder="${opts.placeholder}"
				.options=${opts.options}
				.value=${opts.val}
			></select-field>
		`
	}
	
	return html`
	<form-control material="${globalOpts.material}"
		key="${opts.key}"
		show=${opts.label?'':'suffix prefix'}
		prefix="${opts.prefix}"
		suffix="${opts.suffix}"
		style="${opts.w?`width:${opts.w}px;`:''}"
	>	
		${control}

		${opts.helpText?html`<div slot="help">${opts.helpText}</div>`:''}
		${opts.label?html`<span slot="label">${opts.label}</span>`:''}
		<span slot="prefix">${opts.prefix}</span>
		<span slot="suffix">${opts.suffix}</span>
		
	</form-control>
	`
}