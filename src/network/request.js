import axios from 'axios'
export const request = (options) => {
  const inst = axios.create({
    baseURL: '/api/v4',
    timeout: 5000,
  })
  inst.interceptors.request.use((config) => {
    config.headers.Authorization = sessionStorage.getItem('token')
    return config
  })
  inst.interceptors.response.use((res) => {
    return res.data
  })
  return inst(options)
}
