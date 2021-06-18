<template>
  <div class>
    <van-nav-bar title="修改暱稱" left-text="返回" left-arrow @click-left="back" />
    <van-field v-model="userInfo.nickname" label="暱稱" placeholder="请输入用户名" @input="changeData" />
    <van-button type="primary" size="large" @click="confirmChange">確認修改</van-button>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { reqSettingNickname } from 'network/api'
export default {
  data() {
    return {
      nickname: '',
    }
  },
  props: {},
  methods: {
    ...mapMutations(['changeNickName']),
    // 返回按鈕
    back() {
      this.changeNickName(this.nickname)
      this.$router.back()
    },
    // 更改數據
    changeData(value) {
      this.changeNickName(value)
    },
    // 確認修改
    async confirmChange() {
      await reqSettingNickname(this.userInfo.nickname)
      this.$router.replace('/me')
    },
  },
  created() {
    this.nickname = this.userInfo.nickname
  },
  computed: {
    ...mapState(['userInfo']),
  },
}
</script>
<style scoped>
</style>