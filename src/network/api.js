import { request } from './request'
import Vue from 'vue'

// 商品分页与搜索
export const reqProducts = (params) =>
  request({
    url: '/product/pagination',
    params,
  })
// 商品詳情信息
export const reqProductDetil = (id) =>
  request({
    url: '/product',
    params: {
      id,
    },
  })

// 登錄 /user/signin
export const reqLogin = (name, password) =>
  request({
    url: '/user/signin',
    method: 'post',
    data: {
      name,
      password,
    },
  })

// 獲取收藏列表 /product_like/create
export const reqAddLike = (product_id) =>
  request({
    url: '/product_like/create',
    method: 'post',
    data: {
      product_id,
    },
  })

// 取消收藏  /product_like/delete
export const reqDelLike = (product_id) =>
  request({
    url: '/product_like/delete',
    params: {
      product_id,
    },
  })

// 獲取用戶信息 /user/info
export const reqUserInfo = () => request({ url: '/user/info' })

// 获取购物车 /cart/all
export const reqCart = () => request({ url: '/cart/all' })

// 添加購物車 /cart/update
export const reqAddCart = (product_id) =>
  request({ url: '/cart/update', method: 'post', data: { product_id } })

// 更新購物車 /cart/update
export const reqUpdataCart = (data) =>
  request({ url: '/cart/update', method: 'post', data })

// 刪除購物車 /cart/delete
export const reqDelCart = (product_id) =>
  request({ url: '/cart/delete', params: { product_id } })

// 增加收貨地址 /user_address/create
export const reqCreateAddress = (data) =>
  request({ url: '/user_address/create', method: 'post', data })

// 修改收貨地址 /user_address/update
export const reqUpdataAddress = (id, data) =>
  request({
    url: '/user_address/update?id=' + id,
    method: 'post',
    data: { data },
  })

// 刪除收貨地址 /user_address/delete
export const reqDelAddress = (id) =>
  request({
    url: '/user_address/delete?id=' + id,
  })

// 下单 /order/create
export const reqCreateOrder = (data) =>
  request({
    url: '/order/create',
    method: 'post',
    data,
  })

// 获取订单信息  /order
export const reqOrderInfo = (id) =>
  request({
    url: '/order?id=' + id,
  })

//付款 /order/pay
export const reqPayOrder = (order_id, pay_password) =>
  request({
    url: '/order/pay?order_id=' + order_id,
    method: 'post',
    data: {
      pay_password,
    },
  })

// 獲取訂單分頁 /order/pagination
export const reqOrderList = (page) =>
  request({
    url: '/order/pagination',
    params: {
      page,
      size: 10,
    },
  })

// 修改用戶基本信息 /user/setting
export const reqSettingNickname = (nickname) =>
  request({
    url: '/user/setting',
    method: 'post',
    data: {
      nickname,
    },
  })

// 修改登錄密碼 /user/updatePassword
export const reqUpdatePassword = (password, newPassword) =>
  request({
    url: '/user/updatePassword',
    method: 'post',
    data: {
      password,
      newPassword,
    },
  })

// 修改支付密碼 /user/updatePayPassword
export const reqUpdatePayPassword = (password, newPassword) =>
  request({
    url: '/user/updatePayPassword',
    method: 'post',
    data: {
      password,
      newPassword,
    },
  })

// 修改用戶頭像 /user/avatar
export const reqAvatar = (avatar) =>
  request({
    url: '/user/avatar',
    method: 'post',
    data: avatar,
  })

// 获取带字母的城市列表 /data/city
export const reqCity = () =>
  request({
    url: '/data/city',
  })

// 获取地理位置
export const reqCurrentPostion = (latitude, longitude) =>
  Vue.prototype.$jsonp(
    `https://api.map.baidu.com/location/ip?ak=rFpmltbYjQ01vjahH2zVLKVXfmx2RQWS&coor=${latitude},${longitude}`,
  )
