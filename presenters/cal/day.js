import { LitElement, html, css } from 'lit-element'

customElements.define('b-cal-day', class extends LitElement{

    static get styles(){return css`
        :host {
            display: grid;
            grid-template-rows: auto 1fr;
            overflow: hidden;
            padding: .25em;
        }

        header {
            text-align: right;
        }

        main {
            overflow: auto;
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
            color: var(--theme-color-accent, #999);
            padding: 0 .35em;
        }

        :host([today]) .date {
            color: #fff;
            background: var(--theme, var(--blue, #2196F3));
        }
    `}

    get isOverflow(){
        return this.caldate.month() != this.date.month()
    }

    get isWeekend(){
        return [0, 6].includes(this.date.day())
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

    // firstUpdated(){
    //     let slot = this.shadowRoot.querySelector('slot');
    //     this.main = this.shadowRoot.querySelector('main');
    //     slot.addEventListener('slotchange', this.onSlotChange.bind(this));
    // }

    // onSlotChange(e){
    //     let nodes = e.target.assignedNodes();

    //     if( nodes[0] && nodes[0].nodeName == '#text' )
    //         return

    //     let doesOverflow = this.main.offsetHeight < this.main.scrollHeight

    //     console.log(doesOverflow);
    // }

})

export default customElements.get('b-cal-day')