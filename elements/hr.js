import { LitElement, html, css } from 'lit'

customElements.define('b-hr', class extends LitElement{

    static get styles(){return css`
        :host {
            --bgd: var(--b-hr-bgd, var(--theme-bgd-accent, rgba(0,0,0,.1)));

            display: block;
            margin: var(--padding, 1em) auto;
            height: var(--b-hr-height, 1px);
            min-width: 1em;
            flex-grow: 1;
            background: var(--bgd);
            
            /* full width */
            grid-column: 1/-1;
        }

        :host-context(b-grid){
            margin: var(--padding, 1em) 0;
        }

        :host([dashed]) {
            background: linear-gradient(to right, transparent 50%, var(--theme-bgd) 50%), var(--bgd);
            background-size: var(--dash-size, 10px) 2px, 100% 2px;
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
            margin: var(--padding, 1em) auto !important;
        }

        :host([vert]) {
            display: inline-block;
            vertical-align: middle;
            min-width: 0;
            min-height: 1em;
            height: auto;
            width: 1px;
            margin: 0 var(--padding, .5em);
            align-self: stretch;
            flex-grow: 0;
        }

        :host([pad="0"]), :host([pad="none"]) { --padding: auto; }
        :host([pad="xs"]) { --padding: .25em; }
        :host([pad="sm"]) { --padding: .5em; }
        :host([pad="md"]) { --padding: 1.5em; }
        :host([pad="lg"]) { --padding: 2em; }

        :host([vert][thick]) {
            height: auto;
            width: 4px;
        }

        :host([dot]) {
            min-height: 0;
            min-width: 0;
            width: .5em;
            height: .5em;
            border-radius: 1em;
            align-self: auto;
        }

        :host([dot][thick]) {
            width: 1em;
            height: 1em;
        }
    `}

    // dont support slotted content yet
    render(){return html``}

})

export default customElements.get('b-hr')