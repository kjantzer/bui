/*
    Group By popover (a sheet on phones and touch-only tablets, dragged down to close); opened by the toolbar's group by btn

    - the groupings in one list: the ones on first, in the order they group (drag to reorder: anywhere on the
      row with a mouse, by the handle on touch screens), then the others
    - tap a grouping to turn it on or off; the list regroups as it changes

    ```js
    GroupByPopover.open(groupByView, btn)
    ```
*/
import { LitElement, html, css } from 'lit'
import {repeat} from 'lit/directives/repeat.js'
import Popover from '../../popover'
import Panel from '../../panel'
import device from '../../../util/device'

export default class GroupByPopover extends LitElement {

    static properties = {
        sheet: {type: Boolean, reflect: true},
        dragKey: {type: String}
    }

    static open(view, target){

        let el = view.__popover || new GroupByPopover()
        view.__popover = el
        el.view = view

        if( el.isOpen ) return el.requestUpdate()

        // a sheet on phones and touch-only tablets (dragged down to close)
        if( device.isSmall || device.isTouchOnly ){
            el.sheet = true
            new Panel(el, {
                title: 'Group By',
                anchor: 'bottom',
                animation: 'rise',
                width: device.isSmall ? '100%' : 'min(480px, 100%)',
                height: 'auto',
                onClose: ()=>{ el.isOpen = false } // (no return value: returning false keeps a panel open)
            }).open()
        }else{
            el.sheet = false
            new Popover(target, el, {
                width: '320px',
                maxHeight: '75vh',
                align: 'bottom-start',
                overflowBoundry: 'window',
                onClose: ()=>{ el.isOpen = false }
            })
        }

        el.isOpen = true
        return el
    }

    static styles = css`
        :host {
            display: block;
            background: var(--theme-bgd);
            color: var(--theme-text);
            user-select: none;
            -webkit-user-select: none;
            max-height: inherit;
            overflow: auto;
        }

        /* (room for the sheet's grab handle and the home indicator) */
        :host([sheet]) {
            padding-top: .6rem;
            padding-bottom: env(safe-area-inset-bottom, 0px);
            max-height: 85vh;
        }

        header {
            display: flex;
            align-items: center;
            gap: .5rem;
            padding: .6rem .6rem .25rem 1rem;
            min-height: 2.5rem;
        }

        header .title {
            font-weight: 600;
        }

        header .hint {
            flex: 1;
            font-size: .75rem;
            color: var(--theme-text-accent);
        }

        .list {
            padding: .25rem .4rem .6rem;
        }

        .divider {
            height: 1px;
            margin: .4rem .6rem;
            background: var(--theme-bgd-accent);
        }

        /* a grouping (rows are like menu items) */
        .option {
            position: relative;
            display: flex;
            align-items: center;
            gap: .6rem;
            margin: 2px 0;
            padding: .5rem .6rem;
            border-radius: .6rem;
            cursor: pointer;
            transition: transform 160ms ease;
        }

        :host([sheet]) .option {
            padding: .7rem .6rem;
        }

        @media (hover) {
            .option:hover {
                background: var(--theme-bgd-accent);
            }
        }

        /* dragging: the row follows the pointer; the others slide to make room (see dragMove) */
        .option[dragging] {
            z-index: 1;
            transition: none;
            background: color-mix(in srgb, var(--theme) 12%, var(--theme-bgd));
        }

        :host([dragging]) .option {
            cursor: grabbing;
        }

        .handle {
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.4em;
            margin: -.5rem -.25rem;
            padding: .5rem .25rem;
            color: var(--theme-text-accent);
            cursor: grab;
            touch-action: none; /* (the drag is ours, not a scroll; no-swipe-close keeps the sheet from closing) */
        }

        .option[dragging] .handle {
            cursor: grabbing;
        }

        /* (keeps labels lined up with the rows that are on) */
        .handle[hidden] {
            display: inline-flex;
            visibility: hidden;
        }

        /* with a mouse the whole row drags (see rowDown); the handle is for touch screens (and the phone sheet) */
        @media (pointer: fine) {
            :host(:not([sheet])) .handle {
                display: none;
            }
        }

        /* on/off: empty box when off, a check when on */
        .box {
            flex-shrink: 0;
            width: 1.5em;
            height: 1.5em;
            border-radius: .4em;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            border: solid 2px var(--theme-text-accent);
            opacity: .6;
        }

        .option[active] .box {
            opacity: 1;
            border: none;
            background: var(--theme);
            color: var(--theme-bgd, #fff);
        }

        .box b-icon {
            --size: 1em;
        }

        .label {
            flex: 1;
            min-width: 0;
        }

        .order {
            flex-shrink: 0;
            min-width: 1.5em;
            text-align: center;
            font-size: .75em;
            font-weight: 600;
            color: var(--theme-text-accent);
        }

        .note {
            margin: 0 1rem .75rem;
            font-size: .75rem;
            color: var(--theme-text-accent);
        }
    `

    // [{val, label, on}] in the view's order
    get options(){ return this.view.valuesList || [] }
    get active(){ return this.options.filter(d=>d.on) }
    get inactive(){ return this.options.filter(d=>!d.on) }

    // the view saves it and the list regroups
    setValue(options){
        this.view.value = options.map(d=>[d.val, d.on ? true : 0])
        this.view.list?.reload()
        this.view.list?.toolbar?.requestUpdate() // (its btn shows when grouped)
        this.requestUpdate()
    }

    render(){
        if( !this.view ) return ''

        let active = this.active
        let inactive = this.inactive

        return html`
            <header>
                <span class="title">Group By</span>
                <span class="hint">${active.length > 1 ? 'Drag to change the order' : ''}</span>
                <b-btn clear sm color="theme" ?disabled=${!active.length} @click=${this.clear}>None</b-btn>
            </header>

            <div class="list">
                ${repeat(active, d=>d.val, (d, i)=>this.renderOption(d, i+1))}
                ${active.length && inactive.length ? html`<div class="divider"></div>` : ''}
                ${repeat(inactive, d=>d.val, d=>this.renderOption(d))}
            </div>

            ${active.length ? html`
                <div class="note">Rows may not change if they're the same for the groupings chosen</div>
            `:''}
        `
    }

    renderOption(d, order){
        let active = !!order

        return html`
            <div class="option" ?active=${active} ?dragging=${this.dragKey == d.val} data-key=${d.val}
                @pointerdown=${e=>active && this.rowDown(e, d)}
                @click=${()=>this.toggle(d)}>
                <span class="handle" no-swipe-close ?hidden=${!active} title="Drag to change the order"
                    @pointerdown=${e=>this.dragStart(e, d)} @click=${e=>e.stopPropagation()}>
                    <b-icon name="drag_indicator"></b-icon>
                </span>
                <span class="box">${active ? html`<b-icon name="check"></b-icon>` : ''}</span>
                <span class="label">${d.label}</span>
                ${active && this.active.length > 1 ? html`<span class="order">${order}</span>` : ''}
            </div>
        `
    }

    // turned on: groups after the ones already on
    toggle(d){
        if( this.dragged ) return // (the click at the end of a row drag)
        let active = this.active.filter(o=>o.val != d.val)
        let inactive = this.inactive.filter(o=>o.val != d.val)

        if( d.on )
            this.setValue([...active, {...d, on: false}, ...inactive])
        else
            this.setValue([...active, {...d, on: true}, ...inactive])
    }

    clear(){
        this.setValue(this.options.map(d=>({...d, on: false})))
    }

    /*
        Drag to reorder (pointer events: mouse and touch)
        the row follows the pointer and the others slide to make room; the order applies on drop
    */

    // a mouse drags the whole row, once it moves a few px (otherwise it's a click: on/off)
    rowDown(e, d){
        if( e.pointerType == 'touch' || e.button !== 0 ) return // (touch scrolls; it drags by the handle)

        let row = e.currentTarget
        let startY = e.clientY

        let move = e=>{
            if( Math.abs(e.clientY - startY) < 4 ) return
            stop()
            this.dragged = true
            this.dragStart(e, d, row, startY)
        }
        let stop = ()=>{
            row.removeEventListener('pointermove', move)
            row.removeEventListener('pointerup', stop)
        }

        row.addEventListener('pointermove', move)
        row.addEventListener('pointerup', stop)
    }

    dragStart(e, d, el, startY){
        e.preventDefault()
        e.stopPropagation()

        let handle = el || e.currentTarget
        handle.setPointerCapture(e.pointerId)

        let rows = [...this.renderRoot.querySelectorAll('.option[active]')]
        this.drag = {
            key: d.val,
            startY: startY ?? e.clientY,
            rows,
            from: rows.findIndex(row=>row.dataset.key == String(d.val)),
            mids: rows.map(row=>{ let r = row.getBoundingClientRect(); return r.top + r.height / 2 }),
            step: rows.length > 1 ? rows[1].getBoundingClientRect().top - rows[0].getBoundingClientRect().top : 0
        }
        this.drag.to = this.drag.from
        this.dragKey = d.val
        this.toggleAttribute('dragging', true)

        let move = e=>this.dragMove(e)
        let end = ()=>{
            handle.removeEventListener('pointermove', move)
            handle.removeEventListener('pointerup', end)
            handle.removeEventListener('pointercancel', end)
            this.dragEnd()
        }

        handle.addEventListener('pointermove', move)
        handle.addEventListener('pointerup', end)
        handle.addEventListener('pointercancel', end)
    }

    dragMove(e){
        let {rows, from, mids, step, startY} = this.drag
        let dy = e.clientY - startY

        // keep it within the rows that are on
        let min = mids[0] - mids[from], max = mids[mids.length-1] - mids[from]
        dy = Math.max(min - step / 2, Math.min(max + step / 2, dy))

        // where its middle is now: after every other row whose middle it passed
        let mid = mids[from] + dy
        let to = mids.filter((m, i)=>i != from && m < mid).length

        rows.forEach((row, i)=>{
            let shift = 0
            if( i == from ) shift = dy
            else if( from < to && i > from && i <= to ) shift = -step
            else if( from > to && i >= to && i < from ) shift = step
            row.style.transform = shift ? `translateY(${shift}px)` : ''
        })

        this.drag.to = to
    }

    dragEnd(){
        let {rows, from, to} = this.drag
        this.drag = null

        // (no slide back: the rows render in the new order)
        rows.forEach(row=>{
            row.style.transition = 'none'
            row.style.transform = ''
        })

        this.dragKey = null
        this.toggleAttribute('dragging', false)

        if( to != from ){
            let active = this.active
            active.splice(to, 0, ...active.splice(from, 1))
            this.setValue([...active, ...this.inactive])
        }

        requestAnimationFrame(()=>rows.forEach(row=>row.style.transition = ''))
        setTimeout(()=>this.dragged = false) // (after the click that follows the drop)
    }
}

customElements.define('b-list-group-by-popover', GroupByPopover)
