import { LitElement, html, css, unsafeCSS } from 'lit'
import scrollbars from '../../helpers/scrollbars'
import Menu from '../menu'
import store from '../../util/store'
import range from '../../util/range'

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
        background-color: var(--list-cell-viewing-bgd, rgba(var(--theme-rgb), .1));
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
        background: var(--list-cell-bgd, var(--theme-bgd));
        z-index: 5;
    }

    ${unsafeCSS(host)} > [sticky]:before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        background: var(--list-cell-bgd, var(--theme-bgd));
    }

    ${unsafeCSS(host)} > [sticky]:after {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        background: var(--list-cell-sticky-bgd, var(--list-cell-bgd, var(--theme-bgd)));
    }

    ${unsafeCSS(host)} > [sticky]:first-child + [sticky] {
        left: var(--grid-col-1-width);
    }

    ${unsafeCSS(host)} > [sticky]:first-child + [sticky] + [sticky] {
        left: calc(var(--grid-col-1-width) + var(--grid-col-2-width));
    }

    ${unsafeCSS(host)} > [sticky="right"] {
        left: auto;
        right: 0;
        z-index: 4;
    }

    ${host==':host'
    ?unsafeCSS(`${host}(:hover)`)
    :unsafeCSS(`${host}:hover`)} > [sticky]:after {
        background: var(--list-cell-hover-bgd, var(--theme-bgd-accent2));
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
        this.colsHiddenDefault=[]
    }

    static get styles(){return [this.sharedStyles, css`

        ${scrollbars.hide()}

        :host {
            --list-cell-hover-bgd: transparent;
        }

        :host > div,
        :host > b-text,
        :host > span {
            font-size: var(--b-list-header-font-size, .75em);
            font-weight: bold;
        }
    `]}

    firstUpdated(){

        super.firstUpdated()

        scrollbars.stopWheelScrolling(this)

        if( this.slot != 'header') return

        let children = Array.from(this.shadowRoot.children)
        let gridTemplate = []

        let prevW = null
        let cols = children.map((el, i)=>{

            if( !isCell(el) ) return false

            let w = el.getAttribute('w') || prevW || false
            prevW = w
            
            return {width: w, header:el}

        }).filter(d=>d&&d.width!==false)

        
        cols.forEach((col, i)=>{

            let {width, header} = col

            col.label = header.getAttribute('label') 
                || header.textContent.trim().replace(/\n/g, ' - ').replace(/\s{2,}/g, ' ')
                || `Column ${i+1}`
            col.id = header.getAttribute('cid') || col.label
            col.num = i+1

            let colWidth = `--grid-col-${i+1}-width`
            
            this.parentElement.style.setProperty(colWidth, width)

            gridTemplate.push(`var(${colWidth})`)

            header.style.setProperty('visibility', `var(--grid-col-${i+1}-visibility, visible)`)
        })

        this.colsHidden = store.create(`b-list:${this.parentElement.key}:cols-hidden`, this.colsHiddenDefault)
        this.cols = cols

        this.parentElement.style.setProperty('--grid-template-cols', gridTemplate.join(' '))

        // get the row element class
        if( customElements.get(this.parentElement.rowElement) ){
            
            // set default method for applying custom css props
            customElements.get(this.parentElement.rowElement).applyGridStyleProps = function(row){

                // default to all children, so long as they aren't hidden
                let children = Array.from(row.shadowRoot?.children||[]).filter(el=>isCell(el))

                children.forEach((el, i)=>{
                    el.style.setProperty('visibility', `var(--grid-col-${i+1}-visibility, visible)`)
                    el.style.setProperty('height', `var(--grid-col-${i+1}-height, auto)`)
                })

            }
        }

        this.applyProps()
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

    contextMenu(e){
        this.showMenu(e)
    }

    async showMenu(e){

        let menu = this.cols.map(col=>{
            return {
                label: col.label,
                val: col.id,
                col,
            }
        })

        menu = [
            {divider: 'Show/hide columns'},
            {label: 'Show All', val: '', clearsAll: true},
            '-'
        ].concat(menu)

        let selected = await new Menu(menu, {
            multiple: 'always',
            iconSelected: 'visibility_off',
            iconDeselected: 'visibility',
            selected: this.colsHidden()
        }).popover(e)

        if( !selected || selected.length == 0 ) return

        if( !selected[0].val )
            this.colsHidden([])
        else{
            let cols = selected.map(d=>d.val)
            this.colsHidden(cols)
        }

        this.applyProps()
    }

    applyProps(){

        let parentEl = this.parentElement
        let hidden = this.colsHidden()

        this.cols.forEach(col=>{
            
            if( hidden?.includes(col.id) ){

                parentEl.style.setProperty(`--grid-col-${col.num}-width`, '0px', 'important')
                parentEl.style.setProperty(`--grid-col-${col.num}-height`, '0px')
                parentEl.style.setProperty(`--grid-col-${col.num}-visibility`, 'hidden')

            }else{
                parentEl.style.setProperty(`--grid-col-${col.num}-width`, col.width)
                parentEl.style.removeProperty(`--grid-col-${col.num}-height`)
                parentEl.style.removeProperty(`--grid-col-${col.num}-visibility`)
            }
        })
    }

})

export default customElements.get('b-list-header')


function isCell(el){
    return !el.hidden && el.tagName != 'STYLE' && el.getAttribute('cell') != 'no'
}

export function applyGrid(el, {start=1, end}={}){

    let children = Array.from(el.shadowRoot.children).filter(el=>isCell(el))

    if( !end ) end = children.length + start - 1

    let nums = range(start, end)

    el.style.setProperty('grid-template-columns', nums.map(num=>`var(--grid-col-${num}-width)`).join(' '))

    children.forEach((el, i)=>{
        let num = nums[i]
        el.style.setProperty('visibility', `var(--grid-col-${num}-visibility, visible)`)
        el.style.setProperty('height', `var(--grid-col-${num}-height, auto)`)
    })
}