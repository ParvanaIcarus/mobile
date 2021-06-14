import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.filter('filterPrice', (value) => {
  if (value) {
    return `￥${+value.toFixed(2)}`
  } else {
    return
  }
})

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import 'assets/css/font.css'
import 'assets/css/base.css'

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
