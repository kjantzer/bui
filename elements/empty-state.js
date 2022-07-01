/*
    https://undraw.co/illustrations
*/
import { LitElement, html, css } from "lit";

export default class EmptyState extends LitElement {

    static get properties(){return {
        value: {type: String}
    }}

    static get styles(){return css`
        :host {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: var(--b-empty-state-color, rgba(55,71,79,.2));
            font-size: 2em;
            text-align: center;
            padding: 1em;
            box-sizing: border-box;
            line-height: 1.2em;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }

        :host([ondark]) {
            color: rgba(255,255,255,.1);
        }

        :host([dashed]) {
            border: dashed 1px;
        }

        :host([static]) {
            position: static;
            height: auto;
            min-height: 1em;
        }

        :host([nopad]) {
            padding: 0;
        }

        :host([hidden]) {
            display: none;
        }

        :host([inline]) {
            display: inline-flex;
        }

        :host([xs]) { font-size: .8em; }
        :host([sm]) { font-size: 1em; }
        :host([md]) { font-size: 1.4em; }
        :host([lg]) { font-size: 3em; }

        :host([must-be="first"]:not(:first-child)),
        :host([if="first"]:not(:first-child)) {
            display: none !important;
        }

        :host([if="second"]:not(:nth-child(2))){
            display: none !important;
        }

        :host([must-be="last"]:not(:last-child)),
        :host([if="last"]:not(:last-child)) {
            display: none !important;
        }
    `}

    render(){return html`
        <slot>${this.value}</slot>
    `}
}

customElements.define('b-empty-state', EmptyState)