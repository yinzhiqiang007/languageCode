// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// import VueResource from 'vue-resource'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

// Vue.use(VueResource);
Vue.use(iView);

axios.defaults.baseURL = "http://localhost:8081/iot/"

Vue.config.productionTip = false
Vue.prototype.$ajax = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
