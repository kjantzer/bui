import CollMap from "../../util/collmap"

export default class SyncPath extends Map {

    constructor(syncHandler, path){
        
        super()

        this.path = path
        this.syncHandler = syncHandler
        this.socket = syncHandler.socket

        this.onSync = this.onSync.bind(this)
    }

    refObjects = new CollMap()

    changePath(path){
        if( path != this.path )
            this.syncHandler._changePath(this, path)
    }

    add(object){
        this.set(object, object)
    }

    onDisconnect(){
        this.forEach(obj=>{
            if( obj.onSyncDisconnect )
                obj.onSyncDisconnect(...arguments)
        })
    }

    reconnect(){
        if( !this.isConnected ) return
        this.connect()
    }
    
    connect(refObject){

        // track the object that requested the connection
        if( refObject )
            this.refObjects.set(refObject, refObject)

        // already connected, no need to connect again
        if( refObject && this.isConnected )
            return

        this.isConnected = true
        this.socket.emit('join', this.path)
    }

    disconnect(refObject){

        if( refObject )
            this.refObjects.delete(refObject)

        // do not disconnect, other ref objects are still relying on the connection
        if( this.refObjects.size > 0 )
            return

        this.isConnected = false
        this.socket.emit('leave', this.path)
    }

    // aliases
    open(){ return this.connect(...arguments) }
    close(){ return this.disconnect(...arguments) }

    onSync(data){
        // this.emit('change', data)
        this.forEach(object=>{
            
            if( object.onSync )
                object.onSync(data)
        })
    }

}