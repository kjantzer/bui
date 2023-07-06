/*
	A subclass of Dialog that supports variable prompt inputs
*/
import Dialog from './element'
import { html, css } from 'lit'
import device from '../../util/device'
import mobileAsyncFocus from '../../util/mobileAsyncFocus'
import '../form/controls/text-field'
import '../form/controls/radio-group'
import '../form/controls/radio-btn'
import '../form/control'
import '../form/handler'
import isLitHTML from '../../helpers/lit/is-lit-html'

customElements.define('b-dialog-prompt', class extends Dialog{

    static get styles(){return [super.styles, css`
        form-handler {
			display: grid;
			gap: .5em;
		}

		form-handler > form-control {
			min-width: 0;
		}

		:host(:not([notext])) form-handler {
			margin-top: 1em;
		}

		radio-group {
			margin-bottom: .25em;
		}

		/* keep from tiny overscroll happening due to touch-ripple clipping */
		form-handler > div:last-child > check-box {
			margin-bottom: .5em;
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

			setTimeout(()=>{
				this.focus()
				if( opts.autoFocus == 'select' )
					this.selectAll()
			}, 200)
			
			if( device.isMobile )
				mobileAsyncFocus(this)
		}
    }

    renderView(){return html`
		<form-handler @submit=${this.onSubmit} .model=${this.opts.model}
		style="${this.opts.gridArea?`grid-template-areas: "${this.opts.gridArea.join('"\n"')}"`:''}">

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

	selectAll(){
		if( this.formHandler.controls.length > 0 )
			this.formHandler.controls[0].control.select('all')
	}

	get value(){
		let vals = this.formHandler.values

		if( !this.opts.prompts && this.formHandler.controls.length > 0 ){
			let control = this.formHandler.controls[0]
			vals = this.html ? control.value : ((control.control && control.control.textValue) || control.value)
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

// NOTE: this logic should probabaly be moved to be part of `form`
// so other code can generate form controls via JS
function makePrompt(opts, i=0, globalOpts){

	// must be custom lit-html
	if( isLitHTML(opts) )
		return opts

	if( opts == 'divider' || opts == '-' )
		return html`<b-hr></b-hr>`

    opts = Object.assign({
		key: 'prompt-'+i,
		val: '',
		icon: '', // only works if no prefix
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
		disabled: false
	}, opts)

	if( ['int', 'decimal', 'float', 'number'].includes(opts.pattern) )
		opts.type = 'number'

	if( !opts.val && globalOpts.val && globalOpts.val[opts.key] )
		opts.val = globalOpts.val[opts.key]

	if( opts.icon && !opts.prefix )
		opts.prefix = html`<b-icon name="${opts.icon}"></b-icon>`
		
	if( opts.prefix && opts.prefix.replace )
		opts.prefix = opts.prefix.replace(/\s$/, '&nbsp;')
	
	if( opts.suffix && opts.suffix.replace )
		opts.suffix = opts.suffix.replace(/^\s/, '&nbsp;')

	let gridArea = globalOpts.gridArea ? `grid-area: ${opts.key};` : ''

	if( opts.type == 'switch' || opts.type == 'check-box' )
	return html`
	<div style="${gridArea}">
		<check-box 
			key="${opts.key}"
			type=${opts.type}
			?disabled=${opts.disabled}
			.value=${opts.val}
			.hideIf=${opts.hideIf}
			.disableIf=${opts.disableIf}
			.enableleIf=${opts.enableIf}
		>
			<b-text .html=${opts.label}></b-text>
			${opts.helpText?html`
				<b-text slot="help" .html=${opts.helpText}></b-text>
			`:''}
			
		</check-box>
	</div>
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

	if( opts.options && (opts.segment || opts.type == 'segment') ){
		return html`
			<radio-group segment="theme" ?stacked=${opts.segment?.stacked!==false}
			?disabled=${opts.disabled}
			key="${opts.key}"
			style="${opts.w?`width:${opts.w}px;`:''}"
			.value=${opts.val}
			.hideIf=${opts.hideIf}
			.disableIf=${opts.disableIf}
			.enableleIf=${opts.enableIf}>
				
				${opts.options.map(o=>html`
					<radio-btn 
						label
						value=${o.val===undefined?o:o.val}
						?disabled=${o.disabled}
					>
						<b-text>
							${o.label===undefined?o:o.label}
						</b-text>

						${o?.description||o?.helpText?html`
						<b-text block sm italic dim>
							${o.val===undefined?'':o.description||o.helpText}</b-text>
						`:''}

					</radio-btn>
				`)}

				<b-text block sm bold slot="before" ?hidden=${!opts.label}>${opts.label}</b-text>

			</radio-group>
		`
	}

	if( opts.options ){
		control = html`
			<select-field
				placeholder="${opts.placeholder}"
				.options=${opts.options}
				.value=${opts.val}
				?multiple=${opts.multiple}
				?show-empty=${opts.showEmpty}
				?summarize=${opts.summarize}
				adjust-for-mobile=false
			></select-field>
		`
	}
	
	return html`
	<form-control material="${globalOpts.material}"
		key="${opts.key}"
		show=${opts.label?'':'suffix prefix'}
		?disabled=${opts.disabled}
		.hideIf=${opts.hideIf}
		.showIf=${opts.showIf}
		.disableIf=${opts.disableIf}
		.enableleIf=${opts.enableIf}
		style="${opts.w?`width:${opts.w}px;`:''}; ${gridArea}"
	>	
		${control}

		${opts.helpText?html`<div slot="help">${opts.helpText}</div>`:''}
		${opts.label?html`<span slot="label" nopointer>${opts.label}</span>`:''}
		<b-text slot="prefix" nopointer .html=${opts.prefix}></b-text>
		<b-text slot="suffix" nopointer .html=${opts.suffix}></b-text>
		
	</form-control>
	`
}