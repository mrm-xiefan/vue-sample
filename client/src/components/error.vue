<template>
  <div class="fullscreen">
    <div class="error-page">
      <h2 class="headline text-red">401</h2>
      <div class="error-content">
        <h3><i class="fa fa-warning text-red"></i> Oops! Authentication failed!</h3>
        <p>
          We missed your cookies.
          You may <router-link to="/">login</router-link> again. Or try to contact system manager in any way.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import CONST from '@/store/const.js'
  import manager from '@/store/manager.js'
  import utils from '@/tool/utils.js'

  export default {
    props: ['manager'],
    created() {
      manager.logout()
    }
  }
</script>

<style scoped>
  .fullscreen {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 50px;
  }
</style>
