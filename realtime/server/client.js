module.exports = class Client {

    get path(){ return '/user' }
	
	constructor(io, socket){
		this.io = io
		this.socket = socket

        let user = socket.request.user
        let data = this.socket.handshake.query

        socket.attr = JSON.parse(data.attr||'{}')

        socket.attr = Object.assign(socket.attr, {
            id: user.id,
            name: user.name,
            email: user.email,
            type: user.type
        })

        // stop offline notif, user came back online
        if( user.__offlineNotif ){
            clearTimeout(user.__offlineNotif)
            delete user.__offlineNotif
        }

        // first time coming online, send notif
        else if( user.sockets.size == 0 )
            io.emit(this.path, {id: user.id, online:true})
        
        // keep track of the user's clients
        user.sockets.set(socket, socket)

        socket.on('disconnect', this.disconnect.bind(this))

        socket.on('comm', data=>{
            if( !data.socketID && !data.event )
                return console.error('Cannot emit `comm`, missing socketID or event')

            io.to(data.socketID).emit(data.event, data.data)
        })
	}

    disconnect(){
        let user = this.socket.request.user

        // stop tracking this client, its going awaay
        user.sockets.delete(this.socket)
        
        // delay telling clients about status change...in case user is just refreshing
        user.__offlineNotif = setTimeout(()=>{

            delete user.__offlineNotif
            if( user.sockets.size == 0 )
                this.io.emit(this.path, {id: user.id, online:false})

        },1000)
    }
	
}