import store from '../../util/store'
import '../../helpers/backbone/promises'

class FormHandler extends HTMLElement {
	
	constructor(){
		super()

		this.controlsByKey = {}
		
		// bind context to functions
		this.onModelSync = this.onModelSync.bind(this)
		this.onModelChange = this.onModelChange.bind(this)
		this.onModelEdited = this.onModelEdited.bind(this)
		this.onEditorChange = this.onEditorChange.bind(this)
	}

	get autoGridArea(){ return this.hasAttribute('auto-grid-area') }
	
	get autoSave(){ return this.hasAttribute('autosave') }
	set autoSave(val){ val ? this.setAttribute('autosave', '') : this.removeAttribute('autosave') }

	get patchSave(){ return this.hasAttribute('patchsave') || this.getAttribute('autosave') == 'patch' }
	set patchSave(val){ val ? this.setAttribute('patchsave', '') : this.removeAttribute('patchsave') }
	
	connectedCallback(){

		let host = this.getRootNode().host
		if( host && !host.formHandler )
			host.formHandler = this

		// allow for nested custom elements to render first
		setTimeout(()=>{
			this.bindControls()
		},0)
	}
	
	get values(){
		let vals = {}
		this.controls.forEach(control=>{
			if( control.key ){
				let val = control.dbValue // text-field
				if( val === undefined )
					val = control.value // others
				vals[control.key] = val
			}
		})
		return vals
	}

	set values(vals={}){

		if( !this.controls )
			return this._values = vals

		this.controls.forEach(control=>{
			if( control.key && vals[control.key] != undefined ){
				control.value = vals[control.key]
			}
		})

		this.setControlIfs()
		this.store(vals)
	}

	bindControls(){
		// TODO: change to `controls`?
		this.controls = this.editors = Array.from(this.querySelectorAll('form-control[key], check-box[key], radio-group[key], text-field[key], select-field[key]'))

		this.controls.forEach(el=>{
			let key = el.getAttribute('key')
			if( key ){
				this.controlsByKey[key] = el

				if( this.autoGridArea )
					el.style.gridArea = key

				if( this._values && this._values[key] )
					el.value = this._values[key]
			}
		})

		delete this._values

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
		this.controls = this.editors = []
		this.controlsByKey = {}
		this.model = null

		this.removeEventListener('change', this.onEditorChange)
	}

	get model(){ return this._model }
	set model(model){

		if( model == this.model ) return

		if( this.model ){
			this.model.off('sync', null, this)
			this.model.off('change', null, this)
			this.model.off('edited', null, this)
			delete this._model
		}

		if( !model ) return

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
		if( this.model ){
			let val = this.model.has(key) ? this.model.get(key): defaultVal
			if( val && val.id ) val = val.id // child-models
			return val
		}
		
		let data = this.store()
		return data ? data[key] : defaultVal
	}

	_updateEditors(){
		if( this.controls && (this.model || this.hasAttribute('store')) ){

			this.controls.forEach(el=>{
				// set the value of each editor based on the value in the model
				let key = el.getAttribute('key')
				let val = this.storedValue(key)

				// dayjs/moment.js object would have .format()
				if( val && val.format ){

					if( el.tagName == 'CHECK-BOX' )
						val = val.isValid()
				}

				if( val !== undefined )
					el.value = val
			})

			this.setControlIfs()

		}
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
		this.controls.forEach(el=>{
			if( editedAttrs[el.key] != undefined && !this.autoSave )
				el.setAttribute('unsaved', '')
			else
				el.removeAttribute('unsaved')
		})

		if( !isEdited )
			this.setControlIfs()
	}
	
	onModelChange(m, opts={}){
		
		for( let key in m.changed ){
			
			// if changed value is different than edited value, clear the edited value
			if( m._editedAttrs && m._editedAttrs[key] && m._editedAttrs[key] != m.changed[key]){
				delete m._editedAttrs[key]
			}
			
			// set the editor with the new value
			if( this.controlsByKey[key] ){
				this.controlsByKey[key].value = m.changed[key]
				this.controlsByKey[key].removeAttribute('unsaved')
				
				// this causes problems with tracking "editedAttr"
				// if( m._origAttrs )
				// 	m._origAttrs[key] = m.changed[key]
			}
		}
	}
	
	async onEditorChange(e){

		if( !e.detail ) return

		let m = this.model
		let el = e.target
		let key = el.getAttribute('key')
		let val = e.detail.value
		
		if( !key ) return

		e.stopPropagation()
		
		let changes = {}
		changes[key] = val
		
		if( this.validateChange && await this.validateChange(m, changes, key, val) === false ){
			el.value = changes[key] !== undefined ? changes[key] : el.value
			return
		}

		// optionally make other changes based on this change
		// TODO: think of a way to implement this again for the custom element?
		// if( this.opts.onEditorChange && this.opts.onEditorChange(m, changes, key, val) === false )
		// 	return
		// if other changes where made from validate, propagate to other controls
		if( this.validateChange )
		for( let _key in changes ){
			if( _key != key ){
				let _el = this.get(_key)
				if( _el ) _el.value = changes[_key]
			}
		}

		// ugh, this is hacky and should be solved a better way
		if( el.control && el.control.type=='date' && val ){
			changes[key] = el.dbValue
		}

		this.store(changes)
		
		if( this.model ){
			if( this.autoSave === true ){
				this.model.saveSync(changes, {patch:this.patchSave||false})
				this.model.trigger('edited', false, changes)
				this.model.trigger('saved', changes)
			}else{
				this.model.editAttr(changes)
			}
		}

		this.setControlIfs(key)

		this.onChange&&this.onChange(changes)
	}

	setControlIfs(ifKey){

		let toggleTypes = Object.keys(toggleIf)

		this.controls.forEach(control=>{

			toggleTypes.forEach(toggleKey=>{

				// skip controls that dont need testing
				if( !control[toggleKey] ) return

				let valid = true

				if( typeof control[toggleKey] == 'function' ){

					valid = control[toggleKey](this, control)

				}else{

					if( ifKey && control[toggleKey][ifKey] === undefined ) return
					
					for( let key in control[toggleKey] ){

						let allowedVal = control[toggleKey][key]
						
						// prefer the model, but 
						let val = this.model ? this.model.get(key) : this.get(key).value

						if( Array.isArray(allowedVal) ){
							if( !allowedVal.includes(val) )
								valid = false
						}else{
							if( allowedVal != val )
								valid = false
						}
					}
				}

				toggleIf[toggleKey](control, valid)

			})

		})
	}
	
	get disabled(){ return this.__disabled || false }
	set disabled(disabled=false){
		this.__disabled = disabled === true
		this.controls&&this.controls.forEach(el=>el.disabled=this.__disabled)
	}

	get isInvalid(){
		return !!this.controls.find(el=>el.isInvalid)
	}
	
	focus(index=0){
		this.controls[index]&&this.controls[index].focus()
	}
	
	get(key){
		if( typeof key == 'number' )
			return this.controls[key]
		
		if( !this.controls ) return
		return Array.from(this.controls).find(ed=>ed.key==key)
	}
}

customElements.define('form-handler', FormHandler)

export default customElements.get('form-handler')


const toggleIf = {
	displayIf(control, valid){
		if( valid )
			control.hidden = false
		else
			control.hidden = true
	},
	hideIf(control, valid){
		if( valid )
			control.hidden = true
		else
			control.hidden = false
	},
	disableIf(control, valid){
		if( valid )
			control.disabled = true
		else
			control.disabled = false
	},
	enableIf(control, valid){
		if( valid )
			control.disabled = false
		else
			control.disabled = true
	}
}
