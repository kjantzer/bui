import { LitElement, html, css } from 'lit'
import '../../elements/btn-group'
import '../../helpers/lit/events'
import '../../helpers/day-js'
import dayjs from 'dayjs'
import './day'

customElements.define('b-cal', class extends LitElement{

    constructor(){
        super()

        this.weekdays = dayjs.weekdaysMin()

        this.days = new Array(7*6).fill('')
        this.date = this._date || this.getAttribute('date') || dayjs()
    }

    static get styles(){return css`
        :host {
            /* height: 100%; */
            display: grid;
            position:relative;
            display: grid;
            grid-template-rows: auto 1fr;
            --grid-cols: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        }

        :host([collapse-weekend]) {
            --grid-cols: 2.5em 1fr 1fr 1fr 1fr 1fr 2.5em;
        }

        header {
            position: sticky;
            top: 0;
            z-index: 10;
            background: var(--b-cal-header-bgd, var(--theme-bgd, #fff));
            border-bottom: solid 1px rgba(var(--theme-text-rgb, 0,0,0), .1);
            display: grid;
            grid-template-columns: max-content max-content;
            justify-content: space-between;
            align-items: center;
            padding: .75em 1em 0;
        }

        header .title,
        header .nav {
            display: flex;
            align-items: center;
        }

        h1, h2, h3 {
            margin: 0;
        }

        .weekdays {
            margin: .75em -1em 0;
            grid-column: 1/-1;
            display: grid;
            grid-template-columns: var(--grid-cols);
            text-align: right;
        }

        .weekdays > div {
            padding-right: .75em;
            padding-bottom: .5em;
        }

        main {
            /* height: 100%; */
            display: grid;
            position:relative;
            display: grid;
            grid-template-columns: var(--grid-cols);
            grid-template-rows: repeat(6, 1fr);
            gap: 1px;
            /* min-height: 0; */
        }

        b-cal-day {
            border-right: solid 1px rgba(var(--theme-text-rgb, 0,0,0), .1);
            border-bottom: solid 1px rgba(var(--theme-text-rgb, 0,0,0), .1);
            flex-shrink: 0;
            min-width: 0;
        }

        b-cal-day[weekend] {
            background: var(--theme-bgd-accent, #f5f5f5);
        }
    `}

    get date(){ return this._date }

    set date(val){
        
        let oldDate = this._date && this._date.clone()

        if( val instanceof dayjs ){
            this._date = val
			this._dateSelected = this._date.clone()

        }else if( typeof val == 'string' ){

            this._date = dayjs(val)
			this._dateSelected = this._date.clone()

		}else if( val && typeof val == 'object' ){
			this._dateSelected = this._dateSelected.set(val)
			this._date = this._date.set(val)
        }

		this._date = this._date.set({date: 1})

        if( oldDate && this._date.isSame(oldDate) )
            return

        this._loadDays()

        this.emitEvent('date-changed', this.range)
	}

    firstUpdated(){
        this.emitEvent('date-changed', this.range)
    }

    _loadDays(){
        let start = this._date.day()
		let numDays = this._date.daysInMonth()

        this.days = this.days.map((_, i)=>{
            return this._date.clone().add(i-start, 'day')
        })
    }

    get range(){
        return [this.days[0], this.days[this.days.length-1]]
    }

    nextMonth(){
		this.date = this._date.clone().add(1, 'month')
        this.update()
	}

	prevMonth(){
		this.date = this._date.clone().add(-1, 'month')
        this.update()
	}

    goToToday(){
        this.date = dayjs()
        this.update()
    }

    render(){return html`
        <header>
            <div class="title">
                <h1>${this.date.format('MMMM YYYY')}</h1>
                <slot name="after-title"></slot>
            </div>
            <div class="nav">
                <slot name="before-nav"></slot>
                <div>
                    <b-btn text icon="left-open-big" @click=${this.prevMonth}></b-btn>
                    <b-btn text @click=${this.goToToday}>Today</b-btn>
                    <b-btn text icon="right-open-big" @click=${this.nextMonth}></b-btn>
                </div>
                <slot name="after-nav"></slot>
            </div>

            <div class="weekdays">${this.weekdays.map((str,i)=>html`
                ${i==0||i==6?html`
                    <div @click=${this.toggleCollapseWeekend}>${str}</div>
                `:html`
                    <div>${str}</div>
                `}
            `)}</div>

        </header>
        <main>
        ${this.days.map(date=>html`
            <b-cal-day .caldate=${this._date} .date=${date}>
                <slot name="${date.format('YYYY-MM-DD')}"></slot>
            </b-cal-day>
        `)}
        </main>
    `}

    toggleCollapseWeekend(){
        this.toggleAttribute('collapse-weekend', !this.hasAttribute('collapse-weekend'))
    }

})

export default customElements.get('b-cal')