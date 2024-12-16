/*
    # Local Store Controller

    ```js
    class MyElement {

        key = 'local-store-key'
        
        localStore = new LocalStoreController(this)

        storeChange(){
            console.log(this.localStore.value)
            this.localStore.value = null
        }
    }
    ```
*/
import store, {forceStorageEventsLocally} from '../../util/store'
forceStorageEventsLocally()

export default class LocalStoreController {

    host;

    constructor(host, key){
        this.host = host
        this.key = key
        host.addController(this)
        this.onChange = this.onChange.bind(this)
    }

    get value(){
        return store(this.key||this.host?.key)
    }

    set value(val){
        let key = this.key||this.host?.key
        if( key )
            store(key, val)
    }

    hostConnected(){
        window.addEventListener('storage', this.onChange)
        // wait till end of stack
        setTimeout(()=>{
            this.host?.storeChange?.call(this.host)
        })
    }

    hostDisconnected(){
        window.removeEventListener('storage', this.onChange)
    }

    onChange(e){
        let {key} = e.detail || e
        if( key && key == (this.key||this.host?.key) )
            this.host?.storeChange?.call(this.host)
    }
}
