import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
// import './assets/components.css'
import VueRouter from 'vue-router';
// import reactInput from './components/test_Reactive_Input.vue'
// import wmsWorkOrderSendMaterials from './components/H093/wmsWorkOrderSendMaterials.vue'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);


const routes = [
  { path: '', component: () => import('./components/vueuse.vue') },
  { path: '/jsx2', component: () => import('./components/jsx2.jsx') },
  { path: '/jsx', component: () => import('./components/jsx.jsx') },
  { path: '/testJSX', component: () => import('./components/testJSX.vue') },
  { path: '/vueuse', component: () => import('./components/vueuse.vue') },
  { path: '/testGlow3', component: () => import('./components/testGlow3.vue') },
  { path: '/testGlow2', component: () => import('./components/testGlow2.vue') },
  { path: '/testGlow', component: () => import('./components/testGlow.vue') },
  { path: '/glowyHover', component: () => import('./components/glowyHover.vue') },
  { path: '/chartMap', component: () => import('./components/chartMap.vue') },
  // { path: '/gantt', component: () => import('./components/gantt.vue') },
  { path: '/manyTabs', component: () => import('./components/manyTabs.vue') },
  { path: '/print', component: () => import('./components/print.vue') },
  { path: '/edit2', component: () => import('./components/edit2.vue') },
  { path: '/editableTable', component: () => import('./components/editableTable.vue') },
  { path: '/testpdf', component: () => import('./components/testPdf.vue') },
  { path: '/tableCellMerge', component: () => import('./components/tableCellMerge.vue') },
  { path: '/query', component: () => import('./components/query.vue') },
  { path: '/progressGroup', component: () => import('./components/progressGroup.vue') },
  { path: '/progress', component: () => import('./components/progress.vue') },
  { path: '/testProgress', component: () => import('./components/testProgress.vue') },
  { path: '/reactInput', component: () => import('./components/test_Reactive_Input.vue') },
  { path: '/echart', component: () => import('./components/test_echart.vue') },
  { path: '/wmsWorkOrderSendMaterials', component: () => import('./components/H093/wmsWorkOrderSendMaterials.vue') },
  { path: '/lang', component: () => import('./components/lang.vue') },
  { path: '/element', component: () => import('./components/element.vue') },
  { path: '/element2', component: () => import('./components/element2.vue') },
  { path: '/switch', component: () => import('./components/switch.vue') },
  { path: '/filterCharts', component: () => import('./components/filterCharts.vue') },
]

const router = new VueRouter({
  mode: 'history',
  routes // (缩写) 相当于 routes: routes
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
