import {css} from 'lit-element'

const styles = css`

:host {
	--size: 1.6em;
	--color: var(--formControlTheme);
	--colorDisabled: rgba(0, 0, 0, 0.26);
	--labelSize: 1em;
	--labelColor: currentColor;
	display: inline-block;
	vertical-align: middle;
}

:host(.control) {
	flex-grow: 0 !important;
}

:host([active]) svg.inactive,
:host(:not([active])) svg.active {
	display: none
}

main {
	display: flex;
	align-items: center;
	cursor: pointer;
}

:host([placement="top"]) main { flex-direction: column-reverse; }
:host([placement="bottom"]) main { flex-direction: column; }
:host([placement="left"]) main { flex-direction: row-reverse; }
:host([placement="right"]) main { flex-direction: row; }

svg {
	fill: currentColor;
	width: var(--size);
	height: var(--size);
	display: inline-block;
	transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	user-select: none;
	flex-shrink: 0;
	padding: .25em;
}

svg.active {
	fill: var(--color);
}

:host([disabled]) svg {
	fill: var(--colorDisabled);
}

:host([disabled]) label {
	color: var(--colorDisabled);
}

label {
	font-size: var(--labelSize);
	color: var(--labelColor);
}

main label {
	cursor: pointer;
}`

class RadioBtnElement extends HTMLElement {
	
	constructor() {
		super()
		
		let shadow = this.attachShadow({mode: 'open'})
		let temp = document.createElement('template')
		
		let label = this.getAttribute('label') || '<slot name="label"></slot>'
		
		temp.innerHTML = `<style>${styles.cssText}</style>
			<main>
				<svg class="inactive" focusable="false" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
				<svg class="active" focusable="false" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
				<label>${label}</label>
			</main>
			`
			
		this.shadowRoot.appendChild(temp.content.cloneNode(true));
		this.addEventListener('click', this._onClick.bind(this))
	}
	
	_onClick(){
		
		if( this.disabled ) return
		
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
	
	set active(val){
		val ? this.setAttribute('active', '') : this.removeAttribute('active')
	}
	
	get active(){ return this.hasAttribute('active') }
	get value(){ return this.hasAttribute('value') ? (this.getAttribute('value')||null) : this.getAttribute('label') }
	
	get disabled(){ return this.hasAttribute('disabled') }
	set disabled(val=true){val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled')}
	
}

customElements.define('radio-btn', RadioBtnElement)

export default customElements.get('radio-btn')
