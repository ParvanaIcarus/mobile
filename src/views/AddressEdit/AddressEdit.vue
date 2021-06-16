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
    />
  </div>
</template>
<script>
import { areaList } from '@vant/area-data'
import { reqCreateAddress } from 'network/api'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      areaList,
    }
  },
  methods: {
    ...mapMutations(['changeAddressList']),
    async saveAddress(content) {
      console.log(content)
      let {
        name,
        province,
        city,
        county: country,
        detail,
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
        // name:收货人名称
        // province:省份
        // city: 城市名称
        // country:区或者县
        // detail:详细地址门牌号
        // mobile: 联系电话
        // code:区域编码
        // default:是否为默认地址(1为是，0为否,默认为0)
        // let data = {address,}
        let res = await reqCreateAddress(params)
        let { data } = res
        this.changeAddressList(data)
        this.$router.back()
      } else {
        // 修改數據
      }
    },
  },
  props: {},
  created() {},
  computed: {
    // 判斷是否新增，是為true，否則為false
    type() {
      return this.$route.query.type == 'add'
    },
  },
}
</script>
<style scoped>
</style>