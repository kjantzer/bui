/*
    Date filter view: "Relative" (rolling ranges, ex: Last 30 Days; saved by name so they stay current)
    or "Range" (one input to type dates/shorthand, and the scrolling calendar)

    Picks take effect right away (the filters popover applies them when it closes); its own header clears it

    Value: `[start, end]` (YYYY-MM-DD) or `{rel: '30 days'}` (see datepicker/presets relativeRange);
    `Filters` resolves a relative value to `[start, end]` when it's read (see resolveValue)

    viewOpts:
    - range (true): false for a single date
    - presets ([]): `[]` for the default relative ones, names of datepicker/presets (relative), and/or
      preset objects (ex: dateQuarterPresets; these set fixed dates), or `false` for none (just the calendar)
    - defaultLabel, header, footer
*/
import { LitElement, html, css } from 'lit'
import {live} from 'lit/directives/live.js'
import dayjs from 'dayjs'
import Datepicker, {stringToDateRange} from '../../../datepicker'
import {label as rangeLabel} from '../../../datepicker/daterange'
import {formatPreset, getPresetRange, isRelative, relativeRange, relativeLabel} from '../../../datepicker/presets'
import '../../../form/controls/radio-group'
import '../../../form/controls/radio-btn'

const DB_FORMAT = 'YYYY-MM-DD'

const DEFAULT_RELATIVE = [
    'today', 'yesterday', '-',
    'this week', 'last week', '7 days', '-',
    'this month', 'last month', '30 days', '90 days', '-',
    'year', 'last year'
]

const UNITS = ['day', 'week', 'month', 'year']

// the dates a preset covers (ex: Oct 4 – Nov 2; with the year when not this year)
const datesHint = (start, end)=>{
    start = dayjs(start); end = dayjs(end)
    let f = d=>d.format(d.isSame(dayjs(), 'year') ? 'MMM D' : 'MMM D, YYYY')
    return start.isSame(end, 'day') ? f(start) : `${f(start)} – ${f(end)}`
}

// a typed date; this year when it has none (ex: "mar 3" would be 2001)
const parseDate = str=>{
    let d = dayjs(str)
    if( d.isValid() && !/\d{4}|\/\d{2}$/.test(str.trim()) ) d = d.year(dayjs().year())
    return d
}

const isRel = val=>!!val && typeof val == 'object' && !Array.isArray(val) && isRelative(val.rel)

customElements.define('b-list-filter-view-date', class extends LitElement{

    // a relative value → [start, end] (anything else as is)
    static resolveValue(val){
        if( !isRel(val) ) return val
        return (relativeRange(val.rel) || []).map(d=>d.format(DB_FORMAT))
    }

    static get styles(){return css`
        :host {
            position: relative;
            padding: 0;
        }

        .modes {
            padding: .75em 1em 0;
        }

        /* relative / presets */
        .presets {
            display: grid;
            padding: .5em;
        }

        .preset {
            display: flex;
            align-items: center;
            gap: 1em;
            padding: .5em .65em;
            border-radius: 6px;
            cursor: pointer;
        }

        .preset:hover { background: rgba(var(--theme-text-rgb, 0,0,0), .05); }

        .preset[selected] {
            color: var(--theme);
            background: color-mix(in srgb, var(--theme) 10%, transparent);
            font-weight: 600;
        }

        .preset .dates {
            margin-left: auto;
            font-size: .8em;
            font-weight: normal;
            color: var(--theme-text-accent, #888);
            white-space: nowrap;
        }

        .divider {
            border-top: solid 1px var(--theme-bgd-accent, #ddd);
            margin: .35em .65em;
        }

        .divider-label {
            padding: .75em .65em .25em;
            font-size: .8em;
            font-weight: 600;
            color: var(--theme-text-accent, #888);
        }

        /* "Last [45] [days]" */
        .custom {
            gap: .5em;
            cursor: default;
        }

        .custom input, .custom select, .typed {
            font: inherit;
            color: inherit;
            background: var(--theme-bgd-accent, #eee);
            border: solid 1px transparent;
            border-radius: 6px;
            padding: .25em .5em;
            outline: none;
        }

        .custom input { width: 4em; }

        .custom input:focus, .custom select:focus, .typed:focus {
            border-color: var(--theme);
        }

        /* range */
        .range {
            display: grid;
            justify-items: center;
            gap: .5em;
            padding: .75em 1em 0;
        }

        .typed {
            width: 100%;
            box-sizing: border-box;
            padding: .4em .75em;
            text-align: center;
        }

        .typed::placeholder { font-size: .9em; }

        b-datepicker {
            --date-picker-height: min(50vh, 340px);
            --size: 2.25em;
        }
    `}

    constructor(opts={}){
        super()

        this.opts = Object.assign({
            defaultLabel: '–',
            range: true,
            presets: []
        }, opts)
    }

    // the presets shown (relative names stay as strings; others as preset objects)
    get presets(){
        let presets = this.opts.presets
        if( typeof presets == 'function' ) presets = presets()
        if( presets === false || presets == null ) return []
        if( Array.isArray(presets) && presets.length == 0 ) presets = this.opts.range ? DEFAULT_RELATIVE : ['today', 'yesterday']

        return presets.map(p=>{
            if( typeof p == 'string' && isRelative(p.toLowerCase()) ) return p.toLowerCase()
            return formatPreset(p)
        })
    }

    // all relative (ex: the defaults): "Relative", and a custom "Last N days" row
    get isRelativeOnly(){
        let presets = this.presets
        return presets.length > 0 && presets.every(p=>typeof p == 'string')
    }

    get datepicker(){

        if( !this.__datepicker ){
            this.__datepicker = new Datepicker({
                value: this.dates || new Date(),
                range: this.opts.range,
                presets: false,
                inputs: false,
                btns: null
            })

            // calendar picks (ignoring changes made to show the value)
            this.__datepicker.selectedRange.on('change', prop=>{
                if( this._syncing || !['start', 'end', 'range'].includes(prop) ) return
                let {start, end} = this.__datepicker.selectedRange
                this.commit([start.format(DB_FORMAT), end.format(DB_FORMAT)])
            })
        }

        return this.__datepicker
    }

    get value(){
        if( this.__value === undefined )
            this.__value = this.filter?.rawValue ?? null

        return this.__value
    }

    set value(val){
        val = val ?? null
        if( JSON.stringify(val) == JSON.stringify(this.__value ?? null) ) return // (ex: our own pick, applied)

        this.__value = val
        this.mode = null // (shows the mode for the value)
        this.syncDatepicker()
        this.requestUpdate()
    }

    // [start, end] dates for the value
    get dates(){
        let val = this.constructor.resolveValue(this.value)
        if( typeof val == 'string' ) val = val.split(',')
        if( !Array.isArray(val) || !val[0] ) return null
        return [val[0], val[1] || val[0]]
    }

    get label(){
        let val = this.value
        if( isRel(val) ) return relativeLabel(val.rel)

        let dates = this.dates
        return dates ? rangeLabel(...dates) : this.opts.defaultLabel
    }

    // a pick takes effect right away (queued while the filters popover is open; else when this closes)
    commit(val){
        this.__value = val
        if( this.filter?.parent?.queuing ) this.filter.value = val
        this.requestUpdate()
    }

    syncDatepicker(){
        if( !this.__datepicker ) return
        this._syncing = true
        try{
            this.__datepicker.value = this.dates || [new Date(), new Date()]
        }finally{
            this._syncing = false
        }
    }

    get modeShown(){
        if( !this.presets.length ) return 'range'
        return this.mode || (this.dates && !isRel(this.value) && !this.presetSelected ? 'range' : 'presets')
    }

    // the (fixed) preset matching the value, if any
    get presetSelected(){
        let dates = this.dates
        if( !dates ) return null
        return this.presets.find(p=>typeof p == 'object' && !p.divider && this.presetDates(p).join() == dates.join())
    }

    presetDates(p){
        let [start, end] = typeof p == 'string' ? relativeRange(p) : getPresetRange(p)
        return [start.format(DB_FORMAT), end.format(DB_FORMAT)]
    }

    render(){
        let mode = this.modeShown

        return html`
        <div>${this.opts.header||''}</div>

        ${this.presets.length ? html`
        <div class="modes">
            <radio-group segment .value=${mode} @change=${this.changeMode}>
                <radio-btn value="presets">${this.isRelativeOnly ? 'Relative' : 'Presets'}</radio-btn>
                <radio-btn value="range">${this.opts.range ? 'Range' : 'Date'}</radio-btn>
            </radio-group>
        </div>
        `:''}

        ${mode == 'presets' ? this.renderPresets() : this.renderRange()}

        <div>${this.opts.footer||''}</div>
    `}

    renderPresets(){
        let rel = isRel(this.value) ? this.value.rel : null
        let dates = this.dates?.join()

        return html`
        <div class="presets">
            ${this.presets.map(p=>{

                if( p == '-' || p == 'divider' ) return html`<div class="divider"></div>`
                if( p.divider ) return html`<div class="divider-label">${p.divider}</div>`

                let range = this.presetDates(p)
                let selected = typeof p == 'string' ? rel == p : !rel && dates == range.join()

                return html`
                <div class="preset" ?selected=${selected} @click=${()=>this.pickPreset(p)}>
                    <span>${typeof p == 'string' ? relativeLabel(p) : p.label}</span>
                    <span class="dates">${datesHint(...range)}</span>
                </div>
            `})}

            ${this.isRelativeOnly && this.opts.range ? this.renderCustom(rel) : ''}
        </div>
    `}

    // "Last/Next [N] [days]"
    renderCustom(rel){
        let [, next, num, unit] = (!DEFAULT_RELATIVE.includes(rel) && rel?.match(/^(next )?(\d+) (day|week|month|year)s?$/)) || []
        let selected = !!unit

        return html`
        <div class="divider"></div>
        <div class="preset custom" ?selected=${selected}>
            <select class="dir" .value=${live(next ? 'next' : 'last')} @change=${this.pickCustom}>
                <option value="last">Last</option>
                <option value="next">Next</option>
            </select>
            <input class="num" type="number" min="1" placeholder="N" .value=${live(num || '')}
                @change=${this.pickCustom} @keydown=${e=>e.key=='Enter'&&this.pickCustom()}>
            <select class="unit" .value=${live(unit || 'day')} @change=${this.pickCustom}>
                ${UNITS.map(u=>html`<option value=${u}>${u}s</option>`)}
            </select>
        </div>
    `}

    renderRange(){return html`
        <div class="range">
            <input class="typed" type="text" .value=${live(this.dates ? this.typedLabel : '')}
                placeholder=${this.opts.range ? 'Type dates or “90 days”, “mar”, “2025”' : 'Type a date'}
                @change=${this.onTyped} @keydown=${e=>e.key=='Enter'&&this.onTyped(e)}>
            ${this.datepicker}
        </div>
    `}

    get typedLabel(){
        let [start, end] = this.dates.map(d=>dayjs(d))
        let f = 'MMM D, YYYY'
        return !this.opts.range || start.isSame(end, 'day') ? start.format(f) : `${start.format(f)} – ${end.format(f)}`
    }

    changeMode(e){
        // (the calendar opens on the value when it's shown; see datepicker _layout)
        this.mode = e.detail?.value ?? e.currentTarget.value
        this.requestUpdate()
    }

    pickPreset(p){
        if( typeof p == 'string' )
            this.commit({rel: p})
        else
            this.commit(this.presetDates(p))

        this.syncDatepicker()
    }

    pickCustom(){
        let num = parseInt(this.shadowRoot.querySelector('.custom .num').value)
        if( !num || num < 1 ) return

        let next = this.shadowRoot.querySelector('.custom .dir').value == 'next'
        let unit = this.shadowRoot.querySelector('.custom .unit').value
        this.commit({rel: `${next?'next ':''}${num} ${unit}${num == 1 ? '' : 's'}`})
        this.syncDatepicker()
    }

    // typed: "Mar 1 – Apr 5", "3/1/26", or shorthand ("90 days", "mar", "2025"); "N days/weeks..." stay relative
    onTyped(e){
        let str = e.currentTarget.value.trim()
        if( !str ) return

        let rel = str.toLowerCase().match(/^(next |\+)?([1-9]\d*)\s*(d|days?|w|wks?|weeks?|m|mos?|months?|y|yrs?|years?)$/)
        if( rel && this.opts.range ){
            let [, next, num, unit] = rel
            unit = UNITS.find(u=>u[0] == unit[0])
            num = parseInt(num)
            this.commit({rel: `${next?'next ':''}${num} ${unit}${num == 1 ? '' : 's'}`})
            this.syncDatepicker()
            if( this.isRelativeOnly ) this.mode = 'presets' // (shows it's relative)
            return
        }

        let dates = str.split(/\s+(?:–|-|to)\s+|–/).map(s=>s.trim())
        let start, end

        if( dates.length == 2 && parseDate(dates[0]).isValid() && parseDate(dates[1]).isValid() )
            [start, end] = dates.map(parseDate)
        else
            ({start, end} = stringToDateRange(str))

        if( !start?.isValid?.() && parseDate(str).isValid() )
            start = end = parseDate(str)

        if( !start?.isValid?.() ){
            e.currentTarget.value = this.dates ? this.typedLabel : ''
            return
        }

        if( !this.opts.range ) end = start
        if( start.isAfter(end) ) [start, end] = [end, start]

        this.commit([start.format(DB_FORMAT), end.format(DB_FORMAT)])
        this.syncDatepicker()
    }

})

export default customElements.get('b-list-filter-view-date')
