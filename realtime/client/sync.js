import io from 'socket.io-client'
import SyncPath from './sync-path'
import CollMap from '../../util/collmap'

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
    pathKey='url',
    group=false,
    syncOpts={}
}={}){

    Object.defineProperty(Class.prototype, 'realtimeSync', {
        get: function realtimeSync() {

            if( !this.__realtimeSync ){

                let path = this[pathKey]
                if( typeof path == 'function' ) path = path.call(this)

                if( group ){
                    let self = this
                    self.constructor.groupSync = GroupSync.init(path)

                    // mimic open/close methods
                    this.__realtimeSync = {
                        open(refObject){ self.constructor.groupSync.add(self, self, refObject) },
                        close(refObject){ self.constructor.groupSync.remove(self, refObject) },
                        get path(){ return self.constructor.groupSync.path },
                        get groupSync(){ return self.constructor.groupSync }
                    }
                    
                }else{
                    this.__realtimeSync = sync(path, this)
                }
            }

            return this.__realtimeSync
        }
    });

    let syncData = Class.prototype.map ? syncBackboneCollection : syncBackboneModel

    // allows for onSync to be overriden but then still call the default sync method
    Class.prototype.onSyncDefault = function(data){
        if( !syncData.call(this, data, syncOpts) )
            this.onSyncFailed&&this.onSyncFailed(data)
    }

    Class.prototype.onSync = function(data){ return this.onSyncDefault.call(this, data) }
}


// NOTE: do we really need different sync methods for coll/vs model?
// maybe can refactor to one?
export function syncBackboneCollection(data, {
    addUpdates=true, // TODO: rename to `addMissingUpdates`
    addToRoot=true, // true in MOST cases
    triggerDestroy=false
}={}){

    let {action, attrs, url} = data
    let thisUrl = this.realtimeSync.path// typeof this.url == 'function' ? this.url() : this.url
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

        if( !model && addUpdates && ['update', 'add', 'insert'].includes(action)){
            action = data.action = 'add'
            path = path.replace(/\.\d+$/,'')
            model = this.get(path) || this

            // found, but appears to be a model, not a collection, so revert back to "update"
            // NOTE: why was I testing for `model.set`? both collections and models have that
            if( model && !model.add /*|| model.set*/ )
                action = data.action = 'update'
        }
    }

    if( !model && action == 'destroy' )
        return

    if( !model )
        return addUpdates ? console.warn('Sync: unsure how to handle, ', data) : false

    if( ['update', 'patch'].includes(action) )
        model.set(attrs, {fromSync: true})

    if( ['insert', 'add'].includes(action) )
        model.add ? model.add(attrs, {fromSync: true}) : model.set(attrs) // .set used if model is a Backbone.Model
    
    if( ['destroy', 'delete'].includes(action) ){

        if( model.collection )
            model.collection.remove(model, {fromSync: true})

        if( triggerDestroy )
            model.trigger('destroy', model, model.collection, {fromSync: true})
    }
}

export function syncBackboneModel(data, {addMissingUpdates=true}={}){
    
    let model = this
    let {action, attrs, syncData, url} = data
    let thisURL = this.realtimeSync.path
    
    // sync url is different, so use it to try and find the correct child model
    if( url && url != thisURL ){
        
        // `/api/book/1/elements/2` => `elements.2`
        let path = url.replace(thisURL+'/', '').replace(/\//g, '.')

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
            model.add(attrs, {fromSync: true})
        // there are occasions where an "add" action performs an update to existing model
        // rather than create a new record (eg: "insert ignore")
        else if( model.set )
            model.set(attrs, {fromSync: true})
            
        didSync = true
    }
    
    if( action == 'update' ){
        didSync = true
        model.set(syncData||attrs, {fromSync: true})
    }

    if( action == 'destroy' && model.collection ){
        didSync = true
        // can't call `model.destroy` as that would send a request to the server
        model.collection.remove(model, {fromSync: true})
        model.trigger('destroy', model, model.collection, {fromSync: true})
    }

    // let views know when sync changes happen
    if( didSync )
        model.trigger('realtime-sync', data)

    return didSync
}

// lets many objects setup and use the same SyncPath
export class GroupSync extends CollMap {

    static paths = new CollMap()

    static init(path){
        if( !this.paths.get(path) ){
            this.paths.set(path, new GroupSync(path))
        }

        return this.paths.get(path)
    }

    constructor(path){
        super()
        this.realtimeSync = sync(path, this)
    }

    onSync(data){
        // forward sync data to all "asset collections"
        this.forEach(coll=>{
            if( coll.onSync )
                coll.onSync.call(coll, data)
        })
    }

    get path(){ return this.realtimeSync.path }

    add(key, val, refObject){
        this.set(refObject||key, val)
        if( this.size > 0 ){
            this.realtimeSync.open(refObject)
        }
    }

    remove(key, refObject){
        this.delete(refObject||key)
        if( this.size == 0 ){
            this.realtimeSync.close(refObject)
        }
    }
}
