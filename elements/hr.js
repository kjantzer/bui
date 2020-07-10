import { LitElement, html, css } from 'lit-element'

customElements.define('b-hr', class extends LitElement{

    static get styles(){return css`
        :host {
            --bgd: var(--b-hr-bgd, rgba(0,0,0,.1));

            display: block;
            margin: 1em auto;
            height: 1px;
            width: 100%;
            background: var(--bgd);
            
            /* full width */
            grid-column: 1/-1;
        }

        :host([thick]) {
            height: 4px;
        }

        :host([short]) {
            width: 180px;
            max-width: 100%;
        }

        :host([vert]) {
            display: inline-block;
            vertical-align: middle;
            min-height: 1em;
            height: auto;
            width: 1px;
            margin: 0 .5em;
            align-self: stretch;
        }

        :host([vert][thick]) {
            height: auto;
            width: 4px;
        }
    `}

    // dont support slotted content yet
    render(){return html``}

})

export default customElements.get('b-hr')