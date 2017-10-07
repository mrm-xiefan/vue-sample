<template>
  <div class="content-wrapper">
    <section class="content" v-on:click="closeSide">
      <div>{{manager.controller.currentApp}}</div>
      <div><button class="btn btn-primary" v-on:click="restGet">REST GET</button></div>
      <div><button class="btn btn-primary" v-on:click="restPost">REST POST</button></div>
      <div><button class="btn btn-primary" v-on:click="restPut">REST PUT</button></div>
      <div><button class="btn btn-primary" v-on:click="restDelete">REST DELETE</button></div>
      <div><button class="btn btn-primary" v-on:click="showMessage('B001')">MESSAGE</button></div>
      <div><button class="btn btn-primary" v-on:click="upload">UPLOAD</button></div>
      <div style="overflow: hidden;" v-for="file in files">
        <div class="asset-box">
          <div class="asset-img" v-if="file.getType() == 'image'">
            <img class="resize-picture" :src="file.getThumbnail()"></img>
          </div>
          <div class="asset-media" v-else-if="file.getType() == 'video'">
            <!-- <video v-bind:src="file.file" width="100%" controls="controls"> -->
              <img class="resize-picture" :src="file.getThumbnail()"></img>
            <!-- </video> -->
          </div>
          <div class="asset-media" v-else-if="file.getType() == 'audio'">
            <!-- <audio :src="file.file" controls="controls"> -->
              <img class="resize-picture" :src="file.getThumbnail()"></img>
            <!-- </audio> -->
          </div>
          <div class="asset-img" v-else>
            <img class="resize-picture" :src="file.getThumbnail()"></img>
          </div>
          <div class="asset-info">
            <div class="asset-header">
              <a :href="file.file" :download="file.name" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i> {{file.name}}</a>
            </div>
            <div class="asset-size text-muted">
              {{file.getSize()}}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import CONST from '@/store/const.js'
  import manager from '@/store/manager.js'
  import utils from '@/tool/utils.js'

  import File from '@/store/file.js'
  export default {
    props: ['manager'],
    data() {
      return {
        files: []
      }
    },
    mounted() {
      $('body').layout('fix')
    },
    methods: {
      closeSide() {
        if ($('.control-sidebar').hasClass('control-sidebar-open')) {
          $('.control-sidebar').removeClass('control-sidebar-open')
        }
        if (!$('body').hasClass('sidebar-collapse')) {
          $('body').addClass('sidebar-collapse')
        }
      },
      showMessage(code) {
        utils.event.$emit('SHOW_MESSAGE', code)
      },
      restGet() {
        utils.restGet('/api/getData', {name: 'name1'}).then(
          response => {
            if (response) {
              console.log(JSON.stringify(response))
            }
          }
        )
      },
      restPost() {
        utils.restPost('/api/postData', {name: 'name1'}).then(
          response => {
            if (response) {
              console.log(JSON.stringify(response))
            }
          }
        )
      },
      restPut() {
        utils.restPut('/api/putData', {name: 'name1'}).then(
          response => {
            if (response) {
              console.log(JSON.stringify(response))
            }
          }
        )
      },
      restDelete() {
        utils.restDelete('/api/deleteData', {name: 'name1'}).then(
          response => {
            if (response) {
              console.log(JSON.stringify(response))
            }
          }
        )
      },
      upload() {
        let self = this
        utils.event.$emit('SHOW_UPLOAD', (data) => {
          for (let i = 0; i < data.length; i ++) {
            self.files.push(new File(data[i]))
          }
        })
      }
    }
  }
</script>

<style scoped>
  section.content {
    height: 100%;
  }
  .asset-box {
    width: 200px;
    height: auto;
    margin: 0px 8px 15px 0px;
    padding: 0px;
    background: #f4f4f4;
  }
  .asset-img {
    width: auto;
    height: auto;
    margin: 0px;
    padding: 0px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    position: relative;
    background: #e8e9e9;
  }
  .asset-media {
    width: auto;
    height: auto;
    margin: 0px;
    padding: 37px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    position: relative;
    background: #e8e9e9;
  }
  .asset-info {
    padding: 10px 15px;
    overflow: hidden;
  }
  .asset-info p {
    margin-bottom: 0;
    line-height: 1.3;
  }
  .asset-info .asset-header {
    word-break: break-all;
  }
  .asset-info p.asset-name {
    margin-bottom: 3px;
    font-size: 15px;
    font-weight: 100;
  }
  .asset-info .asset-size {
    padding-left: 0px;
    color: #aaa;
    font-size: 11px;
    font-weight: 100;
  }
  .asset-info p.asset-date,
  .asset-info p.asset-code {
    font-size: 11px;
    color: #757575;
  }
  .asset-info .mailbox-attachment-name {
    font-weight: 100;
  }

  .resize-picture {
    display: block;
    width: 100%;
    max-width: 400px;
    height: auto;
    margin: auto;
  }
  .asset-header-cell {
    display: table-cell;
    margin: 0px;
    padding: 10px 0px 10px 0px;
    text-align: center;
    font-size: 14px;
    width: 50%;
  }
</style>
