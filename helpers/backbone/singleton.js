import Backbone from 'backbone'

/*
    Without proxy: SingletonColl().fetch()
    With proxy: SingletonColl.fetch() ^ this works too
*/
const handlers = {
    get: function(target, prop, receiver) {
        if( prop == 'isSingletonFactory' )
            return target[prop]

        // get all props from the SingletonInstance
        return target()[prop];
    }
}

Backbone.singleton = function singleton(Class, ...args){
    let SingletonInstance

    const factory = function(){
        if( !SingletonInstance )
            SingletonInstance = new Class(...args)
        return SingletonInstance
    }
    factory.isSingletonFactory = true

    return new Proxy(factory, handlers)
}

export default Backbone.singleton