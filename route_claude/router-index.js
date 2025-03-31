// src/router/index.js - 路由配置
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/process-route',
    component: () => import('@/layout/index'),
    meta: { title: '工艺路线管理', icon: 'list' },
    children: [
      {
        path: 'list',
        name: 'ProcessRouteList',
        component: () => import('@/views/process-route/ProcessRouteList'),
        meta: { title: '工艺路线列表' }
      },
      {
        path: 'station/:routeId',
        name: 'StationList',
        component: () => import('@/views/process-route/StationList'),
        meta: { title: '工站列表', activeMenu: '/process-route/list' },
        hidden: true
      }
    ]
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router