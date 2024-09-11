/*
    # Toggle Btn

    A subclass of `b-btn` that will toggle localStorage. Use with `b-toggle-view`

    ```html-preview
    <b-toggle-btn key="demo">Toggle the view</b-toggle-btn>
    ```
*/
import Btn from './btn'
import store from '../util/store'

customElements.define('b-toggle-btn', class extends Btn{

    static properties = {
        ...Btn.properties,
        key: {type: String},
    }

    onClick(e){
        if( !this.key ) return
        let val = store(this.key)
        store(this.key, val?null:true)
    }

})

export default customElements.get('b-toggle-btn')