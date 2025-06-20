/*
    # Button

    ```html-preview
    <b-btn>Default Button</b-btn>
    <b-btn color="blue">Blue Button</b-btn>
    <b-btn color="red" outline>Outline Button</b-btn>
    <b-btn text>Text Button</b-btn>
    ```

    #### Attributes
    - `icon`
    - `color`
    - `outline`
    - `pill`
    - `text` - no button outline until hover
    - `clear` or `ghost`
    - `fab` - floating action button
    - `stacked`
    - `thin` - reduces top/bottom padding
    - `xs`, `sm`, `lg`, `xl`
    - `icon-only="mobile"` - label will be hidden on small devices

    #### Properties
    - `spin` - set to `true` to show a spinner
    - `spinning(doSpin)` - alias to ^
*/
import { LitElement, html, css } from 'lit';
import './spinner'
import './icon'
import {mediaQuery} from '../util/mediaQueries'

// note: not imported here cause it would require Popover and a lot more deps
// parent code can import tooltip element if its going to be used
// import './tooltip'

export default class BtnElement extends LitElement {

    static properties = {
        href: {type: String, reflect: true},
        value: {type: String, reflect: true},
        icon: { type: String },
        tooltip: {type: String},
        spin: {type: Boolean, reflect: true, attribute: 'spin'},
        spinicon: {type: Boolean, reflect: true},
        squareicon: {type: Boolean},
        rotateicon: {type: String}
    }

    static get styles(){ return css`
    
        :host{
            /*--red: var(--red-700);*/
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

            --radius: var(--b-btn-radius, 3px);
            --color: var(--b-btn-bgd, var(--theme-text, #000)) ;
            --bgdColor: var(--color);
            --hoverBgdColor: rgba(255,255,255,.1);
            --textColor: var(--b-btn-color, var(--theme-bgd, #fff));
            --borderColor: var(--color);
            --borderStyle: solid;
            --borderWidth: 1px;
            --padding: .4em .6em;

            display: inline-grid;
            position: relative;
            box-sizing: border-box;
            background: var(--bgdColor);
            color: var(--textColor);
            border-radius: var(--radius);
            cursor: pointer;
            transition: 
                color 160ms,
                background-color 160ms,
                border 160ms;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            font-size: var(--b-btn-font-size, .9rem);
            line-height: var(--b-btn-line-height, 1rem);
            font-weight: 600;
            font-family: var(--b-btn-font);
            outline: none;
            /* disables scrolling while pointer down*/
            touch-action: none;

            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
        }

        :host(:focus:not(:active):not(:hover)) {
            box-shadow: 0 0 0 2px var(--theme);
        }

        /* better hover/tap state on mobile */
        :host(:active) .hover {
            visibility: visible;
            opacity: 1;
        }

        /* hide by default */
        @media print {
            :host {
                display: none;
            }
        }

        :host([disabled]) {
            pointer-events: none !important;
            opacity: .5;
        }

        :host([hidden]) {
            display: none !important;
        }

        main {
            border-radius: inherit;
            position: relative;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            padding: var(--padding);
            box-sizing: border-box;
            /*padding-bottom: .3em;*/ /* remove descender line to make it look more centered*/
            text-overflow: ellipsis;
            border: var(--borderStyle) var(--borderWidth) var(--borderColor);
            min-width: 0;
            /* word-break: break-all; */
            /* transition: 120ms; */
            background: var(--bgdColor);
        }

        :host([thin]) {
            --padding: 0 .6em;
        }

        main > span {
            display: inline-flex;
            justify-content: center;
            line-height: 0;
        }

        main slot {
            display: block;
            margin-bottom: -.1em; /* remove descender line to make it look more centered*/
        }

        main slot::slotted(*) {
            margin-top: 0;
            margin-bottom: 0;
        }

        main slot::slotted(:where(span, div, main, aside, section)) {
            display: inline-block;
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
            border-radius: inherit;
            z-index: 10;
            
            /* transition: 120ms; */
        }

        @media (hover) {
            :host(:hover) .hover {
                opacity: 1;
                visibility: visible;
            }
        }

        b-icon {
            --size: 1em;
        }

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

        :host([iconafter]) main [part="icon-area"] {
            order: 1;
        }
        :host([iconafter]) main b-icon {
            margin-left: .35em;
            margin-right: -.15em;
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
            line-height: 1em;
        }

        :host([stacked]) slot::slotted(*) {
            opacity: var(--b-btn-stacked-label-opacity, .5);
        }

        :host([stacked]) slot[name="icon"] {
            font-size: 1em;
            display: contents;
        }

        :host([stacked]) slot[name="icon"]::slotted(*),
        :host([stacked]) slot[name="icon"] b-icon{
            opacity: var(--b-btn-stacked-icon-opacity, 1);
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

        :host(:empty),
        :host([empty]) {
            --padding: .4em .4em;
        }

        :host(:empty) main b-icon ,
        :host([empty]) main b-icon {
            margin-left: 0;
            margin-right: 0;
        }

        /* offset play icon to make it appear more centered */
        :host(:empty) main b-icon[name="play"],
        :host([empty]) main b-icon[name="play"] {
			margin: 0 -.1em 0 .1em;
        }

        :host([color^="primary"])  { --color: var(--theme); }
        :host([color^="theme"])  { --color: var(--theme); }
        :host([color^="theme-secondary"])  { --color: var(--theme-secondary); }
        :host([color^="black"])  { --color: var(--theme-text-accent, #222); --textColor: var(--theme-bgd, #fff); }
        :host([color^="white"])  { --color: var(--theme-bgd-accent2, #ddd); --textColor: var(--theme-text, #111); }
        :host([color^="bgd-accent"])  { --color: var(--theme-bgd-accent); --textColor: var(--theme-text); }
        :host([color^="orange"]) { --color: var(--orange); }
        :host([color^="deep-orange"]) { --color: var(--deep-orange); }
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
        :host([color*="hover-theme"]:hover)  { --color: var(--theme); }
        :host([color*="hover-theme-secondary"]:hover)  { --color: var(--theme-secondary); }
        :host([color*="hover-black"]:hover)  { --color: var(--black); }
        :host([color*="bgd-accent"]:hover)  { --color: color-mix(in srgb, var(--theme-bgd-accent), var(--theme-text) 10%); }
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
        :host([clear]), :host([ghost]) {
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

        @media (max-width: 599px) {
            :host([icon-only="mobile"]) slot.label {
                display: none;
            }
        }

        ${mediaQuery('sm', css`
            :host([icon-only="sm"]) slot.label {
                display: none;
            }
        `)}

        ${mediaQuery('md', css`
            :host([icon-only="md"]) slot.label {
                display: none;
            }
        `)}

        @media (hover){
        :host([text]:hover),
        :host([clear]:hover), :host([ghost]:hover) {
            --bgdColor: rgba(0,0,0,.05);
        }}

        :host([text].popover-open),
        :host([clear].popover-open), :host([ghost].popover-open) {
            --bgdColor: rgba(0,0,0,.05);
            box-shadow: 0 0 0 1px var(--theme) inset; /* border outline */
        }

        :host([xs]) { --b-btn-font-size: .6rem; }
        :host([sm]) { --b-btn-font-size: .8rem; }
        :host([lg]) { --b-btn-font-size: 1.2rem; }
        :host([xl]) { --b-btn-font-size: 1.4rem; }

        
        :host([lg="size"]) .label { font-size: 1rem; }
        :host([xl="size"]) .label { font-size: 1rem; }

        .label {
            font-size: var(--b-btn-label-font-size, var(--b-btn-font-size, 1rem));
        }
        

        :host([color="theme-gradient"]) {
            background: var(--theme-gradient, var(--bgdColor));
            color: var(--dark-text);
            --borderWidth: 0;
        }

        :host([color="theme-gradient"]) main {
            background: var(--theme-gradient, var(--bgdColor));
        }

        :host([fab][color="theme-gradient"]) main {
            border: none;
        }

        /* floating action btn */
        :host([fab]) {
            font-weight: normal;
            position: absolute;
            z-index: 100;
            box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),
                        0px 6px 10px 0px rgba(0,0,0,0.14),
                        0px 1px 18px 0px rgba(0,0,0,0.12);
            bottom: 1rem;
            right: 1rem;
            font-size: 1.4em;
            width: 2em;
            height: 2em;
            --radius: 2em;
            overflow: hidden;
        }

        :host([fab][pill]) {
            width: auto;
        }

        :host([fab]) b-spinner {
            margin-right: 0;
            margin-left: -1em;
        }

        :host([fab][spin]) b-spinner {
            margin-left: 0;
        }

        @keyframes shake {
            from,
            to {
                transform: translate3d(0, 0, 0);
            }

            15%,
            45%,
            75% {
                transform: translate3d(-.25em, 0, 0);
            }

            30%,
            60%,
            90% {
                transform: translate3d(.25em, 0, 0);
            }
        }

        :host(.shake) {
            animation-name: shake;
            animation-duration: 700ms;
            animation-fill-mode: both;
        }
    `}

    render(){ return html`
        <div class="hover" part="hover"></div>
        <main part="main">
            <span part="icon-area">
                <b-spinner ?spin=${this.spin}></b-spinner>
                <slot name="icon">
                    ${this.icon?html`
                        <b-icon part="icon" name="${this.icon}"
                            ?spin=${this.spinicon} 
                            rotate=${this.rotateicon}
                            ?square=${this.squareicon}></b-icon>
                    `:''}
                </slot>
            </span>
            <slot class="label" part="label"></slot>
            ${this.tooltip?html`
                <b-tooltip label>${this.tooltip}</b-tooltip>
            `:''}
        </main>
        <slot name="outer">${this.renderOuter()}</slot>
    `}

    renderOuter(){}

	constructor(){
		super()
        this.icon = ''
        this.tooltip = ''
        this.spin = false
        this.squareicon = true // I think best to default this?
	}

    firstUpdated(){
        super.firstUpdated()
        this.addEventListener('click', e=>{
            
            window.soundFX?.play('tinyTap', {gain: 0.1, ifMobile: true})

            this.onClick(e)
        }, true)
    }
    

    // for subclassing
    onClick(e){
        
        // Blackstone app pattern
        let goto = this.getAttribute('goto')
        if( goto && window.goTo )
            return goTo(goto)

        if( this.href ){
            e?.stopPropagation()
            if( this.getAttribute('target') == '_blank' || e.ctrlKey || e.metaKey )
                window.open(this.href)
            else
                window.location = this.href
        }
    }

    shake(){
        this.classList.add('shake')
        setTimeout(()=>{
            this.classList.remove('shake')
        },1000)
    }

    // allows for `e.currentTarget.spinning?.()`
    spinning(doSpin=true){
        this.spin = doSpin
    }

}

customElements.define('b-btn', BtnElement)
