<template>
  <div class>
    <van-nav-bar title="登錄" left-text="返回" left-arrow @click-left="$router.back()" />
    <van-form @submit="submit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' },rules.username]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' },rules.password]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { reqLogin } from 'network/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      username: '',
      password: '',
      rules: {
        username: {
          validator: (value) => value.trim().length >= 3,
          message: '最少需要三個字符',
        },
        password: {
          validator: (value) => value.trim().length >= 5,
          message: '最少需要五個字符',
        },
      },
    }
  },
  props: {},
  methods: {
    ...mapMutations(['saveUserInfo']),
    async submit() {
      const res = await reqLogin(this.username, this.password)
      // if (res.errcode !== 0) return this.$toast(res.errmsg)
      sessionStorage.setItem('token', res.data.token)
      this.saveUserInfo(res.data)
      this.$router.back()
    },
  },
  computed: {},
}
</script>
<style scoped>
</style>