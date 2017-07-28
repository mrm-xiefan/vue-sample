import log4js from 'log4js'
import logger from './logger.js'
logger.info('NODE_ENV: ', process.env.NODE_ENV)
import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
import conf from 'config'
import http from 'http'
import httpRouter from './httpRouter.js'
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

let onListening = function() {
  let addr = server.address()
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  logger.info('Listening on ' + bind)
}

server.listen(port)
server.on('listening', onListening)
