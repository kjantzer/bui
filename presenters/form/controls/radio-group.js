import { LitElement, html, css } from 'lit'

customElements.define('radio-group', class extends LitElement{

	static get properties(){return {
		key: {type: String, reflect: true},
		deselectable: {type: Boolean}
	}}

	static get styles(){return css`
		:host {
			display: inline-flex;
			flex-wrap: wrap;
			outline: none;
			border-radius: 4px;
			vertical-align: middle;
			box-sizing: border-box;
		}

		:host([hidden]) {
			display: none !important;
		}

		:host(:not([slot="control"])[focused]) {
			box-shadow: 0 0 0 2px var(--theme);
			transition: 200ms boxShadow;
		}

		:host([slot="control"]) {
			--radio-segment-min-width: 1em;
		}

		:host ::slotted(radio-btn){
			margin-right: 1em;
		}

		:host([segment]) main {
			align-self: flex-start;
			/* justify-self: flex-start; */
			background-color: var(--theme-bgd-accent, #ccc);
			--radio-segment-radius: 6px;
			--radio-segment-padding: .25rem;
			--radio-segment-btn-padding: var(--radio-segment-padding);
			--radio-segment-min-width: 5em;
			border-radius: var(--radio-segment-radius);
			padding: var(--radio-segment-padding);
			display: inline-flex;
		}

		:host([segment][slot="control"]) {
			background-color: transparent !important;
		}

		:host([segment][pill]) {
			--radio-segment-radius: 1em;
		}

		:host([segment][stacked]) main {
			flex-direction: column;
			width: 100%;
		}

		:host([segment][disabled]) {
			color: var(--theme-text-accent, #888);
		}

		:host([segment]) ::slotted(radio-btn){
			flex-grow: 1;
			margin-right: 0;
			--radio-display: none;
			--radio-btn-label-padding: 0;
    		justify-content: center;
			border-radius: var(--radio-segment-radius);
			font-size: var(--radio-segment-font-size, 0.8em);
			padding: var(--radio-segment-btn-padding);
			min-width: var(--radio-segment-min-width);
			font-weight: bold;
		}

		:host([segment][slot="control"]) ::slotted(radio-btn){
			margin-bottom: calc(-1 * var(--padX) / 2);
    		/* margin-top: calc(-1 * var(--padX) / 4); */
		}

		:host([segment][stacked]) ::slotted(radio-btn){
			padding: calc(var(--radio-segment-btn-padding)*1.5);
		}

		:host([segment]) ::slotted(radio-btn:not(:first-child)) {
			margin-left: 2px;
		}

		:host([segment][stacked]) ::slotted(radio-btn:not(:first-child)) {
			margin-left: 0;
			margin-top: 2px;
		}

		:host([segment]) ::slotted(radio-btn[active]) {
			background-color: var(--radio-segment-active-bgd, var(--theme-bgd, #fff));
			color: var(--radio-segment-active-color, inherit);
		}

		:host([segment="theme"]) ::slotted(radio-btn[active]) {
			background-color: var(--radio-segment-active-bgd, var(--theme, #2196F3));
			color: var(--radio-segment-active-color, var(--theme-bgd, #fff));
		}

		:host([segment]:not([disabled]):not([focused])) ::slotted(radio-btn:not([active]):hover) {
			background-color: var(--radio-segment-hover-bgd, var(--theme-bgd-accent2, #eee));
		}
	`}

	render(){return html`
		<slot name="before"></slot>
		<main>
			<slot></slot>
		</main>
		<slot name="after"></slot>
	`}
	
	constructor() {
		super()
		
		this.deselectable = true

		this.addEventListener('change', this._onChange, true)
		
		this.addEventListener('keydown', e=>{
			if( ['ArrowLeft', 'ArrowUp'].includes(e.code) ){
				e.preventDefault()
				e.stopPropagation()
				this.nav(-1)
			}else if( ['ArrowRight', 'ArrowDown'].includes(e.code) ){
				e.preventDefault()
				e.stopPropagation()
				this.nav(1)
			}
		})

		/* add `focused` to support tabindex navigation */
		this.addEventListener('focus', e=>{
			this._setFocused = setTimeout(()=>{
				this.setAttribute('focused', '')
			},10)
		})
		
		this.addEventListener('blur', e=>{
			this.removeAttribute('focused')
		})

		// dont show "focused" when clicking inside, only when using keyboard
		this.addEventListener('mousedown', e=>{
			setTimeout(()=>{
				clearTimeout(this._setFocused)
				this.removeAttribute('focused')
			})
		})

		this.onChildrenChange = this.onChildrenChange.bind(this)
		const observer = new MutationObserver(this.onChildrenChange);
		observer.observe(this, {attributes: false, childList: true, subtree: false});
	}

	onChildrenChange(e){
		this.radios = Array.from(this.querySelectorAll('radio-btn'))
	}
	
	connectedCallback(){
		super.connectedCallback()

		if( !this.hasAttribute('tabindex') )
			this.setAttribute('tabindex', '0')

		this.radios = Array.from(this.querySelectorAll('radio-btn'))
		this.value = this.value
	}
	
	nav(dir=1){
		let i = this.radios.indexOf(this.active)
		
		if( i == undefined ) i = dir < 0 ? this.radios.length-1 : 0
		else i += dir
		
		if( i >= this.radios.length ) i = 0
		else if( i < 0 ) i = this.radios.length-1
		
		this.value = this.radios[i].value
		this._onChange({target:this.radios[i]})
	}
	
	_onChange(e){
		
		if( e.target == this ) return
		
		if( this.deselectable )
			this.value = e.target.active ? e.target.value : null
		else
			this.value = e.target.value
		
		this.setAttribute('value', this.value||'')
		e.stopPropagation&&e.stopPropagation()
		
		var event = new CustomEvent('change', {
			bubbles: true,
			composed: true,
			detail: {
				value: this.value
			}
		});
		
		this.dispatchEvent(event)
	}
	
	get active(){
		return this.radios.find(el=>el.active)
	}
	
	get value(){
		let radio = this.active
		return radio ? radio.value : this.getAttribute('value')
	}
	
	set value(val){
		(this.radios||[]).forEach(el=>{
			if( el.value == val || (!el.value && !val && el.value !== false && val !== false) )
				el.active=true
			else
				el.active=false
		})
		this.setAttribute('value', val||'')
	}
	
	get disabled(){ return this.hasAttribute('disabled') }
	set disabled(val=true){
		val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled')
		this.radios.forEach(el=>el.disabled=val)
	}
	
})

export default customElements.get('radio-group')
