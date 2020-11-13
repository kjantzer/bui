import { LitElement, html, css } from "lit-element";

export default class Label extends LitElement {

    static get properties(){return {
        'filled': {type: String, reflect: true},
        'badge': {type: String, reflect: true},
        'outline': {type: String, reflect: true}
    }}

    static get styles(){return css`
        :host {
            position: relative;
            z-index: 1;
            display: inline-block;
            text-transform: uppercase;
            color: var(--b-label-color, rgba(0,0,0,.33));
            font-weight: bold;
            font-size: 1rem;
            line-height: 1rem;
            --dividerThickness: 1px;
            vertical-align: middle;
            border-radius: var(--radius, 0);

            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
        }

        :host([text]) {
            font-weight: normal;
            text-transform: none;
        }

        :host([hidden]) {
            display: none !important;
        }

        :host([filled]),
        :host([badge]),
        :host([outline]) {
            /* --bgd: #aaa;
            --color: #fff; */
            --bgd: rgba(var(--theme-rgb, 0,0,0), .5);
            --color: var(--theme-bgd, #fff);

            padding: 0.15em 0.3em 0.1em;
            --radius: 3px;
            font-size: .8rem;
            text-transform: none;
            background: var(--bgd);
            color: var(--color);
        }

        :host([xs]) { font-size: .6rem; line-height: .6rem; }
        :host([sm]) { font-size: .8rem; line-height: .8rem; }
        :host([lg]) { font-size: 1.2rem; line-height: 1.2rem; }
        :host([xl]) { font-size: 1.4rem; line-height: 1.4rem; }
        :host([xxl]) { font-size: 1.8rem; line-height: 1.8rem; }

        :host([outline]) {
            background: none;
            border: solid 1px;
            border-color: var(--bgd);
            --color: var(--bgd);
        }

        :host([badge]) {
            --radius: 30px;
            /* padding-left: .6em;
            padding-right: .6em; */
            padding-right: .45em;
            padding-left: .45em;
            min-width: .3em;
            text-align: center;
            min-height: 1em;
        }

        :host([dot]) {
            height: 6px;
            width: 6px;
            min-width: 0;
            min-height: 0;
            padding: 0;
        }

        :host([filled="clear"]), :host([badge="clear"]) {
            --bgd: transparent;
            --color: inherit;
        }
        
        :host([filled="black"]), :host([badge="black"]) { 
            --bgd: var(--theme-color, #333);
            --color: var(--theme-bgd, #fff)
        }
        
        :host([filled="white"]), :host([badge="white"]) {
            --bgd: var(--theme-bgd, #fff);
            --color: var(--theme-color, #333);
        }

        :host([filled="gray"]), :host([badge="gray"]) {
            --bgd: rgba(var(--theme-rgb, 0,0,0), .15);
            --color: rgba(var(--theme-rgb, 0,0,0), .5);
        }

        :host([filled="theme"]), :host([badge="theme"]) { --bgd: var(--theme); }
        :host([filled="blue"]), :host([badge="blue"]) { --bgd: var(--blue); }
        :host([filled="red"]), :host([badge="red"]) { --bgd: var(--red); }
        :host([filled="orange"]), :host([badge="orange"]) { --bgd: var(--orange); }
        :host([filled="green"]), :host([badge="green"]) { --bgd: var(--green); }
        :host([filled="pink"]), :host([badge="pink"]) { --bgd: var(--pink); }
        :host([filled="purple"]), :host([badge="purple"]) { --bgd: var(--deep-purple); }

        :host([filled="text"]), :host([badge="text"]) { 
            --bgd: var(--theme-color, #333);
            --color: var(--theme-bgd, #fff);
        }
        :host([filled="accent"]), :host([badge="accent"]) {
            --bgd: rgba(var(--theme-rgb, 0,0,0), .2);
            --color: var(--theme-color, #333);
        }
        

        :host([outline="clear"]) { --bgd: transparent; --color: inherit; }
        :host([outline="black"]) { --bgd: var(--theme-color,#333); }
        :host([outline="gray"]) { --bgd: var(--theme-color-accent, #ddd); }
        :host([outline="theme"]) { --bgd: var(--theme); }
        :host([outline="blue"]) { --bgd: var(--blue); }
        :host([outline="red"]) { --bgd: var(--red); }
        :host([outline="orange"]) { --bgd: var(--orange); }
        :host([outline="green"]) { --bgd: var(--green); }
        :host([outline="pink"]) { --bgd: var(--pink); }
        :host([outline="purple"]) { --bgd: var(--deep-purple); }

        .bgd {
            display: none;
            background: var(--bgd);
            opacity: .2;
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: var(--radius);
        }

        :host([muted]) {
            background: none;
            --color: var(--bgd);
        }

        :host([muted]) .bgd {
            display: block;
        }

        /* causes unwanted wrap on chrome */
        /* slot {
            display: flex;
        } */

        b-hr {
            display: none;
            grid-column: initial; /* remove default 100% width */
            margin: 0;
            width: auto;
            height: var(--dividerThickness);
        }

        b-hr:first-child {
            margin-right: 1em;
        }

        b-hr:last-child {
            margin-left: 1em;
        }

        :host([divider]) {
            display: grid;
            align-items: center;
            grid-template-columns: 0 auto 1fr;
        }

        :host([divider]) b-hr {
            display: block;
        }

        :host([divider="center"]) {
            grid-template-columns: 1fr auto 1fr;
        }

        :host([divider="right"]) {
            grid-template-columns: 1fr auto 0;
        }
    `}

    render(){return html`
        <div class="bgd"></div>
        <b-hr></b-hr>
        <slot></slot>
        <b-hr></b-hr>
    `}
}

customElements.define('b-label', Label)