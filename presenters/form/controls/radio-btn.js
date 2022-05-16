import { LitElement, html, css } from 'lit'
import './touch-ripple'

customElements.define('radio-btn', class extends LitElement{

	static get properties(){return {
		disabled: {type: Boolean},
		label: {type: String},
		active: {type: Boolean, reflect: true},
		placement: {type: String, reflect: true}
	}}

	static get styles(){return css`
		:host {
			--size: 1.5em;
			--color: var(--fc-theme);
			--colorDisabled: var(--fc-disabled-color, rgba(0, 0, 0, 0.26));
			--labelSize: 1em;
			--labelColor: currentColor;
			--radio-btn-label-padding: .35em;
			display: inline-block;
			vertical-align: middle;

			display: flex;
			align-items: center;
			cursor: pointer;
		}

		:host(.control) {
			flex-grow: 0 !important;
		}

		:host([active]) svg.inactive,
		:host(:not([active])) svg.active {
			display: none
		}

		:host([placement="top"]) { flex-direction: column-reverse; }
		:host([placement="bottom"]) { flex-direction: column; }
		:host([placement="left"]) { flex-direction: row-reverse; }
		:host([placement="right"]) { flex-direction: row; }

		:host([placement="top"]) label { margin-bottom: var(--radio-btn-label-padding); }
		:host([placement="bottom"]) label { margin-top: var(--radio-btn-label-padding); }
		:host([placement="left"]) label { margin-right: var(--radio-btn-label-padding); }
		:host([placement="right"]) label { margin-left: var(--radio-btn-label-padding); }

		svg {
			fill: rgba(var(--theme-text-rgb, 0,0,0), .5);
			width: var(--size);
			height: var(--size);
			display: inline-block;
			transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
			user-select: none;
			flex-shrink: 0;
		}

		svg.active {
			fill: var(--color);
		}

		:host([active]) touch-ripple {
			color: var(--color);
		}

		:host([disabled]) svg {
			fill: var(--colorDisabled);
		}

		:host([disabled]) label {
			color: var(--colorDisabled);
		}

		main {
			position: relative;
			top: 1px; /* align with check-box */
			z-index: 1;
			padding: .25em;
			margin: -.25em;
			display: var(--radio-display, block);
		}

		touch-ripple {
			z-index: -1
		}

		label {
			font-size: var(--labelSize);
			color: var(--labelColor);
		}

		label {
			cursor: pointer;
		}
	`}

	constructor(){
		super()
		this.active = false
		this.placement = 'right'
		this.addEventListener('click', this._onClick)
	}

	render(){return html`
		
		<main>
			<touch-ripple></touch-ripple>

			<svg class="inactive" focusable="false" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
			
			<svg class="active" focusable="false" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
		
		</main>

		<label><slot>${this.label}</slot></label>
	`}

	_onClick(){
		
		if( this.disabled ) return

		this.ripple.burst()
		
		this.active = !this.active
		
		var event = new CustomEvent('change', {
			bubbles: true,
			composed: true,
			detail: {
				value: this.value
			}
		});
		
		this.dispatchEvent(event)
	}

	get value(){ return this.hasAttribute('value') ? (this.getAttribute('value')||null) : this.getAttribute('label') }

})

export default customElements.get('radio-btn')