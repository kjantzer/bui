import { LitElement, html, css } from 'lit-element'
import View from './view'
import docs from 'bui/presenters/notif/README.md'
import Notif from 'bui/presenters/notif'
import Prompt from 'bui/presenters/dialog/prompt'

customElements.define('demo-presenter-notif', class extends View{

    static get title(){ return 'Notif' }

    get docs(){ return docs }

    renderContent(){ return html`

        <h3>Examples</h3>

        ${notifExamples.map(n=>html`
            <b-btn text color="theme" .notif=${n} @click=${this.showNotif}>${n.msg}</b-btn>&nbsp;&nbsp;
        `)}

        <b-btn text color="theme" @click=${this.showPrompt}>With Prompt</b-btn>

        <br><br>
        <h2>Documentation</h2>
    `}

    showNotif(e){
        let opts = e.currentTarget.notif
        new Notif(opts)
    }

    async showPrompt(){
        let email = await new Prompt({
            body: 'Sign up for our newsletter',
            closeBtn:true,
            btns: ['submit'],
            autoFocus: false,
            placeholder: 'email',
            pattern: 'email',
            prefix: html`<b-icon name="mail"></b-icon>&nbsp;`
        }).notif({
            autoClose: false,
            closeOnClick: false
        })

        console.log(email);
    }

})


export default customElements.get('demo-presenter-notif')

const notifExamples = [
{
    msg: 'Top left, grow animation',
    anchor: 'top-left',
    animation: 'grow'
},{
    msg: 'Top right, fade animation',
    anchor: 'top-right',
    animation: 'fade'
},{
    msg: 'Bottom left',
    anchor: 'bottom-left'
},{
    icon: 'upload-cloud',
    nid: 'uploading',
    msg: 'File Uploading...',
    // autoClose: false,
    // closeOnClick: false,
},{
    type: 'success',
    msg: 'File Uploaded',
    autoClose: 3000,
    nid: 'uploading',
    btns: [
        {label: 'View'}
    ]
},{
    msg: 'Photo moved to trash',
    autoClose: 6000,
    btns: [
        {label: 'Undo', color: 'theme'}
    ]
},{
    type: 'info',
    msg: 'Info type notif'
},{
    type: 'error',
    msg: 'Error type notif'
},{
    type: 'failed',
    msg: 'Failed type notif'
},{
    type: 'warning',
    msg: 'Warning type notif'
},{
    type: 'success',
    msg: 'Success type notif'
}
]