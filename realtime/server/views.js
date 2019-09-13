const View = require('./view')

class Views extends Map {
	
	connect(socket){

        this.io = socket.io

		socket.on('view:open', (viewName, data)=>{
			this.get(viewName).add(socket, data)
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
			view = new View(io, viewName)
			this.set(viewName, view)
		}

		return view
	}
}

module.exports = new Views() // singleton (do I really want to do this)