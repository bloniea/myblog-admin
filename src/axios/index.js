import axios from 'axios'
import router from '@/router'
// 添加请求拦截器

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { headers } = config
  const token = window.sessionStorage.getItem('token')
  if (token) {
    headers.Authorization = token
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response.status === 402) {
    window.sessionStorage.clear()
    return Promise.reject(

      ElMessage.error('登陆失效,请重新登陆'),
      router.push({ name: 'Login' }))
  }

  // return error.response
})
export default axios
