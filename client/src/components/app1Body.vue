<template>
  <div class="content-wrapper">
    <section class="content" v-on:click="closeSide">
      <div>{{manager.controller.currentApp}}</div>
      <div><button class="btn btn-primary" v-on:click="restGet">REST GET</button></div>
      <div><button class="btn btn-primary" v-on:click="restPost">REST POST</button></div>
      <div><button class="btn btn-primary" v-on:click="restPut">REST PUT</button></div>
      <div><button class="btn btn-primary" v-on:click="restDelete">REST DELETE</button></div>
      <div><button class="btn btn-primary" v-on:click="showMessage('B001')">MESSAGE</button></div>
      <div><button class="btn btn-primary" v-on:click="upload">UPLOAD</button></div>
      <div v-for="file in files">
        <img :src="file.thumbnail" v-if="file.thumbnail">
        <img src="../assets/file.png" v-else>
      </div>
    </section>
  </div>
</template>

<script>
  import CONST from '@/store/const.js'
  import manager from '@/store/manager.js'
  import utils from '@/tool/utils.js'

  export default {
    props: ['manager', 'files'],
    mounted() {
      if ($.AdminLTE && $.AdminLTE.layout) {
        $.AdminLTE.layout.fix()
      }
    },
    methods: {
      closeSide() {
        if ($('.control-sidebar').hasClass('control-sidebar-open')) {
          $('.control-sidebar').removeClass('control-sidebar-open')
        }
        if (!$('body').hasClass('sidebar-collapse')) {
          $('body').addClass('sidebar-collapse')
        }
      },
      showMessage(code) {
        utils.event.$emit('SHOW_MESSAGE', code)
      },
      restGet() {
        utils.restGet('/api/getData', {name: 'name1'}).then(
          response => {
            if (response) {
              console.log(JSON.stringify(response))
            }
          }
        )
      },
      restPost() {
        utils.restPost('/api/postData', {name: 'name1'}).then(
          response => {
            if (response) {
              console.log(JSON.stringify(response))
            }
          }
        )
      },
      restPut() {
        utils.restPut('/api/putData', {name: 'name1'}).then(
          response => {
            if (response) {
              console.log(JSON.stringify(response))
            }
          }
        )
      },
      restDelete() {
        utils.restDelete('/api/deleteData', {name: 'name1'}).then(
          response => {
            if (response) {
              console.log(JSON.stringify(response))
            }
          }
        )
      },
      upload() {
        utils.event.$emit('SHOW_UPLOAD', (data) => {
          utils.event.$emit('ADD_FILES', data)
        })
      }
    }
  }
</script>

<style scoped>
  section.content {
    height: 100%;
  }
</style>
