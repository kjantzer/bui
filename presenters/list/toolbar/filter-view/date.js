/*
    Date filter view: "Relative" (rolling ranges, ex: Last 30 Days; saved by name so they stay current)
    or "Range" (dates typed or picked on the scrolling calendar)

    A bar that stays put: the mode (icons) beside one input. Relative's input is "[Last] [30] [days]"
    and the presets below fill it in (then tweak it); Range's input shows/takes typed dates
    Picks take effect right away (the filters popover applies them when it closes); its own header clears it

    Value: `[start, end]` (YYYY-MM-DD) or `{rel: '30 days'}` (see datepicker/presets relativeRange);
    `Filters` resolves a relative value to `[start, end]` when it's read (see resolveValue)

    viewOpts:
    - range (true): false for a single date
    - presets ([]): `[]` for the default relative ones, relative names (see datepicker/presets), and/or
      preset objects (ex: dateQuarterPresets; these set fixed dates), or `false` for none (just the calendar)
    - defaultLabel, header, footer
*/
import { LitElement, html, css } from 'lit'
import {live} from 'lit/directives/live.js'
import dayjs from 'dayjs'
import Datepicker, {stringToDateRange} from '../../../datepicker'
import {label as rangeLabel} from '../../../datepicker/daterange'
import {formatPreset, getPresetRange, isRelative, parseRelative, relativeKey, relativeRange, relativeLabel,
    UNITS} from '../../../datepicker/presets'

const DB_FORMAT = 'YYYY-MM-DD'

// default presets: rows of quick picks (through today, then upcoming), then a table of calendar periods
const DEFAULT_LAST = ['this day', 'previous day', '7 days', '14 days', '30 days', '60 days', '90 days', '6 months', '12 months',
    'month to date', 'year to date']
const DEFAULT_NEXT = ['next 7 days', 'next 14 days', 'next 30 days', 'next 60 days', 'next 90 days']
const PERIOD_UNITS = ['week', 'month', 'quarter', 'year']
const PERIOD_COLS = [
    {dir: 'previous', label: 'Last'},
    {dir: 'this', label: 'This'},
    {dir: 'following', label: 'Next'}
]
const periodKey = (dir, unit)=>relativeKey({dir, unit})

const DEFAULT_RELATIVE = [
    ...DEFAULT_LAST, ...DEFAULT_NEXT,
    ...PERIOD_UNITS.flatMap(unit=>PERIOD_COLS.map(c=>periodKey(c.dir, unit)))
]

const DIRS = [
    {val: 'last', label: 'Last'},
    {val: 'next', label: 'Next'},
    {val: 'this', label: 'This'},
    {val: 'todate', label: 'Since start of'},
    {val: 'previous', label: 'Previous'},
    {val: 'following', label: 'Following'}
]

// a quick pick's short label (ex: "30 days"; the row says Last or Next)
const chipLabel = key=>{
    let {dir, num, unit} = parseRelative(key)
    if( !num ) return relativeLabel(key)
    return `${num} ${unit}${num == 1 ? '' : 's'}`
}

// short dates for the periods (ex: "Nov 1 – 7", "Oct", "Q3", "2025")
const compactHint = (start, end)=>{
    start = dayjs(start); end = dayjs(end)
    let thisYear = start.isSame(dayjs(), 'year') && end.isSame(dayjs(), 'year')
    let yr = d=>thisYear ? '' : d.format(' YYYY')

    if( start.isSame(start.startOf('year'), 'day') && end.isSame(start.endOf('year'), 'day') ) return start.format('YYYY')
    if( start.isSame(start.startOf('quarter'), 'day') && end.isSame(start.endOf('quarter'), 'day') ) return `Q${start.quarter()}`+yr(start)
    if( start.isSame(start.startOf('month'), 'day') && end.isSame(start.endOf('month'), 'day') ) return start.format('MMM')+yr(start)
    if( start.isSame(end, 'day') ) return start.format('MMM D')+yr(start)
    if( start.isSame(end, 'month') ) return `${start.format('MMM D')} – ${end.format('D')}${yr(end)}`
    return `${start.format('MMM D')} – ${end.format('MMM D')}${yr(end)}`
}

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

// the saved name for a relative value (ex: `today` → `this day`), so presets and the inputs match
const normalize = key=>{
    let p = parseRelative(key)
    return p ? relativeKey(p) : key
}

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
            height: 100%; /* (the bar stays put; the presets or calendar fill and scroll) */
        }

        .view {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: clip; /* (only the presets and calendar scroll; ex: the calendar's scroll to today moved the bar) */
        }

        /* mode + input */
        .bar {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            gap: .5em;
            padding: .75em 1em;
            border-bottom: solid 1px var(--theme-bgd-accent, #ddd);
        }

        .modes {
            flex-shrink: 0;
            display: flex;
            padding: .2em;
            border-radius: 8px;
            background: var(--theme-bgd-accent, #eee);
        }

        .modes button {
            all: unset;
            display: grid;
            place-items: center;
            width: 2em;
            height: 1.85em;
            border-radius: 6px;
            cursor: pointer;
            color: var(--theme-text-accent, #888);
        }

        .modes button:hover { color: var(--theme-text, #000); }

        .modes button[selected] {
            color: var(--theme-text, #000);
            background: var(--theme-bgd, #fff);
            box-shadow: 0 1px 2px rgba(0,0,0,.15);
        }

        .modes b-icon { font-size: 1.15em; }

        /* one input look (for the relative selects + number too) */
        .field {
            flex: 1;
            min-width: 0;
            display: flex;
            align-items: center;
            height: 2.25em;
            box-sizing: border-box;
            border: solid 1px transparent;
            border-radius: 8px;
            background: var(--theme-bgd-accent, #eee);
            overflow: hidden;
        }

        .field:focus-within { border-color: var(--theme); }

        .field input, .field select {
            all: unset;
            min-width: 0;
            padding: 0 .65em;
            font: inherit;
            color: inherit;
            box-sizing: border-box;
        }

        .field input.typed { flex: 1; text-align: center; }
        .field input.typed::placeholder { font-size: .9em; color: var(--theme-text-accent, #888); }

        .field > * { align-self: center; }

        /* (a chevron; "all: unset" drops the native one) */
        .field select {
            cursor: pointer;
            padding-top: .35em;
            padding-bottom: .35em;
            padding-right: 1.75em;
            background: no-repeat right .6em center / .65em
                url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%23888' stroke-width='1.5'/%3E%3C/svg%3E");
        }
        .field select:hover { background-color: rgba(var(--theme-text-rgb, 0,0,0), .05); }

        .field .dir { flex: 1; }
        .field .num { width: 3.5em; text-align: center; }
        .field .unit { flex: 1; }

        .field > * + * { border-left: solid 1px rgba(var(--theme-text-rgb, 0,0,0), .1); }

        .field .num::-webkit-inner-spin-button { display: none; }

        .today {
            flex-shrink: 0;
        }

        /* the list / calendar below */
        .presets {
            flex: 1;
            min-height: 0;
            overflow: auto;
            display: grid;
            align-content: start;
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

        /* default presets */
        /* each group starts with a line (except the first) */
        .group-label {
            margin: .4em .5em 0;
            padding: .65em .15em .4em;
            border-top: solid 1px var(--theme-bgd-accent, #ddd);
            font-size: .75em;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: .03em;
            color: var(--theme-text-accent, #888);
        }

        .group-label:first-child { border-top: none; margin-top: 0; }

        .chips {
            display: flex;
            flex-wrap: wrap;
            gap: .35em;
            padding: 0 .5em .5em;
        }

        .chip {
            padding: .35em .75em;
            border-radius: 2em;
            font-size: .9em;
            cursor: pointer;
            white-space: nowrap;
            background: var(--theme-bgd-accent, #eee);
        }

        .chip:hover { background: color-mix(in srgb, var(--theme-text, #000) 10%, var(--theme-bgd-accent, #eee)); }

        .chip[selected] {
            color: var(--theme-bgd, #fff);
            background: var(--theme);
        }

        /* a period's Last / This / Next */
        .periods {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: .35em;
            padding: 0 .5em .5em;
        }

        /* sized like the chips: "Last  Oct 25 – 31" on one line */
        .period {
            display: flex;
            justify-content: center;
            align-items: baseline;
            gap: .4em;
            min-width: 0;
            padding: .35em .5em;
            border-radius: 2em;
            font-size: .9em;
            cursor: pointer;
            white-space: nowrap;
            background: var(--theme-bgd-accent, #eee);
        }

        .period-dates {
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: .85em;
            color: var(--theme-text-accent, #888);
        }

        .period[selected] .period-dates { color: inherit; }

        .period:hover { background: color-mix(in srgb, var(--theme-text, #000) 10%, var(--theme-bgd-accent, #eee)); }

        .period[selected] {
            color: var(--theme-bgd, #fff);
            background: var(--theme);
        }

        .divider-label {
            padding: .75em .65em .25em;
            font-size: .8em;
            font-weight: 600;
            color: var(--theme-text-accent, #888);
        }

        .range {
            flex: 1;
            min-height: 0;
            display: grid;
            justify-items: center;
            padding: .5em 1em 0;
            container-type: inline-size;
        }

        /* fills the width (7 days, its padding and gaps) and the height left */
        b-datepicker {
            --date-picker-height: 100%;
            --size: min(4em, calc((100cqw - 2.5em) / 7));
            --font-size: .9rem;
            min-height: 300px;
            overflow: clip;
        }

        /* (its presets aren't shown, but still had a min width) */
        b-datepicker::part(presets) {
            min-width: 0;
            padding: 0;
            border: none;
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

    // the presets shown (relative names as strings; others as preset objects)
    get presets(){
        let presets = this.opts.presets
        if( typeof presets == 'function' ) presets = presets()
        if( presets === false || presets == null ) return []
        if( Array.isArray(presets) && presets.length == 0 ) presets = this.opts.range ? DEFAULT_RELATIVE : ['this day', 'previous day']

        return presets.map(p=>{
            if( typeof p == 'string' && isRelative(p.toLowerCase()) ) return normalize(p.toLowerCase())
            return formatPreset(p)
        })
    }

    // the default presets (laid out as quick picks and a periods table)
    get isDefaultPresets(){
        let presets = this.opts.presets
        return this.opts.range && Array.isArray(presets) && presets.length == 0
    }

    // all relative (ex: the defaults): "Relative" with the "[Last] [30] [days]" input
    get isRelativeOnly(){
        let presets = this.presets
        return this.opts.range && presets.length > 0 && presets.every(p=>typeof p == 'string')
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
        this.syncDatepicker()
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
        <div class="view">
            <div>${this.opts.header||''}</div>

            <div class="bar">
                ${this.presets.length ? html`
                <div class="modes">
                    <button ?selected=${mode == 'presets'} @click=${()=>this.changeMode('presets')}
                        title=${this.isRelativeOnly ? 'Relative (stays current, ex: last 30 days)' : 'Presets'}>
                        <b-icon name=${this.isRelativeOnly ? 'history' : 'view_list'}></b-icon>
                    </button>
                    <button ?selected=${mode == 'range'} @click=${()=>this.changeMode('range')}
                        title=${this.opts.range ? 'Range (dates)' : 'Date'}>
                        <b-icon name="date_range"></b-icon>
                    </button>
                </div>
                `:''}

                ${mode == 'presets' && this.isRelativeOnly ? this.renderRelativeInput() : this.renderTyped()}

                ${mode == 'range' ? html`
                    <b-btn clear pill sm class="today" title="Show today on the calendar"
                        @click=${()=>this.__datepicker?.scrollToDate('today')}>Today</b-btn>
                `:''}
            </div>

            ${mode == 'presets' ? this.renderPresets() : this.renderRange()}

            <div>${this.opts.footer||''}</div>
        </div>
    `}

    // "[Last] [30] [days]"; shows the relative value (ex: from a preset) to tweak
    // (options `selected` for the first render, before they exist for `.value`; `.value` after, once changed by hand)
    renderRelativeInput(){
        let p = (isRel(this.value) && parseRelative(this.value.rel)) || this.draft || {dir: 'last', num: null, unit: 'day'}
        let hasNum = ['last', 'next'].includes(p.dir)
        let plural = hasNum && p.num != 1

        return html`
        <div class="field relative">
            <select class="dir" .value=${live(p.dir)} @change=${this.onRelativeInput}>
                ${DIRS.map(d=>html`<option value=${d.val} ?selected=${d.val == p.dir}>${d.label}</option>`)}
            </select>
            ${hasNum ? html`
            <input class="num" type="number" min="1" placeholder="N" .value=${live(p.num || '')}
                @focus=${e=>e.currentTarget.select()} @mouseup=${e=>e.preventDefault()}
                @input=${this.onRelativeInput}>
            `:''}
            <select class="unit" .value=${live(p.unit)} @change=${this.onRelativeInput}>
                ${UNITS.map(u=>html`<option value=${u} ?selected=${u == p.unit}>${u}${plural?'s':''}</option>`)}
            </select>
        </div>
    `}

    // for the filters popover's search (ex: "30" finds Last 30 Days; "45 days" offers Last 45 Days)
    searchValues(q=''){
        let current = JSON.stringify(isRel(this.value) ? {rel: normalize(this.value.rel)} : this.value)
        let values = this.presets.filter(p=>p != '-' && p != 'divider' && !p.divider).map(p=>{
            let val = typeof p == 'string' ? {rel: p} : this.presetDates(p)
            let label = typeof p == 'string' ? relativeLabel(p) : p.label
            if( typeof label != 'string' ) return null // (ex: html labels)
            return {val, label: `${label} (${datesHint(...this.presetDates(p))})`, selected: JSON.stringify(val) == current}
        }).filter(Boolean)

        // a typed relative range not in the presets
        let typed = this.opts.range && q.match(/^(last |next )?([1-9]\d*)\s*(d|days?|w|wks?|weeks?|m|mos?|months?|q|qtrs?|quarters?|y|yrs?|years?)$/)
        if( typed ){
            let key = relativeKey({dir: typed[1]?.trim() == 'next' ? 'next' : 'last', num: parseInt(typed[2]), unit: UNITS.find(u=>u[0] == typed[3][0])})
            if( key && !values.some(v=>v.val.rel == key) )
                values.unshift({val: {rel: key}, label: `${relativeLabel(key)} (${datesHint(...this.presetDates(key))})`,
                    always: true, selected: JSON.stringify({rel: key}) == current})
        }

        return values
    }

    renderTyped(){return html`
        <div class="field">
            <input class="typed" type="text" .value=${live(this.dates ? this.typedLabel : '')}
                placeholder=${this.opts.range ? 'Type dates or “90 days”, “mar”, “2025”' : 'Type a date'}
                @change=${this.onTyped} @keydown=${e=>e.key=='Enter'&&this.onTyped(e)}>
        </div>
    `}

    renderPresets(){
        let rel = isRel(this.value) ? normalize(this.value.rel) : null
        let dates = this.dates?.join()

        if( this.isDefaultPresets ) return this.renderDefaultPresets(rel)

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
        </div>
    `}

    renderDefaultPresets(rel){
        let chip = key=>html`
            <span class="chip" ?selected=${rel == key} title="${relativeLabel(key)}: ${datesHint(...this.presetDates(key))}"
                @click=${()=>this.pickPreset(key)}>${chipLabel(key)}</span>
        `

        return html`
        <div class="presets">
            <div class="group-label">Last</div>
            <div class="chips">${DEFAULT_LAST.map(chip)}</div>

            <div class="group-label">Next</div>
            <div class="chips">${DEFAULT_NEXT.map(chip)}</div>

            ${PERIOD_UNITS.map(unit=>html`
                <div class="group-label">${unit[0].toUpperCase()+unit.slice(1)}</div>
                <div class="periods">
                    ${PERIOD_COLS.map(c=>{
                        let key = periodKey(c.dir, unit)
                        let range = this.presetDates(key)
                        return html`
                        <div class="period" ?selected=${rel == key} title="${relativeLabel(key)}: ${datesHint(...range)}"
                            @click=${()=>this.pickPreset(key)}>
                            <span class="period-label">${c.label}</span>
                            <span class="period-dates">${compactHint(...range)}</span>
                        </div>
                    `})}
                </div>
            `)}
        </div>
    `}

    renderRange(){return html`
        <div class="range">
            ${this.datepicker}
        </div>
    `}

    get typedLabel(){
        let [start, end] = this.dates.map(d=>dayjs(d))
        let f = 'MMM D, YYYY'
        return !this.opts.range || start.isSame(end, 'day') ? start.format(f) : `${start.format(f)} – ${end.format(f)}`
    }

    // (the calendar opens on the value when it's shown; see datepicker _layout)
    changeMode(mode){
        this.mode = mode
        this.requestUpdate()
    }

    pickPreset(p){
        this.draft = null
        if( typeof p == 'string' )
            this.commit({rel: p})
        else
            this.commit(this.presetDates(p))
    }

    // the relative inputs changed; saved once they make a range (ex: a number for "Last")
    onRelativeInput(){
        let el = sel=>this.shadowRoot.querySelector('.field.relative '+sel)
        let prev = (isRel(this.value) && parseRelative(this.value.rel)) || this.draft || {}

        let p = {
            dir: el('.dir').value,
            num: parseInt(el('.num')?.value) || null,
            unit: el('.unit').value
        }

        // switching to last/next keeps the number it had (or 1)
        if( ['last', 'next'].includes(p.dir) && !el('.num') )
            p.num = prev.num || 1

        let key = relativeKey(p)
        this.draft = p

        if( key ) this.commit({rel: key})
        else this.requestUpdate()
    }

    // typed: "Mar 1 – Apr 5", "3/1/26", or shorthand ("90 days", "mar", "2025"); "N days/weeks..." stay relative
    onTyped(e){
        let str = e.currentTarget.value.trim()
        if( !str ) return

        let rel = str.toLowerCase().match(/^(next |\+)?([1-9]\d*)\s*(d|days?|w|wks?|weeks?|m|mos?|months?|q|qtrs?|quarters?|y|yrs?|years?)$/)
        if( rel && this.opts.range ){
            let [, next, num, unit] = rel
            this.draft = null
            this.commit({rel: relativeKey({dir: next ? 'next' : 'last', num: parseInt(num), unit: UNITS.find(u=>u[0] == unit[0])})})
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
    }

})

export default customElements.get('b-list-filter-view-date')
