import Vue from 'vue'
import App from './App.vue'
import router from './router' //前端路由
import './quasar' //UI框架
import axios from './axios' //http通信api封装
import './quasar'
Vue.config.productionTip = false

new Vue({
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
