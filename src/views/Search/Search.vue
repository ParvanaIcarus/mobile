<template>
  <div class="search">
    <van-nav-bar left-text="返回" left-arrow @click-left="$router.back()" fixed>
      <template v-slot:title>
        <van-field
          v-model="value"
          placeholder="请输入搜索关键字"
          left-icon="search"
          @input="setTime(searchKey)"
        />
      </template>
    </van-nav-bar>
    <div class="content" v-on:scroll="boxScroll" ref="box">
      <i class="iconfont icon-zhiding top" @click="totop" :style="{display:top}"></i>
      <router-link
        v-for="item in arr"
        :key="item.id"
        class="phone"
        :to="{path:'/Product',query:{id:item.id}}"
        tag="div"
      >
        <div class="img">
          <img :src="item.cover" />
        </div>
        <div class="txt">
          <p class>{{item.name}}</p>
          <span>{{item.price | filterPrice}}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { reqProducts } from 'network/api'
export default {
  data() {
    return {
      value: '',
      totalPage: 0,
      arr: [],
      top: 'none',
    }
  },
  props: {},
  methods: {
    boxScroll() {},
    totop() {},
    // 防抖函数.
    setTime(callback) {
      clearTimeout(this.time)
      this.time = setTimeout(callback, 500)
    },
    // 搜索关键字。
    async searchKey() {
      // 发请求
      if (!this.value) return
      const { data } = await reqProducts({
        key: this.value,
        page: 1,
        size: 10,
      })
      this.totalPage = data.totalPage
      if (!data.data[0]) {
        this.$toast('没有该数据...')
        this.arr = []
        return
      }
      this.arr = this.arr.concat(data.data)
    },
  },
}
</script>
<style lang='less' scoped>
.search /deep/ .van-icon {
  font-size: 20px;
}
.content {
  display: flex;
  width: 100vw;
  height: 85.5vh;
  margin-top: 12.266666666666666vw;
  margin-right: 0;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  .phone {
    position: relative;
    width: 45vw;
    height: 34vh;
    border: solid 0.1vw;
    border-radius: 1vw;
    margin-top: 1vw;
    margin-bottom: 1vw;
    .img {
      width: 90%;
      height: 70%;
      padding: 5%;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .txt {
      margin-top: 5%;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      p {
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      span {
        color: red;
      }
    }
  }
}
</style>