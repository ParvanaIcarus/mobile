<template>
  <div class>
    <!-- navbar -->
    <van-nav-bar title="確認訂單" left-text="返回" left-arrow @click-left="$router.back()" />
    <!-- 选择收货地址栏 -->
    <van-cell
      :title="title? title : `请选择收货地址`"
      :label="label ? label : ''"
      is-link
      class="address"
      to="/addresslist"
    />
    <!-- 循环订单商品 -->
    <div v-for="item in arr" :key="item.product_id">
      <van-cell
        :title="item.name.split(' ')[0]"
        :value="item.count+'件'"
        size="large"
        :label="item.price | filterPrice"
        :icon="item.cover"
      />
    </div>
    <!-- 底部 订单详情与提交订单 -->
    <van-submit-bar :price="totalPrice?totalPrice:0" button-text="提交订单" @submit="onSubmit">
      <template>共计:{{amount}}件</template>
    </van-submit-bar>

    <!-- 隐藏的付款栏 -->
    <van-popup v-model="show" position="bottom" style="height:70%;width:100%">
      <!-- 支付密码 navbar -->
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
import { reqCreateOrder } from 'network/api'
import passwordFunction from 'mixin/passwordFunction.js'
export default {
  data() {
    return {
      arr: [],
      orderId: 0,
    }
  },
  methods: {
    // 提交按钮
    async onSubmit() {
      if (!this.selectAddress.id) return this.$toast('请选择地址')
      let user_address_id = this.selectAddress.id
      let { arr: orderProductList } = this
      let res = await reqCreateOrder({ user_address_id, orderProductList })
      this.orderId = res.data.id
      this.show = true
    },
  },
  props: {},
  mixins: [passwordFunction],
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