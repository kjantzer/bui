import { LitElement, html, css } from 'lit-element'

customElements.define('b-hr', class extends LitElement{

    static get styles(){return css`
        :host {
            --bgd: var(--b-hr-bgd, var(--theme-bgd-accent, rgba(0,0,0,.1)));

            display: block;
            margin: var(--padding, 1em) auto;
            height: 1px;
            width: 100%;
            background: var(--bgd);
            
            /* full width */
            grid-column: 1/-1;
        }

        :host([hidden]) {
            display: none;
        }

        :host([thick]) {
            height: 4px;
        }

        :host([short]) {
            width: min(180px, 30%);
            max-width: 100%;
        }

        :host([vert]) {
            display: inline-block;
            vertical-align: middle;
            min-height: 1em;
            height: auto;
            width: 1px;
            margin: 0 var(--padding, .5em);
            align-self: stretch;
        }

        :host([pad="none"]) { --padding: 0em; }
        :host([pad="xs"]) { --padding: .25em; }
        :host([pad="sm"]) { --padding: .5em; }
        :host([pad="md"]) { --padding: 1.5em; }
        :host([pad="lg"]) { --padding: 2em; }

        :host([vert][thick]) {
            height: auto;
            width: 4px;
        }
    `}

    // dont support slotted content yet
    render(){return html``}

})

export default customElements.get('b-hr')