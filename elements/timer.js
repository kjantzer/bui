import { LitElement, html, css } from 'lit'
import {msToTime} from '../util/time'

customElements.define('b-timer', class TimerElement extends LitElement {

    static get properties() { return {
		startAt: {}, // date string, date object, or DayJS object
		short: {type: Boolean, reflect: true},
		
		// internal setting
		_time: {type: Object},
    }}

    constructor(){
		super()
		this.short = false
		this._time = msToTime(0)
		
		if( this.hasAttribute('running') )
			this.startAt = new Date()

		this._progress = this._progress.bind(this)
	}

    static get styles(){ return css`
        :host {
            display: inline-flex;
			--zeroColor: rgba(0,0,0,.5);
			font-feature-settings: "tnum";
        }

		.hours[value="0"],
		.hours[value="00"] {
			display: none;
		}

		.hours[value="0"] + span,
		.hours[value="00"] + span {
			display: none;
		}

		:host([short]) .hours[value="00"] ~ .minutes[value="0"],
		:host([short]) .hours[value="00"] ~ .minutes[value="00"] {
			display: none;
		}

		:host([short]) .hours[value="00"] ~ .minutes[value="0"] + span,
		:host([short]) .hours[value="00"] ~ .minutes[value="00"] + span {
			display: none;
		}

		:host(:not([ms])) .ms { display: none; }

		/* span, */
		/* unit[value="00"] {
			color: var(--zeroColor);
		} */
    `}

    render(){ return html`
		<unit class="hours" value="${this.hours}">${this.hours}</unit>
		<span>:</span>
		<unit class="minutes" value="${this.minutes}">${this.minutes}</unit>
		<span>:</span>
		<unit class="seconds" value="${this.seconds}">${this.seconds}</unit>
		<unit class="ms">.${this.milliseconds}</unit>
    `}

	set startAt(val){
		let oldVal = this.startAt

		// dayjs object
		if( val?.toDate )
			val = val.toDate()
		// date string (or should be)
		else if( ['string', 'number'].includes(typeof val) )
			val = new Date(val)
		else if( !(val instanceof Date) )
			val = null

		// if invalid date string
		if( val && val.toString() == 'Invalid Date' )
			val = null

		this.__startAt = val

		if( val )
			this.start()
		else
			this.stop()
	
		this.requestUpdate('startAt', oldVal)
	}
	
	get startAt(){ return this.__startAt}

	set running(run){
		if( !run ){
			this._progressInterval = clearInterval(this._progressInterval)
		
		// if not already running, begin
		}else if( !this.running ){

			// if not "start at" defined, set it now
			if( !this.startAt )
				this.startAt = new Date()
			
			this._progressInterval = setInterval(this._progress, 100)
		}

		this.toggleAttribute('running', this.running)
	}

	get running(){ return !!this._progressInterval }

	start(startAt){
		if( startAt !== undefined ){
			this.stop()
			this.startAt = startAt
		}

		this.running = true
	}

	stop({clear=false}={}){
		if( clear )
			this.startAt = null

		this.running = false
	}

	_progress(){ 
		let elapsedTime = new Date().getTime() - this.startAt.getTime()
		this._time = msToTime(elapsedTime)
	}

	get hours(){ return String(this._time.h).padStart(2, '0') }
	get minutes(){ return String(this._time.m).padStart(2, '0') }
	get seconds(){ return String(this._time.s).padStart(2, '0') }
	get milliseconds(){ return Math.round(this._time.ms / 100) }


	toString({ms=false}={}){
		
		let str = [
			this.hours,
			this.minutes,
			this.seconds
		].join(':')

		if( ms )
			str += '.'+this.milliseconds

		return str
	}

	toJSON(){ return {
		...this._time,
		startAt: this.startAt.getTime(),
		elapsedMs: new Date().getTime() - this.startAt.getTime()
	}}
	
})

export default customElements.get('b-timer')