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

		/* default look: a drawn box (outlined; filled with a white check when checked) */
		.box {
			width: var(--size);
			height: var(--size);
			display: inline-flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
		}

		.box:before {
			content: '';
			width: calc(var(--size) * .7);
			height: calc(var(--size) * .7);
			box-sizing: border-box;
			border-radius: calc(var(--size) * .2);
			border: solid 1.5px rgba(var(--theme-text-rgb, 0,0,0), .3);
			background: no-repeat center / 80%;
			transition: background-color 120ms, border-color 120ms;
		}

		@media (hover) {
			:host(:not([disabled]):hover) .box:before {
				border-color: var(--color);
			}
		}

		:host([checked]) .box:before {
			border-color: var(--color);
			background-color: var(--color);
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='white' stroke-width='3.2' stroke-linecap='round' stroke-linejoin='round' d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E");
		}

		:host([disabled]) .box:before {
			opacity: .4;
		}

		:host([type="switch"]) .box { display: none; }

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

		/* switch: matches the drawn box (theme color when on, same hover and disabled looks); a white thumb
		   that slides over (and stretches while pressed); sized from --size */
		.switch {
			--track-h: calc(var(--size) * .78);
			--track-w: calc(var(--size) * 1.3);
			--inset: 2px;
			--thumb: calc(var(--track-h) - 2 * var(--inset));
			position: relative;
			flex-shrink: 0;
			width: var(--track-w);
			height: var(--track-h);
			margin: calc((var(--size) - var(--track-h)) / 2) 0;
			border-radius: var(--track-h);
			background-color: rgba(var(--theme-text-rgb, 0,0,0), .18);
			transition: background-color 160ms;
		}

		.switch:after {
			content: '';
			position: absolute;
			top: var(--inset);
			left: var(--inset);
			width: var(--thumb);
			height: var(--thumb);
			border-radius: var(--thumb);
			background: #fff;
			box-shadow: 0 1px 2px rgba(0,0,0,.2), 0 1px 1px rgba(0,0,0,.06);
			transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1), width 120ms ease;
		}

		@media (hover) {
			:host([type="switch"]:not([disabled]):not([checked]):hover) .switch {
				background-color: rgba(var(--theme-text-rgb, 0,0,0), .26);
			}
		}

		:host([checked]) .switch {
			background-color: var(--color);
		}

		:host([checked]) .switch:after {
			transform: translateX(calc(var(--track-w) - var(--thumb) - 2 * var(--inset)));
		}

		/* pressed: the thumb stretches toward where it's going */
		:host([type="switch"]:not([disabled])) main:active .switch:after {
			width: calc(var(--thumb) * 1.25);
		}

		:host([type="switch"][checked]:not([disabled])) main:active .switch:after {
			transform: translateX(calc(var(--track-w) - var(--thumb) * 1.25 - 2 * var(--inset)));
		}

		:host([type="switch"]) touch-ripple {
			display: none;
		}

		:host([disabled]) .switch {
			opacity: .4;
		}
	`}

	constructor(){
		super()
		this.placement = 'right'
		this.iconEmpty = IconEmpty
		this.icon = IconSelected
	}

	// custom icons (ex: star) use b-icon; otherwise a drawn box
	get usesIcons(){
		return (this.icon && this.icon != IconSelected) || (this.iconEmpty && this.iconEmpty != IconEmpty)
	}

	render(){return html`
		<main>
			${this.usesIcons?html`
				<b-icon name="${this.iconEmpty||IconEmpty}" square class="icon uncheck" focusable="false"></b-icon>
				<b-icon name="${this.icon||IconSelected}" square class="icon check" focusable="false"></b-icon>
			`:html`
				<span class="box icon"></span>
			`}
			
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

		// e?.stopPropagation?.() // causes issues. maybe opt in?

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