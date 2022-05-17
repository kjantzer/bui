import { LitElement, html, css } from 'lit'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { KeyboardEvents } from './keyboard-events'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Superscript from '@tiptap/extension-superscript'
import CharacterCount from '@tiptap/extension-character-count'
import Typography from '@tiptap/extension-typography'
import TypographyPaste from './typography-paste'
import './menubar'
import style from './style'

customElements.define('text-editor', class extends LitElement{

    static get properties(){return {
        menubar: {type: Boolean},
        disabled: {type: Boolean, reflect: true},
        placeholder: {type: String},
        maxchar: {type: Number}
    }}

    static get styles(){return [style, css`
        :host {
            display: block;
            position:relative;
        }

        :host([disabled]) b-text-editor-menubar {
            pointer-events: none;
        }

    `]}

	set extensions(extension){
		if( !Array.isArray(extension) )
			extension = [extension]
		this.__extensions = extension
	}

	get extensions(){ return this.__extensions || []}

    connectedCallback(){
        super.connectedCallback()

        clearTimeout(this._cleanupTimeout)
        if( this.editor ) return

        this.editor = new Editor({
            extensions: [
                StarterKit,
                Placeholder,
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                    alignments: ['left', 'center'],
                }),
                Superscript,
                Typography,
                TypographyPaste,
                // SmartCharacterReplacer,
                KeyboardEvents,
                CharacterCount.configure({
                    limit: this.maxchar||0,
                }),
				...this.extensions
            ],
            editorProps: {
                attributes: {
                    part: 'content'
                }
            },
            editable: !this.disabled,
            injectCSS: false,
            content: this.__val||'', // .value may have been set before we get here
            onUpdate: this.onEditorUpdate.bind(this),
            onBlur: this.onBlur.bind(this)
        })

        this.editor.textEditor = this

        setTimeout(()=>{
            this.shadowRoot.querySelector('main').prepend(this.editor.options.element)
            if( this.menubar )
                this.shadowRoot.querySelector('b-text-editor-menubar').editor = this.editor
        })

        this.toggleAttribute('empty', this.isEmpty)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        // delay cleanup in case quickly reconnected
        this._cleanupTimeout = setTimeout(()=>{
            this.editor.textEditor = null
            this.editor.destroy()
            delete this.editor
        },10)
    }

    render(){return html`
        <main></main>
        ${this.menubar?html`
            <b-text-editor-menubar part="menubar" .editor=${this.editor} 
            ?disabled=${this.disabled} maxchar=${this.maxchar}>
                <slot name="menubar:left" slot="left"></slot>
                <slot name="menubar:right" slot="right"></slot>
            </b-text-editor-menubar>
        `:''}
    `}

    focus(){
        this.editor.commands.focus()
    }

    selectAll(){
        this.editor.commands.selectAll()
    }

    blur(){
        this.editor.commands.blur()
    }

    onBlur(){
         
        var event = new CustomEvent('change', {
			bubbles: true,
			composed: true,
			detail: {
				value: this.value,
			}
		});

        this.dispatchEvent(event)
    }

    get value(){
        if( this.isEmpty ) return ''
        return this.__val = this.editor ? this.editor.getHTML() : (this.__val||'')
    }

    set value(val){
        this.__val = val
        if( this.editor )
            this.editor.commands.setContent(val)
        
        this.toggleAttribute('empty', this.isEmpty)
    }

    

    copy(){
        this.focus()
        this.selectAll()
        setTimeout(() => {
            document.execCommand("copy")
            this.blur()    
        });
    }

    get characterCount(){
        return this.editor.getCharacterCount()
    }

	get textValue(){
		if( this.isEmpty ) return ''
        return this.editor.getText({blockSeparator: `\n\n`})
	}

    get isEmpty(){
        return !this.editor||this.editor.isEmpty
    }

    onEditorUpdate(){
        this.toggleAttribute('empty', this.isEmpty)

        this.dispatchEvent(new Event('text-change'))
    }

    set placeholder(val){
        let oldVal = this.placeholder
        this.__placeholder = val
        this.requestUpdate('placeholder', oldVal)
        if( val )
            this.style.setProperty('--placeholder', `'${val}'`)
        else
            this.style.removeProperty('--placeholder')
    }
    
    get placeholder(){ return this.__placeholder}

    set disabled(val){
        let oldVal = this.disabled
        this.__disabled = val
        this.requestUpdate('disabled', oldVal)
        this.editor&&this.editor.setEditable(!val)
    }
    
    get disabled(){ return this.__disabled}

})
