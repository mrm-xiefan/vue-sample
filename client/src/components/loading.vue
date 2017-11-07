<template>
  <div class="wrapper">
    <lockScreen :manager="manager"></lockScreen>
    <messageModal :manager="manager"></messageModal>
  </div>
</template>

<script>
  import CONST from '@/store/const.js'
  import manager from '@/store/manager.js'
  import utils from '@/tool/utils.js'

  import lockScreen from '@/components/parts/lockScreen'
  import messageModal from '@/components/parts/messageModal'
  export default {
    props: ['manager'],
    components: {
      lockScreen: lockScreen,
      messageModal: messageModal
    },
    mounted() {
      let self = this
      let path = this.$route.query.path
      utils.restGet('/autoLogin').then(
        response => {
          if (response) {
            if (response.user) {
              manager.login(response, () => {
                if (path) {
                  self.$router.push({path: path})
                }
                else {
                  self.$router.push({name: CONST.defaultApp})
                }
              })
            }
            else {
              self.$router.push({name: 'login', query: {path: path}})
            }
          }
        }
      )
    }
  }
</script>

<style scoped>

</style>
