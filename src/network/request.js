import axios from 'axios'
export const requestHome = (options) => {
  const inst = axios.create({
    baseURL: '/api/v4',
    timeout: 5000,
  })
  inst.interceptors.request.use((config) => {
    // setTimeout(() => {
    //   document.querySelector('.loading').style.display = 'none'
    // }, 2000)
    return config
  })
  inst.interceptors.response.use((res) => {
    // document.querySelector('.loading').style.display = 'block'
    return res
  })
  return inst(options)
}
