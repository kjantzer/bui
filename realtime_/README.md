!! DEPRECATED
=================
See `server/realtime`

Realtime (via Socket.io)
=========================

>NOTE: work in progress; subject to change

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