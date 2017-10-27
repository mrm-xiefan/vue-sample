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
import AWS from 'aws-sdk'
let s3 = new AWS.S3({signatureVersion: 'v2'})
let inspect = require('eyespect').inspector()
import knox from 'knox'

logger.info('NODE_ENV:', process.env.NODE_ENV)
logger.info('mode:', conf.mode)

let port = conf.port

let app = express()

app.set('views', path.join(__dirname, '..', 'dist'))
app.use(bodyParser.json({limit: '2gb'}))
app.use(bodyParser.urlencoded({limit: '2gb', extended: true}))
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



// app.get('/', (req, res) => {})
app.use(express.static(path.join(__dirname, 'upload')), express.static(path.join(__dirname, '..', 'dist')))

app.get('/static/*', (req, res) => {
  let url = decodeURI(req.url)
  if (url.indexOf('/static/s3') == 0) {
    let client = knox.createClient({
      key: conf.s3.key,
      secret: conf.s3.secret,
      bucket: conf.s3.bucket
    })
    let s3path = url.substring(11, url.length)
    client.getFile(s3path, (err, s3res) => {
      if (err) {
        logger.error(err)
        res.send(404, 'Not found')
        return
      }
      s3res.pipe(res)
      s3res.on('error', (s3err) => {
        inspect(s3err, 'error downloading file from s3')
      })
      s3res.on('progress', (data) => {
        inspect(data, 's3 download progress')
      })
      s3res.on('end', () => {
        inspect(s3path, 'piped file to remote client successfully at s3 path')
      })
    })
  }
  else if (url.indexOf('/static/upload') == 0) {
    url = url.replace('/static/', '/')
    res.sendFile(path.join(__dirname, url))
  }
  else {
    res.sendFile(path.join(__dirname, '..', 'dist', url))
  }
})
