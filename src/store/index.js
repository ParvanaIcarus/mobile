import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { reqUserInfo } from '../network/api'

export default new Vuex.Store({
  state: {
    userInfo: {},
  },
  mutations: {
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
  },
  modules: {},
})
