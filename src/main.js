import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import 'assets/css/font.css'
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
