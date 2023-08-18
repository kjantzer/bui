# Server App

# App

An opinionated express app

```js
const ExpressApp = require(bui`server/app`)
const app = global.app = new ExpressApp(options)

// ....

app.start({
    port=8080, 
    publicPort=true, // true = same as port
    name="App"
})
```

## Default Options

```js
const DEFAULT_OPTS = {
    cors: false,
    corsPrivateNetwork: false,
    compression: true,
    parseCookies: true,
    bodyParser: {
        text: true, // parse text
        json: true // and json types
    },
    fileUploads: false, // see express-fileupload
    parseSocketIDs: true, // will set `req.socketIDs` from header 'x-socket-ids'
    staticPaths: [],
    beforeMiddleware: null, // optional hook
    handleUncaughtException: true,
    handleUnhandledRejection: true,
}
```

## Example

```js
const ExpressApp = require(bui`server/app`)
const app = global.app = new ExpressApp({
    staticPaths: [DIST_PATH, PUBLIC_PATH],
    cors: false,
    corsPrivateNetwork: false,
    bodyParser: {
        text: {
            // change default
            type: ['text/plain', 'application/vnd.cip4-jmf+xml'],
            limit: '50mb'
        },
        json: true
    },
    fileUploads: true,
    beforeMiddleware(){
        // do something before middleware is attached
    },
});
```

# API

```js
const app = require('express')(); // or instance of `server/app`
const API = require('bui/server/api')
const Sync = require('bui/realtime/server/sync')

new API(app, [
    MyClass,
    AnotherClass
], {
    root: '/api' // prefix all APIs,
    sync: new Sync(io) // optionally support realtime syncing
})

class MyClass {

    // required
    static get api(){return {
        root: null // optional root to append to each route path
        idParam: 'id' // used in creation of apiPathPattern (used by Sync)
        requiresAuthentication: true, // routes default to private, change to make all public
        routes: [
            ['get', '/url-path', 'methodName'],
            ['get', '/url-path-public', 'methodName', {
                requiresAuthentication:false,
                cacheable: true // adds header `X-Is-Cacheable` for use with service worker
            }]
        ]
    }}

    // optionally prevent model from being accessible via API
    get canAccess(){ 
        // if( this.req.user.id != 1 ) return false
        return true
    }

    methodName(req){
        // do something
        return 'the value'
    }
}
```


# SPA

Instead of finishing the express app with a `sendFile('index.html')`, this class can be used. It will generate an HTML file with most of the necessary tags needed for a well formed PWA

This class also provides a mechanism for API classes to alter the response of the SPA index for things like social/share `<meta>` tags

```js
const app = require('express')();
const SPA = require('bui/server/spa')

const api = new API(/*...*/)

new SPA(app, {
    path='/*', 
    requireAuthentication=true, 
    loginPath='/login',
    api, // required if wanting to use `spaIndexHook` hooks

    // html document values
    title: 'My App',
    description='My own nifty PWA SPA',
    
    // defaults
    pwaTitle='', // uses title if empty
    entryJS= '/index.js',
    statusBarColor='black-translucent',
    manifest='/manifest.json',
    viewport='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, viewport-fit=cover, user-scalable=no',
    
    meta='',

    headBeforeEntryJS='', // ex: google analytics
    headAfterEntryJS='', // other JS to load after entryjs

    htmlAttrs='',
    bodyAttrs='',
    body='',

    appleIcon='',
    icons='', // additional icons (favicon, etc)

    // https://web.dev/learn/pwa/enhancements/#splash-screens
    // https://appsco.pe/developer/splash-screens
    splashscreen='',
})
```

## Hooks
API classes can hook into the creation of the SPA index by adding a `async spaIndexHook` method. It will be triggered if `api.root` matches the requested path. Alternatively, a class can specify a custom tester: `spaIndexHookTest(req)`. The response of `spaIndexHookTest` will be passed along to `spaIndexHook()`

`spaIndexHook(spaIndexHookTestResp, spaOpts, req)`

```js
class MyClass {

    /* ... */

    static spaIndexHookTest(req){ return req.path.match(new RegExp('^'+this.api.root+'/([0-9]+)/?'))?.[1] }

    static async spaIndexHook(id, spaOpts, req){
        let myClass = await new this({id}).find()
        spaOpts.title = myClass.attrs.title
    }

}
```