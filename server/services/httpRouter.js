import express from 'express'
import fs from 'fs'
import path from 'path'
import url from 'url'
import logger from './logger.js'
import conf from 'config'
import mongo from './mongo.js'
import dataService from './dataService.js'

let router = express.Router()

router.get('/getData', (req, res) => {
  let url_parts = url.parse(req.url, true)
  logger.info('begin get:' + JSON.stringify(url_parts.query))

  res.json({error: null, data: "some data"})
  // mongo.find(
  //   'users',
  //   {name: url_parts.query.name},
  //   // {sort: {"name": 1}},
  //   {},
  //   (error, result, totalcount) => {
  //     res.json({error: error, data: result})
  //   }
  // )
})

router.post('/postData', (req, res) => {
  logger.info('begin post:' + JSON.stringify(req.body.params))

  res.json({error: null, data: "insert ok"})
  // let now = new Date()
  // now = now.valueOf()
  // mongo.insert(
  //   'users',
  //   {name: req.body.params.name, timestamp: now},
  //   // {multi: true}
  //   {},
  //   (error, result) => {
  //     res.json({error: error, data: result})
  //   }
  // )
})

router.put('/putData', (req, res) => {
  logger.info('begin put:' + JSON.stringify(req.body.params))

  res.json({error: null, data: "update ok"})
  // let now = new Date()
  // now = now.valueOf()
  // mongo.update(
  //   'users',
  //   {name: req.body.params.name},
  //   {$set:{name: req.body.params.name, timestamp: now}},
  //   {upsert: true},
  //   (error, result) => {
  //     res.json({error: error, data: result})
  //   }
  // )
})

router.delete('/deleteData', (req, res) => {
  let url_parts = url.parse(req.url, true)
  logger.info('begin delete:' + JSON.stringify(url_parts.query))

  res.json({error: null, data: "remove ok"})
  // mongo.remove(
  //   'users',
  //   {name: url_parts.query.name},
  //   (error, result) => {
  //     res.json({error: error, data: result})
  //   }
  // )
})

router.post('/uploadFiles', (req, res, next) => {
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

module.exports = router
