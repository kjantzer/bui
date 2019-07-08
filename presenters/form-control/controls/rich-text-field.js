import { render, html } from "lit-html";
import {css} from 'lit-element'
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import {htmlCleaner} from 'util'
import Menu from '../../menu'

import Quill from 'quill/core';
import Toolbar from 'quill/modules/toolbar';
import Clipboard from 'quill/modules/clipboard';
import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Header from 'quill/formats/header';
import Blockquote from 'quill/formats/blockquote';
import List, { ListItem } from 'quill/formats/list';
const Delta = Quill.import('delta')
// const BlockEmbed = Quill.import('blots/block/embed');

// helpful: https://github.com/quilljs/quill/issues/1184#issuecomment-403657128
class BUIClipboard extends Clipboard {
    onPaste (e) {
        e.preventDefault()
        const dirtyHtml = e.clipboardData.getData('text/html')
        this.insertHTML(dirtyHtml, true)
    }

    insertHTML(html, clean=true){
        const range = this.quill.getSelection()
        
        html = htmlCleaner.clean(html)

        // delete any contents the user has selected
        const delta = new Delta()
            .retain(range.index)
            .delete(range.length)

        this.quill.updateContents(delta, 'silent')
        this.quill.setSelection(range.index, 0, 'silent')

        // paste the cleaned html
        this.dangerouslyPasteHTML(range.index, html, 'user')
    }
}

// https://quilljs.com/guides/cloning-medium-with-parchment/#dividers
// class DividerBlot extends BlockEmbed { }
// DividerBlot.blotName = 'hr';
// DividerBlot.tagName = 'hr';
// Quill.register(DividerBlot);

Quill.register({
  'modules/toolbar': Toolbar,
  'modules/clipboard': BUIClipboard,
  'formats/bold': Bold,
  'formats/italic': Italic,
  'formats/header': Header,
  'formats/blockquote': Blockquote,
  'formats/list': List,
  'formats/list-item': ListItem,
//   'formats/hr': DividerBlot
});


const styles = css`
rich-text-field {
	z-index: 1000;
}

rich-text-field[serif] main {
    font-family: Garamond;
    font-size: 1.1em;
}

rich-text-field main {
    min-width: 1em;
    line-height: 1.3em;
    margin: -.15em 0; /* make up for the line height */
}

rich-text-field main ul {
    list-style: disc;
}

rich-text-field main ul,
rich-text-field main ol {
    margin: .5em 0 .5em 1.5em;
    padding: 0;
}

rich-text-field .ql-editor {
    outline: none;
}

rich-text-field .ql-editor > p {
    margin: 0;
}

rich-text-field .ql-editor > p:not(:last-child) {
    margin-bottom: .75em;
}

rich-text-field toolbar {
    font-size: .8em;
    position: absolute;
    display: flex;
    background: #fff;
    box-shadow: rgba(0,0,0,.1) 0 1px 3px;
    border-radius: 3px;
    top: -1em;
    right: 0;
    transform: translate(.5em, -50%);
    user-select: none;
    visibility: hidden;
    opacity: 0;
}

rich-text-field toolbar * {
    outline: none;
}

rich-text-field toolbar b-btn.active {
    --color: var(--blue);
}

rich-text-field .ql-clipboard {
    display: none;
}

form-control.nolabel rich-text-field toolbar {
	top: 0;
}

rich-text-field:focus-within toolbar {
	opacity: 1;
	visibility: visible;
}
`


class RichTextField extends HTMLElement {

    connectedCallback(){
        if( !this.__firstUpdated ){
            this.__firstUpdated = true
            this.firstUpdated()
        }

        let root = this.getRootNode()
        if( root && root instanceof ShadowRoot ){
            console.warn('<rich-text-field> does not work properly in the shadow dom')
        }

        this.setStateAttributes()
    }

    get disabled(){ return this.__disabled || false }
    set disabled(val){
        this.__disabled = Boolean(val)
        if( this.quill )
            this.__disabled ? this.quill.disable() : this.quill.enable()
    }

    get value(){
        return this.quill ? this.quill.root.innerHTML : this.__value
    }

    set value(html){
        html = html || ''
        this.__value = html
        if( !this.quill ) return

        this.quill.root.innerHTML = html
        this.setStateAttributes()

        // NOTE: we hide the "contenteditable" so that the browser does not "focus"
        // on the element (which can cause views to scroll to the last focused editor)
        // see https://github.com/quilljs/quill/issues/2156 and https://github.com/quilljs/quill/issues/2415
        // this.quill.root.hidden = true
        // this.quill.removeFormat(0, this.quill.getText().length, 'silent')
        // this.selectAll()
        // this.insertHTML(html)
        // this.quill.root.hidden = false
        // this.setStateAttributes()
    }

    get dbValue(){
        return this.isEmpty ? '' : this.value
    }

    html(){ return html`
        <style>${styles.cssText}</style>
        <main>${this.__value?unsafeHTML(this.__value):''}</main>
        <toolbar>
            <b-btn tabindex=0 format="bold" text @click=${this.format} icon="bold"></b-btn>
            <b-btn tabindex=0 format="italic" text @click=${this.format} icon="italic"></b-btn>
            <b-btn tabindex=0 format="list" value="ordered" text @click=${this.format} icon="list-numbered"></b-btn>
            <b-btn tabindex=0 format="list" value="bullet" text @click=${this.format} icon="list2"></b-btn>
            <!--<b-btn tabindex=0 @click=${this.insertDivider} text icon="minus"></b-btn>-->
            <b-btn tabindex=0 @click=${this.insertSpecial} text icon="quote-right"></b-btn>
        </toolbar>
    `}

    // hmmm...not working
    async insertDivider(e){
        // this.insertHTML('<hr>', false)

        var range = this.quill.getSelection();
        if (range) {
            // insert the <hr> where the cursor is
            this.quill.insertEmbed(range.index,"hr","null")
        }

        // let range = this.quill.getSelection(true);
        // this.quill.insertText(range.index, '\n', 'user');
        // this.quill.insertEmbed(range.index + 1, 'hr', true, 'user');
        // this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
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

        // "ə": {title: "ə - banana, alone", callback: insertSpecialCharacter},
        // "ər": {title: "ər - further, bird", callback: insertSpecialCharacter},
        // "î": {title: "î - fear, pier", callback: insertSpecialCharacter},
        // "ā": {title: "ā - cape, aorta", callback: insertSpecialCharacter},
        // "ī": {title: "ī - site, ice", callback: insertSpecialCharacter},
        // "ä": {title: "ä - cot, father", callback: insertSpecialCharacter},
        // "â": {title: "â - dare, hair", callback: insertSpecialCharacter},
        // "ü": {title: "ü - rule, boot", callback: insertSpecialCharacter},
        // "ú": {title: "ú - wood, book", callback: insertSpecialCharacter},
        // "ē": {title: "ē - beat, equal", callback: insertSpecialCharacter},
        // "ō": {title: "ō - bone, over", callback: insertSpecialCharacter},
        // "ό": {title: "ό - saw, gnaw", callback: insertSpecialCharacter},

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
            placeholder: 'Placeholder?',
            formats: ['bold', 'italic', 'list'],
            modules: {}
        });

        if( this.disabled )
            this.disabled = this.disabled

        this.quill.root.addEventListener('focus', this._onFocus.bind(this))
        this.quill.root.addEventListener('blur', this._onBlur.bind(this))

        this.quill.on(Quill.events.EDITOR_CHANGE, (type, range) => {
            if (type === Quill.events.SELECTION_CHANGE) {
                this.updateToolbar(range);
            }
        }, this);

        this.quill.on(Quill.events.SCROLL_OPTIMIZE, () => {
            let [range, ] = this.quill.selection.getRange();  // quill.getSelection triggers update
            this.updateToolbar(range);
        }, this);
    }

    _onFocus(){

        if( !this._blurDelay ){
            this._origVal = this.value
        }
        
        clearTimeout(this._blurDelay)
        this._blurDelay = null
    }

    _onBlur(){

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