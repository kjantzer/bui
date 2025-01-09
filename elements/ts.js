/*
    # Timestamp (ts)

    Render a date. Uses day.js and accepts a range of different date types (string, date object, dayjs object)

    ```html-preview
    <b-ts date="2024-09-12"></b-ts>
    ```
*/
import { LitElement, html, css } from 'lit'
import dayjs from '../helpers/day-js'

customElements.define('b-ts', class extends LitElement{

    static get properties(){return {
        date: {},
        format: {type: String},
        fallback: {type: String},
        trackAge: {type: String},
        roundAge: {type: Number}
    }}

    constructor(){
        super()
        this.format = 'relative'
        this._extraTitle = this.getAttribute('title')||''
    }

    static get styles(){return css`
        :host {
            display: inline-block;
            white-space: nowrap;
        }

        :host([hidden]) { display: none; }
    `}

    connectedCallback(){
        super.connectedCallback()
        if( this.format == 'relative' )
            this._updateInterval = setInterval(this.update.bind(this), 60*1000)
    }
    
    disconnectedCallback(){
        super.disconnectedCallback()
        clearInterval(this._updateInterval)
    }

    get date(){ return this.__date}
    set date(date){

        if( typeof date === 'string' 
        || typeof date === 'number' 
        || date instanceof Date )
            date = dayjs(date)

        this.__date = date

        if( date )
            this.title = this._extraTitle+this.date.format('LT l')
        
        this.requestUpdate()
    }

    get displayTime(){
        if( !this.date ) return this.fallback

        if( this.trackAge ){
            
            let age = ''
            if( this.date.isValid() )
                age = this.date.diff(new Date(), this.trackAge)
            
            if( this.trackAge = 'day' && age == 0 && !this.date.isSame(new Date(), 'date') )
                age = -1

            if( age && this.roundAge ){
                age = age/(this.roundAge||1)
                age = age < 0 ? Math.floor(age) : Math.ceil(age) 
            }

            let target = this.trackAgeTarget || this
            if( typeof target == 'function' )
                target = target.call(this)

            target?.setAttribute('age', age)
        }
        
        if( this.format == 'relative' && this.date.fromNow )
            return this.date.isValid() ? this.date.fromNow() : this.fallback
        if( this.format == 'calendar' && this.date.calendarDate )
            return this.date.calendarDate() || this.fallback
        if( this.format == 'date' )
            return this.date.isValid() ? this.date.format('M/D/YY') : this.fallback
        if( this.format == 'datetime' )
            return this.date.isValid() ? this.date.format('h:mma M/D/YY') : this.fallback
        else
            return this.date.isValid() ? this.date.format(this.format) : this.fallback
    }

    render(){return html`
        ${this.displayTime}
    `}

})

export default customElements.get('b-ts')