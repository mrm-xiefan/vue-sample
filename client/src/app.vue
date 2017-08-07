<template>
  <router-view :manager="manager"></router-view>
</template>

<script>
  import CONST from '@/common/const.js'
  import manager from '@/store/manager.js'
  export default {
    props: ['manager'],
    mounted: () => {
      if (manager.controller.development) {
        manager.socket = io(CONST.developLocal)
      } else {
        manager.socket = io(location.host)
      }
      manager.socket.on('connect', () => {
        console.log('connected')
      })
      manager.socket.on('disconnect', () => {
        console.log('disconnected')
      })
    }
  }
</script>

<style>
</style>
