import Btn from '../../elements/btn'

const PRESETS = {
	'dismiss': {label: 'Dismiss', doesCancel:true},
	'cancel': {label: 'Cancel', doesCancel:true},
	'no': {label: 'No', doesCancel:true},
	'done': {label: 'Done'},
	'apply': {label: 'Apply', color: 'theme'},
    'undo': {label: 'Undo', color: 'theme'},
	'ok': {label: 'Okay', color: 'theme'},
    'continue': {label: 'Continue', color: 'theme'},
	'yes': {label: 'Yes', color: 'theme'},
	'save': {label: 'Save', color: 'theme'},
	'create': {label: 'Create', color: 'theme'},
    'submit': {label: 'Submit', color: 'theme'},
	'delete': {label: 'Delete', color: 'red'},
	'x': {label: '', icon:'cancel-1', doesCancel:true},
    '...': {label: '', icon:'dot-3'}
}

export function registerPreset(name, opts){
    PRESETS[name] = opts
}


customElements.define('b-dialog-btn', class extends Btn{

    get isCancelBtn(){
        return this.opts.doesCancel
    }

    get value(){
        return this.opts.value || this.opts.label || this.opts.icon
    }

    get label(){
        return this.opts.label
    }

    constructor(opts){
        super()

        if( typeof opts == 'string' ){

            if( !PRESETS[opts] )
                opts = {
                    label: opts,
                    value: opts
                }
            else{
                let value = opts
                opts = PRESETS[opts]
                opts.value = value
            }
        }
        
        this.opts = Object.assign({
            label: '',
            className: '',
            color: '',
            icon: '',
            text: true
        }, opts)
  
        this.tabIndex = 0
        this.setAttribute('class', this.opts.className)
        this.setAttribute('color', this.opts.color)
        this.setAttribute('icon', this.opts.icon)
        
        if( this.opts.text )
            this.setAttribute('clear', '')

        this.innerHTML = this.opts.label
    }
})

export default customElements.get('b-dialog-btn')