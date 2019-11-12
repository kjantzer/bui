/*
	Mention

	NOTE: abondoned until more browsers support shadowRoot.getSelection() 😞

	https://medium.com/streak-developer-blog/the-complexities-of-implementing-inline-autocomplete-for-content-editables-e358c0ed504b
*/
import debounce from '../../../util/debounce'
import Menu from '../../menu'
import { LitElement, html, css, query } from 'lit-element'

export default class {

    constructor(el){
        this.el = el
		// this.root = this.el.getRootNode()

		this.process = debounce(this.process.bind(this), 100) 
		
		this.el.addEventListener('keyup', this.process)
		this.el.addEventListener('input', this.process)
		this.el.addEventListener('click', this.process)
		this.el.addEventListener('focus', this.process)
    }

	destroy(){
		this.el.removeEventListener('keyup', this.process)
		this.el.removeEventListener('input', this.process)
		this.el.removeEventListener('click', this.process)
		this.el.removeEventListener('focus', this.process)
		this.el = null
	}

	process(e){
		let cursorContext = getCursorContext(this.el)

		if( ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.code) ) return

		if( this.menu )
			this.menu.presenter.close()

		if( !cursorContext ) return

		// if user edits b-mention, revert back to text node
		if( cursorContext.textNodeParent.tagName == 'B-MENTION' ){

			let mention = cursorContext.textNodeParent
			
			if( mention.value != mention.innerText)
				mention.revert()

			return
		}

		let queryMatch = cursorContext.textBeforeCursor.match(/@.[^\s]*$/)

		// if( queryMatch && cursorContext.textNodeParent.tagName != 'B-MENTION' ){

		// 	console.log('update?');
			

		// 	// update text node content with replaced text
		// 	let query = queryMatch[0]
		// 	let replacementText = ''
		// 	const lastIndex = cursorContext.textBeforeCursor.lastIndexOf(query);
		// 	cursorContext.textNode.textContent = cursorContext.textNodeContent.substring(0, lastIndex) + replacementText + cursorContext.textAfterCursor;

		// 	const selection = this.el.getRootNode().getSelection();
		// 	if(!selection) return;

		// 	// put cursor at the end of the replaced text
		// 	const range = document.createRange();
		// 	range.setStart(cursorContext.textNode, lastIndex + replacementText.length);
		// 	range.setEnd(cursorContext.textNode, lastIndex + replacementText.length);
		// 	range.collapse(true);
			
		// 	const mention = document.createElement('b-mention');
		// 	mention.innerText = query
		// 	range.insertNode(mention);
		// 	range.setStart(mention.firstChild, query.length);
		// 	range.setEnd(mention.firstChild, query.length);
		// 	range.collapse(true);

		// 	selection.removeAllRanges();
		// 	selection.addRange(range);

		// }

		if( !queryMatch ) return

		let query = queryMatch[0]

		let textNode = cursorContext.textNode;
		const menuLeftEdgeCharaterPosition = Math.max(cursorContext.cursorCharacterPosition, 0);
		const range = document.createRange();
		range.setStart(textNode, menuLeftEdgeCharaterPosition);
		range.setEnd(textNode, menuLeftEdgeCharaterPosition);
		range.collapse(true);

		const marker = document.createElement('span');
		
		// marker.style.display = 'inline-block';
		// marker.style.width = '.5em'
		// marker.style.backgroundColor = 'red'

		range.insertNode(marker);

		this.menu = new Menu([{label: 'Megan Warenbrock', val:'megan'}, {label: 'Kevin Jantzer', val: 'kevin'}])
		this.menu.popover(marker).then(this.insertMention.bind(this, cursorContext, query))

		//   document.body.appendChild(menuContainer);
		//   containByScreen(menuContainer, marker, {position: 'bottom', hAlign: 'left'});
		setTimeout(()=>{
			marker.remove();
		},0)

		cursorContext.textNodeParent.normalize();
	}

	insertMention(cursorContext, query, selected){
		// console.log(cursorContext, selected);
		
		let replacementText = ''
		const lastIndex = cursorContext.textBeforeCursor.lastIndexOf(query);
		cursorContext.textNode.textContent = cursorContext.textNodeContent.substring(0, lastIndex) + replacementText + cursorContext.textAfterCursor;

		const selection = this.el.getRootNode().getSelection();
		if(!selection) return;

		// put cursor at the end of the replaced text
		const range = document.createRange();
		range.setStart(cursorContext.textNode, lastIndex + replacementText.length);
		range.setEnd(cursorContext.textNode, lastIndex + replacementText.length);
		range.collapse(true);
		
		const mention = document.createElement('b-mention');
		const space = document.createTextNode(' ')
		mention.innerText = selected.label
		
		range.insertNode(mention);
		range.setStartAfter(mention)
		range.setEndAfter(mention)
		
		range.insertNode(space)
		range.setStart(space, space.length);
		range.setEnd(space, space.length);
		// range.setStartAfter(mention)
		// range.collapse(true);

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





customElements.define('b-mention', class extends LitElement{

	firstUpdated(){
		this.value = this.innerText
	}

	static get styles(){return css`
		:host {
			display: inline-block;
			position:relative;
			white-space: normal;
		}

		slot {
			display: inline-block;
			background: var(--blue-50);
			color: var(--blue);
		}

		:host(:focus) slot,
		:host(:focus-within) slot,
		:host(:active) slot {
			background: red;
		}
	`}

	render(){return html`
		<slot></slot>
	`}

	revert(){
		const selection = this.getRootNode().getSelection();
		
		console.log(selection.anchorNode, selection.anchorOffset);

		let textNode = this.firstChild
		let offset = selection.anchorOffset
		this.parentNode.replaceChild(textNode, this)

		const range = document.createRange();
		
		range.setStart(textNode, offset);
		range.setEnd(textNode, offset);
		range.collapse(true);

		selection.removeAllRanges();
		selection.addRange(range);
		
	}

})

// export default customElements.get('b-mention')