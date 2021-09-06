import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import Home from '@/view/home.vue'
import Layout from '@/layout/Index.vue'
import BlankLayout from '@/layout/BlankLayout.vue'
import Home from '@/view/home.vue'
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: 'home',
    // meta: { title: '首页', icon: 'el-icon-s-home' },
    children: [
      {
        path: '/home',
        component: Home,
        name: 'home',
        meta: { title: '首页', icon: 'el-icon-s-home', hidden: false }
      },
      {
        path: '/data',
        component: BlankLayout,
        name: 'data',
        redirect: 'table',
        meta: { title: '数据', icon: 'el-icon-s-data' },
        children: [
          {
            path: '/table',
            name: 'table',
            meta: { title: '问题收集', icon: 'el-icon-s-data', hidden: false },
            component: () => import('@/view/Table.vue')
          },
          {
            path: '/table-detail',
            name: 'table-detail',
            meta: { title: '问题收集详情', icon: 'el-icon-s-data', hidden: true },
            component: () => import('@/view/TableDetail.vue')
          },
        ]
      }
    ]
  },
  {
    path: '/login',
    name: '登陆',
    component: () => import('@/view/login/index.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
