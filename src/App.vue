<template>
  <div id="app">
    <keep-alive include="Home">
      <router-view />
    </keep-alive>
    <van-tabbar v-model="active" v-show="tabbarShow">
      <van-tabbar-item icon="star-o" to="/home">精選</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/cart">購物車</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/me">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    }
  },
  computed: {
    tabbarShow() {
      return this.$route.meta.flag
    },
  },
}
</script>

<style lang="less">
</style>
