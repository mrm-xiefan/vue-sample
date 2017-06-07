<template>
  <div class="content-wrapper">
    <section class="content">
      <div>{{controller.currentApp}}</div>
      <div v-for="user in users">{{user.name}}</div>
      <button class="btn btn-primary" v-on:click="getData">get data</button>
    </section>
  </div>
</template>

<script>
  import manager from '@/store/manager.js'
  import util from '@/common/util.js'
  export default {
    props: ['controller', 'users'],
    mounted: function () {
      if ($.AdminLTE && $.AdminLTE.layout) {
        $.AdminLTE.layout.fix()
      }
    },
    methods: {
      getData: async function () {
        var dummydata = {error: null, data: {name: "mmmm"}}
        await util.restGet('/api/getData', dummydata).then(
          response => {
            let user = manager.addUser()
            user.rename(response.data.name)
          }
        )
        return new Promise((resolve, reject) => {
          resolve()
        })
      }
    }
  }
</script>

<style scoped>

</style>
