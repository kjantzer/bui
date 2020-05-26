import Backbone from 'backbone'

Backbone.singleton = function singleton(CollClass, ...args){
    let SingletonColl

    const factory = function(){
        if( !SingletonColl )
            SingletonColl = new CollClass(...args)
        return SingletonColl
    }
    factory.isSingletonFactory = true
    return factory
}

export default Backbone.singleton