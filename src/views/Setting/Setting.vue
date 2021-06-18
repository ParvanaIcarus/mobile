<template>
  <div class>
    <van-nav-bar title="用户设定" left-text="返回" left-arrow @click-left="$router.back()" />
    <van-cell-group title="基本信息">
      <van-cell title="修改暱稱" is-link icon="setting-o" to="/setNickName" />
      <van-cell title="修改頭像" is-link icon="setting-o" to="/setAvatar" />
    </van-cell-group>
    <van-cell-group title="安全">
      <van-cell title="修改登錄密碼" is-link icon="setting-o" to="/setLoginPassword" />
      <van-cell title="修改支付密碼" is-link icon="setting-o" to="/setPayPassword" />
    </van-cell-group>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {},
}
</script>
<style scoped>
</style>