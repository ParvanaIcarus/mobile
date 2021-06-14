import { request } from './request'

// 首頁商品請求
export const reqProducts = (params) =>
  request({
    url: '/product/pagination',
    params,
  })

export const reqProductDetil = (id) =>
  request({
    url: '/product',
    params: {
      id,
    },
  })
