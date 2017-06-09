<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <div class="user-panel">
        <div class="pull-left image">
          <img src="static/img/avatar.png" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>someone's name</p>
          Administrator
        </div>
      </div>
      <ul class="sidebar-menu">
        <li class="header">MAIN NAVIGATION</li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-files-o"></i>
            <span>Visual Dashboard</span>
          </a>
          <ul class="treeview-menu">
            <li>
              <router-link to="/">
                <i class="fa fa-circle-o"></i> app1
              </router-link>
            </li>
            <li>
              <router-link to="/app2">
                <i class="fa fa-circle-o"></i> app2
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/">
            <i class="fa fa-th"></i> <span>app1</span>
          </router-link>
        </li>
        <li>
          <router-link to="/app2">
            <i class="fa fa-th"></i> <span>app2</span>
          </router-link>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script>
  export default {
    props: ['controller'],
    mounted: function () {
      if ($.AdminLTE.controlSidebar) {
        $.AdminLTE.controlSidebar.activate()
      }
    },
    updated: function () {
      if ($.AdminLTE.controlSidebar) {
        $.AdminLTE.controlSidebar.activate();
      }
    }
  }
</script>

<style scoped>

</style>
