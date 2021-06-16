<template>
  <div class="mainScroll">
    <!-- navbar -->
    <van-nav-bar title="商品詳情頁" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="blue">
      <van-swipe-item v-for="item in productData.imgList" :key="item.id">
        <img :src="item.path" />
      </van-swipe-item>
    </van-swipe>
    <!-- 商品标题及信息 -->
    <div class="title">
      <div class="bor_b">
        <p>{{productData.name}}</p>
        <span>{{productData.price | filterPrice}}</span>
      </div>
      <van-row class="bor_b">
        <van-col span="10">免运费</van-col>
        <van-col span="14">库存剩余:{{productData.stock ? productData.stock : 0}}</van-col>
      </van-row>
      <van-row class="bor_b">
        <van-col span="10">销量:{{productData.sales}}</van-col>
        <van-col span="14">收藏:{{productData.likes}}</van-col>
      </van-row>
    </div>
    <!-- 图片及参数框架 -->
    <van-tabs v-model="active" sticky offset-top="46">
      <van-tab title="图片">
        <div v-for="item in productData.detailImgList" :key="item.id">
          <img :src="item.path" />
        </div>
      </van-tab>
      <van-tab title="参数">
        <van-row class="parameter bor_b" v-for="item in productData.properties" :key="item.id">
          <van-col span="10">{{item.name}}</van-col>
          <van-col span="14">{{item.detail}}</van-col>
        </van-row>
      </van-tab>
    </van-tabs>
    <!-- 底部购物功能 -->
    <van-goods-action>
      <van-goods-action-icon :icon="isLike ? 'like' : 'like-o'" text="收藏" @click="likeClick" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="cartClick" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
      <van-goods-action-button type="danger" text="立即购买" @click="buyClick" />
    </van-goods-action>
  </div>
</template>
<script>
import {
  reqProductDetil,
  reqAddLike,
  reqDelLike,
  reqAddCart,
} from '../../network/api'
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  name: 'Product',
  data() {
    return {
      productData: {},
      active: 0,
    }
  },
  props: {},
  methods: {
    ...mapMutations(['changeLikeList']),
    // 點擊購買
    buyClick() {
      if (!this.isLogin) return this.$router.push('/login')
      let { id: product_id, cover, name, price } = this.productData
      sessionStorage.setItem(
        'cartList',
        JSON.stringify([{ product_id, cover, name, price, count: 1 }])
      )
      console.log(this.productData)
      this.$router.push('orderConfirm')
    },
    // 點擊加入購物車
    async addCart() {
      if (!this.isLogin) return this.$router.push('/login')
      let id = this.$route.query.id
      await reqAddCart(id)
    },
    // 是否收藏
    async likeClick() {
      if (!this.isLogin) return this.$router.push('/login')
      let { id: product_id } = this.$route.query
      if (this.isLike) {
        // 目前收藏了，需要取消收藏
        let { errcode } = await reqDelLike(product_id)
        // if (errcode !== 0) return //一直是90101
        this.changeLikeList(product_id)
      } else {
        // 沒有收藏，需要收藏
        let { errcode } = await reqAddLike(product_id)
        let { name, cover, price } = this.productData
        // if (errcode !== 0) return //一直是90101
        this.changeLikeList({ name, cover, price, product_id })
      }
    },
    // 返回
    onClickLeft() {
      this.$router.back()
    },
    // 前往購物車
    cartClick() {
      this.$router.push('/cart')
    },
    // 獲取商品信息
    async getMsg() {
      const { data } = await reqProductDetil(this.$route.query.id)
      this.productData = data
    },
  },
  created() {
    this.getMsg()
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['isLogin']),
    isLike() {
      let { likeList } = this.userInfo
      if (!likeList) return
      return likeList.some((item) => item.product_id == this.$route.query.id)
    },
  },
}
</script>
<style lang="less" scoped>
.van-goods-action /deep/ .van-icon-like {
  color: red;
}
.van-swipe {
  margin-top: 46px;
  width: 100vw;
  height: 300px;
  img {
    width: 100vw;
    height: 100%;
  }
}
.title {
  padding: 10px 16px;
  p {
    font-size: 14.04px;
    line-height: 24px;
  }
  span {
    display: block;
    padding-bottom: 10px;
    color: #f50;
    font-size: 12px;
  }
  .van-row {
    padding: 10px 0;
    font-size: 12px;
  }
}
.van-tabs {
  img {
    width: 100vw;
  }
}
.parameter {
  font-size: 12px;
  padding: 10px 16px;
}
.van-tab {
  img {
    width: 100vw;
    height: 100%;
  }
}
.mainScroll {
  height: calc(100% -50px) !important;
}
</style>