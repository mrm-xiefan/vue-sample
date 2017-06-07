<template>
  <div class="wrapper">
    <appHeader v-bind:controller="controller"></appHeader>
    <appSideMenu v-bind:controller="controller"></appSideMenu>
    <app1Body v-bind:controller="controller" v-bind:users="users"></app1Body>
    <appFooter></appFooter>
    <modal v-bind:modal="modal"></modal>
    <appControlPanel v-bind:controller="controller"></appControlPanel>
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
    props: ['modal', 'controller', 'users'],
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
