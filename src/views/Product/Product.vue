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
      <van-goods-action-icon icon="like-o" text="收藏" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>
<script>
import { reqProductDetil } from '../../network/api'
export default {
  name: 'Product',
  data() {
    return {
      id: 0,
      productData: '',
      active: 0,
    }
  },
  props: {},
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async getMsg() {
      const res = await reqProductDetil(this.$route.query.id)
      let { data: result } = res
      let { data } = result
      this.productData = data
    },
  },
  created() {
    this.getMsg()
  },
}
</script>
<style lang="less" scoped>
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