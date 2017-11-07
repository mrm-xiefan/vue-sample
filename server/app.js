import log4js from 'log4js'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import conf from 'config'
import http from 'http'
import fs from 'fs'
import url from 'url'
import cookieParser from 'cookie-parser'
import logger from './services/logger.js'
import mongo from './services/mongo.js'
import utils from './services/utils.js'
import httpRouter from './services/httpRouter.js'
import socketRouter from './services/socketRouter.js'
import userService from './services/userService.js'
import dataService from './services/dataService.js'

logger.info('NODE_ENV:', process.env.NODE_ENV)
logger.info('session mode:', conf.session.mode)
logger.info('s3 mode:', conf.s3.mode)

let app = express()
app.set('views', path.join(__dirname, '..', 'dist'))
app.use(bodyParser.json({limit: '2gb'}))
app.use(bodyParser.urlencoded({limit: '2gb', extended: true}))
app.use(log4js.connectLogger(logger))




let allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', conf.cors)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200)
  }
  else {
    next()
  }
}
app.all('*', allowCrossDomain)




import expressSession from 'express-session'
let expressRedisStore = require('connect-redis')(expressSession)
let expressMongoStore = require('connect-mongo')(expressSession)

let store = null
let session = null
if (conf.session.mode == 'mongo') {
  store = new expressMongoStore({
    url: 'mongodb://' + conf.mongo.server + ':' + conf.mongo.port + '/' + conf.mongo.db,
    clear_interval: 60 * 60
  })
  session = expressSession({
    store: store,
    cookie: {
      path: conf.session.path,
      httpOnly: false,
      maxAge: conf.session.cookieMaxAge
    },
    key: conf.session.key,
    secret: conf.session.secret,
    resave: false,
    saveUninitialized: false
  })
}
else {
  store = new expressRedisStore({
    host: conf.session.redisHost,
    port: conf.session.redisPort,
    db: conf.session.redisdb
  })
  session = expressSession({
    store: store,
    cookie: {
      path: conf.session.path,
      httpOnly: false,
      maxAge: conf.session.cookieMaxAge
    },
    key: conf.session.key,
    secret: conf.session.secret,
    resave: false,
    saveUninitialized: false
  })
}
app.use(session)
httpRouter.use(session)




let checkAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    userService.recordLogin(req, (error) => {
      if (error) {
        res.json({error: error, data: null})
      }
      else {
        next()
      }
    })
  } else {
    logger.debug('miss session.')
    res.json({error: 'B900', data: null})
  }
}
app.use('/api', checkAuth, httpRouter)




import AWS from 'aws-sdk'
let s3 = new AWS.S3({signatureVersion: 'v2'})
let inspect = require('eyespect').inspector()
import knox from 'knox'

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




app.post('/uploadFiles', (req, res, next) => {
  logger.info('uploadFiles')
  dataService.uploadFiles(req, (error, list, params) => {
    if (!error) {
      logger.info('upload end: ' + JSON.stringify(list))
      logger.info('params: '+JSON.stringify(params))
      let files = []
      for (let i = 0; i < list.length; i ++) {
        if (conf.s3.mode == 'local') {
          files.push({
            file: conf.endpoint + 'static/upload/' + list[i].folder + '/' + list[i].name,
            thumbnail: list[i].thumbnail? (conf.endpoint + 'static/upload/' + list[i].folder + '/' + list[i].thumbnail): null,
            folder: list[i].folder,
            name: list[i].name,
            type: list[i].type,
            size: list[i].size
          })
        }
        else {
          files.push({
            file: '/static/s3/upload/' + list[i].folder + '/' + list[i].name,
            thumbnail: list[i].thumbnail? ('/static/s3/upload/' + list[i].folder + '/' + list[i].thumbnail): null,
            folder: list[i].folder,
            name: list[i].name,
            type: list[i].type,
            size: list[i].size
          })
        }
      }
      res.json({error: null, data: files})
    }
    else {
      res.json({error: error, data: null})
    }
  })
})




// app.get('/', (req, res) => {})
app.use(express.static(path.join(__dirname, '..', 'dist')))
app.get('/autoLogin', (req, res) => {
  logger.debug('autoLogin:', JSON.stringify(req.session))
  if (!req.session || !req.session.user) {
    res.json({error: null, data: {user: null}})
  }
  else {
    userService.recordLogin(req, (error) => {
      if (error) {
        res.json({error: error, data: null})
      }
      else {
        res.json({error: null, data: {user: req.session.user}})
      }
    })
  }
})
app.get('/manualLogin', (req, res) => {
  let url_parts = url.parse(req.url, true)
  logger.info('manualLogin:' + JSON.stringify(url_parts.query))

  userService.getUser(req, url_parts.query, (error, user) => {
    if (error) {
      res.json({error: error, data: null})
    }
    else {
      logger.info('session:' + JSON.stringify(req.session))
      res.json({error: null, data: {user: user}})
    }
  })
})
app.post('/register', (req, res) => {
  logger.info('register:' + JSON.stringify(req.body.params))

  userService.insertUser(req, req.body.params, (error, user) => {
    if (error) {
      res.json({error: error, data: null})
    }
    else {
      logger.info('session:' + JSON.stringify(req.session))
      res.json({error: null, data: {user: user}})
    }
  })
})
app.get('/logout', (req, res) => {
  logger.debug('logout:', JSON.stringify(req.session))
  if (req.session) {
    req.session.destroy()
  }
  res.json({error: null, data: {}})
})




let server = http.createServer(app)
let onListening = () => {
  let addr = server.address()
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  logger.info('Listening on ' + bind)
}

mongo.init(() => {
  logger.debug('Begin listen...')

  server.listen(conf.port)
  server.on('listening', onListening)

  socketRouter.init(server, store)
})
