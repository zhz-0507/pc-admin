import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login-register/login.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "login" */ '../views/home-show/index.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "login" */ '../views/login-register/register.vue'),
  },
  {
    path: '/forgetStepOne',
    name: 'forgetStepOne',
    component: () => import(/* webpackChunkName: "login" */ '../views/login-register/forget-firstStep.vue'),
  },
  {
    path: '/forgetStepTwo',
    name: 'forgetStepTwo',
    component: () => import(/* webpackChunkName: "login" */ '../views/login-register/forget-secondStep.vue'),
  },
  {
    path: '/adminUser',
    name: 'adminUser',
    component: () => import(/* webpackChunkName: "login" */ '../views/admin-user/index.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router
