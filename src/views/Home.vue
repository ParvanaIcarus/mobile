<template>
  <div class="Home">
    <!-- navbar -->
    <van-nav-bar
      title="精選"
      class
      fixed
      @click-right="$router.push('/search')"
      @click-left="$router.push('/selectCity')"
    >
      <template v-slot:left>
        <van-icon name="location-o" />
        <span>{{city}}</span>
      </template>
      <template v-slot:right>
        <van-icon name="search" />
      </template>
    </van-nav-bar>
    <!-- 加载效果. -->
    <div class="content" v-on:scroll="boxScroll" ref="box">
      <i class="iconfont icon-zhiding top" @click="totop" :style="{display:top}"></i>
      <router-link
        v-for="(item) in arr"
        :key="item.id"
        class="phone"
        :to="{path:'/Product',query:{id:item.id}}"
        tag="div"
      >
        <div class="img">
          <img v-lazy="item.cover" />
        </div>
        <div class="txt">
          <p class>{{item.name}}</p>
          <span>{{item.price | filterPrice}}</span>
        </div>
      </router-link>
    </div>
    <!-- tabbar -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="star-o" to="/home">精選</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/cart">購物車</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/me">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { reqProducts } from '../network/api'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      box: '',
      active: 0,
      arr: [],
      totalpage: '',
      loading: 'none',
      top: 'none',
      page: 1,
      flag: true,
      boxScrollData: 0,
    }
  },
  components: {},
  methods: {
    // 置頂
    totop() {
      let setId = setInterval(() => {
        this.$refs.box.scrollTop -= 30
        if (this.$refs.box.scrollTop <= 0) {
          clearInterval(setId)
        }
      })
    },
    // 盒子滾動觸發
    boxScroll(el) {
      let box = el.target
      this.top = box.scrollTop >= 400 ? 'block' : 'none'
      if (box.scrollHeight - box.clientHeight <= box.scrollTop + 2) {
        if (this.page == this.totalpage) return this.$toast('沒有更多數據了')
        if (!this.flag) return
        this.getData()
      }
    },
    async getData() {
      // this.$toast.loading({
      //   duration: 5000,
      //   message: '加载中...',
      // })
      if (!this.flag) return
      this.flag = false
      const res = await reqProducts({
        page: this.page,
        size: 10,
      })
      let { data: result } = res
      let { data } = result
      this.totalpage = data.totalPages
      let datas = data
      this.arr = this.arr.concat(datas)
      this.page++
      this.flag = true
      // this.$toast.clear()
    },
  },
  created() {
    this.getData()
  },
  activated() {
    this.$refs.box.scrollTop = this.boxScrollData
  },
  beforeRouteLeave(to, form, next) {
    this.boxScrollData = this.$refs.box.scrollTop
    next()
  },
  computed: {
    ...mapState(['positionAddress']),
    city() {
      if (!this.positionAddress) return
      return this.positionAddress
    },
  },
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
}
.content {
  display: flex;
  width: 100vw;
  height: 85.5vh;
  margin-top: 12.266666666666666vw;
  margin-right: 0;
  flex-wrap: wrap;
  justify-content: space-around;
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
.top {
  display: none;
  font-size: 10vw !important;
  position: fixed;
  right: 5vw;
  bottom: 10vh;
  z-index: 9;
}
.van-nav-bar {
  i {
    font-size: 6.4vw;
  }
}
</style>
