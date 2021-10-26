/*
	https://icomoon.io/app
*/
import { LitElement, html, css } from 'lit-element';

const SVG_ICONS = new Map()

function registerIcon(name, icon, {prefix='icon-'}={}){

	let d = document.createElement('div')
	d.innerHTML = icon
	icon = d.firstElementChild

	// if no name, get it from the icon attribute
	if( !name ){
		name = icon.id || icon.name || ''
		name = name.replace(prefix, '')
	}

	// remove <title> tags – we dont want to see them when hovering over the icon
	let title = icon.querySelector('title')
	if( title ){
		icon.setAttribute('data-title', title.textContent)
		title.remove()
	}

	if( !name )
		return console.warn('Icons must have a name')

	if( SVG_ICONS.get(name) )
		return console.warn('There is already an icon registered with that name' )

	SVG_ICONS.set(name, icon)
}

let hasWarnedNoIcons = false
function warnNoIcons(){
	if( hasWarnedNoIcons ) return
	hasWarnedNoIcons = true
	console.warn('No icons have been registered. Do so with `IconElement.register()` – Or import `bui/elements/icons/_all`')
}

export default class IconElement extends HTMLElement {

	static register(...icons){
		icons.forEach(icon=>{
			let name = ''

			if( Array.isArray(icon) )
				[name, icon] = icon
			
			if( icon.default )
				icon = icon.default
				
			registerIcon(name, icon)
		})
	}

	// not ideal...
	get styles(){return /*css*/`
		:host {
			display: inline-flex;
			vertical-align: middle;
			align-items: center;
			justify-content: center;
			color: inherit;
			height: var(--size, 1em);
		}

		:host([hidden]) {
			display: none !important;
		}

		:host([link]) {
			cursor: pointer;
		}

		:host([muted]) {
			opacity: .5;
		}

		:host([square]) {
			width: var(--size, 1em);
		}

		:host([invalid]) {
			background: #f44336;
		}

		svg {
			height: 100%;
			/* width: 100%; */
			min-width: 0;
			display: inline-block;
			fill: currentColor;
			color: currentColor;
		}

		@keyframes rotate360 {
			to { transform: rotate(360deg); }
		}

		@keyframes rotate360CCW {
			to { transform: rotate(-360deg); }
		}

		:host([spin]) svg {
			animation: 1600ms rotate360 infinite linear;
		}

		:host([name="arrows-ccw"][spin]) svg {
			animation: 1600ms rotate360CCW infinite linear;
		}
	`}

	constructor(){
		super()

		this.attachShadow({mode: 'open'})
        let temp = document.createElement('template')
		temp.innerHTML = `<style>
		${this.styles}
		</style>
		<slot></slot>
		`
		this.shadowRoot.appendChild(temp.content.cloneNode(true));
	}

	_setSVG(){

		if( SVG_ICONS.size == 0 )
			warnNoIcons()

		if( this._svg )
			this._svg.remove()

		let svg = SVG_ICONS.get(this.name)
		
		if( svg ){
			this._svg = svg.cloneNode(true)
			this.removeAttribute('invalid')
			this.shadowRoot.appendChild(this._svg)
		}else{
			this.setAttribute('invalid', '')
		}
	}

	static get observedAttributes() { return ['name']; }
	
	attributeChangedCallback(name, oldValue, newValue){
		
		if( name === 'name' )
			this._setSVG()
	}
	
	get name(){ return this.getAttribute('name')}
	set name(val){ return this.setAttribute('name', val)}

	set spin(val){
		this.toggleAttribute('spin', Boolean(val))
	}
	get spin(){
		return this.hasAttribute('spin')
	}

}
	
customElements.define('b-icon', IconElement)

export class IconList extends LitElement {

	static get properties(){return {
		cols: {type: Number, reflect: true}
	}}

	constructor(){
		super()
		this.cols = 6
	}

	static get styles(){return css`
		:host {
			display: block;
			column-count: 6;
			gap: 1em;
			width: 100%;
			font-size:1.2em;
			padding: 1em;
			overflow: auto;
		}

		:host([cols="1"]) { column-count: 1}
		:host([cols="2"]) { column-count: 2}
		:host([cols="3"]) { column-count: 3}
		:host([cols="4"]) { column-count: 4}
		:host([cols="5"]) { column-count: 5}
		:host([cols="6"]) { column-count: 6}

		:host > div {
			margin: .75em;
		}

		:host > div:first-child {
			margin-top: 0;
		}

		b-icon {
			width: 1.6em;
		}

		small {
			color: var(--theme-text-accent);
		}

		@media (max-width: 550px) {
            :host {
                column-count: 1 !important;
            }
        }
	`}

	render(){return html`
		${Array.from(SVG_ICONS.keys()).map(name=>html`
			<div>
				<b-icon name=${name}></b-icon> <small>${name}</small>
			</div>
		`)}
	`}
}
customElements.define('b-icon-list', IconList)

export function iconNames(){
	return Array.from(SVG_ICONS.keys())
}