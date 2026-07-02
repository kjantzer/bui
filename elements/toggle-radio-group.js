import RadioGroup from '../presenters/form/controls/radio-group'
import LocalStoreController from '../helpers/lit/local-store-controller'

customElements.define('b-toggle-radio-group', class extends RadioGroup{

    static properties = {
        ...RadioGroup.properties,
        key: {type: String},
    }

    localStore = new LocalStoreController(this, {emit: true})

    storeChange(){
        this.value = this.localStore.value
    }

    _didChange(){
        super._didChange()
        this.localStore.value = this.value
    }

})