// TODO: add css vars and/or props for borders
import { LitElement, html, css } from 'lit'
import '../helpers/lit/selectors'

function isCell(el){
    return !el.hidden && el.tagName != 'STYLE' && el.getAttribute('cell') != 'no' && el.checkVisibility()
}

customElements.define('b-table', class extends LitElement{

    static styles = css`
        :host {
            display: grid;
            position:relative;
            border: solid 1px var(--theme-bgd-accent);
            overflow: auto;
        }

        header {
            position: sticky;
            top: 0;
        }

        ::slotted(*) {
            display: grid;
            grid-template-columns: var(--table-template-cols);
        }

        ::slotted(*:not(:last-child)) {
            border-bottom: solid 1px var(--theme-bgd-accent);
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

