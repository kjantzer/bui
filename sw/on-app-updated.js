import Notif from 'notif'

// when a new service worker takes over, reload the app to begin using it
let refreshing;

if( navigator.serviceWorker )
    navigator.serviceWorker.addEventListener('controllerchange', ()=>{
        if( refreshing ) return;
        refreshing = true;
        window.location.reload();
});

export default reg=>{

    // a new service worker is waiting to be used
    if( reg.waiting )
        newUpdateNotif(reg.waiting)

    // a new service woker was found
    reg.addEventListener('updatefound', ()=>{

        let worker = reg.installing

        // once installed, prompt user to use update
        worker.addEventListener('statechange', ()=>{
            if( worker.state == 'installed' ){
                newUpdateNotif(worker)
            }
        })
    });
}


function newUpdateNotif(worker){
    if( !navigator.serviceWorker.controller ) return

    new Notif({
        msg: 'App update available',
        icon: 'arrows-ccw',
        btns: [{label: 'Update', color: 'theme'}],
        autoClose: false,
        anchor: 'top-right',
        onClick(notif, btn){
            if( btn ){
                worker.postMessage({action:'skipWaiting'})
            }
        }
    })
}
