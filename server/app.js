import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
import conf from 'config'
import http from 'http'
import log4js from 'log4js'
import logger from './logger.js'
import httpRouter from './httpRouter.js'
logger.info('NODE_ENV: ', process.env.NODE_ENV)
let port = conf.port

let app = express()

app.set('views', path.join(__dirname, '..', 'dist'))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(favicon(path.join(__dirname, '..', 'favicon.ico')))
app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(log4js.connectLogger(logger))
app.use(httpRouter)

let server = http.createServer(app)

function onListening() {
  let addr = server.address()
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  logger.info('Listening on ' + bind)
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
      logger.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
