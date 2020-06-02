import Backbone from 'backbone'

Backbone.singleton = function singleton(Class, ...args){
    let SingletonInstance

    const factory = function(){
        if( !SingletonInstance )
            SingletonInstance = new Class(...args)
        return SingletonInstance
    }
    factory.isSingletonFactory = true
    return factory
}

export default Backbone.singleton