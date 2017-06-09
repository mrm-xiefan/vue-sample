import axios from 'axios/dist/axios.min.js'
import manager from '@/store/manager.js'

class Util {
  constructor() {
    let options = {
      timeout: 120000,
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
  showModal(message, title = 'CONFIRM', type = 'info') {
    if (type == 'info' || type == 'warn') {
      manager.modal.type = type
    }
    else {
      manager.modal.type = 'info'
    }
    manager.modal.title = title
    manager.modal.message = message
    $('#modal-modal').modal()
  }
  async restGet(api, mockData = null, giveMeError = false) {
    var self = this;
    let options = {}
    if (manager.controller.development) {
      const mockAdapter = (config) => {
        return new Promise((resolve, reject) => {
          if (giveMeError) {
            resolve({data: {error: 'S001', data: null}, status: 200})
          } else {
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
        if (response.data.error) {
          self.showModal('error1', 'ERROR', 'warn')
        }
        responseData = response.data
      }
    ).catch(
      error => {
        // if (error.response) {
        //   console.log(error.response.headers);
        // }
        // if (error.request) {
        //   console.log(error.request);
        // }
        // console.log(error.message);
        // console.log(error.config);
        self.showModal('error2', 'ERROR', 'warn')
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