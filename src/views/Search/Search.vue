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
  name: 'Search',
  data() {
    return {
      // 搜索商品的关键字
      value: '',
      // 搜索关键字的中间变量
      valueCopy: '',
      // 搜索商品关键字的商品总页数
      totalPage: 2,
      // 商品数组
      arr: [],
      // 置顶
      top: 'none',
      // 页数
      page: 1,
      // 中间变量
      flag: true,
    }
  },
  props: {},
  methods: {
    boxScroll(el) {
      let box = el.target
      this.top = box.scrollTop >= 400 ? 'block' : 'none'
      if (box.scrollHeight - box.clientHeight <= box.scrollTop + 2) {
        if (this.page == this.totalpage) return this.$toast('沒有更多數據了')
        // if (this.flag) return
        this.searchKey()
      }
    },
    totop() {},
    // 防抖函数.
    setTime(callback) {
      clearTimeout(this.time)
      this.time = setTimeout(callback, 500)
    },
    // 搜索关键字。
    async searchKey() {
      // value为空时清空数组 与重置页数 不触发
      if (!this.value) {
        this.arr = []
        this.page = 1
        return
      }
      // 将第一次的值赋值给copy。
      // 值更改了的话 清空数组与页数
      if (this.value != this.valueCopy) {
        this.valueCopy = this.value
        this.arr = []
        this.page = 1
      }
      if (this.page == this.totalPage + 1) return
      if (!this.flag) return
      this.flag = false
      // 发请求
      const { data } = await reqProducts({
        key: this.value,
        page: this.page,
        size: 10,
      })
      this.page++
      // 获取当前搜索页的总数
      this.totalPage = data.totalPages
      // 搜索的商品不存在的时候清空数组
      if (!data.data[0]) {
        this.$toast('没有该数据...')
        return
      }
      this.flag = true
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
  height: calc(100vh - 46px);
  margin-top: 12.266666666666666vw;
  margin-right: 0;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  z-index: 0;
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