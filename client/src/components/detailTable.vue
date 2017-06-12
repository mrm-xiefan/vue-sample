<template>
  <div class="box-body table-responsive no-padding">
    <table class="table table-hover" v-if="trendData.detailIdx != null">
      <thead>
      <tr>
        <th v-for="column in trendData.columns">
          {{column}}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="hover-row" v-for="article in trendData.details[idx].data[trendData.detailIdx]" v-on:click="openURL(article.url)">
        <td>
          {{article.date}}
        </td>
        <td>
          {{article.title}}
        </td>
        <td>
          {{article.author}}
        </td>
        <td>
          {{article.like}}
        </td>
        <td>
          {{article.url}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import manager from '@/store/manager.js'
  export default {
    props: ['trendData', 'idx'],
    methods: {
      openURL: (url) => {
        url="http://"+url
        window.open(url, '_blank')
      }
    }
  }
</script>

<style scoped>
  .hover-row {
    cursor: pointer;
  }
</style>
