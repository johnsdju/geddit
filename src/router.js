import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Account from './views/Account.vue'
import Post from './views/Post.vue'
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
    {
      path: '/sign-up',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/post/:ukey/',
      name: 'Post',
      component: Post,
      props: true,
      meta: {
        requiresAuth: true
      }
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