<template>
  <aside class="control-sidebar control-sidebar-dark">
    <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
      <li class="active"><a href="#control-sidebar-tab1" data-toggle="tab"><i class="fa fa-home"></i></a></li>
      <li><a href="#control-sidebar-tab2" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane active" id="control-sidebar-tab1">
        <h3 class="control-sidebar-heading">Tab1</h3>
        <ul class="control-sidebar-menu">
          <li>
            <a href="#">
              <i class="menu-icon fa fa-birthday-cake bg-red"></i>
              <div class="menu-info">
                <h4 class="control-sidebar-subheading">link1</h4>
                <p>do some thing</p>
              </div>
            </a>
            <a href="#">
              <i class="menu-icon fa fa-user bg-yellow"></i>
              <div class="menu-info">
                <h4 class="control-sidebar-subheading">link2</h4>
                <p>do some thing</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="tab-pane" id="control-sidebar-tab2">
        <h3 class="control-sidebar-heading">Tab2</h3>
      </div>
    </div>
  </aside>
</template>

<script>
  export default {
    props: ['manager'],
    mounted() {
      if ($.AdminLTE.controlSidebar) {
        $.AdminLTE.controlSidebar.activate()
      }
    }
  }
</script>

<style scoped>

</style>
