<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <userPanel :manager="manager"></userPanel>
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
  import userPanel from '@/components/userPanel'
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
    },
    components: {
      userPanel: userPanel
    }
  }
</script>

<style scoped>

</style>
