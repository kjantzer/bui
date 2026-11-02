import { LitElement, html, css } from 'lit'
import View from './view'
import docs from 'bui/presenters/notif/README.md'
import Notif from 'bui/presenters/notif'
import Dialog from 'bui/presenters/dialog'

customElements.define('demo-presenter-notif', class extends View{

    static get title(){ return 'Notif' }

    get docs(){ return docs }

    renderContent(){ return html`

        <h3>Examples</h3>

        ${notifExamples.map(n=>html`
            <b-btn text color="theme" .notif=${n} @click=${this.showNotif}>${n.msg}</b-btn>&nbsp;&nbsp;
        `)}

        <b-btn text color="theme" @click=${this.showDialog}>Dialog in notif</b-btn>
        <b-btn text color="theme" @click=${this.showMany}>Stack of 6</b-btn>

        <br><br>
        <h2>Documentation</h2>
    `}

    showNotif(e){
        let opts = e.currentTarget.notif
        new Notif(opts)
    }

    showDialog(){
        Dialog.error({body: 'A dialog rendered in a notif'}).notif({anchor: 'bottom-right'})
    }

    showMany(){
        for( let i = 1; i <= 6; i++ )
            new Notif({msg: `Notif ${i} of 6`, autoClose: 8000})
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
    icon: 'upload',
    nid: 'uploading',
    msg: 'File Uploading...',
    autoClose: false,
},{
    type: 'success',
    title: 'Upload complete',
    msg: 'File Uploaded (replaces "uploading")',
    autoClose: 3000,
    nid: 'uploading',
    btns: [
        {label: 'View'}
    ]
},{
    msg: 'Photo moved to trash',
    compact: true,
    icon: 'trash',
    anchor: 'bottom',
    autoClose: 6000,
    btns: ['undo']
},{
    type: 'success',
    msg: 'Progress bar',
    progress: true,
    autoClose: 6000
},{
    type: 'sticky',
    msg: 'Sticky (close btn)'
},{
    type: 'info',
    msg: 'Info type notif'
},{
    type: 'error',
    msg: 'Error type notif'
},{
    type: 'error',
    color: 'red',
    msg: 'Solid red error'
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
