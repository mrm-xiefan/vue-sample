import logger from './logger.js'
import conf from 'config'
import mongo from './mongo.js'
import utils from './utils.js'
import Client from './socketClient.js'
import Room from './socketRoom.js'

class RoomService {
  constructor() {
    this.lobby = new Room('lobby')
    this.chatRoom = new Room('chatroom')
  }
  spy() {
    logger.debug('')
    this.lobby.spy()
    this.chatRoom.spy()
    logger.debug('')
  }
  login(socket) {
    let client = new Client(socket)
    this.enterLobby(client)
    return client
  }
  enterLobby(client) {
    return this.lobby.enter(client)
  }
  enterChatRoom(client) {
    return this.chatRoom.enter(client)
  }
  recovery(client, params) {
    this.lobby.recovery(client, params)
    this.chatRoom.recovery(client, params)
  }
  logout(client) {
    this.lobby.exit(client)
    this.chatRoom.exit(client)
    client.destroy()
    client = null
  }
}

export default new RoomService()
