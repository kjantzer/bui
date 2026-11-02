import { LitElement, html, css } from 'lit'
import dayjs from 'dayjs'
import '../../elements/btn'
import '../../elements/hr'

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
    A preset name above (ex: `30 days`, `last month`) or `[next ]N day|week|month|year[s]` (ex: `45 days`, `next 2 weeks`)
*/
const REL = /^(next )?(\d+) (day|week|month|year)s?$/

export function isRelative(key){
    return typeof key == 'string' && (!!Presets[key] || REL.test(key))
}

// [start, end] dayjs dates (today's) for a relative name
export function relativeRange(key){
    if( Presets[key] ) return getPresetRange(Presets[key])

    let [, next, num, unit] = key.match(REL) || []
    if( !unit ) return null

    num = parseInt(num)
    let today = dayjs().startOf('day')

    // (includes today; ex: last 7 days = 6 days ago through today)
    if( next )
        return [today, unit == 'day' ? today.add(num-1, 'day') : today.add(num, unit).add(-1, 'day')]

    return [unit == 'day' ? today.add(-(num-1), 'day') : today.add(-num, unit).add(1, 'day'), today]
}

export function relativeLabel(key){
    if( Presets[key] ) return Presets[key].label

    let [, next, num, unit] = key.match(REL) || []
    if( !unit ) return key

    unit = unit[0].toUpperCase()+unit.slice(1)
    return `${next ? 'Next' : 'Last'} ${num} ${unit}${num == 1 ? '' : 's'}`
}
