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
        padding: var(--list-cell-padding-y, .75rem) var(--list-cell-padding-x, .75rem);
        box-sizing: border-box;
        border-bottom: solid 1px var(--border-color, rgba(var(--theme-text-rgb), .1));
    }

    ${unsafeCSS(host)} > [sticky] {
        border-bottom: solid 1px var(--border-color, rgba(var(--theme-text-rgb), .1));
    }

    
    ${host==':host'
    ?unsafeCSS(`${host}([viewing])`)
    :unsafeCSS(`${host}[viewing]`)} > * {
        background-color: var(--list-cell-viewing-bgd, rgba(var(--theme-rgb), .1));
    }
    
    ${host==':host'
    ?unsafeCSS(`${host}(:hover:not([viewing]):not([isselected]):not([slot="header"]))`)
    :unsafeCSS(`${host}:hover:not([viewing]):not([isselected]):not([slot="header"])`)} > * {
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
    
    ${unsafeCSS(host)} > [sep]:not([sep*="after"]),
    ${unsafeCSS(host)} > [sep*="before"] {
        border-left: solid var(--row-sep-width, 1px) var(--border-color, rgba(var(--theme-text-rgb), .1));
    }

    ${unsafeCSS(host)} > [sep*="after"] {
        border-right: solid var(--row-sep-width, 1px) var(--border-color, rgba(var(--theme-text-rgb), .1));
    }

    ${unsafeCSS(host)} > [sticky][sep]:not([sep*="after"]),
    ${unsafeCSS(host)} > [sticky][sep*="before"] {
        border-left: solid var(--row-sep-width, 1px) var(--border-color, rgba(var(--theme-text-rgb), .2));
    }

    ${unsafeCSS(host)} > [sep*="after"] {
        border-right: solid var(--row-sep-width, 1px) var(--border-color, rgba(var(--theme-text-rgb), .2));
    }

    ${unsafeCSS(host)} > [sep][thick],
    ${unsafeCSS(host)} > [sep*="thick"] {
        --row-sep-width: 4px;
    }

    ${unsafeCSS(host)} > *:first-child {
        padding-left: calc(var(--list-cell-padding-x, .5rem) * var(--list-cell-padding-x-cap, 2));
    }

    ${unsafeCSS(host)} > *:last-child {
        padding-right: calc(var(--list-cell-padding-x, .5rem) * var(--list-cell-padding-x-cap, 2));
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

    ${unsafeCSS(host)} > [sticky]:first-child + [sticky],
    ${unsafeCSS(host)} > [sticky="2"] {
        left: var(--grid-col-1-width);
    }

    ${unsafeCSS(host)} > [sticky]:first-child + [sticky] + [sticky],
    ${unsafeCSS(host)} > [sticky="3"] {
        left: calc(var(--grid-col-1-width) + var(--grid-col-2-width));
    }

    ${unsafeCSS(host)} > [sticky]:first-child + [sticky] + [sticky] + [sticky],
    ${unsafeCSS(host)} > [sticky="4"] {
        left: calc(var(--grid-col-1-width) + var(--grid-col-2-width) + var(--grid-col-3-width));
    }

    ${unsafeCSS(host)} > [sticky="right"] {
        left: auto;
        right: 0;
        z-index: 4;
    }

    ${host==':host'
    ?unsafeCSS(`${host}(:hover:not([slot="header"]))`)
    :unsafeCSS(`${host}:hover:not([slot="header"])`)} > [sticky]:after {
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

    :host-context([selection-on]) {
        padding-left: 2em;
    }
`
}

export function grayHeaderStyles(el='b-list-header'){ return css`
    ${unsafeCSS(el)}::part(cell) {
        font-size: 1em;
        font-weight: bold;
        --list-cell-padding-y: .75em;
        background-color: var(--divider-bgd, var(--theme-bgd-accent));
    }

    ${unsafeCSS(el)} {
        /*border-top: solid 1px rgba(var(--theme-text-rgb), .1);*/
        background-color: var(--divider-bgd, var(--theme-bgd-accent));
        --list-cell-sticky-bgd: var(--divider-bgd, var(--theme-bgd-accent));
    }

    ${unsafeCSS(el)}::part(selection-slot) {
        background-color: var(--divider-bgd, var(--theme-bgd-accent));
    }
`}

customElements.define('b-list-header', class extends LitElement{

    static get sharedStyles(){ return sharedStyles() }

    static get sharedFinderStyles(){ return css`

        ${this.sharedStyles}

        :host([slot="header"]) {
            padding-left: .5rem;
            padding-right: .5rem;
        }

        /*:host(:not([slot="header"])) {
            margin-left: .5rem;
            margin-right: .5rem;
        }*/

        :host(:not([slot="header"])) > * {
            border-bottom: none;
        }

        :host > *:first-child {
            border-radius: 4px 0 0 4px;
        }

        :host > *:last-child {
            border-radius: 0 4px 4px 0;
        }

        :host(:nth-child(even):not([isselected])) > * {
            background-color: var(--theme-bgd-accent2);
        }

        @media (hover){
            :host(:hover) > *,
            :host(.popover-open) > * {
                background-color: var(--theme-bgd-accent) !important;
            }

            :host([isselected]:hover) > *,
            :host(.popover-open[isselected]) > * {
                background-color: var(--list-cell-viewing-bgd, rgba(var(--theme-rgb), .2)) !important;
            }
        }
    `}

    constructor(){
        super()
        this.slot = "header"
        this.disableHideShowMenu = false
        this.changeSort = this.changeSort.bind(this)
        this.applySort = this.applySort.bind(this)
    }

    static properties = {
        disableHideShowMenu: {type: Boolean}
    }

    static get styles(){return [this.sharedStyles, grayHeaderStyles(), css`

        ${scrollbars.hide()}

        :host {
            position: relative;
            --list-cell-hover-bgd: transparent;
        }

        :host > div,
        :host > b-text,
        :host > span {
            font-size: var(--b-list-header-font-size, 1em);
            font-weight: bold;
        }

        :host([sm]) > div,
        :host([sm]) > b-text,
        :host([sm]) > span {
            font-size: var(--b-list-header-font-size, .75em);
        }

        [name="selection"] {
            display: none;
            background-color: var(--theme-bgd);
        }

        :host-context([selection-on]) [name="selection"],
        :host(:hover) [name="selection"] {
            display: block;
            position: absolute;
            left: 2px;
            top: 0;
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0;
            z-index: 5;
        }

        [name="selection"]::slotted(b-list-selection-btn) {
            color: inherit;
            z-index: 1000;
            width: calc(2rem - 2px);
        }

        [part="cell"] {
            
            --list-cell-padding-y: .75em;
            background-color: var(--divider-bgd, var(--theme-bgd-accent));
            white-space: nowrap;
            overflow: hidden;
        }

        :host {
            /*border-top: solid 1px rgba(var(--theme-text-rgb), .1);*/
            background-color: var(--divider-bgd, var(--theme-bgd-accent));
            --list-cell-sticky-bgd: var(--divider-bgd, var(--theme-bgd-accent));
        }

        [part="selection-slot"] {
            background-color: var(--divider-bgd, var(--theme-bgd-accent));
        }

        [sort] {
            cursor: pointer;
            display: flex;
            gap: .5em;
            justify-content: space-between
        }

        [sort]:not([sorted]):not(:hover) b-list-header-sort {
            display: none;
        }

        [sort][sorted="asc"] b-list-header-sort {
            --b-btn-icon-rotate: -90deg;
        }
    `]}

    get list(){ return this.parentElement }

    firstUpdated(){

        super.firstUpdated()

        scrollbars.stopWheelScrolling(this)

        if( this.slot != 'header') return

        let children = Array.from(this.shadowRoot.children)
        let gridTemplate = []

        // create list of column headers
        let prevW = null
        let cols = children.map((el, i)=>{

            if( !isCell(el) ) return false

            let w = el.getAttribute('w') || prevW || false
            prevW = w

            if(!el.part.contains('cell') )
                el.part.add('cell')
            
            return {width: w, el}

        }).filter(d=>d&&d.width!==false)

        let sorts = []
        let sortsByLabel = {}
        this.list.sorts?.map(sort=>{
            sortsByLabel[sort.attrs?.label||sort.key] = sort
        })

        // now apply formatting to all the headers (and gather additional data)
        cols.forEach((col, i)=>{

            let {width, el} = col

            col.label = el.getAttribute('label') 
                || el.textContent.trim().replace(/\n/g, ' - ').replace(/\s{2,}/g, ' ')
                || `Column ${i+1}`
            col.id = el.getAttribute('cid') || col.label
            col.num = i+1
            col.hide = el.getAttribute('hide') == 'never' ? false : (el.hasAttribute('hide')?true:undefined)

            // does this header label match a sort label?
            if( sortsByLabel[col.label] ){
                el.setAttribute('sort', sortsByLabel[col.label].key)
            }

            // is this header col linked to a sort?
            if( el.hasAttribute('sort') ){
                
                col.sort = el.getAttribute('sort')
                sorts.push(col.sort)
                el.addEventListener('click', this.changeSort)

                // add sort icon if not present (maybe view wanted to render differently)
                // TODO: make custom element changeable via prop?
                if( !el.querySelector('b-list-header-sort') ){
                    el.appendChild(document.createElement('b-list-header-sort'))
                }
            }

            let colWidth = `--grid-col-${i+1}-width`
            
            this.parentElement.style.setProperty(colWidth, width)

            gridTemplate.push(`var(${colWidth})`)

            el.style.setProperty('visibility', this.disableHideShowMenu ? 'visible' : `var(--grid-col-${i+1}-visibility, visible)`)
        })

        this.cols = cols
        this.colsHidden = store.create(`b-list:${this.parentElement.key}:cols-hidden`, this.colsHiddenByDefault)

        this.parentElement.style.setProperty('--grid-template-cols', gridTemplate.join(' '))

        // get the row element class
        if( customElements.get(this.parentElement.rowElement) ){
            
            // set default method for applying custom css props
            customElements.get(this.parentElement.rowElement).applyGridStyleProps = (row)=>{

                // default to all children, so long as they aren't hidden
                let children = Array.from(row.shadowRoot?.children||[]).filter(el=>isCell(el))

                children.forEach((el, i)=>{
                    el.style.setProperty('visibility', this.disableHideShowMenu ? 'visible' :`var(--grid-col-${i+1}-visibility, visible)`)
                    el.style.setProperty('height', this.disableHideShowMenu ? 'auto' : `var(--grid-col-${i+1}-height, auto)`)
                })

            }
        }

        this.applyProps()
        
        // we have sorts matched to one or more columns, so listen for changes and apply them
        if( sorts.length ){
            this.list.sorts.on('change', this.applySort)
            this.applySort()
        }
        
    }

    get colsHiddenByDefault(){
        return this.cols.filter(col=>col.hide).map(col=>col.id)
    }

    render(){return html`
        ${this.content()}
    `}

    content(){
        let rowEl = customElements.get(this.parentElement.rowElement)
        if( !rowEl ) return html``

        let styles = rowEl.sharedStyles || this.constructor.sharedStyles
        let render = (this.slot&&rowEl[this.slot]&&rowEl[this.slot].call(this.parentElement.host||this.parentElement)) || ''

        return html`
            ${render}
            <slot part="selection-slot" name="selection"></slot>
            <style>${styles}</style>
        `
    }

    changeSort(e){

        if( e.target.slot == 'control' ) return
        
        let key = e.currentTarget.getAttribute('sort')
        let sort = this.list.sorts.get(key)

        let values = this.list.sorts.value
        let val = values[key]

        // if( e.metaKey || e.ctrlKey ) // TODO: maybe later - ui needs updated to show more than one sort arrow
        //     values[key] = {desc: true}
        // else
            values = {[key]: {desc: val ? !val.desc : sort.attrs?.desc}}
        
        this.list.sorts.value = values
    }

    applySort(){

        let sort = this.list?.sorts.find(sort=>sort.selected)

        this.cols.map(col=>{

            if( col.sort == sort.key ){
                col.el.setAttribute('sorted', sort.isDesc ? 'desc' : 'asc')
            }else
                col.el.removeAttribute('sorted')
        })

    }

    contextMenu(e){
        this.showMenu(e)
    }

    async showMenu(e){
        if(this.disableHideShowMenu) return
        let menu = this.cols.map(col=>{
            if( col.hide === false )
                return {title: col.label}

            return {
                label: col.label,
                val: col.id,
                col,
            }
        })

        let hasDefaultHidden = this.cols.find(col=>col.hide)

        menu = [
            {divider: 'Show/hide columns'},
            {label: 'Show All', val: '', clearsAll: true},
            (hasDefaultHidden?{label: 'Reset to Default', val: 'reset', clearsAll: true}:''),
            '-'
        ].concat(menu)

        let selected = await new Menu(menu, {
            multiple: 'always',
            iconSelected: 'visibility_off',
            iconDeselected: 'visibility',
            selected: this.colsHidden()
        }).popOver(e)

        if( !selected ) return

        if( selected[0]?.val == 'reset' )
            this.colsHidden(this.colsHiddenByDefault)
        else if( selected.length == 0 || !selected[0].val )
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
    return !el.hidden && !el.slot && !['STYLE', 'SLOT'].includes(el.tagName) && el.getAttribute('cell') != 'no' //&& el.checkVisibility()
    // return !el.hidden && el.tagName != 'STYLE' && el.getAttribute('cell') != 'no'
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


// import { LitElement, html, css } from 'lit'

customElements.define('b-list-header-sort', class extends LitElement{

    static properties = {
        icon: {type: String}
    }

    static styles = css`
        :host {
            display: block;
            line-height: 0;
            --b-btn-icon-rotate: 90deg;
        }
    `

    constructor(){
        super()
        this.icon = 'arrow_right_alt' // TODO: global customize?
    }

    render(){return html`
        <b-icon name=${this.icon}></b-icon>
    `}

})

// export default customElements.get('b-list-header-sort')