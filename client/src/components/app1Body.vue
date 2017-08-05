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
        await util.restGet('/api/getData', {test: 'something'}).then(
          response => {
            if (response) {
              util.showModal('B001', response)
            }
          }
        )
      },
      restPost: async () => {
        await util.restPost('/api/postData', {test: 'something post'}).then(
          response => {
            if (response) {
              util.showModal('B001', response)
            }
          }
        )
      },
      restPut: async () => {
        await util.restPut('/api/putData', {test: 'something put'}).then(
          response => {
            if (response) {
              util.showModal('B001', response)
            }
          }
        )
      },
      restDelete: async () => {
        await util.restDelete('/api/deleteData', {test: 'something delete'}).then(
          response => {
            if (response) {
              util.showModal('B001', response)
            }
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
