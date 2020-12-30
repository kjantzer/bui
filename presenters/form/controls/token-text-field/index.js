import { LitElement, html, css } from 'lit-element'
import '../../../../helpers/lit-element/events'
import '../../../../helpers/lit-element/selectors'
import './token'
import autoComplete from './auto-complete'
import ContentEditableHistory from './history'

const DEFAULT_OPTS = {
    autoComplete: {
        minLength: 3,
        allResults: '@' // set to null to disable feature
    },
    allowPaste: false,
    allowStyling: false,	// bold/italics keyboard shorcuts
}

function metaKey(e){
    e = e || event;
    return e && (e.ctrlKey || e.altKey || e.metaKey);
}

customElements.define('token-text-field', class extends LitElement{

    static get properties(){return {
        disabled: {type: Boolean, reflect: true},
        key: {type: String},
        value: {type: Object},
        lines: {type: Number, reflect: true},
        tokenName: {type: String, attribute: 'token-name'},
        tokens: {type: Array},
        placeholder: {type: String, reflect: true}
    }}

    static get styles(){return css`
        :host {
            display: block;
            position: relative;
            min-height: 1em;
            --line-height: var(--token-text-field-line-height, 1em);
            line-height: var(--line-height);

            min-width: 120px;
            border-color: gray;
        }

        :host([disabled]) {
            user-select: none;
        }

        :host(:not([disabled])) ::selection,
        :host(:not([disabled])) main ::selection {
            background: var(--selectionBgd, #FFF8E1);
        }

        main {
            min-height: var(--line-height);
            outline: none;
            padding: var(--token-text-field-padding, 0);
        }

        main[contenteditable] {
            cursor: text;
        }

        :host([showlines]) main:not([contenteditable]) br:not(:last-child) {
            content: '';
            display: block !important;
            height: 1px !important;
            min-height: 0 !important;
            margin: .15em 0 0;
            border-top: dashed 1px rgba(var(--theme-text-rgb), .15);
        }

        .token {
            user-select: auto;
            /* make it easier to see caret */
            margin-left: 1px;
            margin-right: 1px;
        }


        /* br:nth-of-type(1) ~ .token {
            --bgd: var(--token-color-line2, var(--theme));
        } */

        main:not([contenteditable]) .token {
            --bgd: var(--theme-bgd-accent, #eee);
            color: inherit;
        }

        .token {
            font-size: 1em;
            margin-top: -.15em;
            margin-bottom: .15em;
            font-weight: normal;
            vertical-align: baseline;
            line-height: var(--token-font-size, .9em);
        }

        .token > span {
            font-size: var(--token-font-size, .9em);
        }

        .placeholder {
            display: block;
            margin-bottom: calc(-1 * var(--line-height));
            pointer-events: none;
            min-height: var(--line-height);
            opacity: 0;
            visibility: hidden;
        }

        :host([empty]) .placeholder {
            opacity: 1;
            visibility: visible;
        }
    `}

    constructor(){
        super()

        this.disabled = false
        this.lines = 999 // effectively no limit
        this.tokens = []
        this.value = ''

        this.options = Object.assign({}, DEFAULT_OPTS, this.options||{});

        this.history = new ContentEditableHistory({
            capture:()=>{
                return {
                    caret: this.getSelection(),
                    content: this.main.innerHTML
                }
            },
            apply:(hist)=>{
                // console.log('apply:', hist.caret.start, hist.caret.end);
                this.main.innerHTML = hist.content;
                this.setSelection(hist.caret.start, hist.caret.end)
            }
        })
    }

    firstUpdated(){
        // if a value was given at init, set it now
        // we dont do this in the `render` function as we dont
        // want to update the innerHTML on every render
        this.main.innerHTML = this._value
    }

    get main(){ return this.$$('main') }

    render(){return html`
        <b-text muted class="placeholder">${this.placeholder}</b-text>
        <main 
            ?contenteditable=${!this.disabled}
            @click=${this.onClick}
            @contextmenu=${this.onContextmenu}
            @keydown=${this.onKeydown}
            @keyup=${this.onKeyup}
            @keypress=${this.onKeypress}
            @paste=${this.onPaste}
        ></main>
        
    `}

    set value(val){
        var html = typeof val == 'string' ? val : this.jsonToHTML(val)

        if( !html.match(/<br>$/) )
            html += '<br>'

        if( this.main )
            this.main.innerHTML = html;
        else
            this._value = html

        html&&html!='<br>' ? this.removeAttribute('empty') : this.setAttribute('empty', '')
    }
    
    get value(){ return this.toJSON() }
    get htmlValue(){ return this.main ? this.main.innerHTML.replace(/<br>$/, '') : this._value }

    makeToken(d){
        if( !d ) return;
        
        let tokenName = this.tokenName
        if( !tokenName || !customElements.get(tokenName) )
            tokenName = 'token-text-field-token'

        var node = document.createElement(tokenName);
        node.setAttribute('filled', 'theme')
        node.contentEditable = false;
        node.classList.add('token');

        for( let key in d.attrs ){
            node.setAttribute('data-'+key, d.attrs[key]);
        }

        var label = document.createElement('span');
        label.innerHTML = d.label;
        node.appendChild(label)

        return node.outerHTML
    }

    replaceWithToken(token){

        this.history.cancelMark()

        var sel = this.shadowRoot.getSelection(),
            range = sel.getRangeAt(0),
            text = range.endContainer.textContent.slice(0, range.endOffset ),
            lastSpace = text.lastIndexOf(' ') > -1 ? text.lastIndexOf(' ') : text.lastIndexOf(' '),
            word = lastSpace > -1 ? text.slice(lastSpace+1) : text;

        // delete the word the user was typing so we can replace it with a token
        range.setStart(range.endContainer, lastSpace+1);
        range.deleteContents();

        // added to keep space before range from being removed
        // not sure why this works..but seems to on Chrome
        let nonBreakSpace = document.createTextNode("\u00A0")
        range.insertNode(nonBreakSpace)

        if( token ){
            this.insertHTML( this.makeToken(token) )
            // TODO: implement this? not needed atm
            // this.emitEvent('token-insert', {token: null})
        }

        nonBreakSpace.remove()
    }

    currentWord(){

        var sel = this.shadowRoot.getSelection(),
            range = sel.getRangeAt(0);

        if( range.endContainer == this.main
        || !range.endContainer.textContent ) return [];

        var text = range.endContainer.textContent.slice(0, range.endOffset ),
            lastSpace = text.lastIndexOf(' ') > -1 ? text.lastIndexOf(' ') : text.lastIndexOf(' '),
            word = lastSpace > -1 ? text.slice(lastSpace+1) : text;

        return [word, text];
    }

    onPaste(e){
        if( this.options.allowPaste != true ){
            e.preventDefault(); // disable pasting so we dont have to do style cleanup
            return false;
        }else{
            // TODO: use util/htmlCleaner?
            this.history.markAfterDelay(0);
        }
    }

    onKeydown(e){

        if( e.key == 'Backspace' ){
            this.deleteTokenIfSelected();
        }
        
        if( ['ArrowLeft', 'ArrowRight'].includes(e.key) ){
            this.moveCursorIfTokenSelected(e.which)
        }

        if( e.key === 'Escape' ){
            return;
        }

        // disable style commands like bold an italic
        if( metaKey(e) && (e.keyCode === 66 /* bold */ || e.keyCode === 73 /* italics */)){

            if( this.options.allowStyling !== true ){
                e.preventDefault()
                e.stopPropagation()
                return false;
            }
            else
                this.history.markAfterDelay(0);
        }

        // override undo/redo for our own built in history manager
        if( metaKey(e) && e.keyCode === 90 ){ // ctrl/cmd + z
            e.shiftKey ? this.history.redo() : this.history.undo()
            e.preventDefault()
            e.stopPropagation()
            return false;
        }

        
        if (e.key === 'Enter') {

            // only one line allowed
            if( this.lines <= 1 ){
                e.preventDefault()
                e.stopPropagation()
                return false
            }
            
            if( this.currentNumberOfLines >= this.lines ){
                e.preventDefault()
                e.stopPropagation()
                return false;
            }

            this.history.markAfterDelay(0);

            return false;
        }
    }
    
    get currentNumberOfLines(){
        // there should always be a trailing <br> which is why we can simply count them
        return this.$$all('br').length
    }

    onKeyup(e){

        if( ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Escape'].includes(e.key) ) return

        if( this._didJustDeleteToken ){
            delete this._didJustDeleteToken
            return
        }

        let [word, text] = this.currentWord()

        autoComplete(e, word, this.tokens, Object.assign(this.options.autoComplete, {
            onSelect: (selected)=>{
                if( selected )
                    this.replaceWithToken(selected)
            }
        }))

        // backspace
        if( e.which == 8 )
            this.history.markAfterDelay(500);

        if( this.main.innerHTML == '' || this.main.innerHTML == '<br>' ) 
            this.setAttribute('empty', '')
        else
            this.removeAttribute('empty')

        // make sure we end with a `<br>` tag.
        clearTimeout( this.keyupTimeout )
        this.keyupTimeout = setTimeout(this.endWithBrTag.bind(this), 300);
    }

    onKeypress(e){
        this.history.markAfterDelay(500);
    }
    
    tokenIsSelected(){
        var s = this.shadowRoot.getSelection();
        var r = s.getRangeAt(0);

        let startToken = this.getToken(r.startContainer)
        let endToken = this.getToken(r.endContainer)

        if( startToken && startToken == endToken )
            return startToken

        return false
    }
    
    deleteTokenIfSelected(){
        var token;
        if( token = this.tokenIsSelected() ){
            
            this._didJustDeleteToken = true
            this.history.mark()
            setTimeout(function(){
                token.remove();
            },100)
            this.history.markAfterDelay(200)
            return;
        }
    }
    
    moveCursorIfTokenSelected(char){
        if( this.tokenIsSelected() ){
            
            var s = this.getSelection();
            
            // left
            if( char == 37 )
                this.focus(s.start)
            // right
            else if( char == 39)
                this.focus(s.end)
        }
    }

    endWithBrTag(){

        if( !this.main.innerHTML.match(/<br>$/) ){

            // NOTE: why do this??
            // if( !this.isInFocus() )
            //     this.focusEnd();

            var sel = this.shadowRoot.getSelection();

            // no selection after telling to focus? then the editor is not in the DOM
            if( sel.type == 'None'){
                this.appendChild(document.createElement('br'))
                return;
            }

            var range = sel.getRangeAt(0);
            var frag = document.createDocumentFragment()
            var br = frag.appendChild( document.createElement('br') );

            this.main.appendChild(frag)

            // this breaks in Safari....
            range = range.cloneRange();
            range.setStartBefore(br);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }

    }

    insertHTML(html){

        // if( !this.isInFocus() ) // what was the point of this?
        //     this.focusEnd();

        // http://stackoverflow.com/a/6691294/484780
        let sel = this.shadowRoot.getSelection();

        if (sel.getRangeAt && sel.rangeCount) {
            let range = sel.getRangeAt(0);
            range.deleteContents();

            let el = document.createElement("div");
            el.innerHTML = html;

            let frag = document.createDocumentFragment(), node, lastNode;

            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }

            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }

            this.history.markAfterDelay()
        }
    }

    getToken(target){

        if( target.nodeName == '#text' )
            target = target.parentElement
        
        if( target && target.tagName == 'SPAN' )
            target = target.parentElement

        if( target && target.classList.contains('token') )
            return target
        
        return null
    }

    onContextmenu(e){
        let token = this.getToken(e.target)

        if( token && !this.disabled ){
            e.stopPropagation()
            e.preventDefault()
            this.emitEvent('token-contextmenu', {token: token, control: this})
        }
    }

    onClick(e){

        if( this.disabled ) return

        let token = this.getToken(e.target)
        if( token )
            this.onTokenClick(token)

        this.history.markAfterDelay()
    }

    onTokenClick(token){        
        
        this.emitEvent('token-click', {token: token, control: this})

        let selection = this.shadowRoot.getSelection();
        let range = document.createRange();
        range.selectNodeContents(token);
        range.setStart(this.main, 0)
        
        this.focus(range.toString().length);
    }

    length(){
        return this.main.textContent.trim().replace(/\n/g, '').length
    }

    // isInFocus(){
    //     // FIXME: if still needed?
    //     return document.activeElement == this
    // }

    blur(){ this.main.blur() }

    // focuses editor and sets caret position
    focus(atChar){
        if( atChar === undefined || atChar < 0 || atChar > this.length() )
            atChar = 0;

        this.setSelection(atChar, atChar);
    }

    // focuses editor at the end
    focusEnd(){
        this.focus(this.length())
    }

    selectAll(){ this.setSelection(0, this.length()) }

    setSelection(start, end) {

        var range = document.createRange(),
            el = this, count = 0, startNode, endNode;

        this.main.childNodes.forEach((node, indx)=>{

            var len = (node.textContent ? node.textContent.length : node.length) || 0;

            count = count + len;

            if( start == end && count > start && !startNode){
                
                var indx = start - (count - len);
                indx = 0;

                startNode = endNode = node;
                
                if(startNode.tagName && start == 0)
                    startNode = el
                else if( startNode.tagName ){
                    startNode = startNode.previousSibling
                    
                    if( !startNode.tagName )
                        indx = (startNode.textContent ? startNode.textContent.length : startNode.length) || 0;
                }
                
                if( startNode.tagName ){
                    range.selectNodeContents(startNode)
                }else{
                    range.setStart(startNode, indx)
                    range.setEnd(startNode, indx)
                }
            }

            // found start of selection
            if( (count > start || (count == start && len == 0)) && !startNode ){

                startNode = node;

                range.setStart(startNode, startNode.tagName ? 0 : start - (count - len)  )
            }

            if( (count > end || (count == end && len == 0)) && !endNode ){

                endNode = node;

                if( node.tagName && len > 0 )
                    if( node.nextSibling )
                        range.setEnd(node.nextSibling, 0)
                    else
                        range.setEnd(node, 0)
                else
                    range.setEnd(node, end - (count - len) )
            }

        })

        this.main.focus();

        var sel = this.shadowRoot.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        // http://stackoverflow.com/a/16100733/484780
    }

    getSelection() {

        var sel = this.shadowRoot.getSelection();

        if( sel.type == 'None' )
            return {
                start: this.length(),
                end: this.length()
            }

        var range = sel.getRangeAt(0);

        var preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(this);
        
        // no range selected
        if( preSelectionRange.collapsed )
            preSelectionRange.setStart(this.main, 0);
        
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        var start = preSelectionRange.toString().length;
        return {
            start: start,
            end: start + range.toString().length
        };
    }

    jsonToHTML(json){

        if( !json )
            return ''

        let lines = []
        
        for( let line of json ){
            let htmlLine = ''

            for( let node of line ){
                
                if( typeof node == 'string' )
                    htmlLine += node
                else if( node.label !== undefined )
                    htmlLine += this.makeToken(node)
                // legacy support
                else
                    htmlLine += this._objectTextareaObjectToHTML(node)
            }

            lines.push(htmlLine)
        }

        return lines.join('<br>');
    }

    // legacy support
    _objectTextareaObjectToHTML(d){
        if( d.type == 'text' )
            return d.data.text;

        // var attrs = _.clone(d.data);
        var attrs = Object.assign({}, d.data);
        var label = ''

        if( d.data ) label = d.data.text; // old
        if( d.obj ) label = d.obj.label; // really old
        
        delete attrs.text;

        return this.makeToken({label: label, attrs: attrs})
    }

    // TODO: change to get string from `toJSON`?
    toString(lineSeparator="\n"){
        let lines = []
        let line = ''

        this.main.childNodes.forEach(node=>{
            if( node.tagName && node.tagName == 'BR' ){
                lines.push(line)
                line = ''
            }

            line += node.textContent
        })

        if( line )
            lines.push(line)

        return lines.join(lineSeparator)
    }

    // creates a JSON structure of the editor content
    toJSON(objectsOnly=false){

        let html = this.htmlValue;

        if( !html ) return [];

        // split each row by the `<br>` tag
        let json = html.split('<br>');

        // covert each row to array of strings and objects
        json = json.map((str)=>{

            // make a temp DOM element for navigating through child nodes
            var div = document.createElement('div')
            div.innerHTML = str;

            // row data
            var row = [];

            // make each node an object
            div.childNodes.forEach((node)=>{

                // simple string of text
                if( !node.tagName ){
                    if( !objectsOnly)
                        row.push(node.textContent)

                // spans are 'tokens', so make them an {}
                }else if( node.classList.contains('token') ){
                    row.push({
                        label: node.textContent,
                        attrs: Object.assign({}, node.dataset)
                    })
                }

            })

            return row;
        })

        return json;
    }

    // Legacy support until code that relies on old objectTextarea format is updated
    toObjectTextarea(){
        var json = this.toJSON();
        return jsonToObjectTextarea(json)
    }

})

export default customElements.get('token-text-field')


// Legacy support until code that relies on old objectTextarea format is updated
export function jsonToObjectTextarea(json){
    return json.map((row)=>{ return row.map((d)=>{

        if( typeof d == 'string' ){
            return {type: "text", data: {text: d}}
        }else{
            var attrs = d.attrs;
            attrs.text = d.label;
            return {type: "bubble", data: attrs}
        }

    })})
}