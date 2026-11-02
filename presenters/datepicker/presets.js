import { LitElement, html, css } from 'lit'
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import '../../elements/btn'
import '../../elements/hr'

dayjs.extend(quarterOfYear) // (quarter units)

const DIVIDERS = ['divider', '-']

export const Presets = {
    'today': { label: 'Today', value:d=>d },
    'yesterday': { label: 'Yesterday', value:d=>d.add(-1, 'day') },
    '7 days': { label: 'Last 7 Days', start:d=>d.add(-6, 'day') },
    'this week': { label: 'This Week', start:d=>d.startOf('week'), end:d=>d.endOf('week') },
    'last week': {
        label: 'Last Week',
        start: d=>d.startOf('week').add(-7, 'day'),
        end: (d,start)=>start.add(6, 'day')
    },
    '30 days': { label: 'Last 30 Days', start:d=>d.add(-29, 'day') },
    '60 days': { label: 'Last 60 Days', start:d=>d.add(-59, 'day') },
    '90 days': { label: 'Last 90 Days', start:d=>d.add(-89, 'day') },
    '120 days': { label: 'Last 120 Days', start:d=>d.add(-119, 'day') },

    'this month': { label: 'This Month', start:d=>d.startOf('month'), end:d=>d.endOf('month') },
    'last month': { label: 'Last Month',
        start:d=>d.startOf('month').add(-1, 'month'),
        end:(d,start)=>start.endOf('month')
    },

    'this year': { label: 'This year (Jan–Now)', start:d=>d.startOf('year') },
    'year': { label: 'This Year', start:d=>d.startOf('year'), end:d=>d.endOf('year') },
    
    'last year': { label: 'Last Year', 
        start:d=>d.startOf('year').add(-1, 'year'), 
        end:(d,start)=>start.endOf('year')
    }
}

customElements.define('b-datepicker-presets', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            overflow-y: auto;
            font-size: .9rem;
        }

        :host::-webkit-scrollbar {
            display: none;
        }

        :host {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }

        b-btn {
            font-weight: normal;
            display: block;
            font-size: inherit;
        }

        b-btn > div {
            display: block;
            font-size: .8em;
            line-height: 1em;
            color: var(--theme-text-accent, #aaa);
        }

        .divider {
            margin-left: .5em;
        }

        b-hr:first-child {
            display: none;
        }
    `}

    set presets(val){
        let oldVal = this.presets

        if( typeof val == 'function' )
            val = val()

        // default to all presets if empty array given
        if( Array.isArray(val) && val.length == 0 ){
            val = Object.keys(Presets)
        }
        
        if( !val || val.length == 0 ){
            val = false
        }else{
            val = formatPresets(val)   
        }

        this.__presets = val
        this.hidden = !val

        this.requestUpdate('presets', oldVal)
    }
    
    get presets(){ return this.__presets}

    constructor(){
        super()
        
    }

    render(){return html`
        ${this.presets&&this.presets.map(preset=>html`

            ${DIVIDERS.includes(preset)||preset.divider?html`
                
                <b-hr pad="xs"></b-hr>
                ${preset.divider?html`
                    <div class="divider">
                        <b-text sm bold>${preset.divider}</b-text>
                    </div>
                `:''}

            `:html`
                <b-btn clear .preset=${preset} @click=${this.onClick} icon=${preset.icon||''}>
                    ${preset.label}
                    <div>${preset.description||''}</div>
                </b-btn>
            `}

        `)}
    `}

    onClick(e){
        let preset = e.currentTarget.preset
        let [start, end] = getPresetRange(preset)
        this.emitEvent('preset-selected', {start, end, preset})
    }

})

export default customElements.get('b-datepicker-presets')

export function formatPresets(presets){
    return presets.map(p=>{
        return formatPreset(p)
    })
}

export function formatPreset(p){

    // support presets
    if( typeof p == 'string' ){

        if( DIVIDERS.includes(p) )
            return p

        let preset = Presets[p.toLowerCase()]
        if( !preset )
            throw new Error('Invalid preset:', p)
        p = Object.assign({}, preset)
    }

    // support "presets" as the "value"
    if( typeof p.value == 'string' ){
        let preset = Presets[p.value.toLowerCase()]
        if( !preset )
            throw new Error('Invalid preset:', p)
        
        delete p.value
        p = Object.assign({}, preset, p)
    }

    return p
}

export function getPresetRange(p){

    let start = dayjs().startOf('day')
    let end = dayjs().endOf('day')

    for( let k of ['value', 'start', 'end'] ){
        if( p[k] && typeof p[k] != 'function' )
            throw Error('Invalid preset:', p)
    }

    // value means same start and end
    if( p.value ){
        start = end = p.value(start)
    }

    if( p.start ){
        start = p.start(start)
    }

    if( p.end ){
        end = p.end(end, start)
    }

    // return [start.format('l'), end.format('l')]
    return [start, end]
}

/*
    Relative ("rolling") ranges, saved by name so they stay current (ex: a saved filter for the last 30 days)
    - `N unit[s]`: the last N days/weeks... through today (ex: `30 days`)
    - `next N unit[s]`: today through the next N
    - `this unit`: the current day/week/month/quarter/year (ex: `this month`)
    - `previous unit`: the one before it (ex: `previous month` is "Last Month")
    - `next unit`: the one after it (ex: `next quarter`)
    - `unit to date`: the start of the current one through today (ex: `year to date`)
    Some preset names work too (ex: `today`, `last month`; see ALIASES)
*/
export const UNITS = ['day', 'week', 'month', 'quarter', 'year']

const REL = /^(?:(next|this|previous) )?(?:(\d+) )?(day|week|month|quarter|year)s?$/
const TO_DATE = /^(week|month|quarter|year) to date$/

const ALIASES = {
    'today': 'this day',
    'yesterday': 'previous day',
    'last week': 'previous week',
    'last month': 'previous month',
    'year': 'this year',
    'last year': 'previous year'
}

// {dir: last|next|this|previous, num, unit}
export function parseRelative(key){
    if( typeof key != 'string' ) return null
    key = ALIASES[key] || key

    let toDate = key.match(TO_DATE)
    if( toDate ) return {dir: 'todate', num: null, unit: toDate[1]}

    let [, dir='last', num, unit] = key.match(REL) || []
    if( !unit ) return null

    num = parseInt(num)
    if( dir == 'next' && !num ) return {dir: 'following', num: null, unit} // (the next calendar period)
    if( ['last', 'next'].includes(dir) ){
        if( !(num >= 1) ) return null
    }else if( num ) return null

    return {dir, num: num || null, unit}
}

// the saved name for {dir, num, unit}
export function relativeKey({dir='last', num, unit}={}){
    if( dir == 'todate' ) return unit == 'day' ? 'this day' : `${unit} to date`
    if( dir == 'following' ) return `next ${unit}`
    if( ['this', 'previous'].includes(dir) ) return `${dir} ${unit}`
    if( !(num >= 1) ) return null
    return `${dir == 'next' ? 'next ' : ''}${num} ${unit}${num == 1 ? '' : 's'}`
}

export function isRelative(key){
    return !!parseRelative(key) || !!Presets[key]
}

// [start, end] dayjs dates (today's) for a relative name
export function relativeRange(key){
    let p = parseRelative(key)
    if( !p ) return Presets[key] ? getPresetRange(Presets[key]) : null

    let {dir, num, unit} = p
    let today = dayjs().startOf('day')

    if( dir == 'this' ) return [today.startOf(unit), today.endOf(unit).startOf('day')]
    if( dir == 'todate' ) return [today.startOf(unit), today]

    if( dir == 'following' ){
        let start = today.add(1, unit).startOf(unit)
        return [start, start.endOf(unit).startOf('day')]
    }

    if( dir == 'previous' ){
        let start = today.add(-1, unit).startOf(unit)
        return [start, start.endOf(unit).startOf('day')]
    }

    // (includes today; ex: last 7 days = 6 days ago through today)
    if( dir == 'next' )
        return [today, unit == 'day' ? today.add(num-1, 'day') : today.add(num, unit).add(-1, 'day')]

    return [unit == 'day' ? today.add(-(num-1), 'day') : today.add(-num, unit).add(1, 'day'), today]
}

export function relativeLabel(key){
    let p = parseRelative(key)
    if( !p ) return Presets[key]?.label || key

    let {dir, num, unit} = p
    let Unit = unit[0].toUpperCase()+unit.slice(1)

    if( dir == 'this' ) return unit == 'day' ? 'Today' : `This ${Unit}`
    if( dir == 'todate' ) return `${Unit} to Date`
    if( dir == 'following' ) return unit == 'day' ? 'Tomorrow' : `Next ${Unit}`
    if( dir == 'previous' ) return unit == 'day' ? 'Yesterday' : `Last ${Unit}`
    return `${dir == 'next' ? 'Next' : 'Last'} ${num} ${Unit}${num == 1 ? '' : 's'}`
}
