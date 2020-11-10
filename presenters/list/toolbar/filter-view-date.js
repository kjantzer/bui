import { LitElement, html, css } from 'lit-element'
import dayjs from 'dayjs'

customElements.define('b-list-filter-view-date', class extends LitElement{

    static get styles(){return css`
        :host {
            display: grid;
            position:relative;
            padding: .25em;
        }

        header {
            display: grid;
        }

        footer {
            display: flex;
            justify-content: flex-end;
        }

        b-btn {
            margin: .05em 0;
            padding: .1em;
        }

        b-btn:hover {
            --bgdColor: rgba(0, 0, 0, 0.1);
        }

        text-field {
            /* padding-right: .5em; */
            /* margin-right: -.5em; */
            /* width: 160px; */
        }

        b-hr {
            margin: .25em -.25em;
        }
        
        .controls {
            padding: .25em .5em;
            /* font-size: 1.4em; */
            /* display: flex; */
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
            /* flex-direction: column; */
        }

        .controls span {
            margin: 0 .25em;
        }

        form-control:first-child {
            margin-bottom: .35em;
        }

        footer {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }

        b-label {
            margin: 0 .5rem;
        }
    `}

    constructor(opts={}){
        super()
        
        this.opts = Object.assign({
            defaultLabel: '-',
            presets: true // TODO: support custom presets?
        }, opts)
    }

    firstUpdated(){
        this.editors = this.shadowRoot.querySelectorAll('form-control')

        let value = this.filter.value

        if( value )
            this.editors.forEach((el,i)=>el.value=value[i])
    }

    render(){return html`

        <b-btn text md @click=${this.clearDates}>Clear</b-btn>
        <b-hr></b-hr>

        <div class="controls">
            <form-control material="filled" key="date1">
                <text-field reset-invalid placeholder="00/00/0000" type="date" @enterkey=${this.onEnter}></text-field>
            </form-control>
            
            <span>–</span>
            
            <form-control material="filled" key="date2">
                <text-field reset-invalid placeholder="00/00/0000" type="date" @enterkey=${this.onEnter}></text-field>
            </form-control>
        </div>

        ${this.opts.presets!==false?html`
        <b-label sm divider>Presets</b-label>
        <footer>
            <b-btn text md @click=${this.usePreset}>Today</b-btn>
            <b-btn text md @click=${this.usePreset}>Yesterday</b-btn>
            <b-btn text md @click=${this.usePreset}>30 Days</b-btn>
            <b-btn text md @click=${this.usePreset}>This Month</b-btn>
            <b-btn text md @click=${this.usePreset}>This Year</b-btn>
        </footer>
        `:''}
    `}

    get value(){
        let value = []

        // editors not setup yet, so just use the value from the filter object
        if( !this.editors )
            return this.filter.value

        this.editors.forEach(el=>{
            let v = el.dbValue
            if( v )
                value.push(v)
        })

        if( value.length == 0 )
            return null

        if( value.length == 1 )
            value = [value[0], value[0]]

        value.sort()

        return value
    }

    set value(val){

        if( !val || val.length == 0 )
            val = [null, null]

        if( typeof val == 'string' )
            val = [val, val]
        
        if( val.length == 0 )
            val = [val[0], val[0]]

        if( this.editors )
        this.editors.forEach((el,i)=>{
            el.value = val[i]||null
        })
    }

    /*
        We do a bunch of fancy logic to display a label that is hopefully
        the easy to scan while taking up the least amount of space
    */
    get label(){

        let val = this.value

        if( !val )
            return this.opts.defaultLabel

        let [d1, d2] = val
        let m = dayjs().startOf('day')
        let m1 = dayjs(d1)
        let m2 = dayjs(d2)
        let thisYear = m1.year() == m.year() && m2.year() == m2.year()
        let sameYear = m1.year() == m2.year()

        // single day selected
        if( d1 == d2 ){
            let m1 = dayjs(d1)

            if( m.isSame(m1) )
                return 'Today'

            let diffDays = m.diff(m1, 'days')

            if( diffDays == 1 )
                return 'Yesterday'

            if( diffDays > 1 && diffDays <= 14 )
                return diffDays+' days ago'

            // leave off the year since it's this year
            if( thisYear )
                return m1.format('MMM D')

            return m1.format('M/D/YY')
        }

        // month range (beginning of one month to end of another month)
        if( m1.date() == 1 && m2.date() == m2.clone().endOf('month').date() ){

            let month1 = m1.format('MMM')
            let month2 = m2.format('MMM')
            
            if( month1 == month2 && sameYear ){

                if( month1 == m.format('MMM') && thisYear )
                    return 'This Month'
                
                if( thisYear )
                    return month1

                return month1+' ‘'+m1.format('YY')
            }

            if( thisYear && sameYear && m1.month() == 0 && m2.month() == 11)
                return 'This Year'
            else if( thisYear && sameYear )
                return month1+' - '+month2
            else if( sameYear )
                return month1+' - '+month2+' '+m2.format('YYYY')
            else
                return month1+' ‘'+m1.format('YY')+' - '+month2+' ‘'+m2.format('YY')
        }

        // leave off the year since it's this year
        if( thisYear )
            return m1.format('MMM D')+' - '+m2.format('MMM D')

        return m1.format('M/D/YY')+' - '+m2.format('M/D/YY')
    }

    onEnter(){
        this.close()
    }

    clearDates(){
        this.value = null
        this.close()
    }

    usePreset(e){
        let preset = e.target.innerText
        let values = []
        let date = dayjs()
        let format = 'YYYY-MM-DD'

        switch(preset){
            case 'Today':
                values = [date.format(format)]
                break;

            case 'Yesterday':
                date.subtract('1', 'day')
                values = [date.format(format)]
                break;

            case '30 Days':
                values = [date.clone().subtract('30', 'day').format(format), date.format(format)]
                break;

            case 'This Month':
                values = [date.startOf('month').format(format), date.endOf('month').format(format)]
                break;

            case 'This Year':
                values = [date.startOf('year').format(format), date.endOf('year').format(format)]
                break;
        }

        this.value = values
        this.close()
    }

})

export default customElements.get('b-list-filter-view-date')