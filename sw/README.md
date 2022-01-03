Service Worker
=================

A service worker allows you to cache files and http requests, letting your app work offline. It is also a requirement for your app to be "installable"

## Getting Started

#### Workbox
Using [Workbox](https://developers.google.com/web/tools/workbox) reduces the amount of boilerplate needed to create our service worker

```bash
$ npm install -s workbox-webpack-plugin workbox-recipes
```

#### Example SW
```js
// sw.js
import {pageCache, googleFontsCache, offlineFallback } from 'workbox-recipes'
import {precacheAndRoute} from 'workbox-precaching'
import {setDefaultHandler} from 'workbox-routing'
import {NetworkOnly} from 'workbox-strategies'
import cacheableAPI from 'bui/sw/cacheable-api'

// pre-caches files compiled by webpack; see WorkboxWebpackPlugin.InjectManifest
precacheAndRoute(self.__WB_MANIFEST);

// cache any loaded google fonts
googleFontsCache();

// look for api responses that opt-in to cacheable (see API class)
cacheableAPI()

// cache pages, or default to network only
// pageCache()
// setDefaultHandler(new NetworkOnly());

// will fallback to offline.html
offlineFallback();

// listen for a client giving us messages
self.addEventListener('message', function (event) {
    // client asked to begin using this new worker (see onAppUpdated)
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});
```

## Client

`./client` is code to be used in browser (client) code

#### `./client/on-app-updated`
Detects when a new service worker is installed and shows a notification to "update app"

#### `./client/get-subscription`
Creates a push subscription (will reuse if one already exists)