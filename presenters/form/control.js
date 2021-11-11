/*
	Form Control
*/

import styles from './control.css.js'
import nativeInputHelper from './util/nativeInputHelper'

const CONTROLS = '[slot="control"], .control, text-field, text-editor, select-field, check-box, radio-group, token-text-field'
const MIRROR_CONTROL_ATTRS = ['invalid', 'empty', 'no-value', 'falsy', 'focused', 'value']


class FormControlElement extends HTMLElement {
	
	constructor() {
        super()
		
        let shadow = this.attachShadow({mode: 'open'})
        let temp = document.createElement('template')
		
		let label = this.getAttribute('label') || '<slot name="label"></slot>'
		let prefix = this.getAttribute('prefix') || '<slot name="prefix"></slot>'
		let suffix = this.getAttribute('suffix') || '<slot name="suffix"></slot>'

		// if prefix/suffix have spaces at the beginning or end of string assume the
		// developer wanted the sapce to show and replace with non-breaking space so it does
		prefix = prefix.replace(/^\s+/, '&nbsp;')
		prefix = prefix.replace(/\s+$/, '&nbsp;')
		suffix = suffix.replace(/^\s+/, '&nbsp;')
		suffix = suffix.replace(/\s+$/, '&nbsp;')
		
        temp.innerHTML = `
			<style>${styles.cssText}</style>
			<slot name="before"></slot>
			<main part="main">
				<slot name="control"></slot>
				<slot name="main"></slot>
				<div class="prefix" part="prefix">${prefix}</div>
				<div class="label" part="label">${label}</div>
				<div class="suffix" part="suffix">${suffix}</div>
				<div class="btns">
					<span class="btn-save">
						<svg class="check" focusable="false" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
					</span>
					<span class="btn-cancel">
						<svg class="j2dfb39" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path fill="none" d="M0 0h24v24H0z"></path></svg>
					</span>
				</div>
			</main>
			<slot name="help"></slot>
			<slot name="after"></slot>
			<slot id="value"></slot>`
			
        this.shadowRoot.appendChild(temp.content.cloneNode(true));

		this.control = this.querySelector(CONTROLS)
    }

	firstUpdated(){
		let value = this.$('#value')
		this._val = value.assignedNodes().map(el=>el.textContent.trim()).join(' ')
		this._val = this._val.replace(/^\n|\n$/g, '').trim()
		
		if( !this.control )
			this.control = this.querySelector(CONTROLS)

		if( this.control ){
			
			this.control.slot = 'control'
			this.setAttribute('control-type', this.control.tagName.toLowerCase())

			this.mutationObserver = new MutationObserver(mutations=>{
				mutations.forEach(m=>{
					
					// mirror these attributes from the control onto the form-control
					if( MIRROR_CONTROL_ATTRS.includes(m.attributeName) ){
						if( this.control.hasAttribute(m.attributeName) )
							this.setAttribute(m.attributeName, this.control.getAttribute(m.attributeName))
						else
							this.removeAttribute(m.attributeName)
					}
				})
			});
			this.mutationObserver.observe(this.control, { attributes: true, childList: false, subtree: false });

			// if native input, we need to add a helper to set expected values for mutation observer above
			if( this.control.tagName == 'INPUT' )
				nativeInputHelper(this.control)
		}
		
		this.addEventListener('click', this._onClick.bind(this), true)
		
		this.addEventListener('change', this._onChange)

		this.$$('slot').forEach(slot=>{
			slot.addEventListener('slotchange', e=>{
				if( slot.assignedNodes().length == 0 )
					slot.setAttribute('hidden', '')
				else
					slot.removeAttribute('hidden')
			})
		})
	}
	
	_onChange(e){
		
		if( e.target == this ) return

		if( e.target.tagName == 'FORM-CONTROL') return
		
		e.stopPropagation()
		
		var event = new CustomEvent('change', {
			bubbles: true,
			composed: true,
			detail: {
				value: this.value,
				key: this.key
			}
		});
		
		this.dispatchEvent(event)
	}
	
	$(str){ return this.shadowRoot.querySelector(str)}
	$$(str){ return this.shadowRoot.querySelectorAll(str)}
	
	connectedCallback(){

		if( !this.__firstUpdated ){
			this.__firstUpdated = true
			this.firstUpdated()
		}

		this._setClassNames()
		
		// hide slots that are empty
		this.$$('slot').forEach(slot=>{
			if( slot.assignedNodes().length == 0 )
				slot.setAttribute('hidden', '')
			else
				slot.removeAttribute('hidden')
		})
		
		// defer - then make sure the form-control remains as wide as the label
		setTimeout(()=>{
			if( this.style.minWidth == '' )
				this.style.minWidth = this.$('.label').offsetWidth

			if( this.control )
				this.control.disabled = this.disabled
		},0)
		
	}
	
	disconnectedCallback(){}
	
	static get observedAttributes() { return ['disabled']; }
	
	attributeChangedCallback(name, oldValue, newValue){
		
		if( name === 'disabled' && this.control && this.control.disabled !== undefined)
			this.control.disabled = this.disabled
	}
	
	get disabled(){ return this.hasAttribute('disabled') }
	set disabled(val=true){ val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled') }
	
	get key(){ return this.getAttribute('key')}
	
	get value(){
		return this.control && this.control.value
	}
	
	set value(val){
		if( this.control )
			this.control.value = val
		
		if( this.control && this.control.tagName == 'INPUT' )
			this.control.dispatchEvent(new CustomEvent('change:value'))
	}

	get dbValue(){
		let control = this.control
		if( !control ) return undefined
		let val = control.dbValue
		return val !== undefined ? val : control.value
	}

	get textValue(){
		let control = this.control
		if( !control ) return undefined
		let val = control.textValue
		return val !== undefined ? val : control.value
	}
	
	get options(){ return this.control && this.control.options}
	
	set options(val){
		if( this.control )
			this.control.options = val
	}
		
	get isInvalid(){
		return this.control&&this.control.isInvalid
	}

	get label(){ return this.$('.label').textContent }
	set label(str){
		this.$('.label').innerHTML = str
		if( str ){
			this.setAttribute('nolabel', '')
		}else{
			this.removeAttribute('nolabel')
		}
	}
	
	_setClassNames(){
		
		let labelNodes = this.$('.label').childNodes
		
		if( labelNodes.length == 0 || (labelNodes[0].tagName == 'SLOT' && labelNodes[0].assignedNodes().length == 0) )
			this.setAttribute('nolabel', '')
	}
	
	_onClick(e){
		// console.log(e.target);
		if( e.target == this )
			this.focus()
		// if( !e.target.isFocused && !e.target.slot)
		// 	this.focus()
	}
	
	focus(){
		this.control && this.control.focus()
	}

}

customElements.define('form-control', FormControlElement)

export default customElements.get('form-control')
