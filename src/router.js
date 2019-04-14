import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import {frbase} from "./setupMyFirebase.js"

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    { 
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'Login',
      component: Login  
    },
    // {
    //   path: '/' ,//+ userdata,
    //   name: 'Account',
    //   component: Account
    // },
    {
      path: '/sign-up',
      name: 'Signup',
      component: Signup
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = frbase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  if (requiresAuth && !currentUser) next('login');
  else if(!requiresAuth && currentUser) next('home');
  else next()
});

export default router;