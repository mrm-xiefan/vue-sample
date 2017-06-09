<template>
  <div>
    <router-view
      v-bind:modal="modal"
      v-bind:controller="controller"
      v-bind:users="users"
    ></router-view>
  </div>
</template>

<script>
  export default {
    props: ['modal', 'controller', 'users']
  }
</script>

<style>
</style>
