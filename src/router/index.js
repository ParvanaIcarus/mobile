import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../views/Home'
import Me from '../views/Me/Me'
import Cart from '../views/Cart/Cart'
import Product from '../views/Product/Product'

const routes = [
  {
    path: '/',
    redirect: '/home',
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
