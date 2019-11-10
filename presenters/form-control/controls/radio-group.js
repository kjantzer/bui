
class RadioGroupElement extends HTMLElement {

	get key(){ return this.getAttribute('key')}
	
	constructor() {
		super()
		
		// let shadow = this.attachShadow({mode: 'open'})
		// let temp = document.createElement('template')
		// temp.innerHTML = `<style>${styles}</style>`
		// this.shadowRoot.appendChild(temp.content.cloneNode(true));

		this.style.outline = 'none'
		
		this.addEventListener('change', this._onChange.bind(this), true)
		
		this.addEventListener('keydown', e=>{
			if( ['ArrowLeft', 'ArrowUp'].includes(e.code) ){
				this.nav(-1)
			}else if( ['ArrowRight', 'ArrowDown'].includes(e.code) ){
				this.nav(1)
			}
		})
		
		this.radios = Array.from(this.querySelectorAll('radio-btn'))
	}
	
	connectedCallback(){
		if( !this.hasAttribute('tabindex') )
			this.setAttribute('tabindex', '0')
	}
	
	nav(dir=1){
		let i = this.radios.indexOf(this.active)
		
		if( i == undefined ) i = dir < 0 ? this.radios.length-1 : 0
		else i += dir
		
		if( i >= this.radios.length ) i = 0
		else if( i < 0 ) i = this.radios.length-1
		
		this.value = this.radios[i].value
	}
	
	_onChange(e){
		
		if( e.target == this ) return
		
		this.value = e.target.value
		this.setAttribute('value', this.value)
		e.stopPropagation()
		
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
		return radio && radio.value
	}
	
	set value(val){
		this.radios.forEach(el=>{
			if( el.value == val )
				el.active=true
			else
				el.active=false
		})
	}
	
	get disabled(){ return this.hasAttribute('disabled') }
	set disabled(val=true){
		val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled')
		this.radios.forEach(el=>el.disabled=val)
	}
	
}

customElements.define('radio-group', RadioGroupElement)

export default customElements.get('radio-group')
