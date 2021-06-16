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

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/orderConfirm',
    name: OrderConfirm,
    component: OrderConfirm,
  },
  {
    path: '/likelist',
    component: LikeList,
    name: LikeList,
  },
  {
    path: '/addresslist',
    component: AddressList,
    name: AddressList,
  },
  {
    path: '/setting',
    component: Setting,
    name: Setting,
  },
  {
    path: '/orderlist',
    component: OrderList,
    name: OrderList,
  },
  {
    path: '/login',
    component: Login,
    name: Login,
  },
  {
    path: '/home',
    component: Home,
    name: Home,
    meta: {
      flag: true,
    },
  },
  {
    path: '/cart',
    component: Cart,
    name: Cart,
    meta: {
      isLogin: true,
    },
  },
  {
    path: '/me',
    component: Me,
    name: Me,
    meta: {
      flag: true,
      isLogin: true,
    },
  },
  {
    path: '/product',
    component: Product,
    name: Product,
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
