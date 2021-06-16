<template>
  <div class>
    <van-nav-bar title="購物車" left-text="返回" left-arrow @click-left="$router.back()" />
    <van-card v-for="item in arr" :key="item.product_id" :thumb="item.cover">
      <template #tags>
        <span>{{item.price}}</span>
        <van-stepper :v-model="item.count" />
      </template>
      <template #footer></template>
      <template slot="title">
        <span>{{item.title}}</span>
        <span style="float:right;" @click="removeShop(item)"></span>
      </template>
    </van-card>
    <van-submit-bar :price="0" button-text="提交订单" @submit="onSubmit">
      <template>共计:0件</template>
    </van-submit-bar>
  </div>
</template>
<script>
import { reqCart } from 'network/api'
export default {
  name: 'Cart',
  data() {
    return {
      arr: [],
    }
  },
  methods: {
    async upData() {
      const { data } = await reqCart()
      this.arr = this.arr.concat(data)
      console.log(this.arr)
    },
  },
  props: {},
  created() {
    this.upData()
  },
}
</script>
<style scoped>
</style>