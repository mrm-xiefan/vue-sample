<template>
  <div class="content-wrapper">
    <section class="content">
      <div>{{controller.currentApp}}</div>
      <div v-for="user in users">{{user.name}}</div>
    </section>
  </div>
</template>

<script>
  export default {
    props: ['controller', 'users'],
    mounted: function () {
      if ($.AdminLTE && $.AdminLTE.layout) {
        $.AdminLTE.layout.fix()
      }
    },
  }
</script>

<style scoped>

</style>
