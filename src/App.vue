<template>
  <div id="app">
    <keep-alive include="Home">
      <router-view />
    </keep-alive>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 0,
    }
  },
  methods: {},
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
