import { LitElement, html, css } from 'lit'
import '@lit-labs/virtualizer'
import './skipper'

customElements.define('b-virtual-scroller', class extends LitElement{

    static get properties(){return {
        items: {type: Array},
        row: {type: String},
        divider: {type: String}
    }}

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
        }

        lit-virtualizer {
            width: 100%;
            height: 100%;
        }

        lit-virtualizer > * {
            width: 100%;
        }
    `}

    get scroller(){
        return this.__scroller = this.__scroller || this.shadowRoot.querySelector('@lit-labs/virtualizer')
    }

    render(){return html`
        <lit-virtualizer
            .items=${this.items}
            .renderItem=${this.renderItem}
        ></lit-virtualizer>
        <b-virtual-scroller-skipper
            .letters=${this.skipperLetters}
            @scroll-to=${this.skipperScrollTo}
        ></b-virtual-scroller-skipper>
    `}

    skipperScrollTo(e){
        let {index} = e.detail
        
        if( index > -1 )
            this.scroller.scrollToIndex(index)
    }

    showDivider(model, prevModel){

        let divider = this.divider && customElements.get(this.divider)

        if( divider && divider.shouldDisplay(prevModel, model) )
            return true

        return false
    }

    set items(items){
        let oldVal = this.items
        
        // insert dividers
        if( this.divider ){

            let prevItem
            items = items.flatMap(item=>{
                let _item = [item]

                if( this.showDivider(item, prevItem) )
                    _item.unshift({
                        divider: item
                    })

                prevItem = item
                
                return _item
            })
        }

        // create index of letters for "skipper"
        this.skipperLetters = {}
        items.forEach((m,i)=>{
            let letter = m.letterGroup
            
            if( letter && this.skipperLetters[letter] == undefined ){
                this.skipperLetters[letter] = i
            }
        })

        // update list
        this.__items = items
        this.requestUpdate('items', oldVal)
    }
    
    get items(){ return this.__items || [] }
    
    set renderItem(val){
        let oldVal = this.renderItem
        this.__renderItem = val
        this.requestUpdate('renderItem', oldVal)
    }
    
    get renderItem(){ return function(item){
            
        if( item.divider )
            return this.renderDivider(item.divider)

        else if( this.__renderItem )
            return this.__renderItem(item)

        else if( this.row ){
            let Row = customElements.get(this.row)
            if( !Row ) return html`<div>${this.row} does not exist</div>`
            let row = new Row(item)
            row.model = item
            return row
        }else
            html`<div>No "renderItem" specified</div>`    

    }.bind(this)}

    set renderDivider(val){
        let oldVal = this.renderDivider
        this.__renderDivider = val
        this.requestUpdate('renderDivider', oldVal)
    }
    
    get renderDivider(){ return function(model){
        
        if( this.__renderDivider )
            return this.__renderDivider(model)

        let divider = this.divider && customElements.get(this.divider)
        
        if( divider ){
            divider = new divider()
            divider.model = model
            return divider
        }

        return ''
    }.bind(this)}

})

export default customElements.get('b-virtual-scroller')