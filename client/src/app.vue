<template>
  <router-view :manager="manager"></router-view>
</template>

<script>
  import 'socket.io-client/dist/socket.io.js'
  export default {
    props: ['manager'],
    mounted: () => {
      let socket = null
      // if (manager.controller.development) {
      //   socket = io(CONST.developLocal, {path: 'socket.io'})
      // } else {
      //   socket = io(location.host, {path: 'socket.io'})
      // }
    }
  }
</script>

<style>
</style>
