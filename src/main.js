import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
import axios from 'axios'
import moment from 'moment'
import store from './store'

// 全局配置axios
axios.defaults.baseURL = 'http://localhost:5000/'
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.filter('datefmt', (str, arg2 = "'YYYY-MM-DD HH:mm:ss'") => {
  return moment(str).format(arg2)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
