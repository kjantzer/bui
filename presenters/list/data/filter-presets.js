import {html} from 'lit-html'
import Emitter from 'component-emitter'
import CollMap from '../../../util/collmap'
import store from '../../../util/store'
import '../../../elements/label'

export default class FilterPresets extends CollMap {

    get cache(){
        return this.__cache = this.__cache || store.create('b-list:'+this.filters.key+':presets', [])
    }

    set(attrs){
        
        if( Array.isArray(attrs) ){
            
            attrs.map(a=>{

                if( !a.id )
                    a.type = 'system'

                this.set(a)
            })

            if( this.__setup ) return

            this.__setup = true
            this.set(this.cache())

            return
        }

        let id = attrs.id = String(attrs.id || (new Date().getTime()+Math.round(Math.random()*10000)))
        attrs.ts_created = attrs.ts_created || new Date().getTime()

        try{
            let preset = createPreset(attrs, this)
            super.set(id, preset)
            return preset
        }catch(err){
            // console.log('preset no longer valid', attrs);
        }
    }

    add(attrs){
        let preset = this.set(attrs)
        if( preset )
            this.save(preset, preset.id)
        return preset
    }

    delete(id){
        if( super.delete(id) )
            this.save(null, id)
    }

    toString(){ return this.map(p=>p.toString()).join(', ') }

    toJSON(){ return this.map(p=>p) }

    toMenu(){
        let menu = []
        let prev

        this.forEach(p=>{
            
            let item = {
                label: p.label,
                val: p.id,
                preset: p,
                description: p.description,
                extras: [html`<b-label filled="black" sm>${p.length}</b-label>`]
            }

            if( prev && !prev.isUser && p.isUser )
                menu.push({divider: 'Custom presets'})

            menu.push(item)
            prev = p
        })

        // put user presets in alphabetical order
        menu = menu.sort((a,b)=>{
            if( !a.preset || !b.preset ) return 0
            if( !a.preset.isUser || !b.preset.isUser ) return 0

            return a.label < b.label
        })

        return menu
    }

    save(preset, id, changed){
        this.emit('change', {id})

        let userPresets = this.toJSON().filter(p=>p.isUser)
        this.cache(userPresets)
    }
}


function createPreset(attrs, coll){

    function checkFilters(value){
        let filters = {}

        if( typeof value != 'object' )
            throw new Error(`Invalid filters: ${value}`)

        // make sure the filters exist
        for( let k in value ){
            if( coll.filters.get(k) )
                filters[k] = value[k]
        }

        if( Object.keys(filters).length == 0 )
            throw Error('Invalid filters')

        return filters
    }

    attrs.filters = checkFilters(attrs.filters)

    return new Proxy(new Preset(attrs),{

        get(target, prop) {

            if( prop == 'destroy' ){
                return function(){
                    coll.delete(target.id)
                }
            }

            return target[prop];
        },

        set(obj, prop, value){

            if( prop == 'filters' ){
                value = checkFilters(value)
            }

            obj[prop] = value;

            obj.emit('change', prop)
            coll.save(obj, obj.id, prop)

            return true;
        },

        // apply(target, thisArg, argumentsList) {
        //     console.log(`Calculate sum: ${argumentsList}`);
        //     // expected output: "Calculate sum: 1,2"

        //     return target(argumentsList[0], argumentsList[1]) * 10;
        // }

    })
}

class Preset extends Object {
    
    constructor(attrs){
        super(attrs)
        Object.assign(this, attrs)
    }

    toString(){ return `${this.label} (${this.length})` }
    // toJSON(){ return  JSON.stringify(this) }

    get length(){
        return Object.keys(this.filters).length
    }

    get isUser(){ return this.type != 'system' }
}

Emitter(FilterPresets.prototype)
Emitter(Preset.prototype)