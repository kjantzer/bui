/*
    List sorts popover (a sheet on phones and touch-only tablets, dragged down to close)

    - Reset (back to the list's `defaults`) in the header; sorts with a `preset` as rows at the top
    - the sorts in one list: the active ones first, in the order they apply (drag to reorder: anywhere on the
      row with a mouse, by the handle on touch screens; the row follows the pointer, the others make room,
      the order applies on drop); then the others
    - tap a sort to sort by just it (its default direction, or its current one if on); tap its box to add it to
      (or remove it from) the current sort; when on, its direction is a btn on the right

    Changes show here as they're made; the list re-sorts (or refetches) once, when it closes

    ```js
    SortsPopover.open(sorts, btn)
    ```
*/
import { LitElement, html, css } from 'lit'
import {repeat} from 'lit/directives/repeat.js'
import Popover from '../../popover'
import Panel from '../../panel'
import device from '../../../util/device'

export default class SortsPopover extends LitElement {

    static properties = {
        sheet: {type: Boolean, reflect: true},
        dragKey: {type: String}
    }

    static open(sorts, target){

        let el = sorts.__popover || new SortsPopover()
        sorts.__popover = el
        el.sorts = sorts

        if( el.isOpen ) return el.requestUpdate()

        // a sheet on phones and touch-only tablets (dragged down to close)
        if( device.isSmall || device.isTouchOnly ){
            el.sheet = true
            new Panel(el, {
                title: 'Sort',
                anchor: 'bottom',
                animation: 'rise',
                width: device.isSmall ? '100%' : 'min(480px, 100%)',
                height: 'auto',
                onClose: ()=>el.didClose()
            }).open()
        }else{
            el.sheet = false
            new Popover(target, el, {
                width: '340px',
                maxHeight: '75vh',
                align: 'bottom-end',
                overflowBoundry: 'window',
                onClose: ()=>el.didClose()
            })
        }

        el.isOpen = true
        return el
    }

    constructor(){
        super()
        this.onChange = ()=>this.requestUpdate()
    }

    // (held while open; see didClose)
    setValue(val){
        this.sorts._setValue(val, {silent: true})
        this.changed = true
        this.requestUpdate()
    }

    // the list re-sorts (or refetches) once, with everything changed while it was open
    didClose(){
        this.isOpen = false
        if( !this.changed ) return
        this.changed = false
        this.sorts.emit('change', this.sorts.value)
    }

    connectedCallback(){
        super.connectedCallback()
        this.sorts?.on('change', this.onChange)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.sorts?.off('change', this.onChange)
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

        /* a sort (rows are like menu items) */
        .sort {
            display: flex;
            align-items: center;
            gap: .6rem;
            margin: 2px 0;
            padding: .5rem .6rem;
            border-radius: .6rem;
            cursor: pointer;
        }

        :host([sheet]) .sort {
            padding: .7rem .6rem;
        }

        @media (hover) {
            .sort:hover {
                background: var(--theme-bgd-accent);
            }
        }

        /* dragging: the row follows the pointer; the others slide to make room (see dragMove) */
        .sort {
            position: relative;
            transition: transform 160ms ease;
        }

        .sort[dragging] {
            z-index: 1;
            transition: none;
            background: color-mix(in srgb, var(--theme) 12%, var(--theme-bgd));
        }

        :host([dragging]) .sort,
        :host([dragging]) .sort * {
            cursor: grabbing;
        }

        /* drag handle (active sorts) */
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

        .sort[dragging] .handle {
            cursor: grabbing;
        }

        /* (keeps labels lined up with the active rows) */
        .handle[hidden] {
            display: inline-flex;
            visibility: hidden;
        }

        /* with a mouse the whole row drags (see rowDown); the handle is for touch screens (and the phone sheet) */
        @media (any-pointer: fine) {
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

        /* (its own click: add to / remove from the sort; a bigger target than it looks) */
        .sort:not(.preset) .box {
            position: relative;
            cursor: pointer;
        }

        .sort:not(.preset) .box:before {
            content: '';
            position: absolute;
            inset: -.5em;
            border-radius: .6em;
        }

        @media (hover) {
            .sort:not(.preset) .box:hover {
                opacity: 1;
                border-color: var(--theme);
            }

            .sort:not(.preset) .box:hover:before {
                background: color-mix(in srgb, var(--theme) 12%, transparent);
            }
        }

        .sort[active] .box {
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
            display: grid;
        }

        .label small {
            font-size: .75em;
            color: var(--theme-text-accent);
        }

        .order {
            flex-shrink: 0;
            min-width: 1.5em;
            text-align: center;
            font-size: .75em;
            font-weight: 600;
            color: var(--theme-text-accent);
        }

        /* direction (its own btn, separate from on/off) */
        .dir {
            flex-shrink: 0;
            margin: -.35rem 0;
        }

        .dir b-icon {
            transform: rotate(-90deg); /* (arrow_right_alt points up: ascending) */
        }

        .dir b-icon[desc] {
            transform: rotate(90deg);
        }
    `

    // sorts: active in order, then the rest (presets are chips, not rows)
    get active(){ return this.sorts.active.filter(s=>!s.attrs.preset) }
    get inactive(){ return this.sorts.filter(s=>!s.attrs.preset && !this.sorts.value[s.key]) }

    // sorts with a `preset` (the list's `defaults` is the header's Reset)
    get presets(){
        return this.sorts.filter(s=>!!s.attrs.preset).map(s=>({label: s.label, val: s.attrs.preset}))
    }

    get isDefault(){
        return JSON.stringify(this.sorts.value) == JSON.stringify(this.sorts.__defaultSort)
    }

    labelsFor(val){
        return Object.keys(val).map(key=>this.sorts.get(key)?.label).filter(Boolean).join(', ')
    }

    render(){
        if( !this.sorts ) return ''

        let active = this.active
        let inactive = this.inactive
        let current = JSON.stringify(this.sorts.value)

        return html`
            <header>
                <span class="title">Sort</span>
                <span class="hint">${active.length > 1 ? 'Drag to change the order' : ''}</span>
                ${this.sorts.__defaultSort ? html`
                    <b-btn clear sm color="theme" ?disabled=${this.isDefault}
                        title="Back to the default: ${this.labelsFor(this.sorts.__defaultSort)}"
                        @click=${()=>this.setValue(this.sorts.__defaultSort)}>Reset</b-btn>
                `:''}
            </header>

            <div class="list">
                ${this.presets.length ? html`
                    ${this.presets.map(p=>html`
                        <div class="sort preset" ?active=${JSON.stringify(p.val) == current} @click=${()=>this.setValue(p.val)}>
                            <span class="handle" hidden></span>
                            <span class="box">${JSON.stringify(p.val) == current ? html`<b-icon name="check"></b-icon>` : ''}</span>
                            <span class="label">${p.label}<small>${this.labelsFor(p.val)}</small></span>
                        </div>
                    `)}
                    <div class="divider"></div>
                `:''}

                ${repeat(active, sort=>sort.key, (sort, i)=>this.renderSort(sort, i+1))}
                ${active.length && inactive.length ? html`<div class="divider"></div>` : ''}
                ${repeat(inactive, sort=>sort.key, sort=>this.renderSort(sort))}
            </div>
        `
    }

    renderSort(sort, order){
        let active = !!order
        let desc = sort.isDesc

        return html`
            <div class="sort" ?active=${active} ?dragging=${this.dragKey == sort.key} data-key=${sort.key}
                @pointerdown=${e=>active && this.rowDown(e, sort)}
                @click=${()=>this.only(sort)}>
                <span class="handle" no-swipe-close ?hidden=${!active} title="Drag to change the order"
                    @pointerdown=${e=>this.dragStart(e, sort)} @click=${e=>e.stopPropagation()}>
                    <b-icon name="drag_indicator"></b-icon>
                </span>
                <span class="box" title=${active ? 'Remove from the sort' : 'Add to the sort'}
                    @click=${e=>{ e.stopPropagation(); this.toggle(sort) }}>${active ? html`<b-icon name="check"></b-icon>` : ''}</span>
                <span class="label">
                    ${sort.label}
                    ${sort.description ? html`<small>${sort.description}</small>` : ''}
                </span>
                ${active && this.active.length > 1 ? html`<span class="order">${order}</span>` : ''}
                ${active ? html`
                    <b-btn class="dir" pill sm outline title="Change the direction"
                        @pointerdown=${e=>e.stopPropagation()}
                        @click=${e=>{ e.stopPropagation(); this.flip(sort) }}>
                        <b-icon name="arrow_right_alt" ?desc=${desc}></b-icon>
                        ${desc ? 'Desc' : 'Asc'}
                    </b-btn>
                `:''}
            </div>
        `
    }

    // sort by just this one (keeps its direction if it's already on)
    only(sort){
        if( this.dragged ) return // (the click at the end of a row drag)
        let current = this.sorts.value[sort.key]
        this.setValue({[sort.key]: current || {desc: !!sort.attrs.desc}})
    }

    // add to the sort (its default direction) or take it out
    toggle(sort){
        if( this.dragged ) return // (the click at the end of a row drag)
        let value = {...this.sorts.value}

        if( value[sort.key] )
            delete value[sort.key]
        else
            value[sort.key] = {desc: !!sort.attrs.desc}

        this.setValue(value)
    }

    // (keeps its place in the order)
    flip(sort){
        let value = {...this.sorts.value}
        value[sort.key] = {...value[sort.key], desc: !value[sort.key].desc}
        this.setValue(value)
    }

    /*
        Drag to reorder (pointer events: mouse and touch)
        the row follows the pointer and the others slide to make room; the order applies on drop
    */

    // a mouse drags the whole row, once it moves a few px (otherwise it's a click: on/off)
    rowDown(e, sort){
        if( e.pointerType == 'touch' || e.button !== 0 ) return // (touch scrolls; it drags by the handle)

        let row = e.currentTarget
        let startY = e.clientY

        let move = e=>{
            if( Math.abs(e.clientY - startY) < 4 ) return
            stop()
            this.dragged = true
            this.dragStart(e, sort, row, startY)
        }
        let stop = ()=>{
            row.removeEventListener('pointermove', move)
            row.removeEventListener('pointerup', stop)
        }

        row.addEventListener('pointermove', move)
        row.addEventListener('pointerup', stop)
    }

    dragStart(e, sort, el, startY){
        e.preventDefault()
        e.stopPropagation()

        let handle = el || e.currentTarget
        handle.setPointerCapture(e.pointerId)

        let rows = [...this.renderRoot.querySelectorAll('.sort[active]:not(.preset)')]
        this.drag = {
            key: sort.key,
            startY: startY ?? e.clientY,
            rows,
            from: rows.findIndex(row=>row.dataset.key == sort.key),
            to: null,
            mids: rows.map(row=>{ let r = row.getBoundingClientRect(); return r.top + r.height / 2 }),
            step: rows.length > 1 ? rows[1].getBoundingClientRect().top - rows[0].getBoundingClientRect().top : 0
        }
        this.drag.to = this.drag.from
        this.dragKey = sort.key
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

        // keep it within the active rows
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
        let {key, rows, from, to} = this.drag
        this.drag = null

        // (no slide back: the rows render in the new order)
        rows.forEach(row=>{
            row.style.transition = 'none'
            row.style.transform = ''
        })

        this.dragKey = null
        this.toggleAttribute('dragging', false)

        if( to != from ){
            let order = this.active.map(s=>s.key)
            order.splice(from, 1)
            order.splice(to, 0, key)
            let value = this.sorts.value
            this.setValue(Object.fromEntries(order.map(k=>[k, value[k]])))
        }

        requestAnimationFrame(()=>rows.forEach(row=>row.style.transition = ''))
        setTimeout(()=>this.dragged = false) // (after the click that follows the drop)
    }
}

customElements.define('b-list-sorts-popover', SortsPopover)
