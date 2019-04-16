import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
//import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {frbase} from "./setupMyFirebase.js"
import moment from 'moment';

Vue.config.productionTip = false

let app = '';
frbase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
})

Vue.use(BootstrapVue)

Vue.use(require('vue-moment'));