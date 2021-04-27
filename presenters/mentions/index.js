/*
	Mention

	NOTE: abondoned until more browsers support shadowRoot.getSelection() 😞
	https://github.com/GoogleChromeLabs/shadow-selection-polyfill

	https://medium.com/streak-developer-blog/the-complexities-of-implementing-inline-autocomplete-for-content-editables-e358c0ed504b
*/
import debounce from '../../util/debounce'
import Menu from '../menu'
import MentionElement from './element'
import Fuse from 'fuse.js'

export {MentionElement}

let DefaultValues = null

export default class {

    static set defaultValues(vals){
        DefaultValues = vals
    }

    constructor(el, opts={}){
        this.el = el
		el.mention = this

		this.opts = Object.assign({
            pattern: /@(.[^\s]*)$/,
			element: 'b-mention',
			values: DefaultValues, // array or function that returns array
			
			// fuse.js options
			keys: [{
				name: 'dataTitle',
				weight: 0.5
			},{
				name: 'label',
				weight: 0.3
			}, {
				name: 'description',
				weight: 0.2
			}],
			minMatchCharLength: 2,
			threshold: 0.2,
			location: 0,
			distance: 4

		}, opts)

		if( this.opts.values === null ){
			this.opts.values = []
			console.warn('Mentions: `defaultValues` is not set')
		}

		if( !customElements.get(this.opts.element) ){

			if( this.opts.element == 'b-mention' ){
                MentionElement.register()
            }
            else
                return console.warn('Cannot initialize mention, element unregistered')
		}

		this.process = debounce(this.process.bind(this), 100) 
		
		this.el.addEventListener('keyup', this.process)
		this.el.addEventListener('input', this.process)
		this.el.addEventListener('click', this.process)
		this.el.addEventListener('focus', this.process)
        this.el.addEventListener('blur', this.process)
    }

	menuFor(term){

		let vals = this.opts.values 

		if( typeof vals == 'function' )
			this.__fuse = new Fuse(vals(), this.opts) // setup fuse each time
		else if( !this.__fuse )
			this.__fuse = new Fuse(vals, this.opts) // setup once since values wont chnage

		return this.__fuse.search(term)
	}

	destroy(){
		this.el.removeEventListener('keyup', this.process)
		this.el.removeEventListener('input', this.process)
		this.el.removeEventListener('click', this.process)
		this.el.removeEventListener('focus', this.process)
        this.el.removeEventListener('blur', this.process)
		this.el = null
	}

    isMention(el){
        return el.tagName == this.opts.element.toUpperCase()
    }

	process(e){

		let cursorContext = getCursorContext(this.el)

		if( ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.code) ) return

		if( this.menu )
			this.menu.presenter.close()

		if( !cursorContext ) return

        let mention = this.isMention(cursorContext.textNodeParent) ? cursorContext.textNodeParent : null
        let lastMention = this.lastMention
        this.lastMention = mention

        if( e.type == 'focus' || e.type == 'click' ){
            if( lastMention ) lastMention.active = false
            if( mention ) mention.active = true
        }

        if( e.type == 'blur'){
            if( lastMention ) lastMention.active = false
            if( mention ) mention.active = false
            return
        }

		// if user edits the mention element, revert back to text node
		if( mention ){

            if( e.key == 'Backspace' && mention.active )
                return mention.remove()

            if( e.type == 'keyup' && mention.value != mention.innerText)
                    return this.revertMention(mention)
		}

		let queryMatch = cursorContext.textBeforeCursor.match(this.opts.pattern)

		if( !queryMatch ) return

		let query = queryMatch[0]
		let term = queryMatch[1]
		let menu = this.menuFor(term)

		if( menu.length == 0 ) return

		let textNode = cursorContext.textNode;
		const menuLeftEdgeCharaterPosition = Math.max(cursorContext.cursorCharacterPosition, 0);
		const range = document.createRange();
		range.setStart(textNode, menuLeftEdgeCharaterPosition);
		range.setEnd(textNode, menuLeftEdgeCharaterPosition);
		range.collapse(true);

		const marker = document.createElement('span');
		range.insertNode(marker);
		
		this.menu = new Menu(menu, {search:false, autoSelectFirst: true})

		this.menu
		.popover(marker, {maxHeight: '140px'})
        .then(this.insertMention.bind(this, cursorContext, query))

		setTimeout(()=>{
			marker.remove();
		},0)

		cursorContext.textNodeParent.normalize();
	}

	createMention(selected){
		const mention = document.createElement(this.opts.element);
		mention.innerText = selected.label
		mention.setAttribute('uid', selected.val)
		return mention
	}

	insertMention(cursorContext, query, selected){
		// console.log(cursorContext, selected);
        if( !selected ) return
		
		let replacementText = ''
		const lastIndex = cursorContext.textBeforeCursor.lastIndexOf(query);
		cursorContext.textNode.textContent = cursorContext.textNodeContent.substring(0, lastIndex) + replacementText
		// + cursorContext.textAfterCursor; // why was I adding this? (duplicates text)

		const selection = this.el.getRootNode().getSelection();
		if(!selection) return;

		// put cursor at the end of the replaced text
		const range = document.createRange();
		range.setStart(cursorContext.textNode, lastIndex + replacementText.length);
		range.setEnd(cursorContext.textNode, lastIndex + replacementText.length);
		range.collapse(true);
		
        // const spaceZeroWidth = document.createTextNode('\u200B')
        // range.insertNode(spaceZeroWidth)
		// range.setStart(spaceZeroWidth, spaceZeroWidth.length);
		// range.setEnd(spaceZeroWidth, spaceZeroWidth.length);

        const mention = this.createMention(selected)	
        range.insertNode(mention);
		range.setStartAfter(mention)
		range.setEndAfter(mention)
		
        const space = document.createTextNode(' ')
		range.insertNode(space)
		range.setStart(space, space.length);
		range.setEnd(space, space.length);
		range.setStartAfter(space)
		range.collapse(true);

		selection.removeAllRanges();
		selection.addRange(range);
	}

    revertMention(mention){
		const selection = mention.getRootNode().getSelection();

		let textNode = mention.firstChild
		let offset = selection.anchorOffset
		mention.parentNode.replaceChild(textNode, mention)

		const range = document.createRange();
		
		range.setStart(textNode, offset);
		range.setEnd(textNode, offset);
		range.collapse(true);

		selection.removeAllRanges();
		selection.addRange(range);
	}
}

function getCursorContext(el){

    let cursorTextNodeAndParent = getTextNodeAndParent(el);

    if(!cursorTextNodeAndParent) return null;

    // we now normalize the textNodeParent to make sure there's only one text node
    // makes subsequent code a lot simpler
    cursorTextNodeAndParent.textNodeParent.normalize();
    cursorTextNodeAndParent = getTextNodeAndParent(el);
    if(!cursorTextNodeAndParent) return null;

    const {textNode, textNodeParent, selection} = cursorTextNodeAndParent;

    const range = selection.getRangeAt(0);
    const textNodeContent = textNode.textContent;
    const cursorCharacterPosition = range.startOffset;

    if(!(cursorCharacterPosition >= 0)) return null;

    return {
    	textNode, textNodeParent, textNodeContent, cursorCharacterPosition,
    	textBeforeCursor: textNodeContent.substring(0, cursorCharacterPosition),
    	textAfterCursor: textNodeContent.substr(cursorCharacterPosition)
    };
}

function getTextNodeAndParent(el){
	const selection = el.getRootNode().getSelection();

	if(!selection) return null;

	const textNode = selection.anchorNode;
	if(!textNode || textNode.nodeType !== Node.TEXT_NODE) return null;

	const textNodeParent = textNode.parentNode;
	if(!textNodeParent) return null;

	return {textNode, textNodeParent, selection};
}

// function pasteText({replacementText, cursorContext, activeQuery}){
// 	// update text node content with replaced text
// 	const lastIndex = cursorContext.textBeforeCursor.lastIndexOf(activeQuery);
// 	cursorContext.textNode.textContent = cursorContext.textNodeContent.substring(0, lastIndex) + replacementText + cursorContext.textAfterCursor;

// 	const selection = document.getSelection();
// 	if(!selection) return;

// 	// put cursor at the end of the replaced text
// 	const range = document.createRange();
// 	range.setStart(cursorContext.textNode, lastIndex + replacementText.length);
// 	range.setEnd(cursorContext.textNode, lastIndex + replacementText.length);
// 	range.collapse(true);
// 	selection.removeAllRanges();
// 	selection.addRange(range);
// }
