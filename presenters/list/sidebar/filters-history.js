import { LitElement, html, css } from 'lit'

customElements.define('b-list-sidebar-history', class extends LitElement{

    static icon = 'history'

    static styles = css`
        :host {
            display: block;
            position:relative;
            max-height: 400px;
            overflow: auto;
        }

        .meta {
            margin: .25em .5em -1.5em;
        }

        .set {
            border-bottom: solid 3px var(--theme-bgd-accent);
            
        }

        .set:hover {
            background-color: var(--theme-bgd-accent2);
        }

        .filter {
            padding: 1em;
            border-bottom: solid 1px var(--theme-bgd-accent);
        }
    `

    set filters(val){
        let oldVal = this.filters
        this.__filters = val
    
        this.requestUpdate('filters', oldVal)
    }
    
    get filters(){ return this.__filters}

    get values(){
        return this.filters?.history.map((d, name)=>{

            return {
                ...d,
                vals: name.split('|').map((s,i)=>{
                    
                    let vals = s.split(':')
                    let label = vals.shift()
                    let val = vals.join(':')

                    return {label, val}
                })
            }

        }).reverse() // newest first
    }

    render(){return html`

        <b-text xbold style="margin: 1em">Filter History</b-text>

        ${this.values.map(d=>html`
            <b-grid cols=1 .model=${d} gap=".25" class="set" @click=${this.reapply}>
                
                <b-flex class="meta" right>
                    <b-text xs muted>
                        <b-ts .date=${d.ts}></b-ts>
                    </b-text>
                </b-flex>

                <div>
                ${d.vals.map(v=>html`
                    <b-grid cols=1 gap=".25" class="filter">
                        <b-text bold block sm>${v.label}</b-text>
                        <b-text dim>${v.val}</b-text>                        
                    </b-grid>
                `)}
                </div>
            </b-grid>
        `)}

        <b-empty-state if="first">no history</b-empty-state>
        
    `}

    reapply(e){
        this.filters.queuing = true
        this.parentElement.active = 'filters'
        this.filters.reset(e.model.filters, {stopQueuing: false})
    }

})

export default customElements.get('b-list-sidebar-history')