import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import StationPage from '@/views/StationPage.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'MainPage', component: MainPage },
  { path: '/station/:id', name: 'StationPage', component: StationPage },
];

const router = new VueRouter({
  routes,
});

export default router;