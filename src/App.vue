<template>
  <div id="app">
    <Navber bgcolor="#ddd">
      <NavberItem icon="iconfont icon-dizhi" type="left">深圳</NavberItem>
      <NavberItem num="2">精選</NavberItem>
      <NavberItem icon="iconfont icon-sousuo" type="right"></NavberItem>
    </Navber>
    <!-- 加载效果. -->
    <Home></Home>
    <Tabber bgcolor="#eee">
      <tabber-item icon="iconfont icon-xingxing">精選</tabber-item>
      <tabber-item icon="iconfont icon-gouwuche">購物車</tabber-item>
      <tabber-item icon="iconfont icon-gerenzhongxin">個人</tabber-item>
    </Tabber>
  </div>
</template>
<script>
import Navber from './components/Navbar/Nav.vue'
import NavberItem from './components/Navbar/NavItem.vue'
import Tabber from './components/Tabbar/Tabbar.vue'
import TabberItem from './components/Tabbar/TabberItem.vue'
import Home from 'views/Home.vue'

export default {
  name: 'App',
  data() {
    return {
      box: '',
    }
  },
  components: {
    Navber,
    NavberItem,
    Tabber,
    TabberItem,
    Home,
  },
  methods: {},
  mounted() {},
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
}
html {
  width: 100%;
}
</style>
