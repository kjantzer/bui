// WIP
import { LitElement, html, css } from 'lit'
import Dialog from 'dialog'
import user from 'user'
import device from 'bui/util/device'
import 'bui/elements/table'
import 'bui/elements/table-row'
import 'bui/elements/ts'

customElements.define('s-user-subscriptions', class extends LitElement{

    static listeners = {
        coll: {'add remove change:thisDevice': 'requestUpdate'}
    }

    static styles = css`
        :host {
            display: block;
            position:relative;
        }
    `

    get coll(){ return user.get('subscriptions')}

    refresh(){
        this.coll.fetchSync()
    }

    firstUpdated(){ this.refresh()}

    render(){return html`

        <b-paper compact>
        <b-table>
            <b-table-row slot="header">
                <b-flex w="1fr" wrap>
                    <b-text>Push Notifications</b-text>

                    <b-btn clear color="theme" @click=${this.subscribe} ?hidden=${this.coll.thisDeviceSubscribed}>Subscribe</b-btn>
                </b-flex>
                <b-text w="140px">Created</b-text>
                <b-text w="2em"></b-text>
            </b-table-row>

            ${this.coll.map(m=>html`
                <b-table-row .model=${m}>
                    <b-text>
                        ${m.get('name')}
                        <b-text dim ?hidden=${!m.get('thisDevice')}>(this device)</b-text>
                    </b-text>
                    <b-text>
                        <b-ts .date=${m.get('ts_created')} format="date"></b-ts>
                    </b-text>
                    <b-btn clear icon="trash" @click=${this.destroy}></b-btn>
                </b-table-row>
            `)}

        </b-table>

        </b-paper>      
    `}

    async destroy(e){
        let {model} = e
        model.destroySync()
    }

    async subscribe(e){

        if( this.coll.thisDeviceSubscribed )
            throw new UIWarningError('This device is already subscribed')

        let name = device.name

        if( device.isiOS && !device.isInstalled ){
            throw new UIWarningError('You must first install this app. Tap on "add to homescreen" to install')
        }
        
        let attrs = await Dialog.prompt({
            title: 'Subscribe',
            body: 'Next you will be prompted to allow notifications',
            prompts: [
                {label: 'Device name', key: 'name', val: name}
            ],
            btns: ['cancel', 'next']
        }).modal()

        if( !attrs ) return

        this.coll.saveSubscription(attrs)
    }

})

export default customElements.get('s-user-subscriptions')