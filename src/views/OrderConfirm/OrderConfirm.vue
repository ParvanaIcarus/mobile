<template>
  <div class>
    <van-nav-bar title="確認訂單" left-text="返回" left-arrow @click-left="$router.back()" />
    <van-cell title="請選擇收貨地址" is-link class="address" to="/addresslist" />
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
export default {
  data() {
    return {
      arr: [],
    }
  },
  props: {},
  created() {
    JSON.parse(sessionStorage.getItem('cartList')).forEach((item) => {
      this.arr.push(item)
    })
    console.log(this.arr)
  },
  computed: {
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