<template>
  <div>
    <div class="loading" :style="{display:loading}">
      <van-loading type="spinner" size="100px" color="blue" />
      <!-- <i class="iconfont icon-jiazai"></i> -->
    </div>
    <div class="content" v-on:scroll="boxScroll" ref="box">
      <i class="iconfont icon-zhiding top" @click="totop" :style="{display:top}"></i>
      <div v-for="(item) in arr" :key="item.id" class="phone">
        <div class="img">
          <img :src="item.cover" @error.once="imgErr($event)" />
        </div>
        <div class="txt">
          <p class>{{item.name}}</p>
          <span>￥{{item.price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reqProducts } from '@/network/api'

export default {
  data() {
    return {
      arr: [],
      totalpage: '',
      loading: 'none',
      top: 'none',
      page: 1,
    }
  },
  props: {},
  methods: {
    imgErr(event) {
      // console.log(111)
      event.target.src = './assets/img/404.jpg'
      // console.log(event.target.src)
    },
    totop() {
      let setId = setInterval(() => {
        this.$refs.box.scrollTop -= 30
        if (this.$refs.box.scrollTop <= 0) {
          clearInterval(setId)
        }
      })
    },
    boxScroll(el) {
      let box = el.target
      if (box.scrollTop >= 400) {
        this.top = 'block'
      } else {
        this.top = 'none'
      }
      if (box.scrollHeight - box.clientHeight <= box.scrollTop + 2) {
        if (this.page == this.totalpage) {
          console.log('到底了')
          return
        }
        this.page++
        this.loading = 'block'
        setTimeout(() => {
          this.loading = 'none'
        }, 2000)
        this.getData({
          url: '/product/pagination',
          params: { size: 10, page: this.page },
        })
      }
    },
    async getData(tt) {
      const res = await reqProducts(tt)
      this.totalpage = res.data.data.totalPages
      let datas = res.data.data.data
      datas.forEach((item) => {
        this.arr.push(item)
      })
    },
  },
  created() {
    this.getData({
      url: '/product/pagination',
      params: { size: 10, page: this.page },
    })
  },
}
</script>
<style lang="less" scoped>
.content {
  display: flex;
  width: 100vw;
  height: 83.5vh;
  margin-top: 15vw;
  margin-right: 0;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: scroll;
  .phone {
    position: relative;
    width: 45vw;
    height: 30vh;
    border: solid 0.1vw;
    border-radius: 1vw;
    margin-top: 1vw;
    margin-bottom: 1vw;
    .img {
      width: 100%;
      height: 70%;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .txt {
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
  font-size: 8vw;
  position: fixed;
  right: 5vw;
  bottom: 10vh;
  z-index: 9;
}
.loading {
  display: none;
  position: absolute;
  background: rgba(111, 111, 111, 0.1);
  width: 100vw;
  height: 83.5vh;
  z-index: 999;
  .van-loading {
    position: absolute;
    top: 35%;
    left: 35%;
  }
}
</style>