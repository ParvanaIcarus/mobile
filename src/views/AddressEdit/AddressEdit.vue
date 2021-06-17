<template>
  <div class>
    <van-nav-bar
      :title="type?`新增地址`:`保存地址`"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <van-address-edit
      @save="saveAddress"
      :area-list="areaList"
      :show-delete="!type"
      show-set-default
      :address-info="addInfo"
      @delete="del"
    />
  </div>
</template>
<script>
import { areaList } from '@vant/area-data'
import { reqCreateAddress, reqUpdataAddress, reqDelAddress } from 'network/api'
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      areaList,
      list: [],
    }
  },
  methods: {
    ...mapMutations(['changeAddressList']),
    // 刪除地址
    async del() {
      let { id } = this.$route.query
      const res = await reqDelAddress(+id)
      this.changeAddressList({ type: 'del', data: { id } })
      this.$router.back()
    },
    // 更改數據或新增
    async saveAddress(content) {
      let { id } = this.$route.query
      let {
        name,
        province,
        city,
        county: country,
        addressDetail: detail,
        tel: mobile,
        areaCode: code,
      } = content
      let params = {
        name,
        province,
        city,
        country,
        detail,
        mobile,
        code,
      }
      if (this.type) {
        // 新增數據
        let res = await reqCreateAddress(params)
        let { data } = res
        this.changeAddressList({ data, type: 'add' })
        this.$router.back()
      } else {
        // 修改數據
        let res = await reqUpdataAddress(id, params)
        params.id = id
        this.changeAddressList({ data: params, type: 'edit' })
        this.$router.back()
      }
    },
  },
  props: {},
  created() {
    // if (this.$route.query.id) {
    //   console.log(
    //     this.userInfo.addressList.find(
    //       (item) => item.id == this.$route.query.id
    //     )
    //   )
    // }
  },
  computed: {
    ...mapState(['userInfo']),
    // 判斷是否新增，是為true，否則為false
    type() {
      return this.$route.query.type == 'add'
    },
    //选择了的收货地址

    // 拼串 放入到页面地址栏里
    addInfo() {
      if (this.type) return {}
      if (!this.userInfo.addressList) return
      const { id } = this.$route.query
      let item = this.userInfo.addressList.find((item) => item.id == id)
      if (!item) return
      let {
        name,
        mobile: tel,
        province,
        city,
        country: county,
        detail: addressDetail,
      } = item
      return { id, name, tel, province, city, county, addressDetail }
    },
  },
}
</script>
<style scoped>
</style>