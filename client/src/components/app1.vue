<template>
  <div class="wrapper">
    <lockScreen :manager="manager"></lockScreen>
    <appHeader :manager="manager"></appHeader>
    <appSideMenu :manager="manager"></appSideMenu>
    <app1Body :manager="manager"></app1Body>
    <appFooter :manager="manager"></appFooter>
    <messageModal :manager="manager"></messageModal>
    <uploadModal :manager="manager"></uploadModal>
    <appControlPanel :manager="manager"></appControlPanel>
    <div class="control-sidebar-bg"></div>
  </div>
</template>

<script>
  import CONST from '@/store/const.js'
  import manager from '@/store/manager.js'
  import utils from '@/tool/utils.js'

  import lockScreen from '@/components/parts/lockScreen'
  import appHeader from '@/components/appHeader'
  import appSideMenu from '@/components/appSideMenu'
  import app1Body from '@/components/app1Body'
  import appFooter from '@/components/appFooter'
  import messageModal from '@/components/messageModal'
  import uploadModal from '@/components/parts/uploadModal'
  import appControlPanel from '@/components/appControlPanel'
  export default {
    props: ['manager'],
    components: {
      lockScreen: lockScreen,
      appHeader: appHeader,
      appSideMenu: appSideMenu,
      app1Body: app1Body,
      appFooter: appFooter,
      messageModal: messageModal,
      uploadModal: uploadModal,
      appControlPanel: appControlPanel
    },
    created() {
      utils.event.$on('SOCKET_INITIALIZE', () => {
        utils.socketEmit('enterLobby', {})
      })
    },
    mounted() {
      utils.socketEmit('enterLobby', {})
    },
  }
</script>

<style scoped>
  .wrapper {
    height: auto !important
  }
</style>
