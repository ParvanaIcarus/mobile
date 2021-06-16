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

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/likelist',
    component: LikeList,
  },
  {
    path: '/addresslist',
    component: AddressList,
  },
  {
    path: '/setting',
    component: Setting,
  },
  {
    path: '/orderlist',
    component: OrderList,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
    meta: {
      flag: true,
    },
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '/me',
    component: Me,
    meta: {
      flag: true,
      // isLogin: true,
    },
  },
  {
    path: '/product',
    component: Product,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
