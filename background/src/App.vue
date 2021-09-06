<template>
  <router-view />
  <!-- <div :class="['wrapper', isCollapse ? 'hideSidebar' : '']">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '210px'">
        <sidebar />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <topbar @reload="handleReload" />
        </el-header>
        <el-main>
          <breadcrumb />
          <div v-if="isRouterAlive">
            <app-main />
          </div>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
