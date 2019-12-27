import Menu from '../../menu'
import Dialog from '../../dialog'
import Popover from '../../popover'
import titleize from '../../../util/titleize'
import Fuse from 'fuse.js'
import Emitter from 'component-emitter'
import FilterViewDate from '../toolbar/filter-view-date'
import FilterViewSlider from '../toolbar/filter-view-slider'

const CustomViews = {
    'date': FilterViewDate,
    'slider': FilterViewSlider
}

// do NOT include '0' or 'false' as unset values
const unsetValues = [undefined, null, '']

const defaultSearch = model => {
    let data = {};
    ['id', 'title', 'name', 'label', 'file', 'dir'].forEach(key=>{
        if( model.has !== undefined ){
            if( model.has(key) )
                data[key] = model.get(key)
        }else if( model[key] !== undefined )
            data[key] = model[key]
    })
    return data;
};

const defaultFilterby = (model, val, key) => {
    if( Array.isArray(val) )
        return val.includes(model.get(key))
    else
        return val == model.get(key)
};

export default class Filters extends Map {

    get _storeKey(){ return 'b-list:'+this.key+':filters' }

    reset(){
        this.queuing = false
        let resetData = {}
        this.map(filter=>{
            resetData[filter.key] = filter.defaultVal
        })
        this.value(resetData)
    }

    value(key, val){
        // first time getting value, get it from local storage
        if( this.__value === undefined ){
            this.__value = this.key && JSON.parse(localStorage.getItem(this._storeKey)) || {}
        }

        // SETTING
        if( val !== undefined || typeof key == 'object' ){

            this.lastChanged = new Date().getTime()
            
            // may be setting more than one value
            let changes = typeof key == 'object' ? key : {[key]:val}
            let didChange = []

            for( let k in changes){
                
                let changeFrom = this.__value[k]
                let changeTo = changes[k]

                // is the selected value effectively "unset" (`multi` filters will be an array: `[null]` )
                if( [null, undefined].includes(changeTo)
                || (Array.isArray(changeTo) && [null, undefined].includes(changeTo[0]) ) )
                    delete this.__value[k]
                else
                    this.__value[k] = changeTo

                // converting to JSON string so we can compare arrays
                if( JSON.stringify(this.__value[k]) != JSON.stringify(changeFrom) ){
                    didChange.push(k)
                }else{
                    delete changes[k]
                }
            }
            
            if( this.key )
                localStorage.setItem(this._storeKey, JSON.stringify(this.__value))

            if( didChange.length > 0 ){
                // emit a change on each filter
                didChange.forEach(k=>{
                    this.get(k).emit('change', val)    
                })

                if( this.queuing )
                    this.queuedChanges = changes
                else
                    this.emit('change', changes)
            }

        // GETTING
        }else{
            return key ? this.__value[key] : this.__value
        }
    }

    get queuing(){return this.__queue || false }
    set queuing(val){
        this.__queue = Boolean(val)

        if( !this.queuing && this.queuedChanges ){
            this.emit('change', this.queuedChanges)
            this.queuedChanges = null
        }
    }

    get queuedChanges(){ return this.__queuedChanges }
    set queuedChanges(changes){
        if( !changes ){
            delete this.__queuedChanges
            this.emit('queuing', false)
            return
        }

        this.__queuedChanges = Object.assign((this.__queuedChanges || {}), changes)

        this.emit('queuing', Object.keys(this.__queuedChanges).length )
    }

    use(filters){
        
        if( filters == this.__lastFilters )
            return

        this.__lastFilters = filters

        this.forEach(filter=>delete filter.parent)
        this.clear()

        for( let key in filters ){

            if( key == 'search' ){
                this.searchOptions = filters[key]
                continue
            }

            let filter = new Filter(key, filters[key])
            filter.parent = this
            this.set(key, filter)
        }

        this.lastChanged = new Date().getTime()
    }

    map(fn){
        let resp = []
        this.forEach((v, key)=>resp.push(fn(v, key)))
        return resp
    }

    set searchOptions(opts){
        if( opts === false )
            this.__searchOptions = {data:false} // turns search off

        if( typeof opts == 'object' )
            this.__searchOptions = opts
    }
    
    get searchOptions(){
        return Object.assign({
            data: defaultSearch,
            includeMatches: true,
            minMatchCharLength: 3,
            threshold: 0.2,
            location: 0,
            distance: 100,
            placeholder: 'Search',
            delay: 0
        }, this.__searchOptions||{})
    }

    get showSearch(){
        return typeof this.searchOptions.data == 'function'
    }

    filterByTerm(data){
        return new Promise(resolve=>{
            
            let searchOptions = Object.assign({}, this.searchOptions)
            let keys = searchOptions.keys

            data.forEach(m=>{
                m.searchMatches = {}
            })

            if( !this.term 
            || !searchOptions.data
            || this.term.length < searchOptions.minMatchCharLength )
                return resolve(data)

            data.forEach(m=>{
                m._fuseSearch=searchOptions.data(m)

                // no search option keys set yet, so set them automatically
                if( !keys )
                    keys = Object.keys(m._fuseSearch)
            })

            // prefix all keys with `_fuseSearch.` so the data is searched properly
            // keys can be an array of strings or objects with name/weight
            if( keys )
            searchOptions.keys = keys.map(key=>{
                if( typeof key == 'string' )
                    return '_fuseSearch.'+key
                
                let newKey = Object.assign({}, key)
                newKey.name = '_fuseSearch.'+newKey.name
                return newKey
            })

            let fuse = new Fuse(data, searchOptions)
            data = fuse.search(this.term)

            // reformat to array of models
            if( searchOptions.includeMatches )
                data = data.map(d=>{
                    d.item.searchMatches = {}
                    d.matches.forEach(m=>{
                        d.item.searchMatches[m.key.replace('_fuseSearch.', '')] = m.value
                    })
                    return d.item
                })

            resolve(data)
        })
    }

    async filter(data){
        let filters = this.map(filter=>filter)

        // apply each filter, waiting for the first one to finish before moving on to the next filter
        return filters.reduce((promise, filter) => {
            return promise.then(data=>filter.filterData(data));
        }, Promise.resolve(data))

    }

    needsDatabaseFetch(changes){
        for( let key in changes ){
            if( this.get(key).isDB )
                return true
        }
        return false
    }

}

/*
    Filter
*/
export class Filter {

    constructor(key, attrs){
        this.key = key
        this.attrs = attrs
    }

    get values(){
        // TODO: implement "context" for function?
        let values = this.attrs.values
        values = typeof values == 'function' ? values.call(this.parent.list) : values

        values = values.map(v=>{
            if( typeof v == 'string' && !['divider'].includes(v) )
                v = {label: v, val: v}

            // make "unset" values uniform
            if( typeof v == 'object' && unsetValues.includes(v.val) ){
                v.val = null
                v.clearsAll = true
            }

            return v
        })

        return values
    }

    get label(){
        return this.attrs.label || titleize(this.key)
    }

    get icon(){
        return this.attrs.icon || null
    }

    get filterBy(){
        if( !this.attrs.filterBy && this.isCustomView && this.customView.filterBy )
            return this.customView.filterBy

        return this.attrs.filterBy || defaultFilterby
    }

    // is a database filter
    get isDB(){
        return this.attrs.db === true
    }

    get isCustomView(){
        return !!this.attrs.view
    }

    get isActive(){
        let val = this.isMulti ? this.value&&this.value[0] : this.value
        return !unsetValues.includes(val)
    }

    get isMulti(){
        return this.attrs.multi === true
    }

    get value(){
        return this.parent.value(this.key)
    }

    set value(val){
        this.parent.value(this.key, val)
    }

    get defaultVal(){
        if( this.attrs.defaultVal ) return this.attrs.defaultVal
        
        if( this.isCustomView )
            return this.customView.defaultVal ? this.customView.defaultVal : null

        let first = this.values[0]
        return first ? first.val : null
    }

    get valueLabel(){
        let val = this.value
        
        if( Array.isArray(val) )
            val = val.map(v=>v.val||v)
        else
            val = val&&(val.val||val)

        if( this.isCustomView ){
            let view = this.customView
            return view ? view.label : 'UNSUPORRTED'
        }

        let matchedVal = this.values.filter((v,i)=>{
            if( typeof v == 'string' || v.divider || v.text || v.noDisplay ) return false
            // return v.val==val

            if( !Array.isArray(val) ){
                if( v.val==val ){
                    Object.assign(v, this.value)
                    return true
                }
                return false
            }

            let matchedIndex = val.indexOf(v.val)

            if( matchedIndex > -1 ){
                
                let mergeData = this.value[matchedIndex]
                
                if( mergeData && typeof mergeData == 'object' ){
                    Object.assign(v, mergeData)
                }

                return true
            }
            
            return false
        })

        return matchedVal 
        ? matchedVal.map(f=>{
            return [f.selection, f.toolbarLabel||f.label].filter(s=>s).join(' ')
        }).join(', ')
        : val
    }

    async showMenu(el){

        if( this.isCustomView  )
            return this.showCustomView(el)

        let selected = await new Menu(this.values, {
            selected: this.value,
            multiple: this.isMulti,
        }).popover(el, {
            overflowBoundry: this.attrs.overflowBoundry || 'scrollParent',
            maxHeight: this.attrs.maxHeight || '60vh',
            adjustForMobile: true
        })

        let oldVal = this.value

        if( selected === false || selected.length == 0  ) return
            // this.value = null
        else if( Array.isArray(selected))
            this.value = selected.map(s=>{
                return s.selection ? {val: s.val, selection: s.selection} : s.val
            })
        else
            this.value = selected.selection ? {val: selected.val, selection: selected.selection} : selected.val
    }

    get customView(){
        let viewName = this.attrs.view
        let View = null

        if( !this._customView ){

            if( CustomViews[viewName] ){
                View = CustomViews[viewName]
            }else if( typeof viewName == 'string' ) {
                View = customElements.get(viewName)
            }else if( typeof viewName == HTMLElement ){
                View = viewName
            }

            if( View ){
                View.prototype.close = function(){
                    this.popover._close() // to trigger onClose
                }
                this._customView = new View((this.attrs.viewOpts||{}))
                this._customView.filter = this
            }
        }

        return this._customView
    }

    async showCustomView(el){

        if( !this.customView )
            return Dialog.warn({msg:`${this.key}: unsupported view`}).popover(el)
        
        let onClose = _=>{
            this.value = this.customView.value
        }
        
        // TODO: support `adjustForMobile`
        new Popover(el, this.customView, {
            onClose: onClose,
        })
    }

    filterData(data){
        return new Promise(resolve=>{

            // pass through the data unchanged if any of these are met
            if( !this.isActive ) return resolve(data)
            if( !this.filterBy ) return resolve(data)
            if( this.isDB ) return resolve(data)

            let val = this.value
            data = data.filter(m=>this.filterBy.call(this.parent.list, m, val, this.key))
            resolve(data)
        })
    }

}

Emitter(Filters.prototype)
Emitter(Filter.prototype)