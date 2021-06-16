<template>
  <div id="app">
    <keep-alive include="Home">
      <router-view />
    </keep-alive>
    <van-tabbar v-model="active" v-show="tabbarShow" @change="tabChange">
      <van-tabbar-item icon="star-o" to="/home">精選</van-tabbar-item>
      <van-tabbar-item icon="cart-o" :to="isLogin ?'/cart':'/login'">購物車</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/me">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: +sessionStorage.getItem('active') || 0,
    }
  },
  methods: {
    tabChange() {
      sessionStorage.setItem('active', this.active)
    },
  },
  computed: {
    ...mapGetters(['isLogin']),
    tabbarShow() {
      return this.$route.meta.flag
    },
  },
}
</script>

<style lang="less">
</style>
