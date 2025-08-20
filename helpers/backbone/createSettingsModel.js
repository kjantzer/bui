/*
    # Settings Model

    Creates a singleton model that saves it's values to localStorage. Can be init with default values.

    ```js
    let settings = createSettingsModel('app-settings', {
        view: 'list',
        theme: 'blue'
    })

    settings.get('view')
    settings.save('view', 'grid')


    // track settings values as attributes on the element
    {
        connectedCallback(){
            super.connectedCallback()
            settings.addTarget(this)
        }

        disconnectedCallback(){
            super.disconnectedCallback()
            settings.removeTarget(this)
        }
    }
    ```
*/
import {Model} from 'backbone'
import store from '../../util/store'

const Models = new Map()

export function createSettingsModel(key, defaults={}){

    if( Models.get(key) ) return Models.get(key)

    let storeKey = `settings:${key}`
    let storeCache = store.create(storeKey, defaults)
    let model = new SettingsModel(storeCache())

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

    // override default save to only save in local storage
    save(...args){
        this.set(...args)
        this.store(this.toJSON())
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