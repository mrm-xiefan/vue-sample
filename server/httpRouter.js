import express from 'express'
import fs from 'fs'
import path from 'path'
import url from 'url'
import qs from 'querystring'
import logger from './logger.js'
import conf from 'config'
import mongo from './mongo.js'

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

let router = express.Router()
router.all('*', allowCrossDomain)

router.get('/api/getData', (req, res) => {
  let url_parts = url.parse(req.url, true)
  logger.info('getData:' + JSON.stringify(url_parts.query))

  mongo.find(
    'users',
    {name: url_parts.query.name},
    // {sort: {"name": 1}},
    {},
    (error, result) => {
      res.json({error: error, data: result})
    }
  )
})

router.post('/api/postData', (req, res) => {
  logger.info('begin post:' + JSON.stringify(req.body.params))

  let now = new Date()
  now = now.valueOf()
  mongo.insert(
    'users',
    {name: req.body.params.name, timestamp: now},
    // {multi: true}
    {},
    (error, result) => {
      res.json({error: error, data: result})
    }
  )
})

router.put('/api/putData', (req, res) => {
  logger.info('begin put:' + JSON.stringify(req.body.params))

  let now = new Date()
  now = now.valueOf()
  mongo.update(
    'users',
    {name: req.body.params.name},
    {$set:{name: req.body.params.name, timestamp: now}},
    {upsert: true},
    (error, result) => {
      res.json({error: error, data: result})
    }
  )
})

router.delete('/api/deleteData', (req, res) => {
  let url_parts = url.parse(req.url, true)
  logger.info('begin delete:' + JSON.stringify(url_parts.query))

  mongo.remove(
    'users',
    {name: url_parts.query.name},
    (error, result) => {
      res.json({error: error, data: result})
    }
  )
})

module.exports = router
