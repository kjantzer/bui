import {googleFontsCache} from 'workbox-recipes'

// cache any loaded google fonts
googleFontsCache();

// listen for a client giving us messages
self.addEventListener('message', function (event) {
    // client asked to begin using this new worker (see onAppUpdated)
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});