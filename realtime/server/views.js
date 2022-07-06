const View = require('./view')

class Views extends Map {
	
	connect(io, socket){

        this.io = io

		socket.on('view:open', (viewName, data)=>{
			this.get(viewName).add(socket, data)
		});

		socket.on('view:emit', (viewName, opts, cb)=>{

			let view = this.get(viewName)

			if( !view )
				return cb({error: 'Invalid view name'})

			cb(view.emit(opts))
		});

		socket.on('view:info', (viewNamePattern, cb)=>{

			if( !cb ){
				cb = viewNamePattern
				viewNamePattern = ''
			}

			let resp = []
			let patt = new RegExp(viewNamePattern)

			this.forEach((view, name)=>{
				
				if( name.match(patt) && view.clients.size > 0 ){
					resp.push({
						name: name,
						data: view.clientData
					})
				}

			})

			if( resp.length == 1 && resp[0].name === viewNamePattern )
				resp = resp[0]

			cb(resp)
		});

		socket.on('view:close', viewName=>{
			this.get(viewName).remove(socket)
		});

		socket.on('disconnect',()=>{
			this.forEach(view=>{
				view.remove(socket)
			})
		});

	}

	get(viewName){
		let view = super.get(viewName)

		if( !view ){
			view = new View(this.io, viewName)
			this.set(viewName, view)
		}

		return view
	}
}

module.exports = new Views() // singleton (do I really want to do this)