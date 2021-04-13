Realtime (via Socket.io)
=========================

Realtime functionality requires both client and server-side logic and is stored in `realtime/client` and `realtime/server` respectively.

## Default Server Initialization

```js
// server
// creates default `socket.io` connection and enables "Views"
const io = require('bui/realtime/server')

// then attach to node http server
io.attach(server)
```

```js
// client
import realtime from 'bui/realtime/client'
console.log(realtime.socket)
```


## Sync

```js
// server
// More documentation needed

const Sync = require('bui/realtime/server/sync')
let sync = new Sync(io)

class Book {
    constructor(attrs){
        this.id = attrs.id
    }

    update(attrs){
        // update model...

        // then sync the data to all clients
        this.syncData(attrs)

        // if you want to control which clients in the sync room you can like this:
        this.syncData(attrs, socket=>{
            if( socket.id == 'someid' )
                return true
            return false
        })
    }

    // this method is added by Sync
    // syncData(data, toClients){}

    // the getter will defined by Sync unless you explicitly create it
    // can be a single string or array of strings
    // get syncPath(){ return '/sync/path' }

    // optionally implement these methods to take action
    syncClientDidJoin(socket){}
    syncClientDidLeave(socket){}
}

sync.add('/api/book/:id', Book)
```

```js
// client
import sync from 'bui/realtime/client/sync'

export class Book {

    get url(){ return '/api/book'+this.id }

    constructor(){
        // super() // make sure to call this if subclassing
        this.realtimeSync = sync(this.url, this)
    }

    // this will be called when the model gets sync data
    onSync(sync){
    }
}

let myModel = new MyModel()

// must call `connect` to begin keeping the model in sync
myModel.realtimeSync.connect()

// ... later the connection can be closed to stop syncing
myModel.realtimeSync.close()
```

### Backbone Collection Sync
A basic Backbone.Collection sync function is implemeted and can be used
```js
import {syncBackboneCollection} from 'bui/realtime/client/sync'

class {
    onSync(sync){
        syncBackboneCollection.call(this, sync)
    }
}

```


## Views
Provides an easy way to keep track of views that are opened by clients

```js
// server
const IO = require('socket.io')
const Views = require('server/views')
const io = IO();

io.on('connection', socket=>{
    Views.connect(socket)
});

// Dont forget to:
// io.attach(server)
```

```js
// client
import io from 'socket.io-client'
import Views from 'client/views'

const socket = io('/', {
    transports: ['websocket'], // https://caniuse.com/#feat=websockets
});

const socketViews = new Views(socket)

// open a view and watch for changes
let view = socketViews.open('view-name')
view.on('change', clients=>{
    console.log(clients.length)
})

// later
socketViews.close(view)
// or
socketViews.close('view-name')

// get info about open views (exact match or regex)
let info = await socketViews.info('view-name') // {view info}
let info = await socketViews.info('^view-') // [{view info}]
```


## Realtime Users
Tracks and shows which clients/users are looking at a particular view. Users are removed from a view when the element is removed from the DOM

> Note: uses "Views" (see above) to track users

```js
import realtime from 'bui/realtime/client'
import ReatimeUsers from 'bui/realtime/client/realtime-users'

RealtimeUsers.realtime = realtime
RealtimeUsers.currentUserID = 1 // 
```

```html
<b-realtime-users key="my-uniq-view"></b-realtime-users>
<b-realtime-users key="my-uniq-view" test></b-realtime-users>
```

> Note: adding `test` attribute will show current user and all duplicate user clients