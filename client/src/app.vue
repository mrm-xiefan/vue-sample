<template>
  <router-view :manager="manager"></router-view>
</template>

<script>
  import CONST from '@/store/const.js'
  import manager from '@/store/manager.js'
  import utils from '@/tool/utils.js'

  import io from 'socket.io-client/dist/socket.io.js'
  export default {
    props: ['manager'],
    mounted() {
      if (manager.controller.cors) {
        manager.socket = io(CONST.developHost, {path: CONST.socketpath})
      }
      else {
        manager.socket = io(location.host, {path: CONST.socketpath})
      }
      manager.socket.on('connect', () => {
        utils.socket = manager.socket
        if (manager.oldsocket != null && manager.oldsocket != manager.socket.id) {
          utils.socketEmit('reinit', {oldsocket: manager.oldsocket})
        }
        manager.oldsocket = manager.socket.id
        utils.event.$emit('SOCKET_INITIALIZE')
      })
      manager.socket.on('disconnect', () => {
        utils.event.$emit('SHOW_MESSAGE', 'S005')
      })
      manager.socket.on('processError', (error) => {
        utils.event.$emit('SHOW_MESSAGE', error)
      })
      manager.socket.on('reinited', () => {
        utils.event.$emit('SOCKET_INITIALIZE')
        utils.event.$emit('SHOW_MESSAGE', 'I001')
      })
    }
  }
</script>

<style>
</style>
