import {css} from 'lit-element'
import Popover from '../../popover'
import Datepicker from '../../datepicker'
import setValueAttrs from '../util/setValueAttrs'
import validatePattern from '../util/validatePattern'
import stopMaxLength from '../util/stopMaxLength'
import {htmlCleaner} from '../../../util'

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
	color: var(--selectionColor, #333);
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
	position: relative;
	outline: none;
	width: 100%;
	display: inline-block;
	white-space: pre-wrap;
	min-height: 1em;
	line-height: 1.2em;
	margin: -.1em 0;
}

.editor p {
	margin: var(--b-text-field-paragraph-margin, 1em) 0;
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
	/* position: absolute; */
}

:host([multiline]) .editor:before {
	position: absolute;
	left: 0;
    right: 0;
}

/* keep placeholder on one line, clipping to ellipsis when overflowed */
:host(:not([multiline])) .editor:before {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
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

:host([type="date"][disabled]) .calendar {
	display: none;
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

		if( this.isMultiline )
			this.removeAttribute('input')
		
		let value = this.$('#value')
		this._val = value.assignedNodes().map(el=>el.textContent.trim()).join(' ')
		this._val = this._val.replace(/^\n|\n$/g, '').trim()
		
		this._editor = this.$('.editor')
		this._input = this.$('.input')

		if( this.type == 'date' ){
			this._datePicker = new Datepicker({
				value: this.value,
				range: false,
				inputs: false,
				btns: false
			})
		}
		
		if( this._val ){
			this._editor.innerHTML = htmlCleaner.clean(this._val, this.htmlClean||{})
			this._input.value = this._val
		}

		if( !this._val && this.isMultiline && !this.isPlain ){
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

		this.shadowRoot.querySelector('.calendar').addEventListener('click', this._onClick.bind(this))
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

	get isMultiline(){ return this.hasAttribute('multiline') }
	get isHTML(){ return this.hasAttribute('html') }
	// get isPlain(){ return this.hasAttribute('plain') }
	get isPlain(){ return !this.isHTML }

	get disabled(){ return this.hasAttribute('disabled') }
	set disabled(val=true){val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled')}
	get value(){ return this._val}

	get textValue(){
		if( !this.value ) return this.value
		let doc = (new DOMParser()).parseFromString(this.value, 'text/html')
		return Array.from(doc.body.childNodes).map(node=>node.nodeValue||node.innerText).join("\n")
	}

	insertText(text){
		if( !this.isFocused )
			this.focus()
		document.execCommand('insertText', false, text)
		this._updateValue()
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
				
				if( val === 'Invalid date' || val === '0000-00-00' || val === '0000-00-00 00:00:00')
					val = null

				try {
					this._datePicker.value = val

					if( val )
						val = this._datePicker.value.format(this.format)

				// if failed to set datepicker value, the val is invalid, reset to previous value
				}catch(err){
					val = this._oldVal
				}
			}


			this._val = val

			if( this._editor.innerHTML != val ){
				
				if( this.isMultiline && !this.isPlain )
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
			return this.value ? this._datePicker.value.format('YYYY-MM-DD') : this.value
		return this.value
	}

	get currentValue(){

		// retain current empty value
		let emptyVal = this.value === null ? null : ''

		if( this.input )
			return this._input.value || emptyVal
			
		else if( this._editor.innerHTML === '<p><br></p>' || this._editor.innerHTML === '<br>' )
			return emptyVal
		
		else if( this.isHTML )
			return this._editor.innerHTML || emptyVal
			
		else
			return this._editor.innerText || this._editor.innerHTML || emptyVal
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

		// make sure date picker has latest value
		this._datePicker.value = this.value

		let apply = function(e){
			p&&p.close();
			this._changeValue(e.detail.date)
		}.bind(this)

		// apply the value once a date is selected
		this._datePicker.addEventListener('date-selected', apply, {once: true})

		let p = new Popover(this.$('.calendar'), this._datePicker, {
			align: 'bottom-end', 
			overflowBoundry: 'window',
			maxHeight: false, 
			adjustForMobile: true,
			// NOTE: not called when p.close() is called
			onClose:()=>{
				this._datePicker.removeEventListener('date-selected', apply)
			}
		})
	}
	
	_onPaste(e){
		e.preventDefault();

		let val = ''

		if( this.isHTML 
		&& !e.clipboardData.types.includes('text/rtf')
		&& e.clipboardData.types.includes('text/html') )
		{
			val = e.clipboardData.getData('text/html')
			val = htmlCleaner.clean(val, this.htmlClean||{})
		}else{
			val = e.clipboardData.getData('text')
			
			// remove excessive line breaks
			val = val.replace(/\n{2,}/g, "\n")

			if( this.isHTML )
				val = '<p>'+val.split(`\n`).join(`</p>\n<p>`)+'</p>'
			else
				val = val.split(`\n`).join(`<br>\n`)
		}

		let eventDetail = {
			str: val,
			extras: []
		}

		// only keep first line, but send extra lines in the event detail
		if( !this.isMultiline ){

			let lines = []

			let div = document.createElement('div')
			let cleanOpts = Object.assign({
				keepParent: false,
				allowTags:['p', 'b', 'i', 'strong', 'em']
			}, this.htmlClean||{})

			div.innerHTML = htmlCleaner.clean(val, cleanOpts)
			
			let isInlineText = div.firstChild instanceof Text || !['P','DIV'].includes(div.firstChild.tagName)

			if( cleanOpts.keepParent == 'never' || isInlineText )
				lines.push(this.isHTML ? div.innerHTML : div.textContent)
				
			else for( let child of div.childNodes ){
				lines.push( this.isHTML ? (child.outerHTML||child.textContent) : child.textContent )
			}

			eventDetail.str = val = lines.shift()
			eventDetail.extras = lines 
		}

		// NOTE: using insertHTML (rather than insertText) keeps the browser from
		// converting line breaks to <div> and <br> tags
		document.execCommand('insertHTML', false, val);

		this._updateValue()

		this.dispatchEvent(new CustomEvent("pasted", {detail:eventDetail}));
	}
	
	get editorEl(){
		return this.input ? this._input : this._editor
	}
	
	select(range='all'){

		let el = this.editorEl,
		    s = window.getSelection(),
		    r = document.createRange(),
			end = el.childNodes.length;
		
		if( range == 'start' ){
			r.setStart(el, 0);
			r.setEnd(el, 0);
		}else if( range == 'end' ){
			r.setStart(el, end);
			r.setEnd(el, end);
		}else{
			r.selectNodeContents(el);
		}

		if( range.start )
			r.setStart(el, range.start);

		if( range.end )
			r.setEnd(el, range.end=='end'?end:range.end);
		
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

		// make sure to remove trailing <br> when deleting content
		if( e.key == 'Backspace' && this.isHTML ){
			setTimeout(()=>{
				if( this._editor.innerHTML == '<br>' )
					this._editor.innerHTML = ''
			})
		}

		if( e.key == 'Backspace' && this.isMultiline && this._editor.innerText.trim() == '' ){
			e.preventDefault()
			e.stopPropagation()
			return false
		}

		// Multiline Plain – only use newlines (keep divs/br from appearing)
		if( e.key == 'Enter' && this.isMultiline && this.isPlain ){
			e.preventDefault()
			e.stopPropagation()

			let charLen = this._editor.innerText.length
			let lastChar = this._editor.innerText[charLen-1]
			let sel = this.shadowRoot.getSelection()
			let range = sel.getRangeAt(0);

			if( range.endOffset < charLen || lastChar=='\n' )
				document.execCommand("insertHTML", false, '\n');
			else
				document.execCommand("insertHTML", false, '\n\n');
			
			return false
		}
		
		if( e.key == 'Enter' && (!this.isMultiline || e.metaKey || e.ctrlKey )){
			stop = true
			e.preventDefault()
			e.stopPropagation()

			// NOTE: will this be weird to not blur on enter?
			this._updateValue()
			// this.blur() // will trigger a change if there is one

			let detail = {
				shiftKey: e.shiftKey,
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
			}

			// Force change event for empty search/ re-search
			if( !this.value )
				this.dispatchEvent(new CustomEvent("change", {detail}));
			
			this.dispatchEvent(new Event("enterkey")); // DEPRECATED
			// I think this makes more sense
			this.dispatchEvent(new CustomEvent("submit", {detail, bubbles: true, composed: true,}));
		}
		
		if( e.key == 'Escape' ){
			this.value = this.value // reset the value
			this.blur()
			this.dispatchEvent(new Event("esckey"));
		}

		this._didPressKey = true

		let val = this.input ? this._input.value : this._editor.innerText
		stop = stopMaxLength(e, this, val)

		let delay = this.getAttribute('change-delay')
		clearTimeout(this._changeDelay)
		if( delay !== null ){
			delay = delay || 500
			this._changeDelay = setTimeout(this._updateValue.bind(this), delay)
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
			this.select('end')
	}

	_onBlur(){
		if( this._didPressKey )
			this._updateValue()
			
		delete this._didPressKey
	}
	
	_updateValue(){
		
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
