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
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      arr: [],
    }
  },
  methods: {
    onSubmit() {},
  },
  props: {},
  created() {
    JSON.parse(sessionStorage.getItem('cartList')).forEach((item) => {
      this.arr.push(item)
    })
  },
  computed: {
    ...mapState(['selectAddress']),
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
      return (
        this.arr.reduce((pre, curr) => (pre += curr.count * curr.price), 0) *
        100
      )
    },
    // 計算總件數
    amount() {
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