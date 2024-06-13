import {Model} from 'backbone'
import store from '../../util/store'

const Models = new Map()

export function createSettingsModel(key, defaults={}){

    if( Models.get(key) ) return Models.get(key)

    let storeKey = `settings:${key}`
    let storeCache = store.create(storeKey, defaults)
    let model = new SettingsModel(storeCache())

    model.save = function(...args){
        model.set(...args)
        model.store(this.toJSON())
    }

    model.store = storeCache
    model.storeKey = storeKey

    Models.set(key, model)

    return model
}

class SettingsModel extends Model {

    #targets = new Set() // TODO: maybe rename?

    constructor(){
        super(...arguments)
        this.on('change', e=>{
            this.applyToTargets()
        })
    }

    addTarget(target){
        this.#targets.add(target)
        this.applyToTargets(target)
    }

    removeTarget(target){
        this.#targets.delete(target)
    }

    applyToTargets(target){
        if( this.#targets.length == 0 ) return

        for( let key in this.toJSON() ){
            if( target )
                target.setAttribute?.('settings-'+key, this.get(key))
            else
                this.#targets.forEach(target=>{
                    target.setAttribute?.('settings-'+key, this.get(key))
                })
        }
    }
}