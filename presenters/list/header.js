import { LitElement, html, css, unsafeCSS } from 'lit'
import scrollbars from '../../helpers/scrollbars'

export function sharedStyles(host=':host'){return css`
    ${unsafeCSS(host)} {
        display: grid;
        grid-template-columns: var(--grid-template-cols);
    }

    ${unsafeCSS(host)} > * {
        position: relative;
        padding: var(--list-cell-padding-y, .5rem) var(--list-cell-padding-x, .5rem);
        box-sizing: border-box;
        border-bottom: solid 1px var(--border-color, rgba(var(--theme-text-rgb), .1));
    }

    
    ${host==':host'
    ?unsafeCSS(`${host}([viewing])`)
    :unsafeCSS(`${host}[viewing]`)} > * {
        background-color: var(--list-cell-viewing-bgd, rgba(var(--theme-rgb), .1))
    }
    
    ${host==':host'
    ?unsafeCSS(`${host}(:hover:not([viewing]):not([isselected]))`)
    :unsafeCSS(`${host}:hover:not([viewing]):not([isselected])`)} > * {
        background-color: var(--list-cell-hover-bgd, var(--theme-bgd-accent2))
    }

    ${host==':host'
    ?unsafeCSS(`${host}(.popover-open)`)
    :unsafeCSS(`${host}.popover-open`)} > * {
        background-color: var(--list-cell-hover-bgd, var(--theme-bgd-accent2))
    }

    :host([viewing]:hover) > * {
        background-color: var(--list-cell-viewing-bgd, rgba(var(--theme-rgb), .12))
    }
    
    ${unsafeCSS(host)} > [sep]:not([sep="after"]),
    ${unsafeCSS(host)} > [sep="before"] {
        border-left: solid var(--row-sep-width, 1px) var(--border-color, rgba(var(--theme-text-rgb), .1));
    }

    ${unsafeCSS(host)} > [sep="after"] {
        border-right: solid var(--row-sep-width, 1px) var(--border-color, rgba(var(--theme-text-rgb), .1));
    }

    ${unsafeCSS(host)} > [sep][thick] {
        --row-sep-width: 4px;
    }

    ${unsafeCSS(host)} > *:first-child {
        padding-left: calc(var(--list-cell-padding-x, .5rem) * 2);
    }

    ${unsafeCSS(host)} > *:last-child {
        padding-right: calc(var(--list-cell-padding-x, .5rem) * 2);
    }

    ${unsafeCSS(host)} > [sticky] {
        position: sticky;
        left: 0;
        background: var(--theme-bgd);
        z-index: 5;
    }

    ${host==':host'
    ?unsafeCSS(`${host}([viewing])`)
    :unsafeCSS(`${host}[viewing]`)} > [sticky]:before,
    ${host==':host'
    ?unsafeCSS(`${host}([isselected])`)
    :unsafeCSS(`${host}[isselected]`)} > [sticky]:before {
        content: '';
        width: 100%;
        height: 100%;
        background-color: var(--list-cell-viewing-bgd, rgba(var(--theme-rgb), .1));
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
    }
`
}

customElements.define('b-list-header', class extends LitElement{

    static get sharedStyles(){ return sharedStyles() }

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

        :host {
            --list-cell-hover-bgd: transparent;
        }

        :host > div,
        :host > b-text,
        :host > span {
            font-size: .75em;
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

        let gridTemplate = widths.map((width,i)=>{
            let prop = `--grid-col-${i+1}-width`
            this.parentElement.style.setProperty(prop, width)    
            return `var(${prop})`
        }).join(' ')

        this.parentElement.style.setProperty('--grid-template-cols', gridTemplate)
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