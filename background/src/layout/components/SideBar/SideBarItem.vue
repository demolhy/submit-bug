<template>
  <el-menu
    :unique-opened="true"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    text-color="#333"
    active-text-color="#409eff"
    router
    :collapse="isCollapse"
  >

    <template v-if="item.children == null">
      <el-menu-item :key="item.path" :index="item.path">
        <template #title>
          <i :class="item.meta.icon"></i>
          {{ item.meta.title }}
        </template>
      </el-menu-item>
    </template>
    <!--父级菜单-->
    <el-submenu v-else :index="item.path" style="text-align: left">
      <template #title>
        <i :class="item.meta.icon"></i>
        {{ item.meta.title }}
      </template>
      <template v-for="child in item.children">
        <SidebarItem
          v-if="child.children && child.children.length > 0"
          :key="child.path"
          :item="child"
        />
        <el-menu-item v-else-if="!child.meta.hidden" :key="child.path" :index="child.path">
          <i :class="child.icon"></i>
          {{ child.meta.title }}
        </el-menu-item>
      </template>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent, computed, ref } from 'vue';
// import path from 'path-browserify'
// const path = require('path')

export default defineComponent({
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const isCollapse = ref<boolean>(false)
    const url = computed(() => {
      console.log('props:', window.location.href.split('/'))
      return props.item
    })
    return {
      url,
      isCollapse
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  // margin-bottom: 3px;
  display: inline-block;
  vertical-align: top;
}
.el-menu {
  border-right: none;
}
</style>
