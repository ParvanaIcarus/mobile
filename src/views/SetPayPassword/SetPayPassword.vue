<template>
  <div class>
    <van-nav-bar title="修改支付密碼" left-text="返回" left-arrow @click-left="$router.back()" />
    <van-field v-model="oldPayPassword" label="舊支付密碼" placeholder="請輸入舊支付密碼" />
    <van-field v-model="newPayPassword" label="新支付密碼" placeholder="請輸入新支付密碼" />
    <van-button type="primary" size="large" @click="confirmChange">確認修改</van-button>
  </div>
</template>
<script>
import { reqUpdatePayPassword } from 'network/api'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      oldPayPassword: '',
      newPayPassword: '',
    }
  },
  props: {},
  methods: {
    ...mapMutations(['clearDate']),
    // 確認修改支付密碼
    async confirmChange() {
      if (this.oldPayPassword != this.userInfo.pay_password) {
        return this.$toast('舊支付密碼錯誤')
      } else if (this.newPayPassword.length != 6) {
        return this.$toast('新的支付密碼為六位數')
      } else {
        await reqUpdatePayPassword(this.oldPayPassword, this.newPayPassword)
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