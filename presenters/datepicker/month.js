import { LitElement, html, css } from 'lit-element'
import '../../helpers/lit/events'

customElements.define('b-datepicker-month', class extends LitElement{

    static get properties(){return {
        date: {type: Date}
    }}

    static get styles(){return css`
        :host {
            display: grid;
            grid-template-columns: repeat(7, var(--size));
            grid-auto-rows: var(--size);
            gap: var(--gap);
            text-align: center;
        }

        .label {
            grid-column: 1/-1;
            display: flex;
            align-items: flex-end;
        }

        :host([inline-label]) .label {
            grid-column: 1/4;
            align-items: center;
        }

        :host([inline-label]) .day:nth-of-type(1),
        :host([inline-label]) .day:nth-of-type(2),
        :host([inline-label]) .day:nth-of-type(3) {
            display: none;
        }

        .day {
            /* padding: .7em; */
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: var(--size);
            position: relative;
            z-index: 1;
        }

        .day > span {
            font-size: var(--font-size);
            pointer-events: none;
        }

        .day[active] {
            background: var(--color);
            color: #fff;
        }

        .day[today]:not([active]) {
            color: var(--color)
        }

        .day:not([num=""]):not(.active):not(.disabled):hover {
            background: var(--theme-bgd-accent, #ddd);
        }

        .day.disabled {
            color: var(--theme-text-accent, #aaa);
        }

        .day.active {
            background-color: var(--theme);
            color: white;
        }

        .day.today {
            box-shadow: 0 0 0 1px var(--theme);
        }

        .bgd {
            display: grid;
            grid-template-columns: 1fr 1fr;
            position: absolute;
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
            border-radius: var(--size) 0 0 var(--size);
            margin-left: calc(var(--gap) / 2);
        }

        .day.end .bgd .right {
            border-radius: 0 var(--size) var(--size) 0;
            margin-right: calc(var(--gap) / 2);
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
        this.toggleAttribute('inline-label', this.date.day()>2)
    }

    constructor(){
        super()
        this.onClick = this.onClick.bind(this)
        this.onSelectedRangeChange = this.onSelectedRangeChange.bind(this)
    }

    firstUpdated(){
        this.shadowRoot.addEventListener('click', this.onClick, false)
        // this.selectedRange.on('change', this.onSelectedRangeChange)
    }

    connectedCallback(){
        super.connectedCallback()
        if( this.selectedRange )
            this.selectedRange.on('change', this.onSelectedRangeChange)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        if( this.selectedRange )
            this.selectedRange.off('change', this.onSelectedRangeChange)
    }

    onSelectedRangeChange(){
        // console.log('selected range changed', this.date.format('l'));
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

        <b-text xbold sm block ucase class="label">
            <b-text link class="select-month">${this.date.format('MMM YYYY')}</b-text>
        </b-text>

        ${this.date.calendarDays.map(day=>html`
            <div class="day ${this.dayClassNames(day)}" num=${day}>

                <div class="bgd">
                    <div class="left"></div>
                    <div class="right"></div>
                </div>

                <span>${day}</span>

            </div>
        `)}
            
    `}

    onClick(e){
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

export default customElements.get('b-datepicker-month')