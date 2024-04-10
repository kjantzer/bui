import { LitElement, html } from 'lit'
import {live} from 'lit/directives/live.js'
import '@lit-labs/virtualizer'
import dayjs from 'dayjs'
import styles from './styles'
import './month'
import './presets'
import daterange, {label} from './daterange'

customElements.define('b-datepicker', class extends LitElement{

    static get styles(){return styles}

    static get properties(){return {
        value: {type: String},
        min: {type: String},
        max: {type: String},
        range: {type: Boolean, reflect: true},
        inputs: {type: Boolean, reflect: true},
        btns: {type: Object, reflect: true},
        active: {type: String, reflect: true},
        presets: {type: Array},
        applyPresetSelect: {type: Boolean}
    }}
    
    constructor({
        range = true,
        inputs = true,
        btns=true,
        value = new Date(),
        min = '1975-01-01',
        max = '2099-12-31',
        presets = [],
        applyPresetSelect = false
    }={}){
        super()

        this.range = range
        this.inputs = inputs
        this.btns = btns
        this.value = value
        this.min = min
        this.max = max
        this.active = 'start'
        this.presets = presets
        this.applyPresetSelect = applyPresetSelect

        this.onSelectedRangeChange.bind(this)
        this.daysHeader = dayjs.weekdaysMin()

        this.applyMonths()
    }

    set value(val){

        if( !val ) return
        
        if( !Array.isArray(val) ){
            
            if( typeof val == 'string' )
                val = val.split(',')
            else if( val.format ){
                val = val.format('MM/DD/YYYY')
                val = [val, val]
            }
            else
                val = [val.start||val, val.end||val]

            val[1] = val[1] || val[0]
        }

        if( this.selectedRange ){
            this.selectedRange.range = val
            this.scrollToDate(this.selectedRange.active)
        }else{
            this._value = val
        }
    }
    
    get value(){
        // if( !this.selectedRange ) return null

        let dbFormat = 'YYYY-MM-DD'
        if( this.range )
            return {
                start: this.selectedRange?.start.format(dbFormat),
                end: this.selectedRange?.end.format(dbFormat)
            }
        else
            return this.selectedRange?.start.format(dbFormat)
    }

    get label(){
        return this.selectedRange.label
    }

    applyMonths(){

        let min = dayjs(this.min).startOf('day')
        let max = dayjs(this.max).endOf('day')

        if( !this.selectedRange ){

            let [start, end] = this._value||[]
            delete this._value
            this.selectedRange = daterange(start, end, {min, max, range:this.range})
        }

        this.months = []
        while( min.isBefore(max) ){
            
            let d = min.clone()
            d.calendarDays = daysForDate(d)
            
            this.months.push(d)

            min = min.add(1, 'month')
        }
    }

    firstUpdated(){
        this.monthsList = this.$$('lit-virtualizer')
        this.selectedRange.on('change', this.onSelectedRangeChange.bind(this))
    }

    connectedCallback(){
        super.connectedCallback()
        this._didConnect = true
    }

    scrollToDate(date='start', location='center'){

        if( !this.monthsList ) return
        
        // timeout in case datepicker is in a closing popoover
        setTimeout(()=>{
            if( this.checkVisibility && !this.checkVisibility() ) return

            let index = this.indexOfDate(date)
            
            if( index > -1 )
                this.monthsList.scrollToIndex(index, location)
        })
    }

    indexOfDate(date){

        if( date == 'today' )
            date = dayjs()

        if( ['start', 'end'].includes(date) ) 
            date = this.selectedRange[date]
            
        let index = this.months.findIndex(m=>m.isSame(date, 'month'))

        return index
    }

    // .layout for the lit-virtualizer
    // https://github.com/lit/lit/tree/main/packages/labs/virtualizer#framing-a-child-element-within-the-viewport
    get _layout(){

        let layout = {}

        // when reconnected to dom, pin to start of selected range
        if( this._didConnect )
            layout.pin = {
                // NOTE: -6 added to properly render a correct position
                // not sure if bug or how we've implemented - seems okay for now, may need to remove later
                index: this.indexOfDate('start') - 6,
                block: 'start'
            }
        
        delete this._didConnect

        return layout
    }

    render(){return html`

        <b-datepicker-presets
            part="presets"
            .presets=${this.presets}
            @preset-selected=${this.onPresetSelected}
        ></b-datepicker-presets>

        <header part="header">

            <input part="input" type="text" placeholder="Start date" .key=${'start'}
                .value=${live(this.selectedRange.start.format('MMM D, YYYY'))}
                @focus=${this.dateInputFocused}
                @change=${this.dateInputChange} >
            
            ${this.range?html`
            
            <b-text muted>–</b-text>

            <input part="input" type="text" placeholder="End date" .key=${'end'}
                .value=${live(this.selectedRange.end.format('MMM D, YYYY'))}
                @focus=${this.dateInputFocused}
                @change=${this.dateInputChange} >

            `:''}
        </header>

        <div part="months-header" class="day-header">${this.daysHeader.map(day=>html`
            <div>${day}</div>
        `)}</div>
        
        <main>
        <lit-virtualizer
            part="months"
            .items=${this.months}
            .renderItem=${this.renderMonth.bind(this)}
            .layout=${this._layout}
            @date-selected=${this.onDateSelected}
        ></lit-virtualizer>
        </main>

        <footer part="footer">
            <b-btn clear @click=${this.clearDates} class="clear"
                ?hidden=${this.btns?.clear!==true}>Clear</b-btn>

            <b-btn clear @click=${this.cancelDate}>Cancel</b-btn>
            <b-btn clear color="theme" @click=${this.applyDate}>Apply</b-btn>
        </footer>
    `}

    renderMonth(date){return html`
        <b-datepicker-month 
            .date=${date}
            .selectedRange=${this.selectedRange}
        ></b-datepicker-month>
    `}

    clearDates(){
        this.emitEvent('clear')
        this.emitEvent('done', {action: 'clear'})
    }

    cancelDate(){
        this.emitEvent('cancel')
        this.emitEvent('done', {action: 'cancel'})
    }

    applyDate(){
        this.emitEvent('apply', this.value)
        this.emitEvent('done', {action: 'apply', value: this.value})
    }

    onSelectedRangeChange(prop, val){
        if( prop == 'active' )
            return this.active = val

        
        this.requestUpdate()
    }

    onPresetSelected(e){
        let {start, end} = e.detail
        this.selectedRange.range = [start, end]
        this.selectedRange.active = 'end'

        if( this.applyPresetSelect )
            this.applyDate()
        else
            setTimeout(()=>{
                this.scrollToDate('end')
            },100)
    }

    /* calendar */
    onDateSelected(e){
        let {date, month} = e.detail
        
        if( date )
            this.selectedRange[this.selectedRange.active] = date

        if( month ){

            this.selectedRange.range = [
                month.startOf('month'), 
                this.range ? month.endOf('month') : month.startOf('month')
            ]
        }
    }

    /* input */
    dateInputFocused(e){
        this.selectedRange.active = e.target.key
        this.scrollToDate(this.selectedRange.active)
    }

    dateInputChange(e){
        let {key, value} = e.target

        try {
            this.selectedRange[key] = value
            this.scrollToDate(key)

        }catch(err){
            this.update()
        }
    }

})

export default customElements.get('b-datepicker')


function daysForDate(date){
    
    let start = date.day()
    let numDays = date.daysInMonth()
    
    // array of empty day "slots"
    let numWeeks = Math.ceil((start+numDays) / 7)
    let days = new Array(7*numWeeks).fill('')
    let i = 0

    // fill with real days
    while(i<numDays){ days[i+start] = ++i }

    return days
}