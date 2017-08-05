<template>
  <div class="content-wrapper">
    <section class="content">
      <div>{{manager.controller.currentApp}}</div>
      <div v-for="user in manager.users">{{user.name}}</div>
      <div><button class="btn btn-primary" v-on:click="getData">get data</button></div>
    </section>
  </div>
</template>

<script>
  import manager from '@/store/manager.js'
  import util from '@/common/util.js'
  export default {
    props: ['manager'],
    mounted: () => {
      if ($.AdminLTE && $.AdminLTE.layout) {
        $.AdminLTE.layout.fix()
      }
    },
    methods: {
      getData: async () => {
        var dummydata = {name: "ttss"}
        // for dev: util.restGet('/api/getData', dummydata, true) to get an error end.
        // error handle is done, you just need to do something when response is null.
        var giveMeError = null
        // let's set an error when add 4th user.
        // error type could be 'network' or 'server'
        if (manager.users.length >= 3) {
          giveMeError = 'network'
        }
        await util.restGet('/api/getData', {}, dummydata, giveMeError).then(
          response => {
            if (response) {
              let user = manager.addUser()
              user.rename(response.name)
            }
            else {
              // if you want to do some error handle. do it here
              manager.users.splice(0, manager.users.length)
            }
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
