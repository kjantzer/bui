import { LitElement, html, css } from 'lit-element'

customElements.define('b-ts', class extends LitElement{

    static get styles(){return css`
        :host {
            display: inline-block;
            white-space: nowrap;
        }
    `}

    connectedCallback(){
        super.connectedCallback()
        this._updateInterval = setInterval(this.update.bind(this), 60*1000)
    }
    
    disconnectedCallback(){
        super.disconnectedCallback()
        clearInterval(this._updateInterval)
    }

    get date(){ return this.__date}
    set date(date){
        this.__date = date

        if( date )
            this.title = this.date.format('LT l')
        
        this.requestUpdate()
    }

    get displayTime(){
        if( !this.date ) return ''
        // TODO: support different formats?
        // TODO: this is a moment.js format...what if moment not used?
        return this.date.fromNow()
    }

    render(){return html`
        ${this.displayTime}
    `}

})

export default customElements.get('b-ts')