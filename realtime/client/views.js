import View from './view'

export default class Views extends Map {

    constructor(socket){
        super()
        this.socket = socket

        socket.on('connect', ()=>{ this.reopen() })
        socket.on('view:sync', ()=>{ this.onViewSync() })
    }

    onViewSync(payload){
        let {name, data} = payload
        let view = this.get(name)
        if( !view ) return

        view.sync(data)
    }

    reopen(){
        this.forEach(view=>{
            view.open()
        })
    }

    open(viewName, data){
        let view = this.get(viewName)

		if( !view ){
			view = new View(this.socket, viewName)
			this.set(viewName, view)
		}

        view.open(data)
        return view
    }
    
    close(viewName){
        
        let view = null

        if( viewName instanceof View )
            view = viewName
        else
            view = this.get(viewName)

        if( !view ) return

        view.close()
        this.delete(viewName)
    }
}