import mysql from 'mysql'
import conf from 'config'
import logger from './logger.js'

class mysqlManager {
  constructor() {
  }
  getData() {
    if (conf.mode == 'real') {
      logger.debug('getData')
      let connection = this.getConnection()
      logger.debug('gotConnection!')
      connection.query('SELECT 1 + 1 AS solution', (error, results) => {
        logger.debug('query end')
        if (error) {

        } else {

        }
      })
      logger.debug('connection end')
      connection.end()
      logger.debug('connection ended')
    } else {
      logger.debug('dummy data.')
    }
  }
  getConnection() {
    logger.debug('getConnection')
    let connection = mysql.createConnection({
      host: conf.mysql.host,
      port: conf.mysql.port,
      user: conf.mysql.user,
      password: conf.mysql.password,
      database: conf.mysql.database,
      timezone: conf.mysql.timezone
    })
    connection.connect(error => {
      logger.debug('connected')
      if (error) {

      } else {

      }
    })
    return connection
  }
}

export default new mysqlManager()
