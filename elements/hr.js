import { LitElement, html, css } from 'lit-element'

customElements.define('b-hr', class extends LitElement{

    static get styles(){return css`
        :host {
            --bgd: rgba(0,0,0,.1);

            display: block;
            margin: 1em auto;
            height: 1px;
            width: 100%;
            background: var(--bgd);
            
            /* full width */
            grid-column: 1/-1;
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
    `}

    // dont support slotted content yet
    render(){return html``}

})

export default customElements.get('b-hr')