import log4js from 'log4js'
import logger from './logger.js'
import express from 'express'
import mongo from './mongo.js'
import path from 'path'
import bodyParser from 'body-parser'
import conf from 'config'
import http from 'http'
import httpRouter from './httpRouter.js'
import socketRouter from './socketRouter.js'

logger.info('NODE_ENV:', process.env.NODE_ENV)
logger.info('mode:', conf.mode)

let port = conf.port

let app = express()

app.set('views', path.join(__dirname, '..', 'dist'))
app.use(bodyParser.json({limit: '2gb'}))
app.use(bodyParser.urlencoded({limit: '2gb', extended: true}))
app.use(express.static(path.join(__dirname, 'upload')), express.static(path.join(__dirname, '..', 'dist')))
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

mongo.init(() => {
  logger.debug('Begin listen...')

  server.listen(port)
  server.on('listening', onListening)

  socketRouter.run(server)
})



app.get('/upload/*', (req, res) => {
  let url = decodeURI(req.url)
  res.sendFile(path.join(__dirname, url))
})
