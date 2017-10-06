import MongoClient from 'mongodb'
import conf from 'config'
import logger from './logger.js'

class mongo {
  constructor() {
    let self = this
    this.db = null
    MongoClient.connect(conf.mongo.url, (err, mongodb) => {
      if (err) {
        logger.error('Connected correctly to server')
      }
      else {
        self.db = mongodb
      }
    })
  }
  find(collection_name, criteria, projection, callback, page) {
    let skip = 0
    if (page && page > 0) {
      skip = page * conf.mongo.limit
    }
    this.db.collection(collection_name, (outer_error, collection) => {
      if (outer_error) {
        logger.error('find connect error:' + JSON.stringify(outer_error))
        callback('S003', null)
      }
      else {
        let mongoFind = collection.find(criteria, projection)
        mongoFind.count((count_error, count) => {
          if (count_error) {
            logger.error('count error:' + JSON.stringify(count_error))
            callback('S003', null)
          }
          else {
            mongoFind.skip(skip).limit(conf.mongo.limit).toArray((inner_error, list) => {
              if (inner_error) {
                logger.error('find error:' + JSON.stringify(inner_error))
                callback('S003', null)
              }
              else {
                callback(null, list, count)
              }
            })
          }
        })
      }
    })
  }
  insert(collection_name, document, options, callback) {
    this.db.collection(collection_name, (outer_error, collection) => {
      if (outer_error) {
        logger.error('insert connect error:' + JSON.stringify(outer_error))
        callback('S003', null)
      }
      else {
        collection.insert(document, options, (inner_error, result) => {
          if (inner_error) {
            logger.error('insert error:' + JSON.stringify(inner_error))
            callback('S003', null)
          }
          else {
            callback(null, result)
          }
        })
      }
    })
  }
  update(collection_name, query, update, options, callback) {
    this.db.collection(collection_name, (outer_error, collection) => {
      if (outer_error) {
        logger.error('update connect error:' + JSON.stringify(outer_error))
        callback('S003', null)
      }
      else {
        collection.update(query, update, options, (inner_error, result) => {
          if (inner_error) {
            logger.error('update error:' + JSON.stringify(inner_error))
            callback('S003', null)
          }
          else {
            callback(null, result)
          }
        })
      }
    })
  }
  remove(collection_name, query, options, callback) {
    this.db.collection(collection_name, (outer_error, collection) => {
      if (outer_error) {
        logger.error('remove connect error:' + JSON.stringify(outer_error))
        callback('S003', null)
      }
      else {
        collection.remove(query, options, (inner_error, result) => {
          if (inner_error) {
            logger.error('remove error:' + JSON.stringify(inner_error))
            callback('S003', null)
          }
          else {
            callback(null, result)
          }
        })
      }
    })
  }
}

export default new mongo()
