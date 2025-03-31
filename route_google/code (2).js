import Vue from 'vue';
import Router from 'vue-router';
import ProcessRouteList from '@/views/ProcessRouteList.vue';
import ProcessStationList from '@/views/ProcessStationList.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // 或者 'hash'
  routes: [
    {
      path: '/',
      redirect: '/process-routes' // 默认重定向到工艺路线列表
    },
    {
      path: '/process-routes',
      name: 'ProcessRouteList',
      component: ProcessRouteList
    },
    {
      // 使用 :routeId 参数来传递工艺路线ID
      path: '/process-stations/:routeId/:routeName?', // routeName 可选，方便在工站页面显示
      name: 'ProcessStationList',
      component: ProcessStationList,
      props: true // 将路由参数自动设置为组件的 props
    }
  ]
});