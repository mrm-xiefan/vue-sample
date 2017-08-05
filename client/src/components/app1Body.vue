<template>
  <div class="content-wrapper">
    <section class="content">
      <div>{{manager.controller.currentApp}}</div>
      <div v-for="user in manager.users">{{user.name}}</div>
      <div><button class="btn btn-primary" v-on:click="restGet">REST GET</button></div>
      <div><button class="btn btn-primary" v-on:click="restPost">REST POST</button></div>
      <div><button class="btn btn-primary" v-on:click="restPut">REST PUT</button></div>
      <div><button class="btn btn-primary" v-on:click="restDelete">REST DELETE</button></div>
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
      restGet: async () => {
        await util.restGet('/api/getData', {name: 'name1'}).then(
          response => {
            if (response) {
              console.log(JSON.stringify(response))
            }
          }
        )
      },
      restPost: async () => {
        await util.restPost('/api/postData', {name: 'name1'}).then(
          response => {
            if (response) {
              console.log(JSON.stringify(response))
            }
          }
        )
      },
      restPut: async () => {
        await util.restPut('/api/putData', {name: 'name1'}).then(
          response => {
            if (response) {
              console.log(JSON.stringify(response))
            }
          }
        )
      },
      restDelete: async () => {
        await util.restDelete('/api/deleteData', {name: 'name1'}).then(
          response => {
            if (response) {
              console.log(JSON.stringify(response))
            }
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
