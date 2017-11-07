<template>
  <router-view :manager="manager"></router-view>
</template>

<script>
  import CONST from '@/store/const.js'
  import manager from '@/store/manager.js'
  import utils from '@/tool/utils.js'

  export default {
    props: ['manager']
  }
</script>

<style scoped>

</style>
