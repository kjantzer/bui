
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
		// reduce number of sync emits when clients reconnecting
		clearTimeout(this._syncDelay)
		this._syncDelay = setTimeout(()=>{
			this.io.emit('view:sync', {
				name: this.name,
				data: this.clientData
			}, 200)
		})
	}

	emit(opts){
		let emittedTo = []

		this.clients.forEach((data, client)=>{

			// if requested certain client IDs, make sure this client matches
			if( opts.clients && !opts.clients.includes(client.id) )
				return

			client.emit('view:emit', this.name, opts)
			emittedTo.push(client.id)
		})
		
		return {emittedTo}
	}

	get clientData(){
		let syncData = []
		this.clients.forEach((data, socket)=>{
			syncData.push({
				id: socket.id,
				userID: socket.userID,
				attrs: socket.attr,
				data: data
			})
		})
		return syncData
	}
}