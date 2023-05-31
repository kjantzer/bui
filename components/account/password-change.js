import { LitElement, html, css } from 'lit'
import Panel from 'panel'
import Dialog from 'dialog'
import '../../helpers/lit/shared'
import '../../elements/spinner-overlay'
import '../../elements/paper'
import '../../elements/grid'

const MIN_LEN = 8

customElements.defineShared('b-password-change', class extends LitElement{

    open(model, opts={}){

        if( !model ) return;

        this.opts = Object.assign({
            tempPW: false,
            title: 'Password',
            notify: true
        }, opts)

        this.model = model

        new Panel(this, {
            title: this.opts.title,
            width: '360px',
            height: this.isTempPW ? '460px' : '420px',
            anchor: 'center',
            disableBackdropClick: true,
            // onClose: this.onClose.bind(View)
        }).open()
    }

    get isResetting(){
        return this.model && this.model.get('password_is_temp') && this.model.isMe
    }

    get isTempPW(){
        return this.model && this.model.isMe ? false : this.opts.tempPW
    }

    static get styles(){return css`
        :host {
            display: block;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
        }

        form-handler {
            display: grid;
            position:relative;
            padding: 1em;
            /* gap: 1em; */
        }
    `}

    render(){return html`
        <b-spinner-overlay lg></b-spinner-overlay>
        <b-panel-toolbar>

            ${this.isResetting?html`
                <span slot="close-btn"></span>
            `:html`
                <b-btn outline slot="close-btn" @click=${this.close}>Cancel</b-btn>
            `}

        </b-panel-toolbar>

        <form-handler no-grid-area>


            ${this.isTempPW?html`

            ${this.model&&this.model.get('password')&&!this.model.isMe?html`
                <b-paper color="postit" dense outline>
                    <b-icon name="attention-1"></b-icon>
                    The user has a password set. You will be replacing their current password.
                </b-paper><br>
            `:''}
            

            <b-paper color="info" dense outline>
                <b-icon name="info-circled"></b-icon>
                The user will be required to change the tempory password upon sign in.
            </b-paper>

            `:''}
             
            ${this.isResetting?html`
            <b-paper color="info" dense outline>
                <b-icon name="lock"></b-icon>
                You have a temporary password; please change it to something secure.
            </b-paper>
            `:''}

            <b-grid cols=1>

            <form-control ?hidden=${this.isTempPW||this.isResetting} 
                material="filled" label="Current Password" key="pw_current">
                <input slot="control" type="password">
            </form-control>

            <b-hr short></b-hr>

            <form-control material="filled" label="New Password" key="pw_new">
                <input slot="control" type="${this.isTempPW?'text':'password'}" .validate=${this.validateConfirm.bind(this)}>
                <span slot="help">Use at least ${MIN_LEN} characters</span>
            </form-control>

            <form-control material="filled" label="Confirm New Password" key="pw_new_confirm">
                <input slot="control" type="${this.isTempPW?'text':'password'}" .validate=${this.validateConfirm.bind(this)}>
            </form-control>

            ${this.isTempPW&&this.opts.notify?html`
            <div>
                <check-box key="notify" label="Send email" type="switch" checked></check-box>
                <div><b-sub>Notify the user of their new password</b-sub></div>
            </div>
            `:''}

            <b-btn block color="primary" @click=${this.changePassword}>
                ${this.isTempPW?'Set Temporary':'Change'} Password
            </b-btn>

            </b-grid>

        </form-handler>
    `}

    changePassword(){
        let currentPW = this.formHandler.get('pw_current').value
        let newPW = this.formHandler.get('pw_new').value
        let confirmPW = this.formHandler.get('pw_new_confirm').value
        let notify = this.formHandler.get('notify')

        if( currentPW != newPW
        && newPW.length >= MIN_LEN 
        && newPW === confirmPW ){
            this.spinner.show = true

            let url = typeof this.model.url == 'function' ? this.model.url() : this.model.url
            let data = {
                currentPW, 
                newPW, 
                notify:notify&&notify.value
            }

            fetch(url+'/change-password', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then(r=>r.json())
            .then(resp=>{

                this.spinner.show = false

                if( resp.error || !resp ){
                    Dialog.error({title: 'Error', msg: resp.error}).modal()
                    return
                }
                
                this.model.set(resp)
                
                this.close()

                Dialog.success({msg: 'Password Changed'}).modal()

            }, err=>{
                this.spinner.show = false
                Dialog.error({title: 'Error', msg: err.message}).modal()
            })
        }
    }

    validateConfirm(val, el){
        if( !val )return true;
        let key = el.parentElement.key

        el.popOver&&el.popOver.close()

        let currentPW = this.formHandler.get('pw_current')
        let newPW = this.formHandler.get('pw_new')
        let confirmPW = this.formHandler.get('pw_new_confirm')

        if( key == 'pw_new' && val.length < MIN_LEN ){
            // Dialog.error({msg: 'Too short', btns: false}).popOver(el)
            return false
        }

        if( key == 'pw_new' && currentPW.value == newPW.value ){
            // Dialog.error({msg: 'Same password as your current', btns: false}).popOver(el)
            return false
        }

        if( key == 'pw_new_confirm' && newPW.value != confirmPW.value ){
            // Dialog.error({msg: 'Not the same', btns: false}).popOver(el)
            return false
        }
    }

    onClose(){
        console.log('on close?');
        this.formHandler.editors.forEach(el=>el.value='')
    }

    close(){
        this.model = null
        this.panel&&this.panel.close()
    }

})

export default customElements.get('b-password-change')