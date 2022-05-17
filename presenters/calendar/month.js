import { LitElement, html, css } from 'lit'
import '../../helpers/lit/events'
import scrollbars from '../../helpers/scrollbars'

customElements.define('b-calendar-month', class extends LitElement{

    static get properties(){return {
        date: {type: Object},
        // inViewport: {type: Boolean, reflect: true}
    }}

    static get styles(){return css`
        :host {
            display: grid;
            grid-template-columns: var(--columns);
            grid-auto-rows: 25%;
            /* gap: var(--gap); */
            text-align: center;
            width: 100%;
            --height: 80vh;
            height: var(--height);
            pointer-events: none;
        }

        :host([weeks="6"]) {
            --height: 100vh;
            grid-auto-rows: 20%;
        }

        .label {
            position: absolute;
            top: .25em;
            left: .25em;
            /* grid-column: 1/-1;
            display: flex;
            align-items: flex-end; */
        }

        /* :host([inline-label]) .label */
        .label {
            /* grid-column: 1/4; */
            align-items: center;
            pointer-events: all;
            top: -1em;
        }

        /* :host([inviewport]) .label {
            display: none;
        } */

        .day {
            pointer-events: all
        }

        .day[num=""] {
            pointer-events: none;
            visibility: hidden;
        }

        /* :host([inline-label]) .day:nth-of-type(1),
        :host([inline-label]) .day:nth-of-type(2),
        :host([inline-label]) .day:nth-of-type(3) {
            display: none;
        } */

        .day {
            /* padding: .7em; */
            height: 100%;
            width: 100%;
            display: grid;
            padding-top: 2em;
            box-sizing: border-box;
            /* display: flex;
            justify-content: center;
            align-items: center; */
            /* border-radius: var(--size); */
            position: relative;
            z-index: 1;

            /* border-right: solid 1px var(--theme-text-accent);
            border-bottom: solid 1px var(--theme-text-accent); */
            box-shadow: 0px 0px 1px rgba(var(--theme-text-rgb), .4);
        }

        .day main {
            text-align: left;
            overflow: visible;
            min-width: 0;
            overflow-y: auto;
        }
        
        ${scrollbars.hide('.day main')}


        .day-num {
            font-size: var(--font-size);
            pointer-events: none;

            display: inline-flex;
            width: 2em;
            justify-content: center;
            align-items: center;
            height: 2em;
            border-radius: 1em;
            position: absolute;
            top: .25em;
            right: .25em;
            /* font-weight: bold; */
        }

        :host(:not([inviewport])) .day-num {
            color: var(--theme-text-accent);
            font-weight: normal;
        }

        .day.today .day-num {
            box-shadow: 0 0 0 2px var(--theme) inset;
            color: var(--theme);
        }

        .day[num="1"] .day-num {
            width: auto;
            padding: 0 .5em;
            font-weight: bold;
            color: var(--theme) !important;
        }

        .day[active] {
            background: var(--color);
            color: #fff;
        }

        /* .day[today]:not([active]) {
            color: var(--color)
        } */

        /* .day:not([num=""]):not(.active):not(.disabled):hover {
            background: var(--theme-bgd-accent, #ddd);
        } */
        

        .day.disabled {
            color: var(--theme-text-accent, #aaa);
        }

        .day.active .day-num {
            background-color: var(--theme);
            color: white !important;
        }

        /* .day.today {
            box-shadow: 0 0 0 1px var(--theme);
        } */

        .bgd {
            display: grid;
            grid-template-columns: 1fr 1fr;
            position: absolute;
            left: -2px;
            width: calc(100% + (var(--gap)));
            height: 100%;
            z-index: -1;
            opacity: 0;
        }

        .day.selected .bgd {
            opacity: 1;
        }

        .bgd > div {
            background-color: var(--theme);
            opacity: .1;
        }

        .day.start .bgd .left { 
            /* border-radius: var(--size) 0 0 var(--size); */
            margin-left: calc(var(--gap) / 2);
        }

        .day.end .bgd .right {
            /* border-radius: 0 var(--size) var(--size) 0; */
            margin-right: calc(var(--gap) / 2);
        }

        /* weekends */
        .day:nth-of-type(7n+1),
        .day:nth-of-type(7n) {
            background-color: rgba(var(--theme-text-rgb), 0.05);
        }

        .day:nth-of-type(7n+1) .day-num,
        .day:nth-of-type(7n) .day-num {
            color: var(--theme-text-accent);
        }

        .day:nth-of-type(7n+1):not(.start) .bgd .left {
            width: calc(100% + var(--pad));
            margin-left: calc(-1 * var(--pad));
        }

        .day:nth-of-type(7n):not(.end) .bgd .right {
            width: calc(100% + var(--pad));
        }
    `}

    updated(){
        super.updated()
        this.setAttribute('start', this.date.day())
        this.setAttribute('weeks', this.date.weeksInMonth())
        this.toggleAttribute('inline-label', this.date.day()>2)
    }

    constructor(){
        super()
        this.onClick = this.onClick.bind(this)
        this.onSelectedRangeChange = this.onSelectedRangeChange.bind(this)
    }

    firstUpdated(){
        this.shadowRoot.addEventListener('click', this.onClick, false)
        this.selectedRange.on('change', this.onSelectedRangeChange)
    }

    get intersectionObserver(){

        let threshold = {
            'biweekly': 0.4,
            'weekly': 0.2
        }[this.display]||0.8

        return this.__intersectionObserver = this.__intersectionObserver || new IntersectionObserver((entries)=>{

            clearTimeout(this._emitInViewport)

            this.inViewport = entries.length == 1 && entries[0].isIntersecting

            if( this.inViewport )
                this._emitInViewport = setTimeout(()=>{
                    this.emitEvent('month-in-view', this)
                },100)
        }, {
            threshold: threshold
        });
    }

    connectedCallback(){
        super.connectedCallback()
        if( this.selectedRange )
            this.selectedRange.on('change', this.onSelectedRangeChange)

        this.intersectionObserver.observe(this)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        if( this.selectedRange )
            this.selectedRange.off('change', this.onSelectedRangeChange)

        if( this.__intersectionObserver )
            this.intersectionObserver.unobserve(this)
    }

    onSelectedRangeChange(){
        this.update()
    }

    isDaySelected(day){
        return this.date.set('date', day) in this.selectedRange
    }

    dayClassNames(day){

        if( !day ) return ''

        let classNames = []
        let date = this.date.set('date', day)

        if( date in this.selectedRange )
            classNames.push('selected')

        if( date.isSame(new Date(), 'day') )
            classNames.push('today')
        
        if( date.isSame(this.selectedRange.start, 'day') ){
            classNames.push('start')
            if( this.selectedRange.active == 'start' )
                classNames.push('active')
        }
        
        if( date.isSame(this.selectedRange.end, 'day') ){
            classNames.push('end')
            if( this.selectedRange.active == 'end' )
                classNames.push('active')
        }

        if( date.isAfter(this.selectedRange.max, 'day') 
        || date.isBefore(this.selectedRange.min, 'day') )
            classNames.push('disabled')

        return classNames.join(' ')
    }

    render(){return html`

        <b-text md block class="label">
            <b-text class="select-month">${this.date.format('MMMM YYYY')}</b-text>
        </b-text>

        ${this.date.calendarDays.map(day=>html`
            <div class="day ${this.dayClassNames(day)}" num=${day}>

                <div class="bgd">
                    <div class="left"></div>
                    <div class="right"></div>
                </div>

                <span class="day-num">${day==1?`${this.date.format('MMM')} `:''}${day}</span>

                <main>
                    <slot name="${this.date.format('YYYY-MM')}-${day}"></slot>
                </main>

            </div>
        `)}
            
    `}

    onClick(e){
        // return
        let el = e.target

        // find the clicked day
        while( el && !el.getAttribute('num') && !el.classList.contains('select-month') ){
            el = el.parentElement
        }

        if( !el || el.classList.contains('disabled') ) return

        if( el.classList.contains('select-month') )
            return this.emitEvent('date-selected', {month:this.date})
        
        let day = el.getAttribute('num')
        let date = this.date.set('date', day)
        
        this.emitEvent('date-selected', {date})
    }

})

export default customElements.get('b-calendar-month')