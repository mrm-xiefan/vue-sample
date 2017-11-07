import express from 'express'
import fs from 'fs'
import path from 'path'
import url from 'url'
import logger from './logger.js'
import conf from 'config'
import mongo from './mongo.js'

let router = express.Router()

router.get('/getData', (req, res) => {
  let url_parts = url.parse(req.url, true)
  logger.info('begin get:' + JSON.stringify(url_parts.query))

  res.json({error: null, data: "some data"})
})

router.post('/postData', (req, res) => {
  logger.info('begin post:' + JSON.stringify(req.body.params))

  res.json({error: null, data: "insert ok"})
})

router.put('/putData', (req, res) => {
  logger.info('begin put:' + JSON.stringify(req.body.params))

  res.json({error: null, data: "update ok"})
})

router.delete('/deleteData', (req, res) => {
  let url_parts = url.parse(req.url, true)
  logger.info('begin delete:' + JSON.stringify(url_parts.query))

  res.json({error: null, data: "remove ok"})
})

module.exports = router
