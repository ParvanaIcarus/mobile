import { request } from './request'

// 首頁商品請求
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

// 獲取用戶信息
export const reqUserInfo = () => request({ url: '/user/info' })
