<template>
  <header class="main-header">
    <router-link to="/" class="logo">
      <span class="logo-mini"><b>VueS</b></span>
      <span class="logo-lg">VueSample</span>
    </router-link>
    <nav class="navbar navbar-static-top">
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
  import CONST from '@/store/const.js'
  import manager from '@/store/manager.js'
  import utils from '@/tool/utils.js'

  export default {
    props: ['manager'],
    methods: {
      backward() {
        this.$router.go(-1)
      },
      goTop() {
        $('html, body').animate({scrollTop: 0}, 'fast')
      }
    }
  }
</script>

<style scoped>

</style>
