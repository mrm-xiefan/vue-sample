import conf from 'config'
import logger from './logger.js'
import mongodb from 'mongodb'

class Mongo {
  constructor() {
  }
  init(next) {
    let self = this
    this.db = null

    let db = new mongodb.Db(conf.mongo.db, new mongodb.Server(conf.mongo.server, conf.mongo.port), {safe: false})
    db.open((error, mongodb) => {
      if (error) {
        logger.error('connect error:' + JSON.stringify(error))
      }
      else {
        self.db = mongodb
        logger.debug('mongo init ok!')
        next()
      }
    })
  }
  find(collection_name, criteria, projection, next, page, shift) {
    let skip = 0
    if (page && page > 0) {
      skip = page * conf.mongo.limit
    }
    if (shift && shift != 0) {
      skip = skip + shift
    }
    if (!this.db) {
      next('S003', null)
      return
    }
    this.db.collection(collection_name, (outer_error, collection) => {
      if (outer_error) {
        logger.error('find connect error:' + JSON.stringify(outer_error))
        next('S003', null)
      }
      else {
        let mongoFind = collection.find(criteria, projection)
        mongoFind.count((count_error, count) => {
          if (count_error) {
            logger.error('count error:' + JSON.stringify(count_error))
            next('S003', null)
          }
          else {
            mongoFind.skip(skip).limit(conf.mongo.limit).toArray((inner_error, list) => {
              if (inner_error) {
                logger.error('find error:' + JSON.stringify(inner_error))
                next('S003', null)
              }
              else {
                next(null, list, count)
              }
            })
          }
        })
      }
    })
  }
  findAll(collection_name, criteria, projection, next) {
    if (!this.db) {
      next('S003', null)
      return
    }
    this.db.collection(collection_name, (outer_error, collection) => {
      if (outer_error) {
        logger.error('findAll connect error:' + JSON.stringify(outer_error))
        next('S003', null)
      }
      else {
        collection.find(criteria, projection).toArray((inner_error, result) => {
          if (inner_error) {
            logger.error('findAll error:' + JSON.stringify(inner_error))
            next('S003', null)
          }
          else {
            next(null, result)
          }
        })
      }
    })
  }
  insert(collection_name, document, options, next) {
    if (!this.db) {
      next('S003', null)
      return
    }
    this.db.collection(collection_name, (outer_error, collection) => {
      if (outer_error) {
        logger.error('insert connect error:' + JSON.stringify(outer_error))
        next('S003', null)
      }
      else {
        collection.insert(document, options, (inner_error, result) => {
          if (inner_error) {
            logger.error('insert error:' + JSON.stringify(inner_error))
            next('S003', null)
          }
          else {
            next(null, result)
          }
        })
      }
    })
  }
  update(collection_name, query, update, options, next) {
    if (!this.db) {
      next('S003', null)
      return
    }
    this.db.collection(collection_name, (outer_error, collection) => {
      if (outer_error) {
        logger.error('update connect error:' + JSON.stringify(outer_error))
        next('S003', null)
      }
      else {
        collection.update(query, update, options, (inner_error, result) => {
          if (inner_error) {
            logger.error('update error:' + JSON.stringify(inner_error))
            next('S003', null)
          }
          else {
            next(null, result)
          }
        })
      }
    })
  }
  remove(collection_name, query, options, next) {
    if (!this.db) {
      next('S003', null)
      return
    }
    this.db.collection(collection_name, (outer_error, collection) => {
      if (outer_error) {
        logger.error('remove connect error:' + JSON.stringify(outer_error))
        next('S003', null)
      }
      else {
        collection.remove(query, options, (inner_error, result) => {
          if (inner_error) {
            logger.error('remove error:' + JSON.stringify(inner_error))
            next('S003', null)
          }
          else {
            next(null, result)
          }
        })
      }
    })
  }
}

export default new Mongo()
