<template>
  <div class>
    <!-- 用户头像 -->
    <div class="head">
      <div>
        <img src="http://192.168.0.127:8080/img/profile.76a75b8f.png" />
        <div class="nikename">登录</div>
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
      <van-cell title="我的訂單" is-link icon="records" />
      <van-cell title="我的收藏" is-link icon="like-o" />
      <van-cell title="收貨地址" is-link icon="description" />
      <van-cell title="用戶設置" is-link icon="setting-o" />
    </van-cell-group>
  </div>
</template>
<script>
export default {
  name: 'Me',
  data() {
    return {}
  },
  props: {},
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