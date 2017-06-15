import mysql from 'mysql'
import conf from 'config'
import logger from './logger.js'

class mysqlManager {
  constructor() {
  }
  getData(next) {
    if (conf.data == 'real') {
      logger.debug('getData')
      this.getConnection((error, connection) => {
        if (error) {
          next(error)
        } else {
          //connection.query('SELECT 1 + 1 AS solution', (error, results) => {
          logger.debug('connection end')
          connection.end((error) => {
            if (error) {
              logger.error(error)
            }
          })
          next(null, {})
        }
      })
    } else {
      logger.debug('dummy data.')
      next(null, {})
    }
  }
  getConnection(next) {
    logger.debug('getConnection')
    let connection = mysql.createConnection({
      host: conf.mysql.host,
      port: conf.mysql.port,
      user: conf.mysql.user,
      password: conf.mysql.password,
      database: conf.mysql.database,
      timezone: conf.mysql.timezone
    })
    connection.connect((error) => {
      if (error) {
        logger.error(error)
        next("S002", null)
      } else {
        logger.debug('gotConnection')
        next(null, connection)
      }
    })
  }
}

export default new mysqlManager()
