import {css} from 'lit-element'
import moment from 'moment'
import Dialog from '../../dialog'
import './date-picker'
import setValueAttrs from '../util/setValueAttrs'
import validatePattern from '../util/validatePattern'
import stopMaxLength from '../util/stopMaxLength'
import {normalizeText, htmlCleaner} from '../../../util'

const styles = css`
:host {
	display: inline-block;
	contain: layout;
	min-width: .25em;
}

:host(:not([disabled])){
	cursor: text;
}

:host(:not([disabled])) main ::selection {
	background: var(--selectionBgd, #FFF8E1);
}

main {
	display: flex;
}

:host([input]) .editor {
	display: none;
}

:host(:not([input])) .input {
	display: none;
}

.input {
	outline: none;
	width: 100%;
	display: inline-block;
	min-height: 1em;
	font-size: inherit;
	font-family: inherit;
	line-height: 1.2em;
	margin: -.1em 0;
	border: none;
	background: transparent;
	/* background: yellow; */
}

.editor {
	outline: none;
	width: 100%;
	display: inline-block;
	white-space: pre-wrap;
	min-height: 1em;
	line-height: 1.2em;
	margin: -.1em 0;
}

.editor p:first-child{ margin-top: 0;}
.editor p:last-child{ margin-bottom: 0;}

/* :host([single-line]) .editor {
	white-space: nowrap;
	overflow-x: auto;
	overflow-x: -moz-scrollbars-none; 
}

:host([single-line]) .editor::-webkit-scrollbar {
	width: 0 !important;
} */

:host([empty]) .editor:before {
	content: attr(data-placeholder);
	color: var(--placeholderColor);
	position: absolute;
}

.calendar {
	display: none;
	opacity: .3;
	height: 1.2em;
    margin: -0.3em -.5em -.5em 0;
    padding: .25em;
	cursor: pointer;
	position: relative;
	z-index: 1000;
}

:host([type="date"]) .calendar {
	display: inline-block;
}

/* .calendar:hover,
.calendar.popover-open {
	opacity: .7;
} */

.input::-webkit-calendar-picker-indicator,
.input::-webkit-inner-spin-button { 
    display: none;
}

input:-webkit-autofill {
	font-size: inherit;
	font-family: inherit;
	background: red;
}

/* remove autofill blue/yellow background */
input:-webkit-autofill {
    -webkit-box-shadow:0 0 0 50px var(--bgd) inset;
    /* -webkit-text-fill-color: #333; */
}

input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 50px var(--bgd) inset;
    /* -webkit-text-fill-color: #333; */
} 
`

class TextFieldElement extends HTMLElement {
	
	constructor() {
        super()
		
        let shadow = this.attachShadow({mode: 'open'})
        let temp = document.createElement('template')
		
		let placeholder = this.getAttribute('placeholder') || ''
		
        temp.innerHTML = `<style>${styles.cssText}</style>
			<main>
				
				<div class="editor" contenteditable="true" data-placeholder="${placeholder}"></div>
				
				<input class="input" placeholder="${placeholder}" 
						type="${this.input||'text'}" 
						name="${this.name||this.input}"
						autocomplete="${this.autocomplete}">
						
				<b-icon name="calendar-3" class="calendar"></b-icon>
			</main>
			<slot id="value"></slot>`
			
        this.shadowRoot.appendChild(temp.content.cloneNode(true));

		if( this.hasAttribute('multiline') || this.hasAttribute('html') )
			this.removeAttribute('input')
		
		let value = this.$('#value')
		this._val = value.assignedNodes().map(el=>el.textContent.trim()).join(' ')
		this._val = this._val.replace(/^\n|\n$/g, '').trim()
		
		this._editor = this.$('.editor')
		this._input = this.$('.input')

		if( this.type == 'date' ){
			this._datePicker = document.createElement('date-picker')
			this._datePicker.value = this.value
			this._datePicker.format = this.format

			if( !this._datePicker.isValid ){
				let date = moment(this._val)
				this._val = this._datePicker.value = date.format(this._datePicker.format)
			}
		}
		
		if( this._val ){
			this._editor.innerHTML = htmlCleaner.clean(this._val)
			this._input.value = this._val
		}

		if( !this._val && this.hasAttribute('multiline') ){
			this._val = '<p><br></p>'
			this._editor.innerHTML = this._val
		}
		
		this.innerText = ''
		
		this._editor.addEventListener('paste', this._onPaste.bind(this), true)
		this._editor.addEventListener('keydown', this._onKeydown.bind(this), true)
		this._input.addEventListener('keydown', this._onKeydown.bind(this), true)
		this._editor.addEventListener('keyup', this._onKeypress.bind(this), true)
		this._editor.addEventListener('blur', this._onBlur.bind(this))
		this._input.addEventListener('blur', this._onBlur.bind(this))

		this.shadowRoot.addEventListener('click', this._onClick.bind(this))
		this.addEventListener('click', this._onClick.bind(this))
    }
	
	$(str){ return this.shadowRoot.querySelector(str)}
	$$(str){ return this.shadowRoot.querySelectorAll(str)}
	
	connectedCallback(){
		this._setClassNames()
	}
	
	disconnectedCallback(){}
	
	static get observedAttributes() { return ['disabled', 'placeholder']; }
	attributeChangedCallback(name, oldValue, newValue){
		
		if( name === 'disabled' )
			this._editor.contentEditable = !this.disabled

		if( name === 'placeholder' )
			this._editor.dataset.placeholder = newValue
	}
	
	get input(){ return this.getAttribute('input') }
	get type(){ return this.getAttribute('type') }
	get name(){ return this.getAttribute('name') }
	get autocomplete(){ return this.getAttribute('autocomplete') }
	get format(){ return this.getAttribute('format') || 'MM/DD/YYYY' }

	get disabled(){ return this.hasAttribute('disabled') }
	set disabled(val=true){val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled')}
	get value(){ return this._val}

	get textValue(){
		if( !this.value ) return this.value
		let doc = (new DOMParser()).parseFromString(this.value, 'text/html')
		return Array.from(doc.body.childNodes).map(node=>node.nodeValue||node.innerText).join("\n")
	}
	
	set value(val){
		
		this._oldVal = this._val
		
		if( this.hasAttribute('default') && !val ){
			val = this.getAttribute('default')
			
			this._val = val
			
			let selection = this.select()
			document.execCommand('insertText', false, val)
			selection.removeAllRanges();
		}else{

			if( this.type == 'date' ){
				this._datePicker.value = val
	
				if( !this._datePicker.isValid ){
					let date = moment(val)
					val = this._datePicker.value = date.format(this._datePicker.format)
				}

				if( !this._datePicker.isValid ){
					val = this._val
					this._datePicker.value = val
				}

			}


			this._val = val

			if( this._editor.innerHTML != val ){
				
				if( this.hasAttribute('multiline') )
					val = val || '<p><br></p>'
				else
					val = val || ''

				this._editor.innerHTML = val
			}
				
			if( this._input.value != val )
				this._input.value = val
		}
		
		this._setClassNames()
	}

	get dbValue(){
		if( this._datePicker )
			return this.value ? this._datePicker.formatted('YYYY-MM-DD') : this.value
		return this.value
	}

	get currentValue(){
		if( this.hasAttribute('html') )
			return this._editor.innerHTML
		
		if( this.input )
			return this._input.value
		else if( this._editor.innerHTML === '<p><br></p>' || this._editor.innerHTML === '<br>' )
			return ''
		else
			return this._editor.innerText || this._editor.innerHTML
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
	
	get isFocused(){
		return this.shadowRoot.activeElement == this._editor
			|| this.shadowRoot.activeElement == this._input
	}
	
	_setClassNames(){
		setValueAttrs(this, this._val)
		if( this._val && this._val !== '<p><br></p>' )
			this.removeAttribute('empty')
		else
			this.setAttribute('empty', '')
	}
	
	_onClick(e){

		// was calendar icon clicked?
		if( e.target.classList.contains('calendar') ){
			e.stopPropagation()
			return this.pickDate()
		}

		if( e.target != this )
			return

		if( !e.target.isFocused )
			this.focus()
	}

	async pickDate(){
		this._datePicker.value = this.value
		let picker = new Dialog({view: this._datePicker, btns: ['cancel', 'ok']})

		if( await picker.popover(this.$('.calendar'), {
			align: 'left', 
			overflowBoundry: 'window',
			maxHeight: false, 
			adjustForMobile: true})
		){
			this._changeValue(picker.$('date-picker').value)
		}
	}
	
	_onPaste(e){
		e.preventDefault();

		if( this.hasAttribute('html') ){
			let val = e.clipboardData.getData(e.clipboardData.types[0]||'text/html')
			val = htmlCleaner.clean(val)
			document.execCommand('insertHTML', false, val);

		}else{
			let val = e.clipboardData.getData(e.clipboardData.types[0]||'text/plain')
			document.execCommand('insertText', false, val);
		}
	}
	
	get editorEl(){
		return this.input ? this._input : this._editor
	}
	
	select(range='all'){

		let el = this.editorEl,
		    s = window.getSelection(),
		    r = document.createRange();
		
		if( range == 'start' ){
			r.setStart(el, 0);
			r.setEnd(el, 0);
		}else if( range == 'end' ){
			r.setStart(el, el.childNodes.length);
			r.setEnd(el, el.childNodes.length);
		}else{
			r.selectNodeContents(el);
		}
		
		s.removeAllRanges();
		s.addRange(r);
		return s
	}

	_onKeypress(e){
		if( !this.input && this._editor.innerText.trim() == '' )
			this.setAttribute('empty', '')
		else
			this.removeAttribute('empty')
	}
	
	_onKeydown(e){
		let stop = false
		
		this.isInvalid = false

		if( e.key.length == 1)
			this.removeAttribute('empty')

		if( e.key == 'Backspace' && this.hasAttribute('multiline') && this._editor.innerText.trim() == '' ){
			e.preventDefault()
			e.stopPropagation()
			return false
		}
		
		if( e.key == 'Enter' && !this.hasAttribute('multiline')){
			stop = true
			this.dispatchEvent(new Event("change")); // Force change event for empty search/ re-search
			this.blur() // will trigger a change if there is one
		}
		
		if( e.key == 'Escape' ){
			this.value = this.value // reset the value
			this.blur()
		}

		let val = this.input ? this._input.value : this._editor.innerText
		stop = stopMaxLength(e, this, val)

		let delay = this.getAttribute('change-delay')
		clearTimeout(this._changeDelay)
		if( delay !== null ){
			delay = delay || 500
			this._changeDelay = setTimeout(this._onBlur.bind(this), delay)
		}

		if( stop ){
			e.preventDefault()
		}else if( !this.hasAttribute('bubble-keypress') ){
			e.stopPropagation()
		}
	}
	
	focus(){
		if( this.input )
			this._input.focus()
		else
			this.select()
	}
	
	_onBlur(){
		
		let val = this.currentValue
		
		if( !validatePattern(this, val) ){
			
			if( this.hasAttribute('reset-invalid') ){
				this.value = this.value
			}else{
				this.value = val
				this.isInvalid = true
				this._setClassNames()
			}
			// }else{
			// 	
			// 	this.focus()
			// }
			return
		}
		
		if( val == this.value )
			return
		
		let max = this.getAttribute('max')
		if( max )
			val = val.slice(0, max)
		
		this._changeValue(val)
	}

	_changeValue(val){
		this.value = val
		
		var event = new CustomEvent('change', {
			bubbles: true,
			composed: true,
			detail: {
				value: this.value,
				oldVal: this._oldVal
			}
		});
		
		this.dispatchEvent(event)
	}
}

customElements.define('text-field', TextFieldElement)

export default customElements.get('text-field')
