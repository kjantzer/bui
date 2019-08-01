// const store = require('util/store')

class FormHandler extends HTMLElement {
	
	constructor(){
		super()
		
		// bind context to functions
		this.onModelSync = this.onModelSync.bind(this)
		this.onModelChange = this.onModelChange.bind(this)
		this.onModelEdited = this.onModelEdited.bind(this)
		this.onEditorChange = this.onEditorChange.bind(this)
	}

	get noGridArea(){ return this.hasAttribute('no-grid-area') }
	
	get autoSave(){ return this.hasAttribute('autosave') }
	set autoSave(val){ val ? this.setAttribute('autosave', '') : this.removeAttribute('autosave') }

	get patchSave(){ return this.hasAttribute('patchsave') }
	set patchSave(val){ val ? this.setAttribute('patchsave', '') : this.removeAttribute('patchsave') }
	
	connectedCallback(){
		// TODO: change to `controls`?
		this.editors = Array.from(this.querySelectorAll('form-control[key], check-box[key], radio-group[key], text-field[key], select-field[key]'))
		this.editorsByKey = {}

		this.editors.forEach(el=>{
			let key = el.getAttribute('key')
			if( key ){
				this.editorsByKey[key] = el

				if( !this.noGridArea )
					el.style.gridArea = key
			}
		})

		if( this.disabled || this.hasAttribute('disabled') )
			this.disabled = true

		this.addEventListener('change', this.onEditorChange, true)

		this._updateEditors()
	}

	static get observedAttributes(){ return ['disabled'] }

	attributeChangedCallback(name, oldValue, newValue) {
		if( name == 'disabled' )
			this.disabled = newValue !== null
	}

	disconnectedCallback(){
		this.editors = []
		this.editorsByKey = {}
		this.model = null

		this.removeEventListener('change', this.onEditorChange)
	}

	get model(){ return this._model }
	set model(model){

		if( !model ){
			
			if( this.model ){
				this.model.off('sync', null, this)
				this.model.off('change', null, this)
				this.model.off('edited', null, this)
				delete this._model
			}

			return
		}

		if( model == this.model ) return

		this._model = model
		this.model._editedAttrs = this.model._editedAttrs || {}

		this.model.on('sync', this.onModelSync, this)
		this.model.on('change', this.onModelChange, this)
		this.model.on('edited', this.onModelEdited, this)

		this._updateEditors()
	}

	store(vals){
		let key = this.getAttribute('store')
		if( !key ) return undefined

		let data = store(key) || {}

		if( vals === undefined )
			return data

		data = Object.assign(data, vals)

		store(key, data)
	}

	storedValue(key, defaultVal=null){
		if( this.model )
			return this.model.has(key) ? this.model.get(key): defaultVal
		
		let data = this.store()
		return data ? data[key] : defaultVal
	}

	_updateEditors(){
		if( this.editors && (this.model || this.hasAttribute('store')) )
		this.editors.forEach(el=>{
			// set the value of each editor based on the value in the model
			let key = el.getAttribute('key')
			let val = this.storedValue(key)

			if( val && val._isAMomentObject )
				val = val.format(el.control._datePicker?el.control._datePicker.format:'MM/DD/YYYY')

			if( val !== undefined )
				el.value = val
		})
	}
	
	onModelSync(m, attrs, opts){
		let trigger = false
		
		// see if we need to clear any "edited" attributes
		for( let key in attrs ){
			if( m._editedAttrs && m._editedAttrs[key] !== undefined ){
				trigger = true
				delete m._editedAttrs[key]
			}
		}
		
		// if we cleared any edited attributes, trigger the change
		if( trigger )
			this.model.trigger('edited', this.model.isEdited(), this.model.editedAttrs())
	}
	
	onModelEdited(isEdited, editedAttrs){
		this.editors.forEach(el=>{
			if( editedAttrs[el.key] != undefined && !this.autoSave )
				el.setAttribute('unsaved', '')
			else
				el.removeAttribute('unsaved')
		})
	}
	
	onModelChange(m, opts={}){
		
		for( let key in m.changed ){
			
			// if changed value is different than edited value, clear the edited value
			if( m._editedAttrs && m._editedAttrs[key] && m._editedAttrs[key] != m.changed[key]){
				delete m._editedAttrs[key]
			}
			
			// set the editor with the new value
			if( this.editorsByKey[key] ){
				this.editorsByKey[key].value = m.changed[key]
				this.editorsByKey[key].removeAttribute('unsaved')
				
				// this causes problems with tracking "editedAttr"
				// if( m._origAttrs )
				// 	m._origAttrs[key] = m.changed[key]
			}
		}
	}
	
	onEditorChange(e){

		if( !e.detail ) return

		let m = this.model
		let el = e.target
		let key = el.getAttribute('key')
		let val = e.detail.value
		
		if( !key ) return
		
		let changes = {}
		changes[key] = val
		
		// optionally make other changes based on this change
		// TODO: think of a way to implement this again for the custom element?
		// if( this.opts.onEditorChange && this.opts.onEditorChange(m, changes, key, val) === false )
		// 	return

		// ugh, this is hacky and should be solved a better way
		if( el.control && el.control.type=='date' && val ){
			changes[key] = el.control._datePicker.formatted('YYYY-MM-DD')
		}

		this.store(changes)
		
		if( this.model ){
			if( this.autoSave === true ){
				this.model.save(changes, {patch:this.patchSave||false})
				this.model.trigger('edited', false, changes)
			}else{
				this.model.editAttr(changes)
			}
		}
	}
	
	get disabled(){ return this.__disabled || false }
	set disabled(disabled=false){
		this.__disabled = disabled === true
		this.editors&&this.editors.forEach(el=>el.disabled=this.__disabled)
	}

	get isInvalid(){
		return !!this.editors.find(el=>el.isInvalid)
	}
	
	focus(index=0){
		this.editors[index]&&this.editors[index].focus()
	}
	
	get(key){
		if( typeof key == 'number' )
			return this.editors[key]
			
		return Array.from(this.editors).find(ed=>ed.key==key)
	}
}

customElements.define('form-handler', FormHandler)

export default customElements.get('form-handler')