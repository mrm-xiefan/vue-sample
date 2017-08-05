import MongoClient from 'mongodb'
import conf from 'config'
import logger from './logger.js'

class mongo {
  constructor() {
    let self = this
    this.db = null
    MongoClient.connect(conf.mongo.url, function(err, mongodb) {
      if (err) {
        logger.error("Connected correctly to server")
      } else {
        self.db = mongodb
      }
    })
  }
  find(collection_name, criteria, projection, callback) {
    this.db.collection(collection_name, function(outer_error, collection) {
      if (outer_error) {
        logger.error("find connect error:" + JSON.stringify(outer_error))
        callback("S003", null)
      } else {
        collection.find(criteria, projection).toArray(function(inner_error, list) {
          if (inner_error) {
            logger.error("find error:" + JSON.stringify(inner_error))
            callback("S003", null)
          } else {
            callback(null, list)
          }
        })
      }
    })
  }
  insert(collection_name, document, options, callback) {
    this.db.collection(collection_name, function(outer_error, collection) {
      if (outer_error) {
        logger.error("insert connect error:" + JSON.stringify(outer_error))
        callback("S003", null)
      } else {
        collection.insert(document, options, function(inner_error, result) {
          if (inner_error) {
            logger.error("insert error:" + JSON.stringify(inner_error))
            callback("S003", null)
          } else {
            callback(null, result)
          }
        })
      }
    })
  }
  update(collection_name, query, update, options, callback) {
    this.db.collection(collection_name, function(outer_error, collection) {
      if (outer_error) {
        logger.error("update connect error:" + JSON.stringify(outer_error))
        callback("S003", null)
      } else {
        collection.update(query, update, options, function(inner_error, result) {
          if (inner_error) {
            logger.error("update error:" + JSON.stringify(inner_error))
            callback("S003", null)
          } else {
            callback(null, result)
          }
        })
      }
    })
  }
  remove(collection_name, query, options, callback) {
    this.db.collection(collection_name, function(outer_error, collection) {
      if (outer_error) {
        logger.error("remove connect error:" + JSON.stringify(outer_error))
        callback("S003", null)
      } else {
        collection.remove(query, options, function(inner_error, result) {
          if (inner_error) {
            logger.error("remove error:" + JSON.stringify(inner_error))
            callback("S003", null)
          } else {
            callback(null, result)
          }
        })
      }
    })
  }
}

export default new mongo()
