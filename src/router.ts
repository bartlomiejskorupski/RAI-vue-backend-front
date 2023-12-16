import * as VueRouter from 'vue-router';
import AuthForm from './components/AuthForm.vue';
import Home from './components/Home.vue';

const routes: VueRouter.RouteRecordRaw[] = [
  { path: '/', component: AuthForm },
  { path: '/home', component: Home },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
});

export default router;
