<template>
  <div class="wrapper">
    <lockScreen :manager="manager"></lockScreen>
    <appHeader :manager="manager"></appHeader>
    <appSideMenu :manager="manager"></appSideMenu>
    <app2Body :manager="manager" :object="object"></app2Body>
    <appFooter :manager="manager"></appFooter>
    <messageModal :manager="manager"></messageModal>
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
  import app2Body from '@/components/app2Body'
  import appFooter from '@/components/appFooter'
  import messageModal from '@/components/parts/messageModal'
  import appControlPanel from '@/components/appControlPanel'
  export default {
    props: ['manager'],
    data() {
      return {
        object: {sample: "init object"}
      }
    },
    components: {
      lockScreen: lockScreen,
      appHeader: appHeader,
      appSideMenu: appSideMenu,
      app2Body: app2Body,
      appFooter: appFooter,
      messageModal: messageModal,
      appControlPanel: appControlPanel
    },
    created() {
      let self = this
      utils.event.$on('SOCKET_INITIALIZE', () => {
        utils.socketEmit('enterChatRoom', {})
      })
      utils.event.$on('SWITCH_OBJECT', (object) => {
        self.object.sample = object.sample
      })
    },
    mounted() {
      utils.socketEmit('enterChatRoom', {})
    },
  }
</script>

<style scoped>
  .wrapper {
    height: auto !important
  }
</style>
