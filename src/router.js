import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 自动导入路由
function importAll(r) {
  return r.keys().reduce((routes, key) => {
    const component = r(key).default
    const name = key.split('/').pop().split('.')[0]
    const path = `/${name.toLowerCase()}`
    const route = { path, name, component }

    // 如果是目录，则递归导入子目录中的路由
    if (component && component.isDirectory) {
      route.children = importAll(r(key))
    }

    return [...routes, route]
  }, [])
}

const routes = importAll(require.context('./pages', true, /\.vue$/))

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router