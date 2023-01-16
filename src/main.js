import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router';
// import reactInput from './components/test_Reactive_Input.vue'
// import wmsWorkOrderSendMaterials from './components/H093/wmsWorkOrderSendMaterials.vue'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);


const routes = [
  { path: '/reactInput', component: () => import('./components/test_Reactive_Input.vue') },
  { path: '/echart', component: () => import('./components/test_echart.vue') },
  { path: '/wmsWorkOrderSendMaterials', component: () => import('./components/H093/wmsWorkOrderSendMaterials.vue') }
]

const router = new VueRouter({
  mode: 'history',
  routes // (缩写) 相当于 routes: routes
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
