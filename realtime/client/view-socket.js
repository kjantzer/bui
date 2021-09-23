
export default (attrs)=>new Proxy(attrs, {

    get(target, prop) {

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