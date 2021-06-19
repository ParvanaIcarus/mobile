import { reqPayOrder } from 'network/api'
import Vue from 'vue'
export default {
  data() {
    return {
      // 双向绑定了密码
      password: '',
      // 是否显示输入密码组件
      show: false,
    }
  },
  methods: {
    // 没有付款 点击了关闭按钮
    closeClick() {
      this.$router.push({
        path: '/orderInfo',
        query: { id: this.orderId },
      })
    },
    // 密码验证
    passwordInput() {
      this.$nextTick(async (_) => {
        if (this.password.length == 6) {
          if (this.userInfo.pay_password == this.password) {
            // this.orderId  // 支付密碼正確  發請求
            const { errcode, errmsg } = await reqPayOrder(
              this.orderId,
              this.password,
            )
            if (errcode !== 0) return this.$toast(errmsg)
            this.$router.push('/paySuccess')
          } else {
            // 支付密碼錯誤
            this.password = ''
            return this.$toast('支付密碼錯誤')
          }
          this.password = ''
          this.show = false
        }
      })
    },
  },
}
