import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 全局的过滤
Vue.filter('filterPrice', (value) => {
  if (value) {
    return `￥${value.toFixed(2)}`
  } else {
    return
  }
})
// 获取用户信息
if (sessionStorage.getItem('token')) {
  store.dispatch('getUserInfo')
}
//获取定理定位
store.dispatch('getNowAddress')

//jsonp插件
import { VueJsonp } from 'vue-jsonp'
Vue.use(VueJsonp)

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// vant 的圖片懶加載
import { Lazyload } from 'vant'
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  error: require('./assets/img/404.jpg'),
  loading: require('./assets/img/loding.gif'),
})

import 'assets/css/font.css'
import 'assets/css/base.css'
import { request } from './network/request'

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
