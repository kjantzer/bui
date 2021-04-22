import { LitElement, html, css } from 'lit'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export class TimerElement extends LitElement {

    static get properties() { return {
        time: {type: Number},
		ms: {type: Boolean},
		short: {type: Boolean, reflect: true}
    }}

    constructor(){
		super()
        this.time = 0
		this.ms = false
		this.short = false
		this.running = this.hasAttribute('running') ? true : false
	}

	get time(){ return this.__time }

	set time(val){

		const oldVal = this.__time
		
		if( !this.dur )
			this.dur = dayjs.duration(val)
		else{
			let delta = val - oldVal
			this.dur = this.dur.add(delta)
		}

		if( val == 0 )
			this.setAttribute('zero', '')
		else
			this.removeAttribute('zero')

		this.__time = val
		this.requestUpdate('time', oldVal);
	}

    static get styles(){ return css`
        :host {
            display: inline-flex;
			--zeroColor: rgba(0,0,0,.5);
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
		${this.ms?html`<unit class="ms">.${this.milliseconds}</unit>`:''}
    `}

	get running(){
		return this._lastTS != null
	}

	set running(run){
		if( !run ){
			this.removeAttribute('running')
			this._lastTS = null
			clearInterval(this._progressInterval)
		}else if( !this.running ){
			this._lastTS = new Date().getTime()
			this._progressInterval = setInterval(this._progress.bind(this), 100)
			this.setAttribute('running', '')
		}
	}

	start(){ this.running = true }
	stop(){ this.running = false }

	_progress(){
		let ts = new Date().getTime()
		let elapsedTime = ts - this._lastTS
		this._lastTS = ts
		this.time += elapsedTime
	}

	get hours(){
		return String(this.dur.hours()).padStart(2, '0')
	}

	get minutes(){
		return String(this.dur.minutes()).padStart(2, '0')
	}

	get seconds(){
		return String(this.dur.seconds()).padStart(2, '0')
	}

	get milliseconds(){
		return Math.round(this.dur.milliseconds() / 100)
	}

	get format(){

		let str = [
			this.hours,
			this.minutes,
			this.seconds
		].join(':')

		if( this.ms )
			str += '.'+this.milliseconds

		return str
	}
}
    
customElements.define('b-timer', TimerElement)       
