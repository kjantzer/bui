import { LitElement, html, css } from 'lit-element'
import View from './view'
import docs from 'bui/presenters/dialog/README.md'
import Dialog from 'bui/presenters/dialog'
import Notif from 'bui/presenters/notif'

customElements.define('demo-presenter-dialog', class extends View{

    static get title(){ return 'Dialog' }

    get docs(){ return docs }


    renderContent(){ return html`
        
        <b-btn color="blue" text @click=${dialogs.confirm}>Confirm Modal</b-btn>
        <b-btn color="red" text @click=${dialogs.error}>Error Modal</b-btn>
        <b-btn color="orange" text @click=${dialogs.warn}>Warn Modal</b-btn>
        <b-btn color="green" text @click=${dialogs.success}>Success Notif</b-btn>
        <b-btn color="red" text @click=${dialogs.errorPopover}>Error Popover</b-btn>
        <b-btn color="red" text @click=${dialogs.confirmDelete}>Confirm Delete Popover</b-btn>

        <br><br>
        <h2>Documentation</h2>
    `}

})

export default customElements.get('demo-presenter-dialog')

const dialogs = {
    async success(el){
        Dialog.success({btns:false}).notif()
    },

    async warn(el){
        Dialog.warn({title: 'Ooops', msg: 'That is not supported'}).modal()
    },

    async error(el){
        Dialog.error({title: 'Error', msg: 'Something went wrong'}).modal()
    },

    async errorPopover(el){
        Dialog.error({title: 'Error', msg: 'Something went wrong'}).popover(el)
    },

    async confirm(el){
        if( await Dialog.confirm().modal() )
            Notif.alert('confirmed')
    },

     async confirmDelete(el){
        if( await Dialog.confirmDelete().popover(el) )
            Notif.alert('Confirmed, delete it!')
    }
}