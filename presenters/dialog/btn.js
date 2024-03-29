import {css} from 'lit'
import Btn from '../../elements/btn'

const PRESETS = {
	'dismiss': {label: 'Dismiss', doesCancel:true},
	'cancel': {label: 'Cancel', doesCancel:true},
	'no': {label: 'No', doesCancel:true},
	'done': {label: 'Done'},
	'apply': {label: 'Apply', color: 'theme'},
    'undo': {label: 'Undo', color: 'theme'},
	'ok': {label: 'Okay', color: 'theme'},
    'skip': {label: 'Skip', color: 'theme'},
    'continue': {label: 'Continue', color: 'theme'},
	'yes': {label: 'Yes', color: 'theme'},
    'add': {label: 'Add', color: 'theme'},
	'save': {label: 'Save', color: 'theme'},
	'create': {label: 'Create', color: 'theme'},
    'send': {label: 'Send', color: 'theme'},
    'next': {label: 'Next', color: 'theme'},
    'open': {label: 'Open', color: 'theme'},
    'submit': {label: 'Submit', color: 'theme'},
    'upload': {label: 'Upload', color: 'theme'},
    'update': {label: 'Update', color: 'theme'},
    'import': {label: 'Import', color: 'theme'},
	'delete': {label: 'Delete', color: 'red'},
    'remove': {label: 'Remove', color: 'red'},
	'x': {label: '', icon:'close', doesCancel:true},
    '...': {label: '', icon:'dot-3'}
}

export function registerPreset(name, opts){
    PRESETS[name] = opts
}


customElements.define('b-dialog-btn', class extends Btn{

    static styles = [Btn.styles, css`
        :host(.spacer) {
            visibility: hidden;
            pointer-events: none;
            width: 0;
            margin-right: auto;
        }

        :host([block]) {
            width: 100%;
        }
    `]

    get isCancelBtn(){
        return this.opts?.doesCancel
    }

    get value(){
        return this.opts.value ?? this.opts.val ?? this.opts.label ?? this.opts.icon
    }

    // TEMP: backwards compat
    get val(){ return this.value }

    get label(){
        return this.opts.label
    }

    constructor(opts){
        super()

        if( typeof opts == 'string' ){

            if( opts == 'spacer' || opts == ' ' || opts == '' ){
                this.classList.add('spacer')
                return
            }

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
            text: true,
            block: false,
            size: '',
            order: null
        }, opts)
  
        this.tabIndex = 0
        this.setAttribute('class', this.opts.className)
        this.setAttribute('color', this.opts.color)
        this.setAttribute('icon', this.opts.icon)

        if( this.opts.size )
            this.setAttribute(this.opts.size, '')
        
        if( this.opts.text )
            this.setAttribute('clear', '')
        
        if( this.opts.block )
            this.setAttribute('block', '')

        if( this.opts.order )
            this.style.order = this.opts.order

        this.innerHTML = this.opts.label
    }
})

export default customElements.get('b-dialog-btn')