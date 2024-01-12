import Views from './views'
import io from 'socket.io-client'

const socket = io('/', {
    // all modern browser support websockets, so dont use any fallbacks
    // https://caniuse.com/#feat=websockets
    transports: ['websocket'],
    query: window._realtimeConnectionQueryData // FIXME: hacky
});

const realtime = {

    socket: socket,

    views: new Views(socket)
}

export default realtime