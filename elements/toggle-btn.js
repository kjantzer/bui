/*
    # Toggle Btn

    A subclass of `b-btn` that will toggle localStorage. Use with `b-toggle-view`

    ```html-preview
    <b-toggle-btn key="demo">Toggle the view</b-toggle-btn>
    ```
*/
import Btn from './btn'
import LocalStoreController from '../helpers/lit/local-store-controller'

customElements.define('b-toggle-btn', class extends Btn{

    static properties = {
        ...Btn.properties,
        key: {type: String},
        active: {type: Boolean, reflect: true}
    }

    localStore = new LocalStoreController(this, {emit: true})

    storeChange(){
        this.active = this.localStore.value
    }

    updated(){
        if( this.hasAttribute('icon-active') && this.hasAttribute('icon-inactive') )
            this.icon = this.active ? this.getAttribute('icon-active') : this.getAttribute('icon-inactive')
    }

    onClick(e){
        let val = this.localStore.value
        this.localStore.value = val?null:true
    }

})

export default customElements.get('b-toggle-btn')


