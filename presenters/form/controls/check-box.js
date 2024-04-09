import { LitElement, html, css } from 'lit'
import './touch-ripple'

const IconEmpty = 'check-box'
const IconSelected = 'check-box-active'

customElements.define('check-box', class extends LitElement{

	static get properties(){return {
		key: {type: String},
		label: {type: String},
		helpText: {type: String},
		disabled: {type: Boolean},
		checked: {type: Boolean, reflect: true},
		placement: {type: String, reflect: true},
		iconEmpty: {type: String},
		icon: {type: String},
	}}

	static get styles(){return css`
		:host {
			--size: 1.6em;
			--color: var(--fc-theme);
			--colorDisabled: var(--fc-disabled-color, rgba(0, 0, 0, 0.26));
			--check-box-label-padding: .35em;
			display: inline-block;
			
			vertical-align: middle;
			flex-grow: 0 !important;
			display: inline-flex;
			align-items: center;
			cursor: pointer;
			outline: none;

			/* margin-bottom: -0.125em; */
		}

		:host([hidden]) { display: none; }

		:host([checked]) .uncheck,
		:host(:not([checked])) .check {
			display: none
		}

		:host([icon="star"]) {
			--color: var(--amber-600);
		}

		:host([icon="star"]:not([checked])) {
			opacity: .5
		}

		main {
			position: relative;
			z-index: 1;
			display: inherit;
			padding: 0.25em;
    		margin: -.25em;
		}

		:host([placement="left"]) main,
		:host([placement="right"]) main {
			align-self: flex-start;
			/*margin-top: -.5em;*/ /* align with first line */
		}

		aside {
			line-height: 1.2em;
		}

		touch-ripple {
			z-index: -1;
		}

		:host([placement="top"]) { flex-direction: column-reverse; }
		:host([placement="bottom"]) { flex-direction: column; }
		:host([placement="left"]) { flex-direction: row-reverse; }
		:host([placement="right"]) { flex-direction: row; }

		:host([placement="top"]) aside { margin-bottom: var(--check-box-label-padding); text-align: center; }
		:host([placement="bottom"]) aside { margin-top: var(--check-box-label-padding); text-align: center; }
		:host([placement="left"]) aside { margin-right: var(--check-box-label-padding); margin-bottom: -0.125em; text-align: right; }
		:host([placement="right"]) aside { margin-left: var(--check-box-label-padding); margin-bottom: -0.125em; text-align: left; }

		:host([nolabel]) aside {
			display: none;
		}

		.icon {
			transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
			user-select: none;
			flex-shrink: 0;
		}

		.switch {
			display: none
		}

		:host([type="switch"]) .icon { display: none; }

		:host([type="switch"]) .switch {
			display: inline-block;
		}

		:host([checked]) {
			color: var(--color)
		}

		:host([disabled]) {
			cursor: default;
		}

		:host([disabled]) .icon {
			fill: var(--colorDisabled)
		}

		:host([disabled]) aside {
			color: var(--colorDisabled);
		}

		main, aside {
			cursor: pointer;
		}

		.indeterminate {
			display: none;
		}

		.switch {
			position: relative;
			align-items: center;
			/* margin: .5em; */
		}

		.switch:before, .switch:after {
			content: "";
			margin: 0;
			outline: 0;
			transition: all 0.3s ease;
		}

		.switch:before {
			display: block;
			width: calc(2.2em + 2px);
			height: calc(1.2em + 2px);
			background-color: rgba(var(--theme-text-rgb, 0,0,0,), .3);
			border-radius: 1.2em;
			/* box-shadow: 0 0 0 1px var(--theme-text-accent); */
		}

		.switch:after {
			position: absolute;
			left: 3px;
			top: 50%;
			transform: translate(0, -50%);
			width: 1em;
			height: 1em;
			background-color:var(--theme-bgd);
			border-radius: 50%;
			/* box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.14), 0 2px 2px 0 rgba(0, 0, 0, 0.098), 0 1px 5px 0 rgba(0, 0, 0, 0.084); */
		}


		:host([checked]) .switch:before {
			background-color: var(--color);
			/* opacity: .5; */
			/* box-shadow: none; */
			/* box-shadow: 0 0 0 1px var(--color); */
		}

		:host([checked]) .switch:after {
			background-color: var(--theme-bgd);
			transform: translate(100%, -50%);
		}

		:host([disabled]) .switch {
			opacity: .5;
		}
	`}

	constructor(){
		super()
		this.placement = 'right'
		this.iconEmpty = IconEmpty
		this.icon = IconSelected
	}

	render(){return html`
		<main>
			<b-icon name="${this.iconEmpty||IconEmpty}" square class="icon uncheck" focusable="false"></b-icon>
			<b-icon name="${this.icon||IconSelected}" square class="icon check" focusable="false"></b-icon>
			
			<div class="switch"></div>
			
			<touch-ripple></touch-ripple>
		</main>

		<aside>
			<label part="label">
				<slot>${this.label}</slot>
			</label>
			<b-text part="help" block sm italic dim>
				<slot name="help">${this.helpText}</slot>
			</b-text>
		</aside>
		
	`}

	firstUpdated(){

		if( !this.hasAttribute('tabindex') )
			this.setAttribute('tabindex', '0')
		
		this.addEventListener('click', this._onClick.bind(this))
		
		this.addEventListener('keydown', e=>{
			if( ['Space', 'Enter'].includes(e.code) ){
				e.stopPropagation()
				e.preventDefault()
				this._onClick()
			}
		})
		
		this.addEventListener('focus', e=>{
			if( e.relatedTarget && e.relatedTarget != this && !this.disabled)
				this.ripple.enter()
		})
		
		this.addEventListener('blur', e=>{
			if( e.relatedTarget && e.relatedTarget != this)
				this.ripple.hide()
		})
	}

	toggle(){ this._onClick() }

	_onClick(e){

		e?.stopPropagation?.()

		if( this.disabled ) return
		
		this.ripple.burst()
		
		this.checked = !this.checked
		
		var event = new CustomEvent('change', {
			bubbles: true,
			composed: true,
			detail: {
				value: this.checked
			}
		});
		
		this.dispatchEvent(event)
	}

	set checked(val){
		let oldVal = this.checked

		// make these values "false" too
		if( val === '0' || val === '' )
			val = false

		this.__checked = val
		this.requestUpdate('checked', oldVal)
	}
	
	get checked(){ return this.__checked}

	get value(){ return this.checked }
	set value(val){ this.checked = val }

})

export default customElements.get('check-box')