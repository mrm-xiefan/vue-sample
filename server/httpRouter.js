let express = require('express')
let router = express.Router()
let fs = require('fs')
let path = require('path')
let url = require('url')
let qs = require('querystring')
let logger = require('./logger.js')

router.get('/api/getData', function (req, res, next) {
  let url_parts = url.parse(req.url, true)
// let name = url_parts.query.name
// logger.info('getData:' + name)
  logger.info('getData')

  res.json({error: null, data: {name: "mmmm"}})
})

module.exports = router
