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
    } else {
      manager.modal.type = 'info'
    }
    manager.modal.title = title
    manager.modal.message = message
    $('#modal-modal').modal()
  }
  restGet(api, mockData = {}) {
    let options = {}
    if (manager.controller.development) {
      const mockAdapter = (config) => {
        return new Promise((resolve, reject) => {
          resolve({data: mockData, status: 200 })
        })
      }
      options.adapter = mockAdapter
    }
    this.api.get(api, options).then(
      response => {
        console.log(response.data)
        console.log(response.status)
      }
    ).catch(
      error => {
        if (error.response) {
          console.log(error.response.headers);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
        console.log(error.config);
      }
    )
  }
}

export default new Util()
