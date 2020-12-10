import { LitElement, html, css } from 'lit-element'
import {live} from 'lit-html/directives/live'
import 'lit-virtualizer'
import dayjs from 'dayjs'
import './month'

window.dayjs = dayjs

import daterange from './daterange'


customElements.define('b-datepicker', class extends LitElement{

    static get styles(){return css`
        :host {
            display: inline-block;
            position:relative;
            /* height: 300px; */
            /* min-width: 240px; */
            /* padding: 0 .5em; */
            --gap: .25em;
            --pad: .5em;
            --size: 2em;
            --font-size: calc(.4 * var(--size));
        }

        lit-virtualizer {
            width: 270px;
            width: calc((7 * var(--size)) + (2 * var(--pad)) + (6 * var(--gap)));
            height: 340px;
            box-sizing: border-box;
            padding: 0 var(--pad);
        }

        lit-virtualizer::-webkit-scrollbar {
            display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        lit-virtualizer {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }

        /* div {
            background: #ddd; 
            border-bottom: solid 1px black;
            height: 100%;
            width: 100%;
        } */

        header {
            padding: 1em .5em;
            /* border-bottom: solid 1px var(--theme-bgd-accent); */
        }

        header input {
            border: none;
            font-size: 1em;
            width: 6em;
            outline: none;
        }

        :host([active="start"]) header input:first-of-type {
            color: var(--theme);
        }

        :host([active="end"]) header input:last-of-type {
            color: var(--theme);
        }

        .day-header {
            display: grid;
            grid-template-columns: repeat(7, var(--size));
            /* grid-auto-rows: 2em; */
            gap: var(--gap);
            text-align: center;
            border-bottom: solid 2px var(--theme-bgd-accent);
            padding: 0 var(--pad);
        }

        .day-header > div {
            font-size: var(--font-size);
            font-weight: bold;

        }
    `}

    static get properties(){return {
        // min: {type: Object},
        // max: {type: Object},
        range: {type: Boolean, reflect: true},
        active: {type: String, reflect: true}
    }}
    
    constructor(){
        super()

        this.range = true
        this.active = 'start'

        this.daysHeader = dayjs.weekdaysMin()

        let min = dayjs('2019-02-01')
        let max = dayjs('2021-12-15')
        
        this.selectedRange = daterange(dayjs(), dayjs(), {min, max, range:this.range})
        this.selectedRange.on('change', this.onSelectedRangeChange.bind(this))
        
        this.months = []
        while( min.isBefore(max) ){
            
            let d = min.clone()
            d.calendarDays = daysForDate(d)
            
            this.months.push(d)

            min = min.add(1, 'month')
        }

        // TEMP
        window.selectedRange = this.selectedRange
    }

    firstUpdated(){

        this.monthsList = this.$$('lit-virtualizer')

        setTimeout(() => {
            this.scrollToDate('start')
        }, 1);
    }

    scrollToDate(date='start', location='center'){
        if( ['start', 'end'].includes(date) ) 
            date = this.selectedRange[date]
            
        let index = this.months.findIndex(m=>m.isSame(date, 'month'))
        
        if( index > -1 )
            this.monthsList.scrollToIndex(index, location)
    }

    render(){return html`
        <header>
            <input type="text" placeholder="Start date" .key=${'start'}
                .value=${live(this.selectedRange.start.format('MMM D, YYYY'))}
                @focus=${this.dateInputFocused}
                @change=${this.dateInputChange} >
            
            ${this.range?html`
            
            <b-text muted>–</b-text>

            <input type="text" placeholder="End date" .key=${'end'}
                .value=${live(this.selectedRange.end.format('MMM D, YYYY'))}
                @focus=${this.dateInputFocused}
                @change=${this.dateInputChange} >

            `:''}
        </header>

        <div class="day-header">${this.daysHeader.map(day=>html`
            <div>${day}</div>
        `)}</div>
        
        <lit-virtualizer
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

    /* calendar */
    onDateSelected(e){
        let {date} = e.detail
        this.selectedRange[this.selectedRange.active] = date
    }

    /* input */
    dateInputFocused(e){
        this.selectedRange.active = e.target.key
        this.scrollToDate(this.selectedRange.active)
    }

    dateInputChange(e){
        let {key, value} = e.target
        console.log(key, value);

        try {
            this.selectedRange[key] = value

        }catch(err){
            console.log('could not set:', err);
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