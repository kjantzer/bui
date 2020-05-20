import { LitElement, html, css } from 'lit-element'
import View from './view'
import docs from 'bui/presenters/notif/README.md'
import Notif from 'bui/presenters/notif'

customElements.define('demo-presenter-notif', class extends View{

    static get title(){ return 'Notif' }

    get docs(){ return docs }

    renderContent(){ return html`

        ${notifExamples.map(n=>html`
            <b-btn text .notif=${n} @click=${this.showNotif}>${n.msg}</b-btn>
        `)}

        <br><br>
        <h2>Documentation</h2>
    `}

    showNotif(e){
        let opts = e.currentTarget.notif
        new Notif(opts)
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
        {label: 'View', color: 'primary'}
    ]
},{
    msg: 'Photo moved to trash',
    autoClose: 6000,
    btns: [
        {label: 'Undo', color: 'primary'}
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
    msg: 'Success type notif',
    onClose: ()=>{
        this.querySelector('b-btn').hidden = false
    }
}
]