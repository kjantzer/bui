import { LitElement, html, css } from 'lit'
import throttle from 'lodash/throttle'

const LETTERS = ['#'].concat(Array
	.apply(null, {length: 26})
	.map((x, i) => String.fromCharCode(97 + i))
)

customElements.define('b-virtual-scroller-skipper', class extends LitElement{

	static get properties(){return {
		letters: {type: Array},
		delay: {type: Number}
	}}

	static get styles(){return css`
		:host {
			position: absolute;
			z-index: 1000;
			text-align: center;
			height: 100%;
			top: 0;
			right: 0;
			padding: 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: .5em .5em .5em 1em;
			box-sizing: border-box;
			user-select: none;

			--b-skipper-bgd: rgba(var(--theme-text-rgb), .1);
			--b-skipper-text: rgba(var(--theme-text-rgb), .8);
			--b-skipper-text-empty: rgba(var(--theme-text-rgb), .3);

			color: var(--b-skipper-text);
		}

		.bar {
			background: var(--b-skipper-bgd);
			border-radius: 4px;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}

		letter {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 .5em;
			flex: 1;
			font-size: .7em;
			font-weight: bold;
			text-transform: uppercase;
		}

		letter[disabled] {
			color: var(--b-skipper-text-empty);
		}

		.preview {
			position: absolute;
			background: var(--b-skipper-bgd);
			width: 4rem;
			height: 4rem;
			left: -4rem;
			border-radius: 4px;
			font-weight: bold;
			font-size: 2em;
			display: flex;
			justify-content: center;
			align-items: center;
			text-transform: uppercase;
			visibility: hidden;
		}

		:host([hidden]) {
			display: none;
		}
	`}

	constructor(){
		super()
		this.letters = []
		this.delay = 100
	}

	firstUpdated(){

		this.preview = this.shadowRoot.querySelector('.preview')
		
		this.onTouchMove = this.onTouchMove.bind(this)

		this.shadowRoot.addEventListener('click', this.onClick.bind(this))
		this.shadowRoot.addEventListener('touchstart', this.onTouchMove)
		this.shadowRoot.addEventListener('touchmove', throttle(this.onTouchMove, 50))
		this.shadowRoot.addEventListener('touchend', this.onTouchEnd.bind(this))
	}

	render(){return html`
		<div class="bar">${LETTERS.map(letter=>html`
			<letter val="${letter}" ?disabled=${this.letters[letter]==undefined}>${letter}</letter>
		`)}</div>
		<div class="preview"></div>
	`}

	onClick(e){
		if( e.target.tagName == 'LETTER' )
			this.scrollTo(e.target)
	}
	
	onTouchEnd(e){
		this.isTouching = false
	
		setTimeout(()=>{
			this.preview.style.visibility = 'hidden'
		}, 100)
	}
	
	onTouchMove(e){
		
		e.stopPropagation()
		e.preventDefault()
		
		this.isTouching = true
		
		let xPos = this.offsetLeft + (this.offsetWidth/2)
		let yPos = e.touches[0].pageY;
		let el = this.shadowRoot.elementFromPoint(xPos, yPos)
		
		this.preview.style.visibility = 'visible'
		this.preview.style.top = (yPos - this.getBoundingClientRect().top - (this.preview.offsetHeight/2)) +'px'
		
		this.scrollTo(el)
		
		return false;
	}
	
	scrollTo(el){

		if( !el || el == this.shadowRoot || !this.shadowRoot.contains(el) ) return;
		
		let val = el.innerText.toLowerCase()
		
		this.preview.innerHTML = val;
		
		if( this.lastTouched == val ) return;
		
		this.lastTouched = val

		if( this.letters && this.letters[val] != undefined ){
			clearTimeout(this.__scrollToDelay)
			this.__scrollToDelay = setTimeout(()=>{
				this.emitEvent('scroll-to', {letter: val, index: this.letters[val]})
			}, this.delay)
		}
		
		if( !this.isTouching )
			this.lastTouched = null
	}

})

export default customElements.get('b-virtual-scroller-skipper')

