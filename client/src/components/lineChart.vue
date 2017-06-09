<template>
  <div>
    <h3>Line Chart</h3>
    <div v-if="trendData.data.length != 0">
      <line-chart
        id="line1" :data="trendData.data" xkey="year" ykeys='["a", "b"]' resize="true"
        :labels="trendData.labels" :line-colors="trendData.colors"
        grid="true" grid-text-weight="bold">
      </line-chart>
    </div>
    <div v-else>No Data</div>
  </div>
</template>

<script>
  import Raphael from 'raphael/raphael'
  global.Raphael = Raphael
  import {LineChart} from 'vue-morris'
  export default {
    props: ['trendData'],
    components: {LineChart}
  }
</script>

<style scoped>

</style>
