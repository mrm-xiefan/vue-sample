<template>
  <div class="wrapper">
    <appHeader :controller="controller"></appHeader>
    <appSideMenu :controller="controller"></appSideMenu>
    <app1Body :controller="controller" :users="users" :trendData="trendData"></app1Body>
    <appFooter></appFooter>
    <modal :modal="modal"></modal>
    <appControlPanel :controller="controller"></appControlPanel>
    <div class="control-sidebar-bg"></div>
  </div>
</template>

<script>
  import appHeader from '@/components/appHeader'
  import appSideMenu from '@/components/appSideMenu'
  import app1Body from '@/components/app1Body'
  import appFooter from '@/components/appFooter'
  import modal from '@/components/modal'
  import appControlPanel from '@/components/appControlPanel'
  export default {
    props: ['modal', 'controller', 'users', 'trendData'],
    components: {
      appHeader: appHeader,
      appSideMenu: appSideMenu,
      app1Body: app1Body,
      appFooter: appFooter,
      modal: modal,
      appControlPanel: appControlPanel
    }
  }
</script>

<style scoped>
  .wrapper {
    height: auto !important
  }
</style>
