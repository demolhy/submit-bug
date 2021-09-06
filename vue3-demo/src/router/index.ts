import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/view/home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '首页',
    component: Home,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
