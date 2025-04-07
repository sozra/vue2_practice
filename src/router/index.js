import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入视图组件 (使用懒加载提高性能)
const RouteManagement = () => import(/* webpackChunkName: "route-management" */ '@/views/RouteManagement/Index.vue');
const StationManagement = () => import(/* webpackChunkName: "station-management" */ '@/views/StationManagement/Index.vue');
// 新增工艺路线管理模块
const Mes2RoutePage = () => import(/* webpackChunkName: "mes2-route" */ '@/views/mes2route/index.vue');
const Mes2StationPage = () => import(/* webpackChunkName: "mes2-station" */ '@/views/mes2route/station.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/routes', // 默认重定向到工艺路线列表
  },
  {
    path: '/routes',
    name: 'RouteManagement', // 命名路由，方便跳转
    component: RouteManagement,
    meta: { title: '工艺路线管理' } // 页面标题 (可选)
  },
  {
    // 使用参数 :routeId 来传递工艺路线ID
    path: '/routes/:routeId/stations',
    name: 'StationManagement',
    component: StationManagement,
    props: true, // 将 route params (routeId) 作为 props 注入组件
    meta: { title: '工站管理' } // 动态标题可在组件内设置
  },
  // 新增工艺路线管理路由
  {
    path: '/mes2route',
    name: 'Mes2RoutePage',
    component: Mes2RoutePage,
    meta: { title: '工艺路线管理' }
  },
  {
    path: '/mes2route/:routeId/station',
    name: 'Mes2StationPage',
    component: Mes2StationPage,
    props: true,
    meta: { title: '工站工艺路线' }
  },
  // 可以添加 404 页面等
  // { path: '*', component: NotFoundComponent }
];

const router = new VueRouter({
  mode: 'history', // 使用 history 模式 (需要服务器配置支持) 或 'hash' 模式
  base: process.env.BASE_URL,
  routes,
});

// 可选：全局前置守卫 (例如，用于权限检查或设置页面标题)
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '后台管理系统'; // 设置页面标题
  next();
});


export default router;