import axios from 'axios'
import { Toast } from 'vant'
export const request = (options) => {
  const inst = axios.create({
    baseURL: '/api/v4',
    timeout: 5000,
  })
  inst.interceptors.request.use((config) => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    })
    config.headers.Authorization = sessionStorage.getItem('token')
    return config
  })
  inst.interceptors.response.use((res) => {
    Toast.clear()
    return res.data
  })
  return inst(options)
}
