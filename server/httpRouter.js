import express from 'express'
import fs from 'fs'
import path from 'path'
import url from 'url'
import qs from 'querystring'
import logger from './logger.js'
// import mysqlManager from './mysqlManager.js'

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', ['http://localhost:8000'])
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200)
  }
  else {
    next()
  }
}

let router = express.Router()
router.all('*', allowCrossDomain)

router.get('/api/getData', function(req, res) {
  let url_parts = url.parse(req.url, true)
  logger.info('getData:' + JSON.stringify(url_parts.query))

  res.json({error: null, data: 'ssss'})
})

router.post('/api/postData', function(req, res) {
  logger.info('begin post:' + JSON.stringify(req.body.params))
  
  res.json({error: null, data: 'ok'})
})

router.put('/api/putData', function(req, res) {
  logger.info('begin put:' + JSON.stringify(req.body.params))
  
  res.json({error: null, data: 'oksss'})
})

router.delete('/api/deleteData', function(req, res) {
  logger.info('begin delete:' + JSON.stringify(req.body.params))
  
  res.json({error: null, data: 'deleokde'})
})

module.exports = router
