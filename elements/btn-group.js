/*
    # Button Group

    Use with `<b-btn>` elements to group them together (alters the styling to be grouped)

    ```html-preview
    <b-btn-group>
        <b-btn>One</b-btn>
        <b-btn>Two</b-btn>
    </b-btn-group>
    ```
*/
import { LitElement, html, css } from 'lit'

customElements.define('b-btn-group', class extends LitElement{

    static get styles(){return css`
        :host {
            display: inline-flex;
        }

        :host([block]) {
            display: flex;
        }

        ::slotted([block]) {
            flex-grow: 1;
        }

        :host([hidden]) {
            display: none;
        }

        ::slotted(*:first-child:not(:last-child)){
            border-radius: var(--radius) 0 0 var(--radius);
        }

        ::slotted(*:not(:first-child):not(:last-child)){
            border-radius: 0;
            border-left: solid 1px var(--theme-bgd);
        }

        ::slotted(*:last-child:not(:first-child)){
            border-radius: 0 var(--radius) var(--radius) 0;
            border-left: solid 1px var(--theme-bgd);
        }

        ::slotted(*:not(:first-child)[clear]) {
            border-left: none;
        }


        :host([vert]) {
            flex-direction: column;
        }

        :host([vert]) ::slotted(*:first-child:not(:last-child)){
            border-radius: var(--radius) var(--radius) 0 0;
        }

        :host([vert]) ::slotted(*:not(:first-child):not(:last-child)){
            border-radius: 0;
            border-top: solid 1px var(--theme-bgd);
            border-left: none;
        }

        :host([vert]) ::slotted(*:last-child:not(:first-child)){
            border-radius: 0 0 var(--radius) var(--radius);
            border-top: solid 1px var(--theme-bgd);
            border-left: none;
        }
    `}

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-btn-group')