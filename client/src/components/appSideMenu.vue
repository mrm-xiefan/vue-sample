<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <div class="user-panel">
        <div class="pull-left image">
          <img src="../assets/avatar.png" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>{{manager.user._id}}</p>
          <router-link to="/logout" class="text-red"><i class="glyphicon glyphicon-log-out"></i> Logout</router-link>
        </div>
      </div>
      <ul id='side-menu-tree' class="sidebar-menu" data-widget="tree">
        <li class="header">MAIN NAVIGATION</li>
        <li :class="{'treeview': true, 'active': manager.controller.currentApp == 'app1' || manager.controller.currentApp == 'app2'}">
          <a href="#">
            <i class="fa fa-files-o"></i>
            <span>app group</span>
          </a>
          <ul class="treeview-menu">
            <li :class="{'active': manager.controller.currentApp == 'app1'}">
              <router-link to="/app1">
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
          <router-link to="/app1">
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
  import CONST from '@/store/const.js'
  import manager from '@/store/manager.js'
  import utils from '@/tool/utils.js'

  export default {
    props: ['manager'],
    mounted() {
      $('#side-menu-tree').tree()
    },
    updated() {
      this.$nextTick(() => {
        $('#side-menu-tree').tree()
      })
    }
  }
</script>

<style scoped>
  .small {
    font-size: 60%;
  }
</style>
