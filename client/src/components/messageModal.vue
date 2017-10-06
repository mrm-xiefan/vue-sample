<template>
  <div class="modal fade in" id="message-modal" tabindex="-1" role="dialog" aria-labelledby="messageModalLabel" aria-hidden="true" data-show="true" data-keyboard="true" data-backdrop="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
          <h4 :class="{'modal-title': true, 'text-blue': type == 'info', 'text-danger': type == 'warn'}"><i :class="{'fa': true, 'fa-info-circle': type == 'info', 'fa-warning': type == 'warn'}" style="margin-right: 3px"></i>{{title}}</h4>
        </div>
        <div :class="{'modal-body': true, 'text-blue': type == 'info', 'text-danger': type == 'warn'}">
          {{message}}
        </div>
        <div class="modal-footer">
          <button type="button" :class="{'btn': true, 'btn-primary': type == 'info', 'btn-danger': type == 'warn', 'pull-right': true}" data-dismiss="modal">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CONST from '@/store/const.js'
  import manager from '@/store/manager.js'
  import utils from '@/tool/utils.js'

  export default {
    props: ['manager'],
    data() {
      return {
        type: '',
        title: '',
        message: ''
      }
    },
    created() {
      let self = this
      utils.event.$on('SHOW_MESSAGE', (code) => {
        self.type = CONST.type[code] || 'warn'
        self.title = CONST.title[code] || 'ERROR'
        self.message = CONST.message[code] || 'Unknown error!'
        $('#message-modal').modal()
      })
    }
  }
</script>

<style scoped>

</style>
