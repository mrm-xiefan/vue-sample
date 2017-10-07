<template>
  <div class="content-wrapper">
    <section class="content" v-on:click="closeSide">
      <div>{{manager.controller.currentApp}}</div>
      <div>{{object.sample}}</div>
      <div><button class="btn btn-primary" v-on:click="switchObject">SWITCH_OBJECT</button></div>
    </section>
  </div>
</template>

<script>
  import CONST from '@/store/const.js'
  import manager from '@/store/manager.js'
  import utils from '@/tool/utils.js'

  export default {
    props: ['manager', 'object'],
    mounted() {
      $('body').layout('fix')
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
      // object prop could be changed as this way.
      switchObject(object) {
        // use param(object) comes from template. or use js.
        utils.event.$emit('SWITCH_OBJECT', {sample: "switched"})
      },
      dummyRestGet() {
        let dummydata = {name: "dummy"}
        // for dev: util.restGet('/api/getData', dummydata, true) to get an error end.
        // error handle is done, you just need to do something when response is null.
        let giveMeError = null
        // error type could be 'network' or 'server'
        // giveMeError = 'network'
        util.restGet('/api/getData', {params: "some params"}, dummydata, giveMeError).then(
          response => {
            if (response) {
              console.log(response)
            }
            else {
              // if you want to do some error handle. do it here
            }
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
