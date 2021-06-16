<template>
  <div class>
    <!-- 用户头像 -->
    <div class="head">
      <div v-if="!isLogin">
        <img src="http://192.168.0.127:8080/img/profile.76a75b8f.png" />
        <div class="nikename" @click="login">登录</div>
      </div>
      <div v-else>
        <img :src="userInfo.avatar" />
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
      <van-cell title="我的訂單" is-link icon="records" :to="isLogin ? '/orderlist' : '/login'" />
      <van-cell title="我的收藏" is-link icon="like-o" :to="isLogin ? '/likelist' : '/login'" />
      <van-cell title="收貨地址" is-link icon="description" :to="isLogin ? '/addresslist' : '/login'" />
      <van-cell title="用戶設置" is-link icon="setting-o" :to="isLogin ? '/setting' : '/login'" />
    </van-cell-group>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Me',
  data() {
    return {}
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
  },
  props: {},
  computed: {
    ...mapGetters(['isLogin']),
    ...mapState(['userInfo']),
  },
  created() {},
}
</script>
<style lang="less" scoped>
.head {
  height: 25vw;
  background: #f37d0f;
  color: white;
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