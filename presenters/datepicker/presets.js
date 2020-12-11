import { LitElement, html, css } from 'lit-element'
import dayjs from 'dayjs'

export const Presets = {
    'today': { label: 'Today', value:d=>d },
    'yesterday': { label: 'Yesterday', value:d=>d.add(-1, 'day') },
    '7 days': { label: 'Last 7 Days', start:d=>d.add(-6, 'day') },
    'last week': {
        label: 'Last Week',
        start: d=>d.startOf('week').add(-7, 'day'),
        end: (d,start)=>start.add(6, 'day')
    },
    '30 days': { label: 'Last 30 Days', start:d=>d.add(-29, 'day') },
    '60 days': { label: 'Last 60 Days', start:d=>d.add(-59, 'day') },
    '90 days': { label: 'Last 90 Days', start:d=>d.add(-89, 'day') },
    '120 days': { label: 'Last 120 Days', start:d=>d.add(-119, 'day') },

    'this year': {label: 'This year (Jan–Now)', start:d=>d.startOf('year')},
    'year': {label: 'This year', start:d=>d.startOf('year'), end:d=>d.endOf('year')},
    
    'last year': {label: 'Last year', 
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
        }

        b-btn > div {
            display: block;
            font-size: .8em;
            line-height: 1em;
            color: var(--theme-text-accent, #aaa);
        }
    `}

    set presets(val){
        let oldVal = this.presets

        // default to all presets if empty array given
        if( Array.isArray(val) && val.length == 0 ){
            val = Object.keys(Presets)
        }
        
        if( !val ){
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

            <b-btn clear .preset=${preset} @click=${this.onClick} icon=${preset.icon||''}>
                ${preset.label}
                <div>${preset.description||''}</div>
            </b-btn>

        `)}
    `}

    onClick(e){
        let preset = e.currentTarget.preset
        let [start, end] = getPresetRange(preset)
        this.emitEvent('preset-selected', {start, end, preset})
    }

})

export default customElements.get('b-datepicker-presets')

function formatPresets(presets){
    return presets.map(p=>{
        return formatPreset(p)
    })
}

function formatPreset(p){

    // support presets
    if( typeof p == 'string' ){
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

function getPresetRange(p){

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