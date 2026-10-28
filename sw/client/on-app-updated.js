import Notif from '../../presenters/notif'
import device from '../../util/device'

// quiet: no "update downloading/available" notifs (ex: an app's reload is already updating, or it shows its own prompt)
export const updateNotifs = {quiet: false}

/*
    The update waiting to be used (`worker` is set once one is ready)
    an app can show its own prompt instead of the notif: set `updateNotifs.quiet`, check `appUpdate.ready`,
    and listen for the `sw:update-ready` window event; `appUpdate.apply()` switches to it (which reloads)
*/
export const appUpdate = {
    worker: null,
    oldWorker: null,
    get ready(){ return !!this.worker },
    apply(){
        if( !this.worker ) return location.reload()
        // https://allanchain.github.io/blog/post/pwa-skipwaiting/
        this.oldWorker?.postMessage({action: 'abortConnections'})
        this.worker.postMessage({action:'skipWaiting'})
    }
}

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

    appUpdate.worker = worker
    appUpdate.oldWorker = oldWorker
    window.dispatchEvent(new CustomEvent('sw:update-ready', {detail: appUpdate}))

    if( updateNotifs.quiet ) return

    new Notif({
        nid: 'bui-sw-app-updated',
        msg: 'App update available',
        icon: device.isSmall ? 'system_update' : 'browser_updated',
        btns: [{label: 'Update', color: 'theme'}],
        autoClose: false,
        width: 'auto',
        anchor: 'top-right',
        onClick(notif, btn){
            if( btn )
                appUpdate.apply()
        }
    })
}
