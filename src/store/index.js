import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { reqUserInfo, reqCurrentPostion } from '../network/api'

export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: {},
    // 选中的地址
    selectAddress: {},
    // 定位的地址
    positionAddress: '定位中...',
  },
  mutations: {
    // 更改定位的地址
    changeAddress(state, data) {
      state.positionAddress = data
    },
    // 更改圖片
    changeAvatar() {},
    // 清空userInfo,selectAddress
    clearDate(state) {
      state.userInfo = {}
      state.selectAddress = {}
      state.positionAddress = {}
    },
    // 改變暱稱
    changeNickName(state, nickname) {
      state.userInfo.nickname = nickname
    },
    // 改变选中的地址.
    changeSelectAddress(state, data) {
      state.selectAddress = data
    },
    // 改變收貨地址
    changeAddressList(state, data) {
      let { id } = data.data
      let { addressList } = state.userInfo
      let index = addressList.findIndex((item) => item.id == id)
      switch (data.type) {
        case 'add':
          addressList.push(data.data)
          break
        case 'edit':
          addressList[index] = data.data
          break
        case 'del':
          addressList.splice(index, 1)
          break
      }
    },
    // 改變收藏
    changeLikeList(state, data) {
      let { likeList } = state.userInfo
      if (typeof data === 'object') {
        likeList.push(data)
      } else {
        state.userInfo.likeList = likeList.filter(
          (item) => item.product_id != data,
        )
      }
    },
    // 保存userInfo
    saveUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  getters: {
    isLogin(state) {
      return !!(state.userInfo.nickname || state.userInfo.id)
    },
  },
  actions: {
    // 異步獲取userInfo
    async getUserInfo(context) {
      const { data } = await reqUserInfo()
      context.commit('saveUserInfo', data)
    },
    // 获取定位
    getNowAddress(context) {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const { latitude, longitude } = coords
        const { content } = await reqCurrentPostion(latitude, longitude)
        context.commit('changeAddress', content.address_detail.city)
      })
    },
  },
  modules: {},
})
