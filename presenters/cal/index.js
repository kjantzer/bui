import { LitElement, html, css } from 'lit-element'
import '../../elements/btn-group'
import '../../helpers/lit-element/events'
import moment from 'moment'
import './day'

customElements.define('b-cal', class extends LitElement{

    constructor(){
        super()

        this.weekdays = moment.weekdaysMin()

        this.days = new Array(7*6).fill('')
        this.date = this._date || moment()
    }

    static get styles(){return css`
        :host {
            /* height: 100%; */
            display: grid;
            position:relative;
            display: grid;
            grid-template-rows: auto auto 1fr;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1em 1em .5em;
        }

        h1, h2, h3 {
            margin: 0;
        }

        .weekdays {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
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
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-template-rows: repeat(6, 1fr);
            gap: 1px;
            border-top: solid 1px rgba(var(--theme-rgb, 0,0,0), .1);
        }

        b-cal-day {
            border-right: solid 1px rgba(var(--theme-rgb, 0,0,0), .1);
            border-bottom: solid 1px rgba(var(--theme-rgb, 0,0,0), .1);
            flex-shrink: 0;
            min-width: 0;
        }

        b-cal-day[weekend] {
            background: var(--theme-bgd-accent, #f5f5f5);
        }
    `}

    get date(){ return this._date }

    set date(val){

        if( val instanceof moment ){
            this._date = val
			this._dateSelected = this._date.clone()

        }else if( typeof val == 'string' ){

            this._date = moment(val)
			this._dateSelected = this._date.clone()

		}else if( val && typeof val == 'object' ){
			this._dateSelected.set(val)
			this._date.set(val)
        }

		this._date.set({date: 1})

        this._loadDays()

        this.emitEvent('date-changed', this.range)
	}

    firstUpdated(){
        this.emitEvent('date-changed', this.range)
    }

    _loadDays(){
        let start = this._date.weekday()
		let numDays = this._date.daysInMonth()

        this.days = this.days.map((_, i)=>{
            return this._date.clone().add(i-start, 'day')
        })
    }

    get range(){
        return [this.days[0], this.days[this.days.length-1]]
    }

    nextMonth(){
		this.date = this.date.add('month', 1)
        this.update()
	}

	prevMonth(){
		this.date = this._date.add('month', -1)
        this.update()
	}

    goToToday(){
        this.date = moment()
        this.update()
    }

    render(){return html`
        <header>
            <h1>${this.date.format('MMMM YYYY')}</h1>
            <div>
                <div>
                    <b-btn text icon="left-open-big" @click=${this.prevMonth}></b-btn>
                    <b-btn text @click=${this.goToToday}>Today</b-btn>
                    <b-btn text icon="right-open-big" @click=${this.nextMonth}></b-btn>
                </div>
            </div>
        </header>
        <div class="weekdays">${this.weekdays.map(str=>html`
            <div>${str}</div>
        `)}</div>
        <main>
        ${this.days.map(date=>html`
            <b-cal-day .caldate=${this._date} .date=${date}>
                <slot name="${date.format('YYYY-MM-DD')}"></slot>
            </b-cal-day>
        `)}
        </main>
    `}

})

export default customElements.get('b-cal')