Realtime (via Socket.io)
=========================

>NOTE: work in progress; subject to change

## Views
Provides an easy way to keep track of views that are opened by clients

```js
// server
import Views from 'server/views'
const io = io();

io.on('connection', socket=>{
    Views.connect(socket)
});
```

```js
// client
import Views from 'client/views'
const socket = io();
const socketViews = new Views(socket)

let view = socketViews.open('view-name')
view.on('change', clients=>{
    console.log(clients.length)
})

// later
socketViews.close(view)
// or
socketViews.close('view-name')
```