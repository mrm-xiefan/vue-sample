<template>
  <div class="modal fade in" id="modal-modal" tabindex="-1" role="dialog" aria-labelledby="modalModalLabel" aria-hidden="true" data-show="true" data-keyboard="true" data-backdrop="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
          <h4 v-bind:class="{'modal-title': true, 'text-blue': modal.type == 'info', 'text-red': modal.type == 'warn'}"><i v-bind:class="{'fa': true, 'fa-info-circle': modal.type == 'info', 'fa-warning': modal.type == 'warn'}" style="margin-right: 3px"></i>{{modal.title}}</h4>
        </div>
        <div v-bind:class="{'modal-body': true, 'text-blue': modal.type == 'info', 'text-red': modal.type == 'warn'}">
          {{modal.message}}
        </div>
        <div class="modal-footer">
          <button type="button" v-bind:class="{'btn': true, 'btn-primary': modal.type == 'info', 'btn-danger': modal.type == 'warn', 'pull-right': true}" data-dismiss="modal">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['modal']
  }
</script>

<style scoped>

</style>
