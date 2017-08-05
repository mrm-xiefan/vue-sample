<template>
  <div class="wrapper">
    <appHeader :manager="manager"></appHeader>
    <appSideMenu :manager="manager"></appSideMenu>
    <app1Body :manager="manager"></app1Body>
    <appFooter :manager="manager"></appFooter>
    <modal :manager="manager"></modal>
    <appControlPanel :manager="manager"></appControlPanel>
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
    props: ['manager'],
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
