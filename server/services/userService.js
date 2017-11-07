import path from 'path'
import logger from './logger.js'
import conf from 'config'
import mongo from './mongo.js'

class userService {
  constructor() {
  }
  recordLogin(req, next) {
    let now = new Date()
    mongo.update(
      'users',
      {_id: req.session.user._id},
      {$set: {udate: now.valueOf()}},
      {multi: false},
      (error, result) => {
        if (error) {
          next(error)
        }
        else {
          req.session.user.udate = now.valueOf()
          next(null)
        }
      }
    )
  }
  insertUser(req, user, next) {
    mongo.find(
      'users',
      {_id: user._id},
      {},
      (error, result) => {
        if (error) {
          next(error)
        }
        else {
          if (result.length <= 0) {
            user.cuser = user._id
            user.uuser = user._id
            let now = new Date()
            user.cdate = now.valueOf()
            user.udate = now.valueOf()
            mongo.insert(
              'users',
              user,
              {},
              (error, inserted) => {
                if (error) {
                  next(error)
                }
                else {
                  req.session.user = inserted.ops[0]
                  next(null, inserted.ops[0])
                }
              }
            )
          }
          else {
            next('B003')
          }
        }
      }
    )
  }
  getUser(req, user, next) {
    mongo.find(
      'users',
      {_id: user._id, password: user.password},
      {},
      (error, result) => {
        if (error) {
          next(error)
        }
        else if (result.length <= 0) {
          next('B002')
        }
        else {
          req.session.user = result[0]
          next(null, result[0])
        }
      }
    )
  }
}

export default new userService()
