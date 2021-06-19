import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../views/Home'
import Me from '../views/Me/Me'
import Cart from '../views/Cart/Cart'
import Product from '../views/Product/Product'
import Login from 'views/Login/Login'
import OrderList from 'views/OrderList/OrderList'
import Setting from 'views/Setting/Setting'
import AddressList from 'views/AddressList/AddressList'
import LikeList from 'views/LikeList/LikeList'
import OrderConfirm from 'views/OrderConfirm/OrderConfirm'
import AddressEdit from 'views/AddressEdit/AddressEdit'
import OrderInfo from 'views/OrderInfo/OrderInfo'
import PaySuccess from 'views/PaySuccess/PaySuccess'
import SetAvatar from 'views/SetAvatar/SetAvatar'
import SetLoginPassword from 'views/SetLoginPassword/SetLoginPassword'
import SetPayPassword from 'views/SetPayPassword/SetPayPassword'
import SetNickName from 'views/SetNickName/SetNickName'
import Search from 'views/Search/Search'
import SelectCity from 'views/SelectCity/SelectCity'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/selectCity',
    name: 'SelectCity',
    component: SelectCity,
  },
  {
    path: '/setNickName',
    name: 'SetNickName',
    component: SetNickName,
    meta: {
      isLogin: true,
    },
  },
  {
    path: '/setPayPassword',
    name: 'SetPayPassword',
    component: SetPayPassword,
    meta: {
      isLogin: true,
    },
  },
  {
    path: '/setLoginPassword',
    name: 'SetLoginPassword',
    component: SetLoginPassword,
    meta: {
      isLogin: true,
    },
  },
  {
    path: '/setAvatar',
    name: 'SetAvatar',
    component: SetAvatar,
    meta: {
      isLogin: true,
    },
  },
  {
    path: '/orderConfirm',
    name: 'OrderConfirm',
    component: OrderConfirm,
  },
  {
    path: '/paySuccess',
    name: 'PaySuccess',
    component: PaySuccess,
  },
  {
    path: '/orderInfo',
    name: 'OrderInfo',
    component: OrderInfo,
    meta: {
      isLogin: true,
    },
  },
  {
    path: '/addressEdit',
    name: 'AddressEdit',
    component: AddressEdit,
    meta: {
      isLogin: true,
    },
  },
  {
    path: '/likeList',
    component: LikeList,
    name: 'LikeList',
    meta: {
      isLogin: true,
    },
  },
  {
    path: '/addresslist',
    component: AddressList,
    name: 'AddressList',
    meta: {
      isLogin: true,
    },
  },
  {
    path: '/setting',
    component: Setting,
    name: 'Setting',
    meta: {
      isLogin: true,
    },
  },
  {
    path: '/orderlist',
    component: OrderList,
    name: 'OrderList',
    meta: {
      isLogin: true,
    },
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
  },
  {
    path: '/home',
    component: Home,
    name: 'Home',
    meta: {
      flag: true,
    },
  },
  {
    path: '/cart',
    component: Cart,
    name: 'Cart',
    meta: {
      isLogin: true,
    },
  },
  {
    path: '/me',
    component: Me,
    name: 'Me',
    meta: {
      flag: true,
    },
  },
  {
    path: '/product',
    component: Product,
    name: 'Product',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    //判断是否已经登录 登录了就过去
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  } else {
    //不需要登录的路由组件
    next()
  }
})

export default router
