import { LitElement, html, css } from 'lit-element'

const DEFAULT_OPTS = {
    className: '',
    value: '',				// html string or JSON format,
    autoComplete: {},		// options for auto complete
    multiLines: true,
    allowPaste: false,
    allowStyling: false,	// bold/italics keyboard shorcuts
    editing: true, 		// set to true if you want to be in edit mode upon init
    dblClickToEdit: true,
    beforeToken:'',
    afterToken: '',
    onTokenInsert(data){}
}

customElements.define('token-text-field', class extends LitElement{

    // get renderRoot(){ return this }

    static get styles(){return css`
        :host {
            display: block;
            position: relative;
            padding: .5em;
            margin: 0 -.5em;
            background: #fff;
            min-height: 1em;
            border: solid 1px transparent;
            font-family: Helvetica;
            line-height: 1.5em;
            outline: none;
            clear: both;
            cursor: pointer;

            width: 400px;
            border-color: gray;
        }
    `}

    render(){return html`
        <slot></slot>
    `}

    // events: {
    //     'dblclick': 'onDblClick',
    //     'click': 'onClick',
    //     'click .token': 'onTokenClick',
    //     'blur': 'onBlur',
    //     'keydown': 'onKeydown',
    //     'keyup': 'onKeyup',
    //     'keypress': 'onKeypress',
    //     'paste': 'onPaste'
    // }

    initialize(){
        super.initialize()

        window.tokenEditor = this; // TEMP

        this.options = Object.assign({}, DEFAULT_OPTS, this.options||{});
        this.history =[];
        this.historyAt = 0;

        // TEMP
        this.options.value = [["By ",{"label":"Meg Gardiner","attrs":{"id":"22645"}}],["Read by ",{"label":"Hillary Huber","attrs":{"id":"5954"}}]]

        var autoCompleteOptions = this.options.autoComplete;
        autoCompleteOptions.target = this;

        // this.subview('auto-complete') || this.subview('auto-complete', new AutoCompleteView(autoCompleteOptions))
        // this.listenTo(this.subview('auto-complete'), 'select', this.onAutoCompleteSelect)

        // if( this.options.items )
        //     this.setAutoCompleteItems(this.options.items)

        this.setValue()
        this.markHistory();

        if( this.options.editing )
            this.edit();
    }
    
    onTokenClick(e){
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(e.currentTarget);
        selection.removeAllRanges();
        selection.addRange(range);
        this.focus();
    }

    isEditing(){
        return this.contentEditable == 'true'
    }

    edit(doEdit){
        this.contentEditable = doEdit !== false
    }

    setValue(val){

        if( arguments.length == 0 )
            val = this.options.value;
        else
            this.options.value = val;

        var html = typeof val == 'string' ? val : this.jsonToHTML(val)

        this.innerHTML = html;

        html ? this.classList.remove('empty') : this.classList.add('empty')

        this.endWithBrTag();
    }

    // sets the items available in 'auto complete'
    setAutoCompleteItems(items){
        this.items = items;
        // this.subview('auto-complete').setItems(items);
    }

    // when a users selects an 'auto complete' item
    onAutoCompleteSelect(data, autoComplete){
        autoComplete.hide();
        this.replaceWithToken(data)
    }

    onDblClick(){
        if( this.options.dblClickToEdit == true && !this.isEditing() ){
            this.edit(true)
            this.focusEnd();
        }
    }

    // when clicked somewhere else in the editor, hide auto complete
    onClick(){ 
        // this.subview('auto-complete').hide();
    }
    
    onBlur(){
        if( this._manualBlur ){
            this._manualBlur = false;
            return;
        }
        // this.subview('auto-complete').hide(); this.trigger('blur', this)
    }

    blur(){ his._manualBlur=true; this.blur() }

    makeToken(d){
        if( !d ) return;
        
        var node = document.createElement('b-label');
        node.setAttribute('filled', 'theme')
        node.contentEditable = false;
        node.classList.add('token');

        for( let key in d.attrs ){
            node.setAttribute('data-'+key, d.attrs[key]);
        }
        // _.each(d.attrs, function(val, key){
        //     node.setAttribute('data-'+key, val);
        // })

        var label = document.createElement('span');
        label.innerHTML = d.label;
        node.appendChild(label)

        return this.options.beforeToken + node.outerHTML + this.options.afterToken;
    }

    insertToken(d){
        this.insertHTML( this.makeToken(d) )
        this.options.onTokenInsert(d)
    }

    replaceWithToken(token, allText=false){

        clearTimeout( this.historyTimeout )

        var sel = window.getSelection(),
            range = sel.getRangeAt(0),
            text = range.endContainer.textContent.slice(0, range.endOffset ),
            lastSpace = text.lastIndexOf(' ') > -1 ? text.lastIndexOf(' ') : text.lastIndexOf(' ');
            word = lastSpace > -1 ? text.slice(lastSpace+1) : text;

        // delete the word the user was typing so we can replace it with a token
        range.setStart(range.endContainer, (allText ? 0 : lastSpace+1));
        range.deleteContents();

        if( token )
            this.insertToken(token);
    }

    currentWord(){

        var sel = window.getSelection(),
            range = sel.getRangeAt(0);

        if( range.endContainer == this
        || !range.endContainer.textContent ) return [];

        var text = range.endContainer.textContent.slice(0, range.endOffset ),
            lastSpace = text.lastIndexOf(' ') > -1 ? text.lastIndexOf(' ') : text.lastIndexOf(' ');
            word = lastSpace > -1 ? text.slice(lastSpace+1) : text;

        //console.log('current word: ', word);
        return [word, text];
    }

    onPaste(e){
        if( this.options.allowPaste != true ){
            e.preventDefault(); // disable pasting so we dont have to do style cleanup
            return false;
        }else{
            this.markHistoryIn(0);
        }
    }

    onKeydown(e){
        
        // backspace
        if( e.which == 8 ){
            this.deleteTokenIfSelected();
        }
        
        // left or right
        if( e.which == 37 || e.which == 39){
            this.moveCursorIfTokenSelected(e.which)
        }

        if( e.which === 27 ){ // esc
            this.trigger('cancel', this)
            return;
        }

        // disable style commands like bold an italic
        if( this.metaKey() && (e.keyCode === 66 /* bold */ || e.keyCode === 73 /* italics */)){

            if( this.options.allowStyling !== true )
                return false;
            else
                this.markHistoryIn(0);
        }

        // override undo/redo for our own built in history manager
        if( this.metaKey() && e.keyCode === 90 ){ // ctrl/cmd + z
            e.shiftKey ? this.redo() : this.undo()
            return false;
        }

        // on enter, force `<br>` tags instead of <div> or <p>
        if (e.keyCode === 13) {

            if( this.options.multiLines <= 0 ) return false;
            
            if( this.options.multiLines > 1 && this.currentNumberOfLines() >= this.options.multiLines )
                return false;

            // if at the end of editor, a trailing <br> is needed to make the cursor jump to the next line
            if( this.getSelection().start >= this.length() )
                document.execCommand('insertHTML', false, '<br class="newline"><br>');
            else
                document.execCommand('insertHTML', false, '<br class="newline">');

            this.markHistoryIn(0);

            return false;
        }
    }
    
    currentNumberOfLines(){
        return this.$('.newline').length + 1
    }

    onKeyup(e){

        // re-render auto-complete with the current word
        setTimeout(()=>{
            let [word, text] = this.currentWord()
            // this.subview('auto-complete').render( word ) // FIXME:  
        })

        // backspace
        if( e.which == 8 )
            this.markHistoryIn(500);

        // make sure we end with a `<br>` tag.
        clearTimeout( this.keyupTimeout )
        this.keyupTimeout = setTimeout(this.endWithBrTag.bind(this), 300);

    }

    onKeypress(e){
        this.markHistoryIn(500);
    }
    
    tokenIsSelected(){
        var s = window.getSelection();
        var r = s.getRangeAt(0);
        
        return r.startContainer.classList && r.startContainer.classList.contains('token') 
        && r.endContainer.classList && r.endContainer.classList.contains('token') ? r.startContainer : false
    }
    
    deleteTokenIfSelected(){
        var token;
        if( token = this.tokenIsSelected() ){
            
            this.markHistory()
            setTimeout(function(){
                token.remove();
            },100)
            this.markHistoryIn(200)
            return;
        }
    }
    
    moveCursorIfTokenSelected(char){
        if( this.tokenIsSelected() ){
            
            var s = this.getSelection();
            
            // clear selection
            // window.getSelection().empty()
            
            // // left
            if( char == 37 )
                this.focus(s.start)
            // right
            else if( char == 39)
                this.focus(s.end)
        }
    }

    endWithBrTag(){

        // dont do this if auto complete showing, cause when calling `replaceWithToken`;
        // it would replace more than the word if 300ms passed before selecting
        // if( this.subview('auto-complete').isShowing ) return;

        if( !this.innerHTML.match(/<br>$/) ){

            if( !this.isInFocus() )
                this.focusEnd();

            var sel = window.getSelection();

            // no selection after telling to focus? then the editor is not in the DOM
            if( sel.type == 'None'){
                this.appendChild(document.createElement('br'))
                return;
            }

            var range = sel.getRangeAt(0);
            var frag = document.createDocumentFragment()
            var br = frag.appendChild( document.createElement('br') );

            //document.execCommand('insertHTML', false, frag);
            this.appendChild(frag)

            // this breaks in Safari....
            range = range.cloneRange();
            range.setStartBefore(br);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }

    }

    insertHTML(html){

        if( !this.isInFocus() )
            this.focusEnd();

        // http://stackoverflow.com/a/6691294/484780
        sel = window.getSelection();

        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            var el = document.createElement("div");
            el.innerHTML = html;

            var frag = document.createDocumentFragment(), node, lastNode;

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

            this.markHistory();
        }

    }

    length(){
        return this.textContent.trim().replace(/\n/g, '').length
    }

    isInFocus(){
        return document.activeElement == this
    }

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

    jsonToHTML(json){

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
                    htmlLine + this._objectTextareaObjectToHTML(node) // FIXME:
            }

            lines.push(htmlLine)
        }

        return lines.join('<br class="newline">');

        // var self = this;
        // var lines = _.map(json, function(row){ // FIXME:
        //     return _.reduce(row, function(str, d){
        //         if( typeof d == 'string' )
        //             return str + d
        //         else if( d.label !== undefined )
        //             return str + self.makeToken(d)

        //         // legacy support
        //         else
        //             return str + self._objectTextareaObjectToHTML(d)
        //     }, '')
        // })
        // return lines.join('<br class="newline">');
    }

    // legacy support
    _objectTextareaObjectToHTML(d){
        if( d.type == 'text' )
            return d.data.text;

        // var attrs = _.clone(d.data);
        var attrs = Object.assign({}, d.data);
        var label = d.data.text; delete attrs.text;

        return this.makeToken({label: label, attrs: attrs})
    }

    toHTML(){
        return this.innerHTML.replace(/<br>$/, '');
    }

    toString(lineSeparator){
        lineSeparator = lineSeparator || "\n";
        // FIXME:
        var html = _.stripTags( this.toHTML().replace(/<br class="newline">/g, "||") )
        return html.replace(/\|\|/g, lineSeparator)
    }

    // creates a JSON structure of the editor content
    toJSON(objectsOnly=false){

        var html = this.toHTML();

        if( !html ) return [];

        // split each row by the `<br>` tag
        var json = html.split('<br class="newline">');

        // covert each row to array of strings and objects
        json = _.map(json, function(str){ // FIXME:

            // make a temp DOM element for navigating through child nodes
            var div = document.createElement('div')
            div.innerHTML = str;

            // row data
            var row = [];

            // make each node an object
            _.each(div.childNodes, function(node){

                // simple string of text
                if( !node.tagName && !objectsOnly )
                    row.push(escape(node.textContent))

                // spans are 'tokens', so make them an {}
                else if( node.tagName == 'SPAN'){
                    row.push({
                        label: escape(node.textContent),
                        attrs: _.clone(node.dataset)
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

        return _.map(json, function(row){ return _.map(row, function(d){

            if( typeof d == 'string' ){
                return {type: "text", data: {text: d}}
            }else{
                var attrs = d.attrs;
                attrs.text = d.label;
                return {type: "bubble", data: attrs}
            }

        })})
    }

    setSelection(start, end) {

        var range = document.createRange(),
            el = this, count = 0, startNode, endNode;

        this.childNodes.forEach((node, indx)=>{

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

            // console.log(start, count, len);

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

        // this.focus();

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        return;

        // http://stackoverflow.com/a/16100733/484780
    }

    getSelection() {

        var sel = window.getSelection();

        if( sel.type == 'None' )
            return {
                start: this.length(),
                end: this.length()
            }

        var range = sel.getRangeAt(0);

        var preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(this);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        var start = preSelectionRange.toString().length;
        return {
            start: start,
            end: start + range.toString().length
        };
    }

    metaKey(e){
        e = e || event;
        return e && (e.ctrlKey || e.altKey || e.metaKey);
    }

    markHistory(){
        // splices history at current history index (and removes all history after current index)
        this.history.splice(this.historyAt+1, Number.MAX_VALUE, {
            caret: this.getSelection(),
            content: this.innerHTML
        })

        this.historyAt = this.history.length - 1;
    }

    markHistoryIn(ms){
        clearTimeout( this.historyTimeout )
        this.historyTimeout = setTimeout(this.markHistory.bind(this), ms||0);
    }

    undo(){
        if( this.historyAt <= 0 ) return;
        this.applyHistory(this.history[ --this.historyAt ])
    }

    redo(){
        if( this.historyAt >= this.history.length - 1 ) return;
        this.applyHistory(this.history[ ++this.historyAt ])
    }

    applyHistory(hist){
        this.innerHTML = hist.content;
        this.setSelection(hist.caret.start, hist.caret.end)
    }

})

export default customElements.get('token-text-field')