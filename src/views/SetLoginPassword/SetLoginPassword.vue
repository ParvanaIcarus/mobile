<template>
  <div class>
    <van-nav-bar title="修改登錄密碼" left-text="返回" left-arrow @click-left="$router.back()" />
    <van-field v-model="oldPassword" label="舊密碼" placeholder="請輸入舊密碼" />
    <van-field v-model="newPassword" label="新密碼" placeholder="請輸入新密碼" />
    <van-button type="primary" size="large" @click="confirmChange">確認修改</van-button>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { reqUpdatePassword } from 'network/api'
export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
    }
  },
  props: {},
  methods: {
    ...mapMutations(['clearDate']),
    // 確認修改密碼
    async confirmChange() {
      if (this.oldPassword !== this.userInfo.password) {
        return this.$toast('舊密碼錯誤')
      } else if (this.newPassword.length < 5) {
        return this.$toast('密碼不能小於五位字符')
      } else {
        await reqUpdatePassword(this.oldPassword, this.newPassword)
        this.$router.push('/me')
        this.clearDate()
        sessionStorage.clear()
      }
    },
  },
  computed: {
    ...mapState(['userInfo']),
  },
}
</script>
<style scoped>
</style>