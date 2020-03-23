import View from './view'
import Emitter from 'component-emitter'

export default class Views extends Map {

    constructor(socket){
        super()
        this.socket = socket

        socket.on('connect', ()=>{ this.reopen() })
        socket.on('view:sync', payload=>{ this.onViewSync(payload) })
    }

    onViewSync(payload){
        let {name, data} = payload
        let view = this.get(name)
        if( !view ) return

        view.sync(data)

        this.emit('change', name, data, view)
    }

    reopen(){
        this.forEach(view=>{
            view.open()
        })
    }

    get(viewName, create=false){
        let view = super.get(viewName)

		if( !view && create === true ){
			view = new View(this.socket, viewName)
			this.set(viewName, view)
		}

        return view
    }

    open(viewName, data){
        let view = this.get(viewName, true)
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

        this.emit('change', viewName, [], null)
    }

    info(viewNamePattern){
        return new Promise(resolve=>{
            this.socket.emit('view:info', viewNamePattern, data=>{
                resolve(data)
            })
        })
    }
}

Emitter(Views.prototype)