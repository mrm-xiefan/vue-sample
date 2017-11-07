<template>
  <div class="modal fade in" id="message-modal" tabindex="-1" role="dialog" aria-labelledby="messageModalLabel" aria-hidden="true" data-show="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 :class="{'modal-title': true, 'text-blue': (type == 'info') || (type == 'select'), 'text-danger': type == 'warn'}"><i :class="{'fa': true, 'fa-info-circle': type == 'info', 'fa-question-circle': type == 'select', 'fa-warning': type == 'warn'}" style="margin-right: 3px"></i>{{title}}</h4>
        </div>
        <div :class="{'modal-body': true, 'text-blue': (type == 'info') || (type == 'select'), 'text-danger': type == 'warn'}">
          {{message}}
        </div>
        <div class="modal-footer">
          <button type="button" :class="{'btn': true, 'btn-primary': type == 'info', 'btn-danger': type == 'warn', 'pull-right': true}" data-dismiss="modal" v-show="type != 'select'" v-on:click="excuteYes">OK</button>
          <button type="button" :class="{'btn': true, 'btn-primary': type == 'select', 'btn-danger': type == 'warn'}" data-dismiss="modal" v-show="type == 'select'" v-on:click="excuteYes">YES</button>
          <button type="button" :class="{'btn': true, 'btn-primary': type == 'select', 'btn-danger': type == 'warn'}" data-dismiss="modal" v-show="type == 'select'" v-on:click="excuteNo">NO</button>
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
        message: '',
        yes: null,
        no: null
      }
    },
    mounted() {
      let self = this
      utils.event.$on('SHOW_MESSAGE', (code, yes, no) => {
        self.type = CONST.type[code] || 'warn'
        self.title = CONST.title[code] || 'ERROR'
        self.message = CONST.message[code] || 'Unknown error!'
        self.yes = yes
        self.no = no
        $('#message-modal').modal('show')
      })
    },
    beforeDestroy() {
      utils.event.$off('SHOW_MESSAGE')
    },
    methods: {
      excuteYes() {
        if (this.yes) {
          this.yes()
        }
      },
      excuteNo() {
        if (this.no) {
          this.no()
        }
      }
    }
  }
</script>

<style scoped>
  #message-modal {
    z-index: 9999;
  }
</style>
