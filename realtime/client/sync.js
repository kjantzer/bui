import io from 'socket.io-client'
import SyncPath from './sync-path'

let MainSync

export default (path, object)=>{
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

    reconnect(){
        
        // FIXME: change to one call that opens all
        if( this.hasConnected )
            this.forEach(syncPath=>{syncPath.reconnect()})
        
        this.hasConnected = true
    }

    get(path, create=false){
		if( !super.get(path) && create === true ){
			this.set(path, new SyncPath(this.socket, path))
		}

        return super.get(path)
    }

}


export function syncBackboneCollection(sync, {
    addUpdates=true,
    triggerDestroy=false
}={}){
    let {action, attrs} = sync
    let model = this.get(attrs.id)
    action = action.toLowerCase()

    if( action == 'update' && model ){    
        model.set(attrs)
    }
    else if( !model && (['insert', 'add'].includes(action) 
                        || (addUpdates&&action=='update') )
    ){
        model = new (this.model)(attrs)
        this.add(model)
    }
    else if(  ['delete'].includes(action) && model ){
        if( triggerDestroy )
            model.trigger('destroy')
            
        this.remove(model)
    }
}