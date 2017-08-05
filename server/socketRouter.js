import conf from 'config'
import logger from './logger.js'

class socketRouter {
  constructor() {
    this.io = null
  }
  run(server, session, store) {
    let self = this
    self.io = require('socket.io')(server, {path: conf.websocket.path})
    // self.io.set('heartbeat interval', 1000)
    // self.io.set('heartbeat timeout', 5000)

    // self.io.use(function(socket, next) {
    //   userService.getUserInfoBySocket(socket, store, next)
    // })
    self.io.sockets.on('connection', function(socket) {
      logger.info("connected:" + socket.id)
    })
  }
}

export default new socketRouter()



// // sending to sender-client only
// socket.emit('message', "this is a test");

// // sending to all clients, include sender
// io.emit('message', "this is a test");

// // sending to all clients except sender
// socket.broadcast.emit('message', "this is a test");

// // sending to all clients in 'game' room(channel) except sender
// socket.broadcast.to('game').emit('message', 'nice game');

// // sending to all clients in 'game' room(channel), include sender
// io.in('game').emit('message', 'cool game');

// // sending to sender client, only if they are in 'game' room(channel)
// socket.to('game').emit('message', 'enjoy the game');

// // sending to all clients in namespace 'myNamespace', include sender
// io.of('myNamespace').emit('message', 'gg');

// // sending to individual socketid
// socket.broadcast.to(socketid).emit('message', 'for your eyes only');
