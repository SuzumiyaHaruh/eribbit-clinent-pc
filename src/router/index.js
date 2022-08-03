import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout'

const routes = [
  // 一级路由布局
  {
    path: '/',
    name: 'home',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import(/* webpackChunkName: "about" */ '../views/home/index')
      },
      {
        path: '/category/:id',
        component: () => import(/* webpackChunkName: "about" */ '../views/category/index')
      },
      {
        path: '/category/sub/:id',
        component: () => import(/* webpackChunkName: "about" */ '../views/category/Sub')
      },
      {
        path: '/product/:id',
        component: () => import(/* webpackChunkName: "about" */ '../views/goods/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior () {
    return {
      left: 0,
      top: 0
    }
  }
})
export default router
