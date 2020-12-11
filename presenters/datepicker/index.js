import { LitElement, html } from 'lit-element'
import {live} from 'lit-html/directives/live'
import 'lit-virtualizer'
import dayjs from 'dayjs'
import styles from './styles'
import './month'
import './presets'
import daterange from './daterange'

customElements.define('b-datepicker', class extends LitElement{

    static get styles(){return styles}

    static get properties(){return {
        value: {type: String},
        min: {type: String},
        max: {type: String},
        range: {type: Boolean, reflect: true},
        active: {type: String, reflect: true},
        presets: {type: Array}
    }}
    
    constructor({
        range = true,
        value = new Date(),
        min = '1975-01-01',
        max = '2099-12-31',
        presets = [],
    }={}){
        super()

        this.range = range
        this.value = value
        this.min = min
        this.max = max
        this.active = 'start'
        this.presets = range ? presets : false

        this.onSelectedRangeChange.bind(this)
        this.daysHeader = dayjs.weekdaysMin()

        this.applyMonths()
    }

    set value(val){
        
        if( !Array.isArray(val) ){
            
            if( typeof val == 'string' )
                val = val.split(',')
            else
                val = [val, val]

            val[1] = val[1] || val[0]
        }

        if( this.selectedRange ){
            this.selectedRange.range = val
        }else{
            this._value = val
        }
    }
    
    get value(){
        if( this.range )
            return {start: this.selectedRange.start, end: this.selectedRange.end}
        else
            return this.selectedRange.start
    }

    // shouldUpdate(changedProperties){

    //     if( changedProperties.min )
    //         this.selectedRange.min = changedProperties.min
    //     if( changedProperties.max )
    //         this.selectedRange.max = changedProperties.max

    //     return true
    // }

    applyMonths(){

        let min = dayjs(this.min).startOf('day')
        let max = dayjs(this.max).endOf('day')

        if( !this.selectedRange ){

            let [start, end] = this._value
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

        setTimeout(() => {
            this.scrollToDate('start')
        }, 1);

        this.selectedRange.on('change', this.onSelectedRangeChange.bind(this))
    }

    scrollToDate(date='start', location='center'){

        if( ['start', 'end'].includes(date) ) 
            date = this.selectedRange[date]
            
        let index = this.months.findIndex(m=>m.isSame(date, 'month'))
        
        if( index > -1 )
            this.monthsList.scrollToIndex(index, location)
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
        
        <lit-virtualizer
            part="months"
            .items=${this.months}
            .renderItem=${this.renderMonth.bind(this)}
            @date-selected=${this.onDateSelected}
        ></lit-virtualizer>
    `}

    renderMonth(date){return html`
        <b-datepicker-month 
            .date=${date}
            .selectedRange=${this.selectedRange}
        ></b-datepicker-month>
    `}

    onSelectedRangeChange(prop, val){
        if( prop == 'active' )
            return this.active = val

        this.update()
    }

    onPresetSelected(e){
        let {start, end} = e.detail
        this.selectedRange.range = [start, end]
        this.selectedRange.active = 'end'
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
            this.selectedRange.range = [month.startOf('month'), month.endOf('month')]
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