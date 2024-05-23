import {Model} from 'backbone'
import store from '../../util/store'

const Models = new Map()

export function createSettingsModel(key, defaults={}){

    if( Models.get(key) ) return Models.get(key)

    let storeKey = `settings:${key}`
    let storeCache = store.create(storeKey, defaults)
    let model = new Model(storeCache())

    model.save = function(...args){
        model.set(...args)
        model.store(this.toJSON())
    }

    model.store = storeCache
    model.storeKey = storeKey

    Models.set(key, model)

    return model
}