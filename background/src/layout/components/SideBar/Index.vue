<template>
  <div class="sidebar-container has-logo">
    <Logo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
      <!-- <Sidebar-item /> -->
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import SidebarItem from './SideBarItem.vue'
import Logo from './Logo.vue'
import { useRoute } from 'vue-router'
import { useStore, mapGetters } from 'vuex'

export default defineComponent({
  components: { Logo, SidebarItem },
  // computed: {
  // 	...mapGetters(['sidebar', 'routes'])
  // },
  setup() {
    const store = useStore()
    const route = useRoute()
    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    const isCollapse = computed(() => !store.getters.sidebar.opened)
    // console.log(mapState(['permission']), 'mapState');
    const routes = computed(
      () => store.getters.routes.find((item: any) => item.path === '/').children
    )
    // const r = computed(() => mapGetters(['routes']));
    console.log(mapGetters(['routes']))
    const handleOpen = () => {
      // to do
    }
    const handleClose = () => {
      // to do
    }
    return {
      isCollapse,
      handleOpen,
      handleClose,

      routes,
      activeMenu
    }
  }
})
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
.has-logo{
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  width: 210px
}
</style>
