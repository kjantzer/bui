import { LitElement, html, css } from 'lit-element'
import docs from 'bui/presenters/notif/README.md'

customElements.define('demo-presenter-notif', class extends LitElement{

    static get title(){ return 'Notif' }

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
        }
    `}

    render(){return html`
        <h1>Notif</h1>
        <demo-markdown-docs docs=${docs}></demo-markdown-docs>
    `}

    notif(opts, delay){
        setTimeout(()=>{
            new Notif(Object.assign({
                // controller: 'demo',
            }, opts))
        }, delay)
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
    autoClose: false,
    closeOnClick: false,
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