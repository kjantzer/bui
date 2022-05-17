import { LitElement, html, css } from 'lit'
import View from './view'
import docs from 'bui/presenters/calendar/README.md'
import 'bui/presenters/calendar'
import Panel from 'bui/presenters/panel'
import router from 'bui/router'

customElements.define('demo-presenter-calendar', class extends View{

    static get title(){ return 'Calendar' }

    static get styles(){return [super.styles, css`
        
    `]}

    get docs(){ return docs }


    renderTitleRight(){ return html`
        <b-btn @click=${this.openDemo} color="theme-gradient">Calendar Demo</b-btn>
    `}

    openDemo(){
        router.goTo('calendar-demo')
    }

})


Panel.register('b-demo-calendar', {closeBtn: 'arrow'})

customElements.define('b-demo-calendar', class extends LitElement{

    static title = 'Calendar Demo'
    static path = 'calendar-demo'

    static get styles(){return css`
        :host {
            display: grid;
            grid-template-rows: auto 1fr;
        }
    `}

    render(){return html`
        <b-panel-toolbar></b-panel-toolbar>
        <b-calendar .renderMonthContent=${this.renderMonthContent}></b-calendar>
    `}

    async renderMonthContent(date, month, year){
        
        // if looking at this month
        if( date.isSame(new Date(), 'month')){
            let slot = `${year}-${String(month).padStart(2, '0')}-15`
            let slot2 = `${year}-${String(month).padStart(2, '0')}-17`

            function move(e){ 
                e.currentTarget.parentElement.slot  = slot2
                e.currentTarget.remove()
            }

            return html`
                <div slot="${slot}">
                    This is dynamic content for the 15th of the current month
                    <b-btn clear color="theme" @click=${move}>Move forward 2 days</b-btn>
                </div>
            `
        }
    }

})