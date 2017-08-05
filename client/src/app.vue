<template>
  <router-view :manager="manager"></router-view>
</template>

<script>
  export default {
    props: ['manager']
  }
</script>

<style>
</style>
