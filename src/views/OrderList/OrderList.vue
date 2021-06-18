<template>
  <div class>
    <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="$router.back()" fixed />
    <main>
      <van-cell-group v-for="item in arr" :key="item.id">
        <van-cell :title="`訂單ID:${item.id}`" is-link @click="orderClick(item.id)" />
        <div v-for="citem in item.orderProducts" :key="citem.id" @click="ProductClick(citem.id)">
          <van-cell :title="citem.name" :value="citem.count+'件'" :icon="citem.cover" is-link />
        </div>
      </van-cell-group>
    </main>
  </div>
</template>
<script>
import { reqOrderList } from 'network/api'
export default {
  data() {
    return {
      page: 1,
      totalPage: 0,
      arr: [],
    }
  },
  methods: {
    // 得到數據
    async getData() {
      const { data } = await reqOrderList(this.page)
      this.totalPage = data.totalPage
      this.arr = this.arr.concat(data.data)
    },
    // 前往訂單詳情
    orderClick(id) {
      // this.$router.push('/orderInfo')
      this.$router.push({
        path: '/orderInfo',
        query: {
          id,
        },
      })
      // console.log(id)
    },
    // 前往商品詳情
    ProductClick(id) {
      this.$router.push({
        path: '/Product',
        query: {
          id,
        },
      })
    },
  },
  props: {},
  created() {
    this.getData()
  },
}
</script>
<style lang='less' scoped>
main {
  margin-top: 46px;
  overflow: scroll;
  img {
    font-size: 50px;
  }
  .van-cell-group {
    border-top: solid 5px #ddd;
    border-bottom: solid 5px #ddd;
  }
}
</style>