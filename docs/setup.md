# Setup

## Installation
Blackstone-UI is available as an [npm package](https://www.npmjs.com/package/blackstone-ui)

```
npm install blackstone-ui --save
```

Or if you want the latest cutting-edge version

```
npm install https://github.com/kjantzer/bui.git --save
```


## Bundler
After installing BUI, it can be nice to setup an alias to the module to reduce how much typing is needed:

```js
// webpack
resolve: {
    alias: {
        'bui': 'blackstone-ui',

        // aliases for common presenters is also helpful
        'notif': 'bui/presenters/notif',
        'panel': 'bui/presenters/panel',
        'dialog': 'bui/presenters/dialog',
        'popover': 'bui/presenters/popover'
    }
}
```

```js
// package.json (for parcel.js)
"alias": {
    "bui": "blackstone-ui"
}
```

> The code examples below assume you have setup an alias. If not, swap `bui` for `blackstone-ui` in the imports


## Styles

```less
// style.less

// import a css reset if you wish
@import '~bui/styles/reset.less';

// include BUI styles
@import '~bui/styles/index.less';

// Or only import specific
@import '~bui/styles/colors.less';
@import '~bui/styles/theme.less';
@import '~bui/styles/pwa.less';
```

### `colors.less`
Creates css vars for list of [material colors](https://material.io/design/color)
- `--blue`
- `--blue-200`
- etc...

### `theme.less`
Sets css vars for to support the dark/light mode, accent, and text colors.

- `--theme` - accent color
- `--theme-text` - text color
- `--theme-text-accent`
- `--theme-bgd` - background
- `--theme-bgd-accent`
- `--theme-bgd-accent2`

### `pwa.less`
This makes some styling assumptions for a Progressive Web App (PWA)
- `html/body` full height and no overflow
    - expected that the app element will take care of scrolling
- sets `--view-gutter` (adjust for smaller screens)
- prevents iOS "callouts" from image long presses
- makes a few adjustments to BUI presenter styles

## App Entry

```js
// index.js

// import your styles from above
import 'style.less'

// if your gonna use the router, import and set the config now
import router from 'bui/router'
router.config({
    root: '/',
})

import device, {colorScheme} from 'bui/util/device'

// import all the lit-element helpers 
import 'bui/helpers/lit-element'

// updates global window.open to better support installed PWA
import 'bui/util/window.open'

import App from './app.js'

window.addEventListener('DOMContentLoaded', e=>{
    
    // Adds clases html tag like `mobile`, `ios`, `android`, `installed`
    device.applyClasses()

    // Sets the theme, accent, and colorizes the favicon (based on accent)
    // will also set handler to update theme when dark/light mode changed via system
    colorScheme.apply()

    // initialze your main app view
    document.appendChild(new App())
})
```

```js
// app.js

// NOTE: the tabs/app presenter will call `router.start()`
import AppView from 'bui/presenters/tabs/app'

customElements.define('my-app', class extends App{

    get views(){return `
        my-view
        my-second-view
    `}

})


```

## PWA

https://web.dev/progressive-web-apps/

### Web Manifest

```html
<link rel="manifest" href="/manifest.webmanifest">
```
```json
// manifest.webmanifest
{
  "short_name": "App",
  "name": "My PWA App",
  "display": "standalone",
  "theme_color": "#fff",
  "background_color": "#fff",
  "start_url": "/",
  "icons": [
    {
      "src": "icons/192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}

```

### Service Worker
A service worker allows you to cache files and http requests, letting your app work offline. It is also a requirement for your app to be "installable"

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
import cacheableAPI from 'bui/sw/src/cacheable-api'

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

#### Webpack Build
Update your webpack config with this plugin to build the service worker above
```js
// webpack
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

// add this to "plugins"
new WorkboxWebpackPlugin.InjectManifest({
    // maximumFileSizeToCacheInBytes: 3000000, // 3mb
    swSrc: "./client/sw/src/index.js",
    swDest: path.resolve(__dirname, 'dist', 'sw.js'),
    additionalManifestEntries: [
        {url: 'offline.html', revision: '1'},
        {url: '/img/favicon-32x32.png', revision: '1'}
    ]
})
```

#### Register
Now you can register and use the built service worker from above

```js
// in app entry
import onAppUpdated from 'bui/sw/on-app-updated'

window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(registration=>{
        // will show a Notif with "app update available"
        onAppUpdated(registration)
    }, err=>{
        console.log('ServiceWorker registration failed: ', err);
    });
});
```

### Mobile

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1">

<meta name="apple-mobile-web-app-title" content="My App" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

<link rel="apple-touch-icon" href="/icons/192.jpg">
<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png">
```

Android [maskable](https://web.dev/maskable-icon/) icons: https://maskable.app/

### Splashscreens
iOS (and Android?) can show a splash screen when opening your installed PWA

Use this link to create the sizes and get the html code: https://appsco.pe/developer/splash-screens

