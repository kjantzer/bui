
export default (attrs, view)=>new Proxy(attrs, {

    get(target, prop) {

        if( prop == 'emit' )
            return function(action,  opts={}){
                if( typeof action == 'string' )
                    opts.action = action
                else{
                    opts = action
                }
                opts.clients = [target.id]
                return view.emitTo(opts)
            }

        if( prop == 'toJSON' )
            return function(){ return target }

        if( target[prop] != undefined )
            return target[prop]
        
        if( target.data[prop] != undefined )
            return target.data[prop]

        if( target.attrs[prop] != undefined )
            return target.attrs[prop]

        return target[prop];
    }
})