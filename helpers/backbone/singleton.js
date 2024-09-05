/*
    # Singleton
    Export a a Collection as a singleton

    ```js
    import 'helpers/backbone/singleton'
    import {Collection, singleton} from 'backbone'

    class Coll extends Collection{}

    export default singleton(Coll)
    ```
*/
import Backbone from 'backbone'

/*
    Without proxy: SingletonColl().fetch()
    With proxy: SingletonColl.fetch() ^ this works too
    NOTE: does this add unnecessary overhead processing?
*/
const handlers = {
    get: function(target, prop, receiver) {
        if( prop == 'isSingletonFactory' )
            return target[prop]

        // get all props from the SingletonInstance
        let targetProp = target()[prop]

        if( typeof targetProp == 'function' )
            return targetProp.bind(target())

        return targetProp
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