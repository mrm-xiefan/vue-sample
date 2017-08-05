<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <div class="user-panel">
        <div class="pull-left image">
          <img src="../assets/avatar.png" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>someone's name</p>
          Administrator
        </div>
      </div>
      <ul class="sidebar-menu">
        <li class="header">MAIN NAVIGATION</li>
        <li :class="{'treeview': true, 'active': manager.controller.currentApp == 'app1' || manager.controller.currentApp == 'app2'}">
          <a href="#">
            <i class="fa fa-files-o"></i>
            <span>app group</span>
          </a>
          <ul class="treeview-menu">
            <li :class="{'active': manager.controller.currentApp == 'app1'}">
              <router-link to="/">
                <i class="fa fa-circle-o"></i> app1
              </router-link>
            </li>
            <li :class="{'active': manager.controller.currentApp == 'app2'}">
              <router-link to="/app2">
                <i class="fa fa-circle-o"></i> app2
              </router-link>
            </li>
          </ul>
        </li>
        <li :class="{'active': manager.controller.currentApp == 'app1'}">
          <router-link to="/">
            <i class="fa fa-th"></i> <span>app1</span>
          </router-link>
        </li>
        <li :class="{'active': manager.controller.currentApp == 'app2'}">
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
    props: ['manager'],
    mounted: () => {
      if ($.AdminLTE.controlSidebar) {
        $.AdminLTE.controlSidebar.activate()
      }
    },
    updated: () => {
      if ($.AdminLTE.controlSidebar) {
        $.AdminLTE.controlSidebar.activate()
      }
    }
  }
</script>

<style scoped>

</style>
