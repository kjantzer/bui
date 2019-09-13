/*
	Select Field
*/
import {css} from 'lit-element'
import Menu from '../../menu'

const styles = css`

:host(:not([disabled])) {
	cursor: pointer;
}

main {
	display: flex;
	align-items: center;
	min-width: 1em;
}

main > svg {
	height: 1em;
	width: 1em;
	flex-shrink: 0;
}

slot#options {
	display: none;
}

main input {
	position: absolute;
	z-index: -1;
	opacity: 0;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}


#value {
	flex-grow: 1;
	min-width: 1em;
}

#value:empty:before {
	content: attr(data-placeholder);
	color: var(--placeholderColor);
}

#value > span {
	display: inline-block;
	padding: 0;
    min-width: 1em;
	vertical-align: bottom;
}

:host(:not([chip])) #value > span:not(:last-child):after {
	content: ', ';
	margin-right: .5em;
}

:host([chip]) #value {
	margin-top: -.15em;
	margin-bottom: -.15em;
}

:host([chip]) #value > span {
	background: rgba(0,0,0,.1);
    margin: .1em;
    padding: .15em .5em;
    border-radius: 20px;
	line-height: 1em;
	display: inline-flex;
	justify-content: center;
	align-items: center;
}`

class SelectFieldElement extends HTMLElement {
	
	constructor() {
        super()
		
        let shadow = this.attachShadow({mode: 'open'})
        let temp = document.createElement('template')
		
		let placeholder = this.getAttribute('placeholder') || ''
		let arrow = this.hasAttribute('no-arrow') ? '' : '<svg focusable="false" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path></svg>'

        temp.innerHTML = `<style>${styles.cssText}</style>
			<main>
				<input type="input" readonly="true"/>
				<div id="value" data-placeholder="${placeholder}"></div>
				${arrow}
			</main>
			<slot id="options"></slot>`
			
        this.shadowRoot.appendChild(temp.content.cloneNode(true));
		
		this._input = this.$('input')
		this._value = this.$('#value')
		this._selected = []
		
		let options = this.$('#options')
		this.options = []
		
		options.assignedNodes&&options.assignedNodes().map(el=>{

			if( !el.tagName ) return // skip comments and empty text blocks
			
			if( el.tagName == 'HR' )
				return this.options.push('divider')
			
			if( el.tagName == 'OPTGROUP' )
				return this.options.push({'divider': el.innerHTML})
			
			if( el.tagName != 'OPTION'){
				return this.options.push({'text': el.innerHTML})
			}
			
			if( el.hasAttribute('selected') )
				this._selected.push(el.value)
			
			let attrs = {}
			
			Array.from(el.attributes).forEach(attr=>{
				if( !['value', 'selected'].includes(attr.name) )
					attrs[attr.name] = attr.value
			})
			
			this.options.push(Object.assign(attrs, {
				label: el.innerHTML,
				val: el.value||null
			}))
		})
		
		this.addEventListener('click', this.focus.bind(this))
		this.addEventListener('keypress', this.onKeypress.bind(this))
    }
	
	onKeypress(e){
		if( e.code == 'Space' ){
			this.toggleMenu()
		}
	}

	static get observedAttributes() { return ['disabled']; }
	attributeChangedCallback(name, oldValue, newValue){
		if( name === 'disabled' )
			this._input.disabled = this.disabled
	}
	
	setAttributes(){
		
		if( this.isEmpty && !this.showEmpty && !this.getAttribute('placeholder') )
			this.setAttribute('empty', true)
		else
			this.removeAttribute('empty')
	}
	
	$(str){ return this.shadowRoot.querySelector(str)}
	$$(str){ return this.shadowRoot.querySelectorAll(str)}
	
	connectedCallback(){
		this.selected = this._selected
	}
	disconnectedCallback(){}
	
	get disabled(){ return this.hasAttribute('disabled') }
	set disabled(val=true){ val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled')}
	
	get multiple(){ return this.hasAttribute('multiple') }
	get showEmpty(){ return this.hasAttribute('show-empty') }
	
	get value(){
		if( this.multiple )
			return this.selected && this.selected.map(m=>m.val)
		else
			return this.selected && this.selected.val
	}
	
	set value(val){
		this.selected = val
	}
	
	get isEmpty(){
		let val = this.value
		return this.multiple ? val.length <= 1 && !val[0] : !val
	}
	
	set isInvalid(invalid){
		this._isInvalid = invalid
		if( invalid )
			this.setAttribute('invalid', true)
		else
			this.removeAttribute('invalid')
	}
	
	get isInvalid(){
		return this._isInvalid
	}

	set options(opts){

		if( opts instanceof Promise ){
			opts.then(result=>{
				this.options = result
				return result
			})
			opts = [] // clear options until promise resolves
		}

		if( Array.isArray(opts) )
			opts = opts.map(o=>{
				if( typeof o == 'string')
					return {label: o, val: o}
				return o
			})

		this.__options = opts
		this.selected = this._selected
	}
	get options(){ return this.__options}
	
	set selected(val){
		
		this._oldSelected = this._selected.slice(0)
		
		if( !val ) val = []
		else if( !Array.isArray(val) ) val = [val]
		
		let selected = this.options.filter(m=>{
			return val.includes(m.val) || (val.length == 0 && !m.val)
		})

		// keep selected values in the order that they were selected
		selected = selected.sort((a,b)=>{
			return val.indexOf(a.val) - val.indexOf(b.val)
		})
		
		this._selected = []

		// if no options, keep the selected value
		// FIXME: could be improved with the `labels`
		if( this.options.length == 0 )
			this._selected = val
		
		let labels = ''
		
		selected.forEach(m=>{
			
			this._selected.push(m.val)
			
			if(m.val || this.showEmpty)
				labels += `<span value="${m.val}">${m.label}</span>`
				
		})
		
		this._value.innerHTML = labels

		this.setAttribute('value', val.join(','))
		
		this.setAttributes()
	}
	
	get selected(){
		let selected = this.options.filter(m=>{
			return this._selected.includes(m.val)
		})

		// keep selected values in the order that they were selected
		selected = selected.sort((a,b)=>{
			return this._selected.indexOf(a.val) - this._selected.indexOf(b.val)
		})
		
		return this.multiple ? selected : selected[0]
	}
	
	get isFocused(){
		return this.shadowRoot.activeElement == this._input || this.hasAttribute('focused')
	}
	
	focus(){
		this.toggleMenu()
	}
	
	set focused(focused){
		if( focused ){
			this._input.focus()
			this.setAttribute('focused', '')
		}else{
			this._input.blur()
			this.removeAttribute('focused')
		}
	}

	async toggleMenu(){
		
		if( this.disabled ) return
		
		if( this.openMenu ){
			this.openMenu.resolve(false)
			return
		}
		
		this.focused = true
		
		let menuOpts = {
			minW: this.offsetWidth,
			selected: this._selected,
			multiple: this.multiple,
			jumpNav: this.hasAttribute('jump-nav'),
			
			// only called when in multiple mode
			onSelect: selected=>{
				this.selected = selected.map(m=>m.val)
			}
		}
		
		let menu = this.options
		let popoverOpts = {
			align: this.getAttribute('menu-align') || 'bottom',
			maxHeight: this.getAttribute('menu-max-height') || 'auto',
			maxWidth: this.getAttribute('menu-max-width') || 'none',
			overflowBoundry: this.getAttribute('menu-overflow') ? 'window' : null,
			adjustForMobile: true
		}
		
		if( !menu || menu.length == 0 )
			menu = [{'divider': 'No options available'}]
			
		this.openMenu = new Menu(menu, menuOpts)
		
		this.openMenu.el.setAttribute('select-field', this.className)

		let val = await this.openMenu.popover(this.$('main'), popoverOpts)
		
		this.openMenu = null
		this.focused = false
		
		if( !device.is_mobile )
			this._input.focus() // retain focus
		
		if( val === false ) return
		
		val = this.multiple ? val : [val]
		
		this.selected = val.map(m=>m.val)
		
		var event = new CustomEvent('change', {
			bubbles: true,
			composed: true,
			detail: {
				value: this.value
			}
		});
		
		this.dispatchEvent(event)
	}
	
}

customElements.define('select-field', SelectFieldElement)

export default customElements.get('select-field')
