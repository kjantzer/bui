import {html} from 'lit'
import Menu from '../../menu'
import titleize from '../../../util/titleize'
import Emitter from 'component-emitter'
import CollMap from '../../../util/collmap'

export default class Sorts extends CollMap {

    get _storeKey(){ return 'b-list:'+this.key+':sort'}

    get value(){
        // first time getting value, get it from local storage
    	if( this.__value === undefined ){
			this.__value = this.key && JSON.parse(localStorage.getItem(this._storeKey)) || {}
        }

        return this.__value
    }

    set value(val){

        if( (!val || Object.keys(val).length == 0) && this.__defaultSort )
            val = this.__defaultSort

        let didChange = JSON.stringify(this.__value) != JSON.stringify(val)

        this.__value = val

        if( this.key ){
            if( val == null || val == undefined )
                localStorage.removeItem(this._storeKey)
            else
                localStorage.setItem(this._storeKey, JSON.stringify(val))
        }

        this.forEach(sort=>sort.selected=this.value[sort.key])

        if( didChange )
            this.emit('change', val)
    }

    get unset(){
        return Object.keys(this.value).length == 0 
    }

    use(sorts){

        if( sorts.db ){
            this.sortOnDB = true
            delete sorts.db
        }

        if( sorts.defaults ){
            let defaultVals = {}

            sorts.defaults.map(key=>{

                if( !sorts[key] ) return

                defaultVals[key] = {
                    desc: sorts[key].desc || false
                }
            })

            this.__defaultSort = defaultVals

            if( this.unset ){
                this.__value = defaultVals
                localStorage.setItem(this._storeKey, JSON.stringify(defaultVals))
            }

            delete sorts.defaults
        }

        if( sorts == this.__lastSorts )
            return

        this.__lastSorts = sorts
        
        this.clear()

        for( let key in sorts ){
            let sort = new Sort(key, sorts[key])
            sort.sorts = this
            sort.selected = this.value[key]
            this.set(key, sort)
        }
    }

    map(fn){
        let resp = []
        this.forEach((v, key)=>resp.push(fn(v, key)))
        return resp
    }

	get label(){
        let active = this.active
        return active.length == 0 ? 'None' : active.map(sort=>sort.label).join(', ')
	}

	get active(){
        let active = []
        Object.keys(this.value).forEach(key=>{
            if( this.get(key) )
                active.push( this.get(key) )
        })
        return active
	}

    async showMenu(el){

        let oldVal = this.value

        function toMenuItem(sort){
            return {
                label: sort.label,
                val: sort.key,
                description: sort.description,
                clearsAll: !!sort.attrs.preset,
                desc: sort.isDesc,
                extras: sort.attrs.preset ? [] : ['b-list-sort-dir-btn'],
                preset: sort.attrs.preset
            }
        }

        let menu = this.filter(sort=>!sort.attrs.preset).map(sort=>toMenuItem(sort))
        menu.unshift({text: html`Sorts will be applied in the order they are chosen.`})

        let presets = this.filter(sort=>!!sort.attrs.preset).map(sort=>{
            let s = toMenuItem(sort)
            let labels = Object.keys(s.preset).map(s=>this.get(s).label).join(', ')
            s.extras = [html`<b-text muted sm italic>${labels}</b-text>`]
            return s
        })

        if( this.__defaultSort ){
            let labels = Object.keys(this.__defaultSort).map(s=>this.get(s).label).join(', ')
            menu.unshift({
                label: 'Default',
                clearsAll: true,
                preset: this.__defaultSort,
                extras: [html`<b-text muted sm italic>${labels}</b-text>`]
            })
        }

        if( presets )
            menu = menu.concat(presets)

        let selected = await new Menu(menu, {
            className: 'b-list-sort-menu',
            multiple: true,
			selected: Object.keys(oldVal)
        }).popover(el, {adjustForMobile:{
            title: 'Sort',
            anchor: 'top',
            type: 'actionsheet'
        }})

        if( selected === false ) return

        // reformat selected values to what we need
        let val = {}

        if( selected.length == 1 && selected[0].preset )
            val = selected[0].preset
        else
            selected.forEach(s=>val[s.val]={desc:s.desc})

		this.value = val
    }

	sort(data){
        // return
		let sorts = this.active

		return new Promise(resolve=>{
			
			if( sorts.length == 0 ) return resolve(data)

            data.sort(function (m1, m2) {

                for( let sort of sorts ){

                    let val = sort.sortCompare(m1, m2);

                    // the sort compare found different values
                    if( val !== false )
                        return val
                }

            });

			resolve(data)
		})	
	}

}


Emitter(Sorts.prototype)


class Sort {
    
    constructor(key, attrs){
        this.key = key

        if( typeof attrs == 'function' )
            attrs = {sortBy: attrs}

        this.attrs = attrs
    }

    get sortBy(){
        return this.attrs.sortBy || (m=>m.get(this.key))
    }

    get label(){
        return this.attrs.label || titleize(this.key)
    }

    get description(){
        return this.attrs.description || null
    }

    get isDesc(){
        return this.selected ? this.selected.desc : (this.attrs.desc || false )
    }

    sortCompare(m1, m2){
        let v1 = this.sortBy(m1)
        let v2 = this.sortBy(m2)

        if( v1 > v2 ) return this.isDesc ? -1 : 1
        if( v1 < v2 ) return this.isDesc ? 1 : -1

        return false
    }

}
