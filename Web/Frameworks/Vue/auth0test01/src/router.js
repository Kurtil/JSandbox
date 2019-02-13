import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import { isLoggedIn } from './utils/auth';

Vue.use(Router)

function requireAuth(to, from , next) {
  if (!isLoggedIn()) {
    next({
      path: "/notauthorized"
    });
  } else {
    next();
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/secret',
      name: 'secret',
      beforeEnter: requireAuth,
      component: () => import('./views/Secret.vue')
    },
    {
      path: '/callback',
      name: 'callback',
      component: () => import('./views/Callback.vue')
    },
    {
      path: '/notauthorized',
      name: 'notauthorized',
      component: () => import('./views/NotAuthorized.vue')
    },
  ]
})
