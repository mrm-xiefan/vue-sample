<template>
  <div :class="{'lock-screen-hide': locker == 'unlock', 'lock-screen-show': locker == 'lock'}">
    <i class="fa fa-refresh fa-spin waiting-icon"></i>
  </div>
</template>

<script>
  import CONST from '@/store/const.js'
  import manager from '@/store/manager.js'
  import utils from '@/tool/utils.js'

  export default {
    props: ['manager'],
    data() {
      return {
        locker: 'unlock'
      }
    },
    mounted() {
      let self = this
      utils.event.$on('LOCK_SCREEN', (locker) => {
        self.locker = locker
      })
    },
    beforeDestroy() {
      utils.event.$off('LOCK_SCREEN')
    }
  }
</script>

<style scoped>
  .waiting-icon {
    margin: 25% 45%;
    font-size: 600%;
  }
  .lock-screen-show {
    background-color: rgba(70, 66, 66, 0.49);
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    animation: show .2s linear 0s;
    -webkit-animation: show .2s linear 0s;
  }
  @-webkit-keyframes show {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @keyframes show {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  .lock-screen-hide {
    display: none;
  }
  </style>
