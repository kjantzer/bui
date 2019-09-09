/*
	https://icomoon.io/app
*/
import { LitElement, html, css } from 'lit-element';

const svgDef = require('./icons.svg.html');

class SvgIcons {

	get prefix(){ return 'icon-'}

	get svgDefElement() {

		if( !this.__svgDefElement ){
			let div = document.createElement('div')
			div.innerHTML = svgDef
			this.__svgDefElement = div.firstChild
			// remove all the <title> tags so they dont show as "tooltips" when hovering
			this.__svgDefElement.querySelectorAll('title').forEach(el=>el.remove())
			div = null
		}

		return this.__svgDefElement
	}

	get names(){
		return Array.from(this.svgDefElement.querySelectorAll('symbol')).map(el=>el.id.replace(this.prefix, '')).sort()
	}

	get(name){

		let symbol = this.svgDefElement.querySelector(`#${this.prefix}${name}`)
		let svg = null

		if( symbol ){

			let div = document.createElement('div')
			div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">${symbol.innerHTML}</svg>`
			svg = div.firstChild

			// copy attributes
			Array.from(symbol.attributes).forEach(attr=>{
				svg.setAttribute(attr.name, attr.value)
			})
		}
		
		return svg
	}
}

export const svgIcons = new SvgIcons()

export class IconElement extends HTMLElement {

	constructor(){
		super()

		this.attachShadow({mode: 'open'})
        let temp = document.createElement('template')
		temp.innerHTML = `<style>
		:host {
			display: inline-flex;
			vertical-align: middle;
			align-items: center;
			justify-content: center;
			color: inherit;
			--size: 1em;
			height: var(--size);
		}

		:host([square]) {
			width: var(--size);
		}

		:host([invalid]) {
			background: #f44336;
		}

		svg {
			height: 100%;
			/* width: 100%; */
			display: inline-block;
			fill: currentColor;
			color: currentColor;
		}
		</style>
		<slot></slot>
		`
		this.shadowRoot.appendChild(temp.content.cloneNode(true));
	}

	_setSVG(){

		if( this._svg )
			this._svg.remove()

		this._svg = svgIcons.get(this.name)
		
		if( this._svg ){
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
			color: rgba(0,0,0,.5);
		}

		@media (max-width: 550px) {
            :host {
                column-count: 1 !important;
            }
        }
	`}

	render(){return html`
		${svgIcons.names.map(name=>html`
			<div>
				<b-icon name=${name}></b-icon> <small>${name}</small>
			</div>
		`)}
	`}
}
customElements.define('b-icon-list', IconList)