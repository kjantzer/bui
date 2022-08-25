import io from 'socket.io-client'
import SyncPath from './sync-path'

let MainSync

export default function sync(path, object){

    if( typeof path == 'function' )
        return enableSync(path, object)

    MainSync = MainSync || new Sync()
    return MainSync.add(path, object)
}

export class Sync extends Map {

    constructor(path='/sync'){
        super()

        this.socket = io(path, {
            transports: ['websocket']
        });

        this.socket.on('connect', ()=>{ this.reconnect() })
        this.socket.on('sync', payload=>{ this.onSync(payload) })
    }

    onSync(payload){
        let syncPath = this.get(payload.path)

        if( payload.socketIDs.includes(this.socket.id) )
            return

        if( !syncPath ) return console.warn('cannot sync: ', payload)
        syncPath.onSync(payload.data)
    }

    add(path, object){
        let syncPath = MainSync.get(path, true)
        syncPath.add(object)
        return syncPath 
    }

    _changePath(syncPath, path){
        
        let wasConnected = syncPath.isConnected
        syncPath.disconnect()

        this.delete(syncPath.path)
        syncPath.path = path
        this.set(path, syncPath)

        if( wasConnected )
            syncPath.connect()
    }

    reconnect(){
        
        // FIXME: change to one call that opens all
        if( this.hasConnected )
            this.forEach(syncPath=>{syncPath.reconnect()})
        
        this.hasConnected = true
    }

    get(path, create=false){
		if( !super.get(path) && create === true ){
			this.set(path, new SyncPath(this, path))
		}

        return super.get(path)
    }

}

export function enableSync(Class, {
    pathKey='url'
}={}){

    Object.defineProperty(Class.prototype, 'realtimeSync', {
        get: function realtimeSync() {
            if( !this.__realtimeSync ){
                let path = this[pathKey]
                if( typeof path == 'function' ) path = path.call(this)
                this.__realtimeSync = sync(path, this)
            }

            return this.__realtimeSync
        }
    });

    let syncData = Class.prototype.map ? syncBackboneCollection : syncBackboneModel

    Class.prototype.onSync = function(data){
        if( !syncData.call(this, data) )
            this.onSyncFailed&&this.onSyncFailed(data)
    }
}


// NOTE: do we really need different sync methods for coll/vs model?
// maybe can refactor to one?
export function syncBackboneCollection(data, {
    addUpdates=true, // TODO: rename to `addMissingUpdates`
    addToRoot=true, // true in MOST cases
    triggerDestroy=false
}={}){

    let {action, attrs, url} = data
    let thisUrl = typeof this.url == 'function' ? this.url() : this.url
    let model = this.get(attrs.id)
    
    action = action.toLowerCase()

    // sync url is different, so use it to try and find the correct child model
    if( url && url != thisUrl ){
        
        // `/api/book/1/elements/2` => `elements.2`
        let path = url.replace(thisUrl+'/', '').replace(/\//g, '.')

        // remove trailing ID `childColl.1` => `childColl`
        // we do this so we can attempt to get the nested child collection this model may be added to
        if( data.action == 'add' ){
            let oldPath = path
            path = path.replace(/\.\d+$/,'')

            // if no trailing ID was removed, we must be adding to this collection directly
            if( oldPath != path )
                model = this.get(path)
            else if( addToRoot !== false )
                model = this

        }else{
            model = this.get(path)
        }

        if( !model && addUpdates && action == 'update' ){
            action = data.action = 'add'
            path = path.replace(/\.\d+$/,'')
            model = this.get(path) || this

            // found, but appears to be a model, not a collection, so reverte back to "update"
            if( model && !model.add || model.set )
                action = data.action = 'update'
        }
    }

    if( !model && action == 'destroy' )
        return

    if( !model )
        return addUpdates ? console.warn('Sync: unsure how to handle, ', data) : false

    if( ['update', 'patch'].includes(action) )
        model.set(attrs)

    if( ['insert', 'add'].includes(action) )
        model.add ? model.add(attrs) : model.set(attrs) // .set used if model is a Backbone.Model
    
    if( ['destroy', 'delete'].includes(action) ){

        if( model.collection )
            model.collection.remove(model)

        if( triggerDestroy )
            model.trigger('destroy', model, model.collection, {})
    }
}

export function syncBackboneModel(data, {addMissingUpdates=true}={}){
    
    let model = this
    let {action, attrs, syncData, url} = data
    
    // sync url is different, so use it to try and find the correct child model
    if( url && url != this.url() ){
        
        // `/api/book/1/elements/2` => `elements.2`
        let path = url.replace(this.url()+'/', '').replace(/\//g, '.')

        // remove trailing ID `model.1` => `model`
        if( data.action == 'add' )
            path = path.replace(/\.\d+$/,'')

        model = this.get(path)

        if( !model && addMissingUpdates && action == 'update' ){
            action = data.action = 'add'
            path = path.replace(/\.\d+$/,'')
            model = this.get(path)
        }
    }

    if( !model && action == 'destroy' )
        return

    if( !model )
        return console.warn('Sync: unsure how to handle, ', data)

    let didSync = false

    if( action == 'add' && attrs ){
        if( model.add )
            model.add(attrs)
        // there are occasions where an "add" action performs an update to existing model
        // rather than create a new record (eg: "insert ignore")
        else if( model.set )
            model.set(attrs)
            
        didSync = true
    }
    
    if( action == 'update' ){
        didSync = true
        model.set(syncData||attrs)
    }

    if( action == 'destroy' && model.collection ){
        didSync = true
        // can't call `model.destroy` as that would send a request to the server
        model.collection.remove(model)
        model.trigger('destroy', model, model.collection, {})
    }

    // let views know when sync changes happen
    if( didSync )
        model.trigger('realtime-sync', data)

    return didSync
}
