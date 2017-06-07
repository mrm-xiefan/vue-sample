<template>
  <div class="wrapper">
    <appHeader v-bind:controller="controller"></appHeader>
    <appSideMenu v-bind:controller="controller"></appSideMenu>
    <app2Body v-bind:controller="controller" v-bind:users="users"></app2Body>
    <appFooter></appFooter>
    <appControlPanel v-bind:controller="controller"></appControlPanel>
    <div class="control-sidebar-bg"></div>
  </div>
</template>

<script>
  import appHeader from '@/components/appHeader'
  import appSideMenu from '@/components/appSideMenu'
  import app2Body from '@/components/app2Body'
  import appFooter from '@/components/appFooter'
  import appControlPanel from '@/components/appControlPanel'
  export default {
    props: ['modal', 'controller', 'users'],
    components: {
      appHeader: appHeader,
      appSideMenu: appSideMenu,
      app2Body: app2Body,
      appFooter: appFooter,
      appControlPanel: appControlPanel
    }
  }
</script>

<style scoped>

</style>
