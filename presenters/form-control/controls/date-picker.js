import moment from 'moment';
import {css} from 'lit-element'

const styles = css`

:host {
    display: inline-block;
    --color: #2196f3;
    --radius: 4px;
    text-align: left;
    border-radius: var(--radius);
    background: #fff;
}

main > header {
    background: var(--color);
    color: #fff;
    padding: 1em 1em 1.25em 1em;
    border-radius: var(--radius) var(--radius) 0 0;
    display: grid;
    grid-template-columns: 1fr auto
}

main > header * {
    margin: 0;
    padding: 0;
    font-weight: normal;
    cursor: pointer;
    display: inline-block;
    justify-self: flex-start;
}

main > header .today {
    text-transform: uppercase;
    font-size: .7em;
    font-weight: bold;
    justify-self: flex-end;
    align-self: flex-start;
    opacity: .6;
}

main > header .today:hover {
    opacity: 1;
}

main > header h4 {
    margin: 0 0 .75em 0;
}

main:not(.pick-year) > header h4 {
    color: rgba(255,255,255,.5);
}

main.pick-year > header h1 {
    color: rgba(255,255,255,.5);
}

section {
    padding: 1em;
    position: relative;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
}

nav > svg {
    height: 1.4em;
    padding: .25em;
    margin: -.25em;
    opacity: .4;
    cursor: pointer;

}

nav > svg:hover {
    opacity: 1;
}

svg > * {
	pointer-events: none;
}

section header,
section .days {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    font-size: .8em;
    text-align: center;
}

section header {
    color: rgba(0,0,0,.3);
    margin: 1em 0;
    font-size: .7em;
}

day {
    padding: .7em;
    height: 1.4em;
    width: 1.4em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2em;
    cursor: pointer;
}

day[active] {
    background: var(--color);
    color: #fff;
}

day[today]:not([active]) {
    color: var(--color)
}


years,
months {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    overflow: auto;
    background: #fff;
    border-radius: 0 0 var(--radius) var(--radius);
}

main:not(.pick-year) years {
    display: none;
}

year {
    padding: .5em 0;
    cursor: pointer;
}

year[active],
month[active] {
    color: var(--color);
    font-size: 1.4em;
}

months {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

month {
    justify-self: stretch;
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
}

main:not(.pick-month) months {
    display: none;
}

:host([calendar-only]) main > header {
    display: none;
}`

const changeEvent = function(el, details={}){
    var event = new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: Object.assign({}, details, {
            value: el.value
        })
    });
    
    el.dispatchEvent(event)
}

class DatePickerElement extends HTMLElement {

	constructor(){
		super()
	
		let htmlDaysHeader = moment.weekdaysMin().map(str=>`<div>${str}</div>`).join("\n")

		let startYear = parseInt(this.getAttribute('year-start') || '1900')
		let endYear = parseInt(this.getAttribute('year-end') || '2099')
		let years = ''
		while(startYear <= endYear){
			years += `<year value="${startYear}">${startYear++}</year>`
        }
        
        let months = moment.monthsShort().map((m,i)=>`<month value="${i}">${m}</month>`).join("\n")

		this.attachShadow({mode: 'open'})
        let temp = document.createElement('template')
        temp.innerHTML = `
			<style>${styles.cssText}</style>
			<main>
				<header>
					<h4 class="selected-year">Year</h4>
					<a class="today">Today</a>
					<h1 class="selected-date">Date, Day</h1>
				</header>
				<section>
					<nav>
						<svg class="back" focusable="false" viewBox="0 0 24 24">
							<path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
							<path fill="none" d="M0 0h24v24H0V0z"></path>
						</svg>
						<div class="viewing-month">Month</div>
						<svg class="forward" focusable="false" viewBox="0 0 24 24">
							<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
							<path fill="none" d="M0 0h24v24H0V0z"></path>
						</svg>
					</nav>
					<header>${htmlDaysHeader}</header>
					<div class="days"></div>
                    <years>${years}</years>
                    <months>${months}</months>
				</section>
			</main>`

		this.shadowRoot.appendChild(temp.content.cloneNode(true));
		
		this._yearEl = this.$('.selected-year')
		this._dateEl = this.$('.selected-date')
		this._monthEl = this.$('.viewing-month')
		this._monthDays = this.$('main .days')

		this.shadowRoot.addEventListener('click', this._onClick.bind(this))
	}

	connectedCallback(){
		this._setDate(this.value)
    }
    
    get value(){ return this.getAttribute('value') }
	set value(val){ this._setDate(val) }

	get format(){ return this.getAttribute('format') || 'MM/DD/YYYY'}
	set format(val){ this.setAttribute('format', val) }

	get date(){ return this._dateSelected.clone() }
	get isValid(){ return this._dateSelected.isValid() }

	formatted(format){
		if( format === undefined )
			format = this.format

		return this._dateSelected.format(format)
	}

	_renderMonth(){

		let start = this._date.weekday()
		let numDays = this._date.daysInMonth()
		let days = new Array(7*6).fill('')
		let i = 0

		while(i<numDays){ days[i+start] = ++i }

		this._monthDays.innerHTML = days.map(day=>`<day value="${day}">${day}</day>`).join("\n")
        this._monthEl.innerHTML = this._date.format('MMMM YYYY')
        
        if( this._lookingAtSelectedMonth ){

            let elSelected = this.$(`day[value="${this._dateSelected.date()}"]`)
			if( elSelected )
				elSelected.setAttribute('active', '')
        }

        if( this._lookingAtToday ){
            let el = this.$(`day[value="${this._today.date()}"]`)
			if( el )
				el.setAttribute('today', '')
        }
	}

	nextMonth(){
		this._date.add('month', 1)
		this._renderMonth()
	}

	prevMonth(){
		this._date.add('month', -1)
		this._renderMonth()
	}

	pickYear(show=true){

        this.pickMonth(false)

		if( show ){
			this.$('main').classList.add('pick-year')

			let activeYear = this.$('year[active]')
			if( activeYear )
				activeYear.scrollIntoView()

		}else
			this.$('main').classList.remove('pick-year')
    }
    
    pickMonth(show=true){
		if( show ){
			this.$('main').classList.add('pick-month')
		}else
			this.$('main').classList.remove('pick-month')
	}

	$(str){ return this.shadowRoot.querySelector(str)}
	$$(str){ return this.shadowRoot.querySelectorAll(str)}

	_onClick(e){
		
		if( e.target.tagName == 'DAY' ){
			let val = e.target.getAttribute('value')
			if( val ){
				this._setDate({
					year: this._date.year(),
					month: this._date.month(),
					date: val
                })
			}
			return
		}

		if( e.target.tagName == 'YEAR' ){
			let val = e.target.getAttribute('value')
			if( val ){
				this._setDate({
					year: val
				})
                this.pickYear(false)
			}
			return
        }
        
        if( e.target.tagName == 'MONTH' ){
			let val = e.target.getAttribute('value')
			if( val ){
				this._setDate({
                    date: 1,
					month: val
				})
                this.pickMonth(false)
			}
			return
		}

		if( e.target.classList.contains('selected-year') )
			return this.pickYear()

		if( e.target.classList.contains('selected-date') )
			return this.pickYear(false)

		if( e.target.classList.contains('today') ){
            this.pickMonth(false)
            this.pickYear(false)
            return this._setDate()
        }
            
        if( e.target.classList.contains('viewing-month') )
            return this.pickMonth()

		if( e.target.tagName == 'svg' ){
			e.target.classList.contains('back') ? this.prevMonth() : this.nextMonth()
			return
		}
    }
    
    get _lookingAtToday(){
        this._today = this._today || moment()
        return this._date.year() == this._today.year() && this._date.month() == this._today.month()
    }

    get _lookingAtSelectedMonth(){
        this._today = this._today || moment()
        return this._date.year() == this._dateSelected.year() && this._date.month() == this._dateSelected.month()
    }

	_setDate(val){

		if( val && typeof val == 'object' ){
			this._dateSelected.set(val)
			this._date.set(val)

			changeEvent(this, val)
		}else{
			this._date = val ? moment(val, this.format) : moment()
			this._dateSelected = this._date.clone()
		}

		this._date.set({date: 1})

		this._renderMonth()
		this._refresh()
	}

	_refresh(){

		if( this._dateSelected.isValid() )
			this.removeAttribute('invalid')
		else
			this.setAttribute('invalid', '')

		this.setAttribute('value', this.formatted())

        this.$$('[active]').forEach(el=>el.removeAttribute('active'))

		if( !this._dateSelected.isValid() ){
			this._yearEl.innerHTML = '–'
			this._dateEl.innerHTML = 'Invalid'
			return
		}

		if( this._lookingAtSelectedMonth ){
			let el = this.$(`day[value="${this._dateSelected.date()}"]`)
			if( el )
				el.setAttribute('active', '')
		}

		let yearEl = this.$(`year[value="${this._dateSelected.year()}"]`)
		if( yearEl ){
			yearEl.setAttribute('active', '')
        }
        
        let monthEl = this.$(`month[value="${this._dateSelected.month()}"]`)
		if( monthEl ){
			monthEl.setAttribute('active', '')
		}

		this._yearEl.innerHTML = this._dateSelected.year()
		this._dateEl.innerHTML = this.formatted('ddd, MMM D')
    }
}


customElements.define('date-picker', DatePickerElement)

export default customElements.get('date-picker')
