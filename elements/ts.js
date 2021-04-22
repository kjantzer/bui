import { LitElement, html, css } from 'lit'
import dayjs from '../helpers/day-js'

customElements.define('b-ts', class extends LitElement{

    static get properties(){return {
        format: {type: String},
        fallback: {type: String}
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
        if( !this.date ) return ''
        
        if( this.format == 'relative' && this.date.fromNow )
            return this.date.isValid() ? this.date.fromNow() : this.fallback
        if( this.format == 'calendar' && this.date.calendarDate )
            return this.date.calendarDate() || this.fallback
        else
            return this.date.format(this.format) || this.fallback
    }

    render(){return html`
        ${this.displayTime}
    `}

})

export default customElements.get('b-ts')