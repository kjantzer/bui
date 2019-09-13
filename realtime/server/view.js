
module.exports = class View {

	constructor(io, name){
        this.io = io
		this.name = name
		this.clients = new Map()
	}

	get length(){
		return this.clients.size
	}

	add(socket, data={}){
		this.clients.set(socket, data)
		this.sync()
	}

	remove(socket){
		this.clients.delete(socket)
		this.sync()
	}

	sync(){
		let syncData = []
		this.clients.forEach((data, socket)=>{
			syncData.push({
				id: socket.id,
				userID: socket.userID,
				attrs: socket.attr,
				data: data
			})
		})
		console.log('sync views for:', this.name, this.length);

        this.io.emit('view:sync', {
            name: this.name,
            data: syncData
        })
	}
}