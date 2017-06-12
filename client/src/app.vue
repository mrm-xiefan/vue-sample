<template>
  <router-view
    :modal="modal"
    :controller="controller"
    :users="users"
    :trendData="trendData"
  ></router-view>
</template>

<script>
  export default {
    props: ['modal', 'controller', 'users', 'trendData']
  }
</script>

<style>
</style>
