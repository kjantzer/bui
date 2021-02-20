import { LitElement, html, css } from 'lit-element'
import makeBtn, {cancelBtns} from './make-btn'

import Panel from '../panel'
window.panel = Panel // TEMP

customElements.define('b-dialog', class extends LitElement{

    static get properties(){return {
        icon: {type: String},
        pretitle: {type: String},
        title: {type: String},
        body: {type: String},

        accent: {type: String},
        closeBtn: {type: Boolean}
    }}

    static get styles(){return css`
        :host {
            display: inline-grid;
            grid-template-columns: auto 1fr;
            vertical-align: text-top;
            min-width: 200px;
            max-width: 100%;
            position:relative;
            background: var(--theme-bgd, #fff);
            border-radius: var(--radius);

            --radius: 5px;
            --pad: 1em;

            border: solid 1px var(--theme-bgd-accent); /* temp */
        }

        :host([color]) {
            --theme-text: white;
            --theme-text-rgb: 255,255,255;
            --b-btn-bgd: white;
            color: var(--theme-text);
            background-color: var(--color);
        }

        :host([color="red"]) { --color: var(--red); }
        :host([color="blue"]) { --color: var(--blue); }
        :host([color="green"]) { --color: var(--green); }

        :host([accent="red"]) { --accent: var(--red-700); }
        :host([accent="blue"]) { --accent: var(--blue); }
        :host([accent="green"]) { --accent: var(--green); }

        :host([color="red"][accent]) { --accent: var(--red-800); }
        :host([color="blue"][accent]) { --accent: var(--blue-800); }
        :host([color="green"][accent]) { --accent: var(--green-800); }

        :host([edge]) { box-shadow: 6px 0 0 0 var(--accent) inset; }
        :host([stack][edge]) { box-shadow: 0px 6px 0 0 var(--accent) inset; }

        :host([stack]) {
            grid-template-columns: 1fr;
        }

        :host([toast]) {
            grid-template-columns: auto 1fr auto;
            --icon-size: 1.2em;
        }

        aside {
            display: flex;
            justify-content: center;
            border-radius: var(--radius) 0 0 var(--radius);
            grid-row: span 2;
            /* color: var(--highlight-color, rgba(var(--theme-text-rgb, 0,0,0), .6)); */
        }

        aside ::slotted(svg) {
            height: 5em;
            width: auto;
        }

        aside ::slotted(*[fill]) {
            border-radius: var(--radius) 0 0 var(--radius);
        }
        
        aside ::slotted(*:not([fill])),
        aside b-icon {
            margin: var(--pad) 0 var(--pad) var(--pad);
        }

        :host([stack]) aside ::slotted(*:not([fill])),
        :host([stack]) aside b-icon {
            margin: var(--pad) var(--pad) 0 var(--pad);
        }

        :host([stack]) aside ::slotted(*[fill]) {
            border-radius: var(--radius) var(--radius) 0 0;
        }

        aside b-icon {
            --size: var(--icon-size, 2em);
            color: var(--accent);
            align-self: center;
        }

        :host([color][accent]) aside b-icon {
            background: var(--accent);
            padding: .5em;
            border-radius: 50%;
            color: var(--theme-text);
        }

        main {
            /* padding: 0 var(--pad); */
            margin: var(--pad);
        }

        .pretitle slot {
            font-size: .8em;
            font-weight: bold;
        }

        .title slot {
            font-size: 1.2em;
            font-weight: bold;
        }

        .title, .body {
            /* margin-top: var(--pad);
            margin-bottom: var(--pad); */
        }

        .body {
            color: rgba(var(--theme-text-rgb, 0,0,0), .6);
        }

        :host([color]) .body {
            color: rgba(var(--theme-text-rgb, 0,0,0), .8);
        }

        footer {
            display: flex;
            justify-content: flex-end;
            padding: calc(var(--pad) - .5em);
            margin-top: auto;
        }

        :host([toast]) footer {
            margin-top: inherit;
        }

        footer b-btn {
            text-transform: uppercase;
            line-height: 0;
            align-self: center;
        }

        .close-btn {
            position: absolute;
            top: calc(var(--pad) / 2);
            right: calc(var(--pad) / 2);
        }

        .close-btn:not(:hover) {
            color: rgba(var(--theme-text-rgb, 0,0,0), .3);
        }
    `}

    constructor(){
        super()

        // this.title = 'Dialog Title'
        // this.body = 'Body of the dialog box'
        // this.icon = 'info-circled'
    }

    render(){return html`

        ${this.closeBtn?html`
            <b-icon class="close-btn" name="cancel-circled"></b-icon>
        `:''}

        <aside>
            <slot name="icon">${this.icon?html`<b-icon square name="${this.icon}"></b-icon>`:''}</slot>
        </aside>
        <main>
            <div class="pretitle">
                <slot name="pretitle">${this.pretitle}</slot>
            </div>
            <div class="title">
                <slot name="title">${this.title}</slot>
            </div>
            <div class="body">
                <slot name="body">${this.body}</slot>
            </div>
        </main>
        <footer>
            <b-btn clear>Dismiss</b-btn>
        </footer>
    `}

})

export default customElements.get('b-dialog')