<template>
  <div class="wrapper">
    <appHeader :manager="manager"></appHeader>
    <appSideMenu :manager="manager"></appSideMenu>
    <app2Body :manager="manager"></app2Body>
    <appFooter :manager="manager"></appFooter>
    <modal :manager="manager"></modal>
    <appControlPanel :manager="manager"></appControlPanel>
    <div class="control-sidebar-bg"></div>
  </div>
</template>

<script>
  import appHeader from '@/components/appHeader'
  import appSideMenu from '@/components/appSideMenu'
  import app2Body from '@/components/app2Body'
  import appFooter from '@/components/appFooter'
  import modal from '@/components/modal'
  import appControlPanel from '@/components/appControlPanel'
  export default {
    props: ['manager'],
    components: {
      appHeader: appHeader,
      appSideMenu: appSideMenu,
      app2Body: app2Body,
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
