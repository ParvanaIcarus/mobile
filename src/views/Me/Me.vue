<template>
  <div class>
    <!-- 用户头像 -->
    <div class="head">
      <div v-if="!isLogin">
        <img src="~assets/img/profile.png" />
        <div class="nikename" @click="login">登录</div>
      </div>
      <div v-else>
        <img :src="IMGBASEURL+userInfo.avatar" />
        <div class="nikename">{{userInfo.nickname}}</div>
      </div>
    </div>
    <!-- 四宫格 -->
    <van-grid>
      <van-grid-item icon="pending-payment" text="代付款" />
      <van-grid-item icon="records" text="代发货" />
      <van-grid-item icon="tosend" text="已发货" />
      <van-grid-item icon="logistics" text="已完成" />
    </van-grid>
    <!-- 單元格 -->
    <van-cell-group>
      <van-cell title="我的訂單" is-link icon="records" to="/orderlist" />
      <van-cell title="我的收藏" is-link icon="like-o" to="/likeList" />
      <van-cell
        title="收貨地址"
        is-link
        icon="description"
        :to="{path:'/addresslist',query:{from:'me'}}"
      />
      <van-cell title="用戶設置" is-link icon="setting-o" to="/setting" />
    </van-cell-group>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="star-o" to="/home">精選</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/cart">購物車</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/me">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { IMGBASEURL } from 'network/baseUrl'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Me',
  data() {
    return {
      active: 2,
      IMGBASEURL,
    }
  },
  methods: {
    // 点击登录
    login() {
      this.$router.push('/login')
    },
  },
  computed: {
    ...mapGetters(['isLogin']),
    ...mapState(['userInfo']),
  },
}
</script>
<style lang="less" scoped>
.head {
  height: 25vw;
  background: #f37d0f;
  color: white;
  img {
    border-radius: 50%;
  }
  div:first-child {
    display: flex;
    img {
      margin-top: 3vw;
      margin-left: 5vw;
      width: 17vw;
      height: 17vw;
    }
    .nikename {
      margin-left: 3vw;
      margin-top: 8vw;
    }
  }
}
</style>