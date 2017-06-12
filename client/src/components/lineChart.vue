<template>
  <div class="box-body chart-responsive">
    <!--<h3>Line Chart</h3>-->
    <div v-if="trendData.data.length != 0">
      <line-chart
        id="line1" :data="trendData.data" xkey="weekidx" :ykeys=trendData.keys resize="true"
        :labels="trendData.labels" :line-colors="trendData.colors"
        grid="true" grid-text-weight="bold" :hoverCallback="hovered">
      </line-chart>
    </div>
    <div v-else>No Data</div>
  </div>
</template>

<script>
  import Raphael from 'raphael/raphael'
  global.Raphael = Raphael
  import {LineChart} from 'vue-morris'
  import manager from '@/store/manager.js'
  export default {
    props: ['trendData'],
    components: {LineChart},
    methods: {
      hovered: (index, options, content, row) => {
        manager.trendData.refreshDetail(index)
        return [content, row._x, row._ymax]
      }
    }
  }
</script>

<style scoped>

</style>
