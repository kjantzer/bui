const IO = require('socket.io');
const Views = require('./views')
const Client = require('./client')

const io = IO()

io.on('connection', socket=>{  
    new Client(io, socket)
    Views.connect(io, socket)
});

module.exports = io