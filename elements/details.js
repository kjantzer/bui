/*
    Details - mimics the native `<details>` element
*/
import { LitElement, html, css } from 'lit'

customElements.define('b-details', class extends LitElement{

    static properties = {
        open: {type: Boolean, reflect: true}
    }

    static styles = css`
        :host {
            display: grid;
            row-gap: .5em;
        }

        .summary {
            display: grid;
            grid-template-columns: 1em 1fr;
            gap: .25em;
        }

        .content {
            display: block;
        }

        :host([nest]) .content {
            margin-left: 1.25em;
        }

        :host(:not([open])) .content {
            display: none;
            content-visibility: hidden; /* chrome/edge only */
        }

        .arrow {
            vertical-align: bottom;
            color: var(--theme-text-accent);
            transition: rotate 120ms;
            padding: 0.25em;
            margin: -0.25em;
            border-radius: 50%;
        }

        .arrow::part(svg) {
            transform: scale(1.2);
        }

        :host([open]) .arrow {
            rotate: 90deg;
        }

        :host([noicon]) [name="icon"] {
            display: none;
        }

        .arrow:hover {
            cursor: pointer;
            background-color: var(--theme-bgd-accent2);
            border-radius: 50%;
        }
    `

    firstUpdated(){
        let summaryElements = this.shadowRoot.querySelector('slot').assignedElements()

        // set first child as the summary if no summary set
        // TODO: improve this for if the element re-renders? should this logic fire again?
        if( summaryElements.length == 0 ){
            if( this.children[0] )
                this.children[0].slot = 'summary'
        }
    }

    render(){return html`
        <div class="summary" part="summary">
            <slot name="icon" @click=${this.toggle}>
                <b-icon square name="chevron_right" class="arrow" part="arrow"></b-icon>
            </slot>
            <slot name="summary" @click=${this.maybeToggle}></slot>
        </div>
        <slot class="content"></slot>
    `}

    toggle(){
        this.open = !this.open
    }

    maybeToggle(e){
        let topEl = e.target
        while( topEl && topEl.slot != 'summary' )
            topEl = topEl.parentElement

        if( topEl?.hasAttribute('toggles') )
            this.toggle()
    }

})

export default customElements.get('b-details')