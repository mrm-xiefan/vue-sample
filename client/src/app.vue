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
        manager.socket = io(CONST.developLocal)
      }
      else {
        manager.socket = io(location.host)
      }
      manager.socket.on('connect', () => {
        utils.socket = manager.socket
        if (manager.oldsocket != null && manager.oldsocket != manager.socket.id) {
          utils.socketEmit('reinit')
        }
        manager.oldsocket = manager.socket.id
      })
      manager.socket.on('disconnect', () => {
        console.log('disconnected')
      })
      manager.socket.on('reinited', () => {
        console.log('reinited')
      })
    }
  }
</script>

<style>
</style>
