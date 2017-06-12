<template>
  <div class="content-wrapper">
    <section class="content">
      <div>{{controller.currentApp}}</div>
      <div v-for="user in users">{{user.name}}</div>
      <div><button class="btn btn-primary" v-on:click="getData">get data</button></div>

      <div class="row">
        <div class="col-md-12">
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">Trend Chart</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
              </div>
            </div>
            <lineChart :trendData="trendData"></lineChart>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="box box-primary detail-table">
            <div class="box-header no-border">
              <h3 class="box-title">白スキッパーシャツ</h3>
            </div>
            <detailTable :trendData="trendData" idx="0"></detailTable>
          </div>
        </div>
        <div class="col-md-6">
          <div class="box box-primary detail-table">
            <div class="box-header no-border">
              <h3 class="box-title">デコラティブ</h3>
            </div>
            <detailTable :trendData="trendData" idx="1"></detailTable>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import manager from '@/store/manager.js'
  import util from '@/common/util.js'
  import lineChart from '@/components/lineChart'
  import detailTable from '@/components/detailTable'
  export default {
    props: ['controller', 'users', 'trendData'],
    mounted: () => {
      if ($.AdminLTE && $.AdminLTE.layout) {
        $.AdminLTE.layout.fix()
      }
    },
    components: {
      lineChart: lineChart,
      detailTable: detailTable
    },
    methods: {
      getData: async () => {
        await util.restGet('/api/getData').then(
          response => {
            manager.trendData.refreshTrendData(response)
          }
        )
      }
    }
  }
</script>

<style scoped>
  .detail-table {
    height: 500px;
    overflow-y: scroll;
  }
</style>
