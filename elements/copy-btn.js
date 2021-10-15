import {css} from 'lit-element'
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
        Notif.alert(`${label} copied to clipboard`, {icon: 'paste'})
    }

})

export default customElements.get('b-copy-btn')