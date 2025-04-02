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

router.beforeEach((to, from, next) => {
  // 获取目标路由的标题
  const title = to.meta.title;
  
  if (title) {
    document.title = title;
  } else {
    // 如果没有设置标题，可以使用默认标题或路由名称
    document.title = to.name || '默认标题';
  }
  
  next();
});

export default router