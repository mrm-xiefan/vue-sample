import axios from 'axios/dist/axios.min.js'
import manager from '@/store/manager.js'
import CONST from '@/common/const.js'

class Util {
  constructor() {
    let options = {
      timeout: CONST.httpTimeout,
      // withCredentials: true,
      // transformRequest: [(data) => JSON.stringify(data.data)]
    }
    // if (manager.controller.development) {
    //   options.baseURL = 'http://localhost:3000/',
    //   options.withCredentials = true
    // }
    this.api = axios.create(options)
  }
  getDomain() {
    let resurl = location.href.replace(/#\/.*/, "")
    return resurl
  }
  showModal(code) {
    manager.modal.type = CONST.type[code] || 'warn'
    manager.modal.title = CONST.title[code] || 'ERROR'
    manager.modal.message = CONST.message[code] || 'Unknown error!'
    $('#modal-modal').modal()
  }
  async restGet(api, mockData = null, giveMeError = null) {
    var self = this
    let options = {}
    if (manager.controller.development) {
      const mockAdapter = (config) => {
        return new Promise((resolve, reject) => {
          if (giveMeError == 'network') {
            reject({data: null, status: 400})
          }
          else if (giveMeError == 'server') {
            resolve({data: {error: 'S002', data: null}, status: 200})
          }
          else {
            resolve({data: {error: null, data: mockData}, status: 200})
          }
        })
      }
      options.adapter = mockAdapter
    }

    let responseData = null
    // server response should be {error: errorcode, data: json}
    await this.api.get(api, options).then(
      response => {
        // console.log(response.data)
        // console.log(response.status)

        // server error
        if (response.data.error) {
          self.showModal(response.data.error)
        }
        responseData = response.data
      }
    ).catch(
      error => {
        // if (error.response) {
        //   console.log(error.response.headers)
        // }
        // if (error.request) {
        //   console.log(error.request)
        // }
        // console.log(error.message)
        // console.log(error.config)

        // network error
        self.showModal('S001')
        responseData = {error: 'S001', data: null}
      }
    )

    return new Promise((resolve, reject) => {
      if (responseData.error) {
        // ever thing has done for error, so not reject.
        // but data is null.
        resolve(null)
        // reject(responseData)
      } else {
        resolve(responseData.data)
      }
    })
  }
}

export default new Util()
