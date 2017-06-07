let express = require('express')
let path = require('path')
let favicon = require('serve-favicon')
let bodyParser = require('body-parser')
let http = require('http')
let httpRouter = require('./server/httpRouter.js')
// let socketRouter = require('./service/socketRouter.js').socketRouter
let app = express()

let port = null
if (process.env.NODE_ENV == 'development') {
  port = 3000
}
else {
  port = 80
}

app.set('views', path.join(__dirname, 'dist'))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(favicon(path.join(__dirname, 'static', 'img', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(httpRouter)

let server = http.createServer(app)

function onListening() {
  let addr = server.address()
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  console.log('Listening on ' + bind)
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
