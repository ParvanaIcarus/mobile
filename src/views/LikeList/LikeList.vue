<template>
  <div class>
    <van-nav-bar title="我的收藏" left-text="返回" left-arrow @click-left="$router.back()" />
    <main v-for="item in likeList" :key="item.product_id">
      <van-cell
        @click="itemClick(item.product_id)"
        :title="item.name.split(' ')[0]"
        is-link
        :icon="item.cover"
        :label="item.price | filterPrice"
      />
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  props: {},
  methods: {
    // 收藏列表商品被點擊了
    itemClick(id) {
      this.$router.push({
        path: '/Product',
        query: {
          id,
        },
      })
    },
  },
  computed: {
    ...mapState(['userInfo']),
    likeList() {
      if (!this.userInfo.likeList) return
      return this.userInfo.likeList
    },
  },
}
</script>
<style lang="less" scoped>
main {
  .van-cell {
    padding: 20px 15px;
  }
  img {
    height: 50px;
    width: 50px;
  }
}
</style>