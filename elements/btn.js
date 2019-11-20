import { LitElement, html, css } from 'lit-element';
import './spinner'
import './icon'

export class BtnElement extends LitElement {

    static get properties() { return {
        href: {type: String, reflect: true},
        value: {type: String, reflect: true},
        icon: { type: String },
        spin: {type: Boolean, reflect: true, attribute: 'spin'}
    }}

    static get styles(){ return css`
    
        :host{
            --red: var(--red-700);
            /* --black: #333;
            --orange: #F57C00;
            --blue: #2196F3;
            --red: #d32f2f;
            --gray: #444444;
            --green: #27ae60;
            --yellow: #f2d57e;
            --teal: #009688;
            --purple: #7E57C2;
            --brown: #795548;
            --pink: #E91E63; */

            --radius: 3px;
            --color: var(--black);
            --bgdColor: var(--color);
            --hoverBgdColor: rgba(255,255,255,.1);
            --textColor: #fff;
            --borderColor: var(--color);
            --borderStyle: solid;
            --borderWidth: 1px;
            --padding: .4em .6em;

            display: inline-block;
            position: relative;
            box-sizing: border-box;
            background: var(--bgdColor);
            color: var(--textColor);
            border-radius: var(--radius);
            cursor: pointer;
            transition: 160ms;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            font-size: .9rem;
            line-height: 1rem;
            font-weight: bold;
            font-family: var(--bui-btn-font);

            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
        }

        :host([hidden]) {
            display: none !important;
        }

        main {
            border-radius: var(--radius);
            position: relative;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            padding: var(--padding);
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            /*padding-bottom: .3em;*/ /* remove descender line to make it look more centered*/
            text-overflow: ellipsis;
            border: var(--borderStyle) var(--borderWidth) var(--borderColor);
            /* transition: 120ms; */
        }

        main > span {
            display: inline-flex;
            justify-content: center;
        }

        slot {
            display: block;
            margin-bottom: -.1em; /* remove descender line to make it look more centered*/
        }

        slot::slotted(*) {
            display: inline-block;
            margin-top: 0;
            margin-bottom: 0;
        }

        .hover {
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: var(--hoverBgdColor);
            visibility: hidden;
            opacity: 0;
            /* mix-blend-mode: saturation; */
            border-radius: var(--radius);
            /* transition: 120ms; */
        }

        @media (hover) {
            :host(:hover) .hover {
                opacity: 1;
                visibility: visible;
            }
        }

        /* b-icon,
        ::slotted(b-icon) {
            vertical-align: bottom;
        } */

        b-spinner {
            opacity: 0;
            visibility: hidden;
            --size: 1em;
            margin-left: -1.35em;
            margin-right: .35em;
            transition: 120ms;
        }

        :host([spin]) b-spinner {
            opacity: 1;
            visibility: visible;
            margin-left: 0;
        }

        :host([spin]) b-icon {
            display: none;
        }

        main b-icon {
            margin-right: .35em;
            margin-left: -.15em;
        }

        :host([stacked]) {
            --padding: .3em .5em .1em .5em;
        }

        :host([stacked]) main {
            display: inline-grid;
            align-content: center;
        }

        :host([stacked]) b-icon {
            font-size: 1.2em;
            margin: 0;
        }

        :host([stacked]) slot {
            font-size: .6em;
        }

        :host([stacked]) slot::slotted(*) {
            opacity: .5;
        }

        :host([stacked]) slot[name="icon"] {
            font-size: 1em;
            display: contents;
        }

        :host([stacked]) slot[name="icon"]::slotted(*) {
            opacity: 1;
        }

        :host([stacked]) b-spinner {
            font-size: 1.2em;
            margin-right: 0;
            margin-left: -1em;
        }
        :host([stacked][spin]) b-spinner {
            margin-left: 0;
        }

        :host([block]) {
            display: block;
            text-align: center
        }

        :host([block]) main {
            display: flex;
            justify-content: center
        }

        :host(:empty) main {
            --padding: .4em .5em;
        }

        :host(:empty) main b-icon {
            margin-left: 0;
            margin-right: 0;
        }

        /* offset play icon to make it appear more centered */
        :host(:empty) main b-icon[name="play"] {
			margin: 0 -.1em 0 .1em;
        }

        :host([color^="primary"])  { --color: var(--color-primary); }
        :host([color^="black"])  { --color: var(--black); }
        :host([color^="white"])  { --color: var(--white); --textColor: var(--black); }
        :host([color^="orange"]) { --color: var(--orange); }
        :host([color^="blue"])   { --color: var(--blue); }
        :host([color^="red"])    { --color: var(--red); }
        :host([color^="gray"])   { --color: var(--gray); }
        :host([color^="green"])  { --color: var(--green); }
        :host([color^="yellow"]) { --color: var(--yellow); }
        :host([color^="teal"])   { --color: var(--teal); }
        :host([color^="purple"]) { --color: var(--purple); }
        :host([color^="brown"])  { --color: var(--brown); }
        :host([color^="pink"])   { --color: var(--pink); }

        @media (hover){
        :host([color*="hover-black"]:hover)  { --color: var(--black); }
        :host([color*="hover-orange"]:hover) { --color: var(--orange); }
        :host([color*="hover-blue"]:hover)   { --color: var(--blue); }
        :host([color*="hover-red"]:hover)    { --color: var(--red); }
        :host([color*="hover-gray"]:hover)   { --color: var(--gray); }
        :host([color*="hover-green"]:hover)  { --color: var(--green); }
        :host([color*="hover-yellow"]:hover) { --color: var(--yellow); }
        :host([color*="hover-teal"]:hover)   { --color: var(--teal); }
        :host([color*="hover-purple"]:hover) { --color: var(--purple); }
        :host([color*="hover-brown"]:hover)  { --color: var(--brown); }
        :host([color*="hover-pink"]:hover)   { --color: var(--pink); }
        }

        :host([pill]) {
            --radius: 1em;
        }

        /* @media (hover) { */
        :host([outline]:not(:hover)) {
            --bgdColor: transparent;
            --textColor: var(--color);
        }
        /* } */

        /* :host([outline]:hover){
            --bgdColor: var(--color);
            --textColor: inherit;
        } */

        :host([text]),
        :host([clear]) {
            --bgdColor: transparent;
            --textColor: var(--color);
            --borderColor: transparent;
        }

        /* :host([text]) .hover,
        :host([clear]) .hover {
            display: none;
        } */

        :host([text]) {
            font-size: 1em;
            font-weight: normal;
        }

        @media (hover){
        :host([text]:hover),
        :host([clear]:hover) {
            --bgdColor: rgba(0,0,0,.05);
        }}

        :host([text].popover-open),
        :host([clear].popover-open) {
            --bgdColor: rgba(0,0,0,.05);
        }

        :host([xs]) { font-size: .6rem; }
        :host([sm]) { font-size: .8rem; }
        :host([lg]) { font-size: 1.2rem; }
        :host([xl]) { font-size: 1.4rem; }

        /* floating action btn */
        :host([fab]) {
            position: absolute;
            box-shadow: rgba(0,0,0,.4) 0 3px 10px;
            bottom: 1rem;
            right: 1rem;
            font-size: 1.4em;
            width: 2em;
            height: 2em;
            --radius: 2em;
        }
    `}

    render(){ return html`
        <div class="hover"></div>
        <main>
            <span>
                <b-spinner></b-spinner>
                <slot name="icon">
                    ${this.icon?html`<b-icon name="${this.icon}"></b-icon>`:''}
                </slot>
            </span>
            <slot></slot>
        </main>
    `}

	constructor(){
		super()
        this.icon = ''
        this.spin = false
	}

    firstUpdated(){
        this.addEventListener('click', ()=>{
            if( this.href )
                window.location = this.href
        }, true)
    }

}

customElements.define('b-btn', BtnElement)
