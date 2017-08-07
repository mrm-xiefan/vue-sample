<template>
  <div class="user-panel">
    <div class="pull-left image">
      <img src="../assets/avatar.png" class="img-circle" alt="User Image">
    </div>
    <div class="pull-left info">
      <p>someone's name</p>
      <a href="#" v-if="manager.socket && manager.socket.connected"><i class="fa fa-circle text-success"></i> Online</a>
      <a href="#" v-else><i class="fa fa-circle text-danger"></i> Offline</a>
      <span class="small" v-if="manager.controller.development && manager.socket">{{manager.socket.id}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['manager']
  }
</script>

<style scoped>
.small {
  font-size: 60%;
}
</style>
