import onAppUpdated from 'bui/sw/on-app-updated'

window.addEventListener('load', function() {
    navigator.serviceWorker.register('../sw.js').then(registration=>{
        // will show a Notif with "app update available"
        onAppUpdated(registration)
    }, err=>{
        console.log('ServiceWorker registration failed: ', err);
    });
});