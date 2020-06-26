import { render, html } from "lit-html";
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import {normalizeText, htmlCleaner} from '../../../../util'
import Menu from '../../../menu'
import styles from './style'
import {Quill, lineBreakMatcher, keyboardLinebreak} from './quill'

class RichTextField extends HTMLElement {

    connectedCallback(){
        if( !this.__firstUpdated ){
            this.__firstUpdated = true
            this.firstUpdated()
        }

        let root = this.getRootNode()
        if( root && root instanceof ShadowRoot ){
            // console.warn('<rich-text-field> does not work properly in the shadow dom')
        }

        this.setStateAttributes()
    }

    get disabled(){ return this.__disabled || false }
    set disabled(val){
        this.__disabled = Boolean(val)
        if( this.quill )
            this.__disabled ? this.quill.disable() : this.quill.enable()
    }

    // TODO: add an opt out feature?
    normalizeText(str){
        return normalizeText(str)
    }

    get value(){
        return this.quill ? this.normalizeText(this.quill.root.innerHTML) : this.__value
    }

    set value(html){
        html = html || ''

        // NOTE: okay to always do this here? its the same as in copy/paste above
        html = htmlCleaner.clean(html)
        html = this.normalizeText(html)

        this.__value = html
        if( !this.quill ) return

        // NOTE: we hide the "contenteditable" so that the browser does not "focus"
        // on the element (which can cause views to scroll to the last focused editor)
        // see https://github.com/quilljs/quill/issues/2156 and https://github.com/quilljs/quill/issues/2415
        this.quill.root.hidden = true
        
        this.__settingValue = true
        this.quill.root.innerHTML = ''
        this.quill.clipboard.dangerouslyPasteHTML(0, html, 'silent') // silent or something different?
        this.__settingValue = false
        this.blur()

        // this.quill.root.innerHTML = html
        this.setStateAttributes()

        this.quill.root.hidden = false
        this.setStateAttributes()
    }

    get dbValue(){
        return this.isEmpty ? '' : this.value
    }

    html(){ return html`
        <style>${styles.cssText}</style>
        <textarea class="view-source"></textarea>
        <main class="ql-editor">${this.__value?unsafeHTML(this.__value):''}</main>
        <toolbar>
            <b-btn tabindex=0 format="bold" text @click=${this.format} icon="bold"></b-btn>
            <b-btn tabindex=0 format="italic" text @click=${this.format} icon="italic"></b-btn>
            <b-btn tabindex=0 format="align" value="center" text @click=${this.format} title="Center align" icon="paragraph-center"></b-btn>
            <b-btn tabindex=0 format="list" value="ordered" text @click=${this.format} icon="list-numbered"></b-btn>
            <b-btn tabindex=0 format="list" value="bullet" text @click=${this.format} icon="list2"></b-btn>
            <!-- <b-btn tabindex=0 @click=${this.insertDivider} text icon="minus"></b-btn> -->
            <b-btn tabindex=0 @click=${this.insertSpecial} text icon="quote-right"></b-btn>
            <!-- <b-btn tabindex=0 @click=${this.toggleSource} text icon="code" title="Toggle source code"></b-btn> -->
        </toolbar>
    `}

    toggleSource(){
        let src = this.querySelector('textarea.view-source')
        let main = this.querySelector('main')

        if( this.hasAttribute('view-source') ){
            this.removeAttribute('view-source')
            src.style.height = 0
            // this.value = src.value
            src.value = ''
        }else{
            src.style.height = main.offsetHeight
            this.setAttribute('view-source', '')
            src.value = this.value
        }
    }

    async insertDivider(e){
        // this.insertHTML('<hr>', false)

        var range = this.quill.getSelection(true);
        console.log(range);
        if (range) {
            // insert the <hr> where the cursor is
            this.quill.insertText(range.index, '\n', Quill.sources.USER);
            this.quill.insertEmbed(range.index+1, 'divider', true, Quill.sources.USER)
            this.quill.setSelection(range.index + 2, Quill.sources.SILENT); // focus after divider
        }
    }

    async insertSpecial(e){
        let menu = [
            {label: '“ Quote Left', val: "“"},
            {label: '” Quote Right', val: "”"},
            {label: '‘ Single Quote Left', val: "‘"},
            {label: '’ Single Quote Right', val: "’"},
            {label: '— Em-Dash', val: "—"},
            {label: '— En-Dash', val: "–"},
            {label: '… Ellipsis', val: "…"}
        ]

        let selected = await new Menu(menu).popover(e.target, {align: 'bottom-end'})

        if( selected ){
            this.insertText(selected.val)
        }
    }

    insertText(str){
        this.quill.focus()
        let range = this.quill.getSelection()
        this.quill.insertText(range.index, str, 'user')
        this.quill.setSelection(range.index+str.length, 'silent')
    }

    insertHTML(html, clean=true){
        this.quill.clipboard.insertHTML(html, clean)
    }

    focus(){ this.quill.focus() }
    blur(){ this.quill.blur() }

    selectAll(){
        this.quill.setSelection(0, this.quill.getText().length)
    }

    format(e){
        
        e.preventDefault()
        
        let btn = e.currentTarget
        let format = btn.getAttribute('format')
        let val = btn.getAttribute('value') || true

        if( btn.classList.contains('active') )
            val = false

        // console.log(format, val);
        
        this.quill.format(format, val)
    }

    render(){
        render(this.html(), this, {eventContext: this})
    }

    firstUpdated(){

        this.render()

        this.main = this.querySelector('main')
        this.toolbar = this.querySelector('toolbar')
        
        this.quill = new Quill(this.main, {
            // TODO: allow to be customized
            formats: ['bold', 'italic', 'align', 'list', 'break'], // , 'divider'
            placeholder: this.getAttribute('placeholder') || '',
            modules: {
                clipboard: {
                    matchers: [
                        ['BR', lineBreakMatcher] 
                    ]
                },
                keyboard: {
                    bindings: {
                        linebreak: keyboardLinebreak
                    }
                }
            }
        });

        // https://codepen.io/mackermedia/pen/gmNwZP
        var length = this.quill.getLength()
        var text = this.quill.getText(length - 2, 2)

        // Remove extraneous new lines
        if (text === '\n\n') {
            this.quill.deleteText(this.quill.getLength() - 2, 2)
        }

        if( this.disabled )
            this.disabled = this.disabled

        this.quill.root.addEventListener('focus', this._onFocus.bind(this))
        this.quill.root.addEventListener('blur', this._onBlur.bind(this))

        this.quill.on(Quill.events.EDITOR_CHANGE, (type, range) => {
            if (type === Quill.events.SELECTION_CHANGE) {
                this.updateToolbar(range);
            }

            if( type === Quill.events.TEXT_CHANGE && !this.__settingValue ){
                this.dispatchEvent(new Event('text-change'))
            }
        }, this);

        this.quill.on(Quill.events.SCROLL_OPTIMIZE, () => {
            let [range, ] = this.quill.selection.getRange();  // quill.getSelection triggers update
            this.updateToolbar(range);
        }, this);
    }

    get characterCount(){
        return this.quill ? this.quill.root.innerText.length : 0
    }

    _onFocus(){

        if( this.__settingValue ) return

        if( !this._blurDelay ){
            this._origVal = this.value
        }
        
        clearTimeout(this._blurDelay)
        this._blurDelay = null
    }

    _onBlur(){

        if( this.__settingValue ) return

        if( !this._blurDelay ){
            this._blurDelay = setTimeout(()=>{
                this._onBlur()
                this._blurDelay = null
            }, 100)
            return
        }

        if( this._cleaningFromBlur ) return
        
        this._cleaningFromBlur = true

        // not "empty" but effectively is empty, so make it so
        if( !this.isEmpty && this.quill.root.innerText.trim() == '' ){
            this.value = ''
            this.blur()
        }

        this.setStateAttributes()

        let val = this.value

        this._cleaningFromBlur = false

        if( this._origVal != val ){
            var event = new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: {
                    value: val,
                    oldVal: this._origVal
                }
            });
            
            this.dispatchEvent(event)
        }
    }

    get isEmpty(){
        return !this.value || this.value === '<p><br></p>'
    }

    setStateAttributes(){
        if( this.isEmpty )
            this.setAttribute('empty', '')
        else
            this.removeAttribute('empty')
    }

    updateToolbar(range){
        let formats = range == null ? {} : this.quill.getFormat(range);

        // console.log(formats);

        this.toolbar.querySelectorAll('[format]').forEach(el=>{

            let format = el.getAttribute('format')

            if( formats[format] && (el.value == undefined || el.value == formats[format]) )
                el.classList.add('active')
            else
                el.classList.remove('active')

        })
    }
}

customElements.define('rich-text-field', RichTextField)

export default customElements.get('rich-text-field')