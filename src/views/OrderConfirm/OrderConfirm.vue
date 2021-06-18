<template>
  <div class>
    <van-nav-bar title="確認訂單" left-text="返回" left-arrow @click-left="$router.back()" />
    <van-cell
      :title="title? title : `请选择收货地址`"
      :label="label ? label : ''"
      is-link
      class="address"
      to="/addresslist"
    />
    <div v-for="item in arr" :key="item.product_id">
      <van-cell
        :title="item.name.split(' ')[0]"
        :value="item.count+'件'"
        size="large"
        :label="item.price | filterPrice"
        :icon="item.cover"
      />
    </div>
    <van-submit-bar :price="totalPrice?totalPrice:0" button-text="提交订单" @submit="onSubmit">
      <template>共计:{{amount}}件</template>
    </van-submit-bar>

    <van-popup v-model="show" position="bottom" style="height:70%;width:100%">
      <van-nav-bar title="付款" @click-left="closeClick">
        <template #left>
          <van-icon name="cross" />
        </template>
      </van-nav-bar>
      <!-- 密码输入框 -->
      <van-password-input :value="password" info="密码为 6 位数字" />
      <!-- 数字键盘 -->
      <van-number-keyboard v-model="password" :show="true" @input="passwordInput" />
    </van-popup>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { reqCreateOrder, reqPayOrder } from 'network/api'
export default {
  data() {
    return {
      arr: [],
      show: false,
      password: '',
      orderId: 0,
    }
  },
  methods: {
    // 拒绝付款
    closeClick() {
      this.$router.push({
        path: '/orderInfo',
        query: { id: this.orderId },
      })
    },
    // 提交按钮
    async onSubmit() {
      if (!this.selectAddress.id) return this.$toast('请选择地址')
      let user_address_id = this.selectAddress.id
      let { arr: orderProductList } = this
      let res = await reqCreateOrder({ user_address_id, orderProductList })
      this.orderId = res.data.id
      this.show = true
    },
    // 密码验证
    passwordInput() {
      this.$nextTick(async (_) => {
        if (this.password.length == 6) {
          if (this.userInfo.pay_password == this.password) {
            // this.orderId  // 支付密碼正確  發請求
            const { errcode, errmsg } = await reqPayOrder(
              this.orderId,
              this.password
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
  props: {},
  created() {
    JSON.parse(sessionStorage.getItem('cartList')).forEach((item) => {
      this.arr.push(item)
    })
  },
  computed: {
    ...mapState(['selectAddress', 'userInfo']),
    // 选择地址的标题
    title() {
      if (!this.selectAddress.id) return false
      let { name, tel } = this.selectAddress
      return `${name},${tel}`
    },
    // 选择地址的详细地址
    label() {
      if (!this.selectAddress.id) return false
      let { address } = this.selectAddress
      return `${address}`
    },
    // 总价
    totalPrice() {
      if (!this.arr[0]) return
      return (
        this.arr.reduce((pre, curr) => (pre += curr.count * curr.price), 0) *
        100
      )
    },
    // 計算總件數
    amount() {
      if (!this.arr[0]) return
      return this.arr.reduce((pre, curr) => (pre += +curr.count), 0)
    },
  },
}
</script>
<style scoped>
.address {
  border-top: 2.5vw solid #f4f4f4;
  border-bottom: 2.5vw solid #f4f4f4;
}
.van-icon img {
  width: 50px;
  height: 50px;
}
span {
  font-size: 14px;
}
</style>