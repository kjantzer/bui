/*
    # Copy Btn

    Subclass of `b-btn` that will copy the text of the parent elemnt it is in. Or set `.value` on the btn (can be string or custom function)

    ```html-preview
    <div>String of text <b-copy-btn clear></b-copy-btn></div>
    ```
*/
import {css} from 'lit'
import Btn from './btn'
import copyText from '../util/copyText'
import Notif from '../presenters/notif'

customElements.define('b-copy-btn', class extends Btn{

    constructor(...args){
        super(...args)
        this.icon = 'paste'
        this.addEventListener('click', this.copy)
        this.title='Copy to clipboard'
    }

    copy(e){
        e.stopPropagation()
        
        let label = this.getAttribute('label') || 'Value'
        
        let val = this.value
        if( typeof val == 'function' )
            val = val()
        
        if( this.value === undefined && this.parentElement )
            val = this.parentElement.textContent.trim()
        
        copyText(val)
        Notif.alert(`${label} copied to clipboard`, {icon: this.icon})
    }

})

export default customElements.get('b-copy-btn')