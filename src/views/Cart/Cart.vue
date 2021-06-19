<template>
  <div class="cart">
    <van-nav-bar title="購物車" left-text="返回" left-arrow @click-left="$router.back()" />
    <main v-if="arrLength">
      <van-icon name="warning-o" />
      <span>您的购物车为空</span>
    </main>
    <van-checkbox
      v-model="item.checked"
      v-for="item in arr"
      :key="item.product_id"
      @change="changeChecked(item.product_id,item.checked)"
    >
      <van-card :price="item.price.toFixed(2)" :title="item.name" :thumb="item.cover" @click.stop>
        <template v-slot:num>
          <van-stepper
            v-model="item.count"
            disable-input
            @change="changeCount(item.product_id, item.count)"
          />
          <van-tag type="danger" size="large" @click="delItem(item.product_id)">删除</van-tag>
        </template>
      </van-card>
    </van-checkbox>
    <van-submit-bar :price="totalPrice?totalPrice:0" button-text="提交订单" @submit="onSubmit">
      <template>共计:{{amount?amount:0}}件</template>
    </van-submit-bar>
  </div>
</template>
<script>
import { reqCart, reqUpdataCart, reqDelCart } from 'network/api'
import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  data() {
    return {
      arr: [],
      checked: 0,
    }
  },
  methods: {
    // 刪除該項購物車
    async delItem(product_id) {
      await reqDelCart(product_id)
      let index = this.arr.findIndex((item) => item.product_id == product_id)
      this.arr.splice(index, 1)
    },
    // 改變狀態
    async changeChecked(product_id, checked) {
      let res = await reqUpdataCart({ product_id, checked: checked ? 1 : 0 })
    },
    // 改變count
    async changeCount(product_id, count) {
      await reqUpdataCart({ product_id, count })
    },
    // 提交
    onSubmit() {
      sessionStorage.setItem(
        'cartList',
        JSON.stringify(
          this.arr
            .filter((item) => item.checked)
            .map((item) => {
              const { product_id, cover, name, price, count } = item
              return { product_id, cover, name, price, count }
            })
        )
      )
      this.$router.push('/orderConfirm')
    },
    // 獲取購物車數據
    async upData() {
      const { data } = await reqCart()
      this.arr = this.arr.concat(data)
    },
  },
  props: {},
  created() {
    this.upData()
  },
  computed: {
    // 购物车有没有数据 true 为没有数据
    arrLength() {
      return !this.arr[0]
    },
    // 計算總價
    totalPrice() {
      if (this.arrLength) return
      return (
        this.arr
          .filter((item) => item.checked == 1)
          .reduce((pre, curr) => (pre += curr.count * curr.price), 0) * 100
      )
    },
    // 計算總件數
    amount() {
      if (this.arrLength) return
      return this.arr
        .filter((item) => item.checked == 1)
        .reduce((pre, curr) => (pre += +curr.count), 0)
    },
  },
}
</script>
<style lang="less" scoped>
.van-checkbox {
  padding-left: 4vw;
}
.cart /deep/ .van-checkbox__label {
  margin-top: 2vw;
  width: 90%;
}
.van-card__price {
  color: #ff5500;
}
main {
  background: #eee;
  color: #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 96px);
  i {
    font-size: 50px;
  }
  span {
    font-size: 30px;
  }
}
</style>