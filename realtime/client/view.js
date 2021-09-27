import SocketView from './view-socket' 
import Emitter from 'component-emitter'
import CollMap from '../../util/collmap'

export default class View {

    constructor(socket, name){
        this.name = name
        this.socket = socket

        this.clients = new CollMap()
    }

    get thisClient(){ return this.clients.find(c=>c.id==this.socket.id) }

    find(...args){ return this.clients.find(...args) }
    map(...args){ return this.clients.map(...args) }
    filter(...args){ return this.clients.filter(...args) }

    open(data){

        // if no data given, reuse existing data
        if( data === undefined )
            data = this.data

        // support data being a function
        if( typeof data == 'function' ){
            this.data = data
            data = data()
        }else{
            this.data = data
        }

        // open this view (doesn't matter if already open)
        // this.sync will be triggered on all clients by the server
        this.socket.emit('view:open', this.name, data)
    }

    // triggers a "view:open" but with new data; changes will be synced to all clients
    update(data, {merge=true}={}){

        // merge data with existing 
        if( data && merge )
            data = Object.assign(this.data||{}, data)

        this.open(data)
    }

    close(){
        this.socket.emit('view:close', this.name)
    }
    
    sync(clients=[]){

        this.clients.clear()
        
        clients.forEach(c=>{
            this.clients.set(c.id, SocketView(c, this))
        })

        this.emit('change', this.clients)
    }

    onEmitReceive(payload){
        if( payload.action ){
            let {action, clients} = payload
            delete payload.action
            delete payload.clients
            this.emit(action, payload, clients)
        }
        else
            this.emit('receive', payload)
    }

    emitTo(action, opts={}){

        if( typeof action == 'string' )
            opts.action = action
        else{
            opts = action
        }

        return new Promise(resolve=>{
            this.socket.emit('view:emit', this.name, opts, data=>{
                resolve(data)
            })
        })
    }
}

Emitter(View.prototype)