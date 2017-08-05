<template>
  <router-view :manager="manager"></router-view>
</template>

<script>
  import 'socket.io-client/dist/socket.io.js'
  export default {
    props: ['manager'],
    // mounted: () => {
    //   console.log(location.host)
    //   let socket = io('localhost:3000', {path: 'socket.io'})
    // }
  }
</script>

<style>
</style>
