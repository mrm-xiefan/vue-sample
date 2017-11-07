<template>
  <div :class="{'lock-screen-hide': locker == 'unlock', 'lock-screen-show': locker == 'lock'}">
    <div class="load-animation">
      <div class="bar bar1"></div>
      <div class="bar bar2"></div>
      <div class="bar bar3"></div>
      <!-- <div class="bar bar4"></div>
      <div class="bar bar5"></div> -->
    </div>
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
  .lock-screen-show {
    background-color: rgba(70, 70, 70, 0.1);
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    animation: show .1s linear 0s;
    -webkit-animation: show .1s linear 0s;
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

  /* loading animation */
  .load-animation {
    position: fixed;
    top: calc(50% - 40px);
    left: calc(50% - 38px);
    padding: 26px 0 25px;
    width: 80px;
    text-align: center;
    background: #605ca8;
  }
  .load-animation div {
    display: inline-block;
    margin: 0 2px;
    width: 7px;
    height: 20px;
    background-color: #fff;
    -webkit-animation: animation5-bar 1s infinite;
    animation: animation5-bar 1s infinite;
  }

  .load-animation .bar1 {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }
  .load-animation .bar2 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }
  .load-animation .bar3 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  .load-animation .bar4 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  .load-animation .bar5 {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }

  @keyframes animation5-bar {
    20% {transform: scaleY(2);}
  }
</style>
