/*
    # Sortable

    This is a simple and opinionated tool that is intended to be used in lit-html and therefore is designed to put the moved item back to where it was. An event is fired to inform of where the item SHOULD be moved to. It is up to the host to make the move and re-render

    Uses SortableJS https://github.com/SortableJS/Sortable

    ```html-preview
    <div>
        <b-sortable item="b-text"></b-sortable>
        <b-text block>Line 1</b-text>
        <b-text block>Line 2</b-text>
        <b-text block>Line 3</b-text>
    </div>
    ```

    ```js
    host.addEventListener('sort-changed', e=>{
        // save the change
    })
    ```

    > NOTE: this is a very basic implementation; subject to change

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

    get target(){ 
        if( typeof this.__target == 'function' ){
            return this.__target.call(this)
        }
        return this.__target || this.parentElement
    }

    set target(target){ this.__target = target}


    connectedCallback(){
        super.connectedCallback()
        clearTimeout(this.__enable)
        this.__enable = setTimeout(()=>{
            this.enable()
        })
    }

    disconnectedCallback(){
        clearTimeout(this.__enable)
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

        if( e.oldIndex == e.newIndex && e.from == e.to ) return

        this.emitEvent('sort-changed', e)

        // put moved element to original DOM location (lit-html should move it later)
        if( e?.item?.litPlaceholder ){
            e.item.litPlaceholder.replaceWith(e.item)
            delete e.item.litPlaceholder
        }
    }

})

export default customElements.get('b-sortable')