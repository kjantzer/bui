import 'bui/sw/client/on-app-updated'

window.addEventListener('load', function() {
    navigator.serviceWorker.register('../sw.js').then(registration=>{}, err=>{
        console.log('ServiceWorker registration failed: ', err);
    });
});