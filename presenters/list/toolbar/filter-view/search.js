import { LitElement, html, css } from 'lit'
import Menu from '../../../menu'
import isLitHTML from '../../../../helpers/lit/isLitHTML'

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

        if( item.type == 'bulk' ){
            this._bulkSearch = item.val
            return this._bulkSearchNext()
        }

        if( item.type == 'create' )
            item = {
                label: item.val,
                val: item.val,
                created: true
            }

        item.selection = 'Is'

        // check for duplicates
        if( !this._values.find(_item=>_item.val==item.val) ){
            this._values.push(item)
            this.value = this._values
        }

        this.menu.clear()
        this.focus()
    }

    onDeselect(items){

        if( items.length == 1 && items[0].val == '' )
            items = []
        else{
            items = items.filter(d=>d.selection)
        }

        // determine what was deselected (so we can set it's value in the search bar again to edit)
        let deselected = this.value.find(d=>!items.find(i=>i.val==d.val))

        this.value = items

        this.focus({
            selectAll: true, 
            value: deselected?.created&&deselected?.val // let user re-edit the value
        })
    }

    get menuForValues(){
        let menu = []
        let selected = this._values.map(d=>d.val)

        if( this._values.length > 0 ){

            menu.push({label: 'Clear', icon: 'backspace', val: '', clearsAll: true}, 'divider')
            
            menu.push(...this._values.map(d=>{
                // TODO: allow for opt-out for standard check box?
                return {
                    label: d.label || d.cacheLabel || d.toolbarLabel,
                    ...d,
                    selections: this.opts.selections ?? ['Is', 'Not']
                }
                // d.selected = true
                return d
            }))

            menu.push('-')
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
            search: false,
            onSelect: this.onDeselect.bind(this),
        })
        this.appendChild(this.valueMenu)
        this.valueMenu.render()
        
        let _extendResults = []

        // NOTE: what is the purpose of this? can't find in code anywhere
        // doesn't seem to do anything uniq
        if( this.opts.allowFuzzy )
            _extendResults.push(function(menu, term){
                menu.unshift({
                    label: term,
                    description: 'Fuzzy match',
                    val: term,
                    noCache: true
                },'divider')
            })

        // bulk search features
        if( this.opts.allowBulkSearch == true )
            _extendResults.push((menu, term)=>{

                let values = term.split(/[\n\t\s]/).map(s=>s.trim()).filter(s=>s)
                let sameLength = values.filter(v=>v.length==values[0].length).length == values.length
                
                if( values.length >= 2 && (sameLength || term.match(/[\d\s]/) ) )
                menu.unshift({
                    label: `Bulk Search: ${values.length} IDs`,
                    val: values,
                    type: 'bulk',
                    noCache: true
                })
            })

        let extendResults = function(menu, term){

            _extendResults.forEach(_extend=>{
                _extend(menu, term)
            })

            if( this.opts.extendResults )
                this.opts.extendResults.call(this, menu, term)
        }
        

        let _this = this
        this.menu = new Menu( this.opts.defaultMenu||[], {
            typeDelay: 200,
            autoSelectFirst: true,
            onSelect: this.onSelect.bind(this),
            search: {
                url: this.opts.url,
                allowCreate: !this.opts.url? this.opts.allowCreate||true : false,
                placeholder: this.opts.placeholder || 'Search',
                parse: this.opts.parseResult,
                extendResults,
                onResultsFetched: (...args)=>{
                    this.popover?._updatePosition()
                    _this.onResultsFetched(...args)
                }
            }
        })

        this.appendChild(this.menu)
        this.menu.render()

        this.menu.addEventListener('enter-on-no-item', e=>{
            this.close()
        })
    }

    _bulkSearchNext(){
        if( this._bulkSearch && this._bulkSearch.length > 0 ){
            let id = this._bulkSearch.shift()
            this.menu.matching(id)
        }else{
            this._bulkSearch = null
        }
    }

    onResultsFetched(e){
        if( this._bulkSearch ){
            // NOTE: assumes first item is correct
            this.menu.clickItem(0)
            this._bulkSearchNext()
        }
    }

    didClose(){
        this.menu&&this.menu.clear()
    }

    connectedCallback(){
        super.connectedCallback()
        this.focus()
    }

    focus(opts){
        setTimeout(()=>{
            if(this.menu )
                this.menu.focusSearch(opts)
        }, 100)
    }

    get value(){

        if( !this._values )
            return this._formatValues(this.filter.value)

        return this._values.map(d=>{
            d = Object.assign({}, d)
            delete d.view // do not save custom element/views
            delete d.selections
            delete d.selected
            delete d.extras

            for( let k in d ){
                if( isLitHTML(d[k]) ) // do not cache/save lit html values
                    delete d[k]
            }

            // do not save lit HTML values
            if( isLitHTML(d.label) )
				d.label = d.cacheLabel || d.toolbarLabel || d.val

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
        
        return val.map(d=>{
            let label = d.toolbarLabel||d.label

            if( d.selection && !['any', 'is', 'yes'].includes(d.selection.toLowerCase()) )
                label = d.selection+' '+label

            return label
            
        }).join(', ')
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