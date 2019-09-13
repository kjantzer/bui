import SocketView from './view-socket' 
import Emitter from 'component-emitter'

export default class View {

    constructor(socket, name){
        this.name = name
        this.socket = socket

        this.clients = new Map()
    }

    open(data){
        this.data = data === undefined ? this.data : data
        this.socket.emit('view:open', this.name, this.data)
    }

    close(){
        this.socket.emit('view:close', this.name)
    }
    
    sync(clients=[]){

        this.clients.clear()
        
        clients.forEach(c=>{
            this.clients.set(c.id, new SocketView(c))
        })

        this.emit('change', clients) // NOTE: should this be `this.clients`?
    }
}

Emitter(View.prototype)