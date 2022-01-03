export default class SyncPath extends Map {

    constructor(syncHandler, path){
        
        super()

        this.path = path
        this.syncHandler = syncHandler
        this.socket = syncHandler.socket

        this.onSync = this.onSync.bind(this)
    }

    changePath(path){
        if( path != this.path )
            this.syncHandler._changePath(this, path)
    }

    add(object){
        this.set(object, object)
    }

    reconnect(){
        if( !this.isConnected ) return
        this.connect()
    }
    
    connect(){
        this.isConnected = true
        this.socket.emit('join', this.path)
    }

    disconnect(){
        this.isConnected = false
        this.socket.emit('leave', this.path)
    }

    // aliases
    open(){ return this.connect() }
    close(){ return this.disconnect() }

    onSync(data){
        // this.emit('change', data)
        this.forEach(object=>{
            
            if( object.onSync )
                object.onSync(data)
        })
    }

}