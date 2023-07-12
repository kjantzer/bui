import CollMap from '../collmap'
import mouse from '../mouse'
import ClientSelctor from './client-selector'


export default class Broadcast {

    channel = 'goTo'

    constructor(){
        this.clients = new CollMap()
        this.id = new Date().getTime()

        this.bc = new BroadcastChannel(this.channel)
        this.bc.onmessage = this.onmessage.bind(this)
    }
    
    onmessage(e){
        let {key, data, opts} = e.data

        // should always have a key, but make sure
        if( !key ) return

        // message not intended for this client
        if( opts?.forClient && opts.forClient != this.id ) return

        // call handler
        this['_'+key]?.(data, opts)
    }

    async emit(key, data, opts={}){

        // ask user which client (if more than one)
        if( key !== 'getClients' && opts.allClients !== true ){

            let clients = await this.getClients()

            // no clients, so open one now
            if( clients.length == 0 ){
                await new Promise(resolve=>{
                    window.open(location.hostname)
                    setTimeout(resolve,100)
                })
                // attempt to get again
                clients = await this.getClients()
            }

            // ask user which one
            let client = clients.length == 1 
                ? clients.first 
                : await ClientSelctor.shared.open(clients, mouse.event)

            if( !client ) return false
            
            if( client?.id )
                opts.forClient = client.id
        }

        return this.bc.postMessage({key, data, opts})
    }

    getClients(){
        return new Promise(resolve=>{
            this.clients.clear()
            this.emit('getClients', {askingClient: this.id})
            setTimeout(()=>{resolve(this.clients)}, 100)
        })
    }

    _getClients(data){
        if( data.askingClient )
            this.emit('getClients', this.clientInfo())
        else{
            this.clients.set(data.id, data)
        }
    }

    clientInfo(){
        return {
            id: this.id, 
            path: location.pathname,
            title: document.title,
            windowLeft: window.screenLeft,
            windowTop: window.screenTop,
            windowHeight: window.outerHeight,
            windowWidth: window.outerWidth,
        }
    }
    
    async goTo(url, opts, emitOpts){
        url ||= location.pathname
        let didEmit = await this.emit('goTo', {url, opts}, emitOpts)
        
        if( didEmit !== false && globalThis.UIAlertMsg )
            throw new UIAlertMsg('Opened in other window')
    }

    _goTo(data){
        let {url, opts} = data

        if( globalThis.goTo )
            goTo(url, opts)
        else
            console.log('`globalThis.goTo` not implemented');
    }
}