import Notif from '../../presenters/notif'
import device from '../../util/device'

// when a new service worker takes over, reload the app to begin using it
let refreshing;

if( navigator.serviceWorker ){
    navigator.serviceWorker.addEventListener('controllerchange', ()=>{
        if( refreshing ) return;
        refreshing = true;
        window.location.reload();
    });
    
    navigator.serviceWorker.ready.then(reg=>{

        // a new service worker is waiting to be used
        if( reg.waiting )
            setTimeout(()=>{ // delay to let DOM load
                newUpdateNotif(reg.waiting, reg.active)
            })

        // a new service woker was found
        reg.addEventListener('updatefound', ()=>{

            let worker = reg.installing
            
            window.dispatchEvent(new Event('sw:installing'))

            // once installed, prompt user to use update
            worker.addEventListener('statechange', ()=>{
                if( worker.state == 'installed' ){
                    newUpdateNotif(worker, reg.active)
                }
            })
        });

    })

}


function newUpdateNotif(worker, oldWorker){
    if( !navigator.serviceWorker.controller ) return

    new Notif({
        nid: 'bui-sw-app-updated',
        msg: 'App update available',
        icon: device.isSmall ? 'system_update' : 'browser_updated',
        btns: [{label: 'Update', color: 'theme'}],
        autoClose: false,
        width: 'auto',
        anchor: 'top-right',
        onClick(notif, btn){
            if( btn ){
                // https://allanchain.github.io/blog/post/pwa-skipwaiting/
                oldWorker?.postMessage({action: 'abortConnections'})
                worker.postMessage({action:'skipWaiting'})
            }
        }
    })
}
