import { LitElement, html, css } from 'lit'
import Menu from '../../../menu'

customElements.define('b-list-filter-view-search', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            width: var(--width, 200px);
            /* min-height: 300px; */
            max-height: 70vh;
        }
    `}

    constructor(opts={}){
        super()
        this.opts = opts
    }

    render(){return html`
        <slot></slot>
    `}

    onKeydown(e){
        
        if( e.key == 'Escape' ){
            this.value = this.filter.value
            this.close()
            return
        }

        this.menu.onKeydown.call(this.menu, e)
    }

    onSelect(item){

        this._values.push(item)
        this.value = this._values

        this.menu.clear()
        this.focus()
    }

    onDeselect(items){

        if( items.length == 1 && items[0].val == '' )
            items = []

        this.value = items

        if( items.length == 0 )
            this.close()
        else
            this.focus()
    }

    get menuForValues(){
        let menu = []
        let selected = this._values.map(d=>d.val)

        if( this._values.length > 0 ){
            menu.push({label: 'Any', val: '', clearsAll: true}, 'divider')
            menu.push(...this._values.map(d=>{
                d.selected = true
                return d
            }))
        }

        return [menu, selected]
    }

    firstUpdated(){

        this._values = this._formatValues(this.filter.value) || []

        if( this.opts.width )
            this.style.setProperty('--width', this.opts.width)

        let [menu, selected] = this.menuForValues
        this.valueMenu = new Menu(menu, {
            multiple: 'always',
            selected: selected,
            onSelect: this.onDeselect.bind(this),
        })
        this.appendChild(this.valueMenu.el)
        this.valueMenu.render()
        
        let extendResults = this.opts.extendResults

        if( this.opts.allowFuzzy )
            extendResults = function(menu, term){
                menu.unshift({
                    label: term,
                    description: 'Fuzzy match',
                    val: term
                },'divider')

                if( this.opts.extendResults )
                    this.opts.extendResults.call(this, menu, term)
            }

        this.menu = new Menu([], {
            typeDelay: 200,
            autoSelectFirst: true,
            onSelect: this.onSelect.bind(this),
            search: {
                url: this.opts.url,
                placeholder: this.opts.placeholder || 'Search',
                parse: this.opts.parseResult,
                extendResults,
                onResultsFetched: ()=>{
                    this.popover._updatePosition()
                }
            }
        })

        this.appendChild(this.menu.el)
        this.menu.render()
    }

    didClose(){
        this.menu&&this.menu.clear()
    }

    connectedCallback(){
        super.connectedCallback()
        this.focus()
    }

    focus(){
        setTimeout(()=>{
            if(this.menu )
                this.menu.focusSearch()
        }, 100)
    }

    get value(){

        if( !this._values )
            return this._formatValues(this.filter.value)

        return this._values.map(d=>{
            d = Object.assign({}, d)
            delete d.view // do not save custom element/views
            return d
        })
    }

    set value(val){

        this._values = this._formatValues(val)

        if( this.valueMenu ){
            let [menu, selected] = this.menuForValues
            this.valueMenu.updateMenu(menu, selected)
        }
    }

    _formatValues(val){
        // value should always be an array of values
        if( val && !Array.isArray(val) )
            val = [val]
        
        return (val||[]).map(o=>{

            // if a string is given, convert to object
            if( !o.val )
                o = {label: o, val: o}
            
            // make sure we dont update the original object
            return Object.assign({}, o)
        })
    }

    get label(){
        let val = this.value

        if( !val || val.length == 0 )
            return '–'
        
        return val.map(d=>d.toolbarLabel||d.label).join(', ')
    }

    // OPTIONAL
    get defaultVal(){
        // when the filters are cleared/reset, what value should be the default?
        return null
    }

    filterBy(model, val, key){
        return this.value.find(d=>d.val==model.get(key))
    }

})

export default customElements.get('b-list-filter-view-search')