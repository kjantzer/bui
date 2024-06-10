import {Collection, API_ROOT} from 'backbone'
import getSubscription from './get-subscription'
import device from '../../util/device'

export default class Subscriptions extends Collection {

    urlPath = '/subscriptions'

    constructor(){
        super(...arguments)
        // silent error
        this.getSubscription().catch(err=>{})
    }

    async getSubscription(opts={}){
        return this.sub = await getSubscription({
            vapidPublicKey: (API_ROOT||'/api')+'/push-msg/public-key',
            ...opts
        })
    }

    async saveSubscription(attrs={}){

        attrs = {
            name: device.name,
            device: device.name,
            screen_size: `${screen.width}x${screen.height}`,
            ...attrs
        }

        attrs.sub = await this.getSubscription()

        await this.fetchSync() // make sure we have all of them // FIXME: not sure I like this

        let exists = this.find(m=>m.get('sub')?.endpoint==attrs.sub.endpoint)
        if( exists ) return

        let [m] = await this.createSync(attrs, {wait: true})
        m.set('thisDevice', true)

        return m
    }

    parse(resp){
        if( this.sub )
            resp.forEach(d=>{
                if( d.sub.endpoint == this.sub.endpoint )
                    d.thisDevice = true
            })

        return resp
    }

    get thisDeviceSubscribed(){
        return this.find(m=>m.get('thisDevice'))
    }

}