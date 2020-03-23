Realtime (via Socket.io)
=========================

## Sync

```js
// server
// More documentation needed

const Sync = require('bui/server/realtime/server/sync')
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
import sync from 'bui/server/realtime/client/sync'

export class Book {

    get url(){ return '/api/book'+this.id }

    constructor(){
        this.realtimeSync = sync(this.url, this)
    }

    // this will be called when the model gets sync data
    onSync(data){
    }
}

let myModel = new MyModel()

// must call `connect` to begin keeping the model in sync
myModel.realtimeSync.connect()

// ... later the connection can be closed to stop syncing
myModel.realtimeSync.close()
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