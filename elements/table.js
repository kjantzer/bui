/*
    # Table

    Create simple tables with a header

    ```html-preview
    <b-table>
        <b-table-row slot="header">
            <b-text w="100px">ID</b-text>
            <b-text w="2fr">Title</b-text>
            <b-text w="1fr">Meta</b-text>
        </b-table-row>
        <b-table-row>
            <b-text>1234</b-text>
            <b-text>Some record</b-text>
            <b-text>data</b-text>
        </b-table-row>
    </b-table>
    ```
*/
// TODO: add css vars and/or props for borders
import { LitElement, html, css } from 'lit'
import '../helpers/lit/selectors'

function isCell(el){
    return !el.hidden && !el.slot && el.tagName != 'STYLE' && el.getAttribute('cell') != 'no' 
    // cell should be visible, unless the parent isn't either (assume rendering in a few not visible yet; ie b-tabs)
    && (el.checkVisibility() || !el.parentElement.checkVisibility())
}

customElements.define('b-table', class extends LitElement{

    static styles = css`
        :host {
            display: grid;
            position:relative;
            border: solid 1px var(--table-border-color, var(--theme-bgd-accent));
            overflow: auto;
            border-radius: var(--b-table-radius, 0px);
        }

        :host([hidden]) {
            display: none;
        }

        :host([rounded]) {
            border-radius: var(--b-table-rounded-radius, 4px);
        }

        header {
            position: sticky;
            top: 0;
            z-index: 10;
        }

        ::slotted(*:not(b-table-row):not([hidden])) {
            display: grid;
            grid-template-columns: var(--table-template-cols);
        }

        ::slotted([colspan]) {
            grid-template-columns: 1fr;
        }

        ::slotted(*:not(:last-child)) {
            border-bottom: solid 1px var(--table-border-color, var(--theme-bgd-accent));
        }
    `

    applyHeader(){
        let header = this.$$('[name="header"]', true).assignedElements()?.[0]
        
        // NOTE: some of this logic/idea take from list/header
        let prevW = '1fr'
        let headerCells = Array.from(header?.children)?.map?.(el=>{

            if( !isCell(el) ) return false

            let w = el.getAttribute('w') || prevW || false
            prevW = w

            if(!el.part.contains('cell') )
                el.part.add('cell')
            
            return {width: w, header:el}
        }).filter(d=>d?.width)

        let gridTemplate = []
        headerCells.map((cell, i)=>{

            let colWidth = `--table-col-${i+1}-width`
            
            this.style.setProperty(colWidth, cell.width)

            gridTemplate.push(`var(${colWidth})`)

        })

        this.style.setProperty('--table-template-cols', gridTemplate.join(' '))
    }

    firstUpdated(){
        this.$$('[name="header"]', true).addEventListener('slotchange', e=>{
            this.applyHeader()
        })
    }

    render(){return html`
        <header><slot name="header"></slot></header>
        <slot></slot>
    `}

})

export default customElements.get('b-table')

