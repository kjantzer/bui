/*
    Sortable

    NOTE: this is a very basic implementation; subject to change

    https://github.com/SortableJS/Sortable

    TODO
    - make sorting an option?
*/
import { LitElement, html, css } from 'lit'

customElements.define('b-sortable', class extends LitElement{
    
    static properties = {
        item: {type: String},
        group: {type: String}
    }

    static styles = css`
        :host {
            display: contents;
        }
    `

    constructor(){
        super()
        this.item = undefined
        this.group = undefined
    }

    render(){return html``}

    get target(){ return this.parentElement } // FIXME: improve?

    connectedCallback(){
        super.connectedCallback()
        this.enable()
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.disable()
    }

    disable(){
        this.sortable?.destroy()
        this.sortable = null
    }

    enable(){
        this.disable()
        
        let target = this.target

        if( !target ) console.warn('no target to sort')

        import('sortablejs').then(({Sortable})=>{
            // TODO: add support for more options
            this.sortable = Sortable.create(target, {
                draggable: this.item,
                group: this.group,
                onEnd: this.onSort.bind(this),
                onChoose: this.onSortChoose.bind(this)
            })
        })

    }

    onSortChoose(e){
        e.item.litPlaceholder = document.createComment('lit-sort-placeholder')
        e.item.after(e.item.litPlaceholder)
    }

    onSort(e){

        if( e.oldIndex == e.newIndex ) return //console.log('same sort');

        this.emitEvent('sort-changed', e)

        // put moved element to original DOM location (lit-html should move it later)
        if( e?.item?.litPlaceholder ){
            e.item.litPlaceholder.replaceWith(e.item)
            delete e.item.litPlaceholder
        }
    }

})

export default customElements.get('b-sortable')