import Btn from '../../elements/btn'
import {css} from 'lit-html'

customElements.define('b-form-add-content-btn', class extends Btn{

    constructor(){
        super()
        this.addEventListener('click', this.addContent)
    }

    addContent(){
        let key = this.getAttribute('key')

        if( !key )
            key = this.textContent.trim().replace(/Add /, '').toLowerCase()

        let handler = this.formHandler
        if( !handler ) throw new Error('Cannot find form-handler')

        let control = handler.get(key)
        if( !control ) return

        control.focus()
    }

    get formHandler(){
        let el = this
        let handler = null
        while( !handler && el ){
            el = el.parentElement
            if( el && el.tagName == 'FORM-HANDLER' )
                handler = el
        }
        return handler
    }

})

export default customElements.get('b-form-add-content-btn')