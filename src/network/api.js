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
