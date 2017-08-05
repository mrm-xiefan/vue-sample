<template>
  <div class="modal fade in" id="modal-modal" tabindex="-1" role="dialog" aria-labelledby="modalModalLabel" aria-hidden="true" data-show="true" data-keyboard="true" data-backdrop="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
          <h4 :class="{'modal-title': true, 'text-blue': manager.modal.type == 'info', 'text-red': manager.modal.type == 'warn'}"><i :class="{'fa': true, 'fa-info-circle': manager.modal.type == 'info', 'fa-warning': manager.modal.type == 'warn'}" style="margin-right: 3px"></i>{{manager.modal.title}}</h4>
        </div>
        <div :class="{'modal-body': true, 'text-blue': manager.modal.type == 'info', 'text-red': manager.modal.type == 'warn'}">
          {{manager.modal.message}}
        </div>
        <div class="modal-footer">
          <button type="button" :class="{'btn': true, 'btn-primary': manager.modal.type == 'info', 'btn-danger': manager.modal.type == 'warn', 'pull-right': true}" data-dismiss="modal">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['manager']
  }
</script>

<style scoped>

</style>
