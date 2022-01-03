import Dialog from '../presenters/dialog'
import network from '../util/network'

let offlineDialog

if( network )
network.addEventListener('change', e=>{

    if( network.offline){

        if( !offlineDialog ){
            offlineDialog = new Dialog({
                icon: 'globe',
                body: 'Network Offline',
                color: 'red',
                btns: false,
            })

            offlineDialog.notif({
                closeOnClick: false,
                autoClose: false,
                width: 'auto',
                nid: 'network-offline',
                anchor: 'bottom-right'
            })
        }
    }else{
        offlineDialog&&offlineDialog.close()
        offlineDialog = null
    }
})