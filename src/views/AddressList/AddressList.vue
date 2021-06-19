<template>
  <div class>
    <van-nav-bar
      :title="type ?`我的收货地址` :`选择收货地址`"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <van-address-list
      :list="list"
      @add="gotoAddressEdit"
      @edit="gotoAddressEdit"
      :switchable="!type"
      @select="selectAddress"
    />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  props: {},
  methods: {
    ...mapMutations(['changeSelectAddress']),
    // 选择地址
    selectAddress(item) {
      this.changeSelectAddress(item)
      this.$router.back()
    },
    // 更改地址或新增地址
    gotoAddressEdit(item) {
      if (item) {
        // 更改地址
        this.$router.push({
          path: '/addressEdit',
          query: {
            type: 'change',
            id: item.id,
          },
        })
      } else {
        // 新增地址
        this.$router.push({
          path: '/addressEdit',
          query: {
            type: 'add',
            id: -1,
          },
        })
      }
    },
  },
  computed: {
    ...mapState(['userInfo']),
    // 製作地址列表
    list() {
      let { addressList } = this.userInfo
      if (!addressList) return
      return addressList.map((item) => {
        let { id, name, mobile: tel, province, city, country, detail } = item
        let address = province + city + country + detail
        return { id, name, tel, address }
      })
    },
    // 是否從me裡來 是為true
    type() {
      return this.$route.query.from == 'me'
    },
  },
  created() {},
}
</script>
<style scoped>
</style>