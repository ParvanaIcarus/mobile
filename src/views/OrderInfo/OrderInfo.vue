<template>
  <div class>
    <van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="$router.back()" />
    <van-steps :active="OrderObj.order_status">
      <van-step>未付款</van-step>
      <van-step>已付款</van-step>
      <van-step>已发货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
    <!-- 地址 -->
    <van-cell :title="title" :label="label" class="address" />
    <div v-for="item in OrderObj.orderProducts" :key="item.product_id">
      <van-cell
        :title="item.name.split(' ')[0]"
        :value="item.count+'件'"
        size="large"
        :label="item.price | filterPrice"
        :icon="item.cover"
      />
    </div>
    <div class="footer">
      <div class="price">
        合计:
        <span style="color:red;">{{totalPrice | filterPrice}}</span>
      </div>
      <div>
        <van-button type="primary" @click="pay">付款</van-button>
      </div>
    </div>
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
import { reqOrderInfo } from 'network/api'
export default {
  data() {
    return {
      show: false,
      id: 0,
      OrderObj: {},
    }
  },
  props: {},
  methods: {
    // 付款
    pay() {
      this.show = true
    },
    // 关闭
    closeClick() {
      this.show = false
    },
    // 获取数据
    async getData() {
      const res = await reqOrderInfo(this.id)
      this.OrderObj = res.data
    },
  },
  created() {
    this.id = this.$route.query.id
    this.getData()
  },
  computed: {
    // 计算 title 名字
    title() {
      if (!this.OrderObj.userAddress) return
      let { name, mobile } = this.OrderObj.userAddress
      return `${name},${mobile}`
    },
    // 计算 label 地址
    label() {
      if (!this.OrderObj.userAddress) return
      let { province, city, country, detail } = this.OrderObj.userAddress
      return `${province} ${city} ${country} ${detail}`
    },
    // 计算总价
    totalPrice() {
      if (!this.OrderObj.orderProducts) return
      return this.OrderObj.orderProducts.reduce(
        (pre, curr) => (pre += curr.count * curr.price),
        0
      )
    },
  },
}
</script>
<style lang="less" scoped>
.address {
  border-top: 10px solid rgba(150, 150, 150, 0.1);
  border-bottom: 10px solid rgba(150, 150, 150, 0.1);
}
.van-icon img {
  font-size: 50px;
}
.footer {
  padding: 0 20px;
  display: flex;
  position: fixed;
  width: 90%;
  height: 50px;
  left: 0;
  bottom: 0;
  justify-content: space-between;
  align-items: center;
}
</style>