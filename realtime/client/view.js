import SocketView from './view-socket' 
import Emitter from 'component-emitter'

export default class View {

    // set socketView(view){
    //     this.__socketView = view
    // }

    // get socketView(){
    //     return this.__socketView || SocketView
    // }

    constructor(socket, name){
        this.name = name
        this.socket = socket
        this.sockets = new Map()
    }

    open(data){
        this.data = data === undefined ? this.data : data
        this.socket.emit('view:open', this.name, this.data)
    }

    close(){
        this.socket.emit('view:close', this.name)
    }
    
    sync(clients=[]){
        clients.forEach(c=>{
            this.sockets.set(c.id, new SocketView(c))
        })

        this.emit('change', clients)
    }
}

Emitter(View.prototype)