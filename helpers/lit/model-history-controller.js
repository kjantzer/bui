/*
    # Model History Controller

    A lit controller that tracks the history of a model for the view it's attached to. History is stored in local storage.
    Can function similar to a browser history and back button.

    ```js
    class MyView extends LitElement {

        modelHistory = new ModelHistoryController(this, {
            store: true, // the default
            // optionally change what data is stored
            dataToStore: ['id', 'book_id', 'title', 'author_string']
        })

        firstUpdated(){
            this.modelHistory.on('change', ()=>{
                console.log('model history changed')
            })
        }
    }
    ```

    > Note: `model-history-btn` is built to work with this controller

    Ideas / TODO
    - when using back button (and looping) consider limiting to since view/window opened?
        - other values in history could only be selectable from menu?
    - add hour/day/date dividers to the menu?
    - handle multiple tabs? listen for storage changes and sync?
*/
import Emitter from 'component-emitter'
import CollMap from '../../util/collmap'
import Store from '../../util/store'
import pick from '../../util/pick'
import '../../helpers/lit/model'

const Histories = new CollMap()

export default class ModelHistoryController {

	host
    history
	
    constructor(host, {key, store=true, dataToStore, filter, label, openModel, storeLimit=50}={}){
		(this.host = host).addController(this)

        this.label = label
        this.openModel = openModel
        this.storeLimit = storeLimit
        this.filter = filter
        this.dataToStore = dataToStore

        Promise.allSettled(host.getAnimations().map(a=>a.finished)).then(()=>{

            this.key = key||host.route?.path||this.host.tagName.toLowerCase()

            this.history = getHistory(this.key, {store})
        })
	}

    open(modelOrId){
        let model = modelOrId

        if( !model ) return

        if( typeof modelOrId == 'string' || typeof modelOrId == 'number' )
            model = this.history.get(modelOrId)
        
        if( !model ) throw new UIWarningError('Model not found')

        if( !this.openModel )
            throw new UIWarningError('Unsure how to open model')

        this._openingModel = model
        this.openModel(model)
    }

	onModelChange(model, oldModel){

        if( oldModel && !oldModel.collection )
            this.history.delete(oldModel.id) // FIXME: need to think and confirm this should be done

        if( !model ) return 

        if( this.filter && this.filter(model) === false ) return

        // let existingIndex = oldModel ? this.history.indexOf(oldModel.id) : -1

        // going back in "history", maintain the order
        if( this._openingModel ){

            delete this._openingModel

            // keep track of history back button/menu
            this._openingHistory ||= new Set()
            this._openingHistory.delete(model.id) // may have looped history
            this._openingHistory.add(model.id)

            this.index = this.history.indexOf(model.id)
            this.history.get(model.id).ts = new Date().getTime()
            
        }else{
            
            // reapply the history back button/menu 
            // this feels best to user since after they open this model, using the back button
            if( this._openingHistory )
            Array.from(this._openingHistory).map(id=>{
                let m = this.history.get(id)
                if( m ){
                    this.history.delete(id)
                    this.history.set(id, m)
                }
            })

            delete this._openingHistory
            
            this.history.set(model.id, this._dataToStore(model))
            this.index = this.history.size-1
        }

        this.emit('change', {model, oldModel})
    }

    clear(){ 
        let current = this.history.get(this.host.model.id)
        this.history.clear()
        this.index = 0
        if( current )
            this.history.set(current.id, current)
        this.emit('change', {})
    }

    _dataToStore(model){

        let values = ['id', 'label', 'title']
        let data

        if( this.dataToStore && typeof this.dataToStore == 'function' )
            data = this.dataToStore(model)
        else{

            if( this.dataToStore && Array.isArray(this.dataToStore) )
                values = this.dataToStore

            data = pick(model.toJSON(), values)
        }

        data.ts = new Date().getTime()

        return data
    }

    get size(){ return this.history.size }
    get length(){ return this.history.size }

    previous(toIndex, {loop=true}={}){
        if( !toIndex ) toIndex = this.history.indexOf(this.host.model.id) - 1
        if( loop && toIndex < 0 ) toIndex = this.history.size - 1
        return this.history.at(toIndex)
    }

    get last(){ return this.history.last }
    get first(){ return this.history.first }
    at(i){ return this.history.at(i) }

    forEach(fn){ return this.history.forEach(fn) }
    map(fn){ return this.history.map(fn) }
    flatMap(fn){ return this.history.flatMap(fn) }
    filter(fn){ return this.history.filter(fn) }
    find(fn){ return this.history.find(fn) }

    toJSON(){ return this.history.toJSON() }
    toEntries(){ return this.history.toEntries() }
}

Emitter(ModelHistoryController.prototype)


export function getHistory(key, {store=true, storeLimit}={}){
    
    // keep cache of history objects so they can be shared between code
    let history = Histories.get(key)
    
    if( !history ){
        history = new CollMap(null, {
            storeInOrder: true, 
            store: store ? Store.create('model-history:'+key): null,
            storeLimit
        })

        Histories.set(key, history)
    }

    return history
}

