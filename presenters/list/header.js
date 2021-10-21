import { LitElement, html, css } from 'lit-element'
import scrollbars from '../../helpers/scrollbars'

customElements.define('b-list-header', class extends LitElement{

    static get sharedStyles(){ return css`
        :host {
            display: grid;
            grid-template-columns: var(--grid-template-cols);
        }

        :host > * {
            position: relative;
            padding: .5rem;
            box-sizing: border-box;
            border-bottom: solid 1px var(--border-color, rgba(var(--theme-text-rgb), .1));
        }
    `}

    static get sharedFinderStyles(){ return css`

        ${this.sharedStyles}

        :host([slot="header"]) {
            padding-left: .5rem;
            padding-right: .5rem;
        }

        :host(:not([slot="header"])) {
            margin-left: .5rem;
            margin-right: .5rem;
        }

        :host(:not([slot="header"])) > * {
            border-bottom: none;
        }

        :host > *:first-child {
            border-radius: 4px 0 0 4px;
        }

        :host > *:last-child {
            border-radius: 0 4px 4px 0;
        }

        :host(:nth-child(even)) > * {
            background-color: var(--theme-bgd-accent2);
        }

        @media (hover){
            :host(:hover) > *,
            :host(.popover-open) > * {
                background-color: var(--theme-bgd-accent)
            }
        }
    `}

    constructor(){
        super()
        this.slot = "header"
    }

    static get styles(){return [this.sharedStyles, css`

        ${scrollbars.hide()}

        :host > div,
        :host > b-text,
        :host > span {
            font-size: .8em;
            font-weight: bold;
        }
    `]}

    firstUpdated(){
        scrollbars.stopWheelScrolling(this)

        if( this.slot != 'header') return

        let children = Array.from(this.shadowRoot.children)

        let prevW = null
        let widths = children.map(c=>{

            if( c.tagName == 'STYLE' ) return false

            let w = c.getAttribute('w') || prevW || false
            prevW = w

            return w

        }).filter(w=>w!==false)

        this.parentElement.style.setProperty('--grid-template-cols', widths.join(' '))
    }

    render(){return html`
        ${this.content()}
    `}

    content(){
        let rowEl = customElements.get(this.parentElement.rowElement)
        if( !rowEl ) return html``

        let styles = rowEl.sharedStyles || this.constructor.sharedStyles
        let render = (this.slot&&rowEl[this.slot]&&rowEl[this.slot].call(this.parentElement)) || ''

        return html`
            <style>${styles}</style>
            ${render}
        `
    }
})

export default customElements.get('b-list-header')