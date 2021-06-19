<template>
  <div class>
    <van-nav-bar
      title="选择城市"
      :left-text="address"
      fixed
      z-index="999"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <van-index-bar :sticky-offset-top="47">
      <div v-for="(value,key) in city" :key="key">
        <van-index-anchor :index="key" />
        <van-cell
          :title="item.name"
          v-for="item in value"
          :key="item.id"
          @click="select(item.name)"
        />
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import { reqCity } from 'network/api'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      city: {},
    }
  },
  props: {},
  methods: {
    ...mapMutations(['changeAddress']),
    // 更改城市列表
    select(value) {
      this.changeAddress(value)
    },
    // 获得城市列表
    async getCity() {
      const { data } = await reqCity()
      this.city = data.cities
    },
  },
  created() {
    this.getCity()
  },
  computed: {
    ...mapState(['positionAddress']),
    address() {
      if (!this.positionAddress) return
      return this.positionAddress
    },
  },
}
</script>
<style lang="less" scoped>
.van-index-bar {
  margin-top: 46px;
}
</style>