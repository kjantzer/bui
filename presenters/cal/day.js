import { LitElement, html, css } from 'lit-element'

customElements.define('b-cal-day', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            /* background: var(--theme-bgd); */
            padding: .25em;
        }

        header {
            text-align: right;
        }

        .date {
            height: 1.8em;
            min-width: 1.8em;
            box-sizing: border-box;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            border-radius: 1em;
        }

        :host([overflow]) .date {
            color: var(--theme-color-accent);
            padding: 0 .35em;
        }

        :host([today]) .date {
            color: #fff;
            background: var(--theme);
        }
    `}

    get isOverflow(){
        return this.caldate.month() != this.date.month()
    }

    get isWeekend(){
        return [0, 6].includes(this.date.weekday())
    }

    get isToday(){
        return this.date.isSame(new Date(), 'day')
    }

    render(){return html`

        <header>
            <div class="date">
                ${this.date.date()==1?this.date.format('MMM'):''}
                ${this.date.get('date')}
            </div>
        </header>
        <main>
            <slot></slot>
        </main>
    `}

    set date(date){
        this.__date = date

        this.toggleAttribute('weekend', this.isWeekend)
        this.toggleAttribute('overflow', this.isOverflow)
        this.toggleAttribute('today', this.isToday)

        this.requestUpdate()
    }

    get date(){
        return this.__date
    }

})

export default customElements.get('b-cal-day')