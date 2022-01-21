// 请求模块
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store/index'
const request = axios.create({
  baseURL: 'http://www.liulongbin.top:8000' // 基础路径
})
// 请求拦截器
// 注意：在我们的项目中，是基于 instance 实例来发起 ajax 请求的，因此一定要为 instance 实例绑定请求拦截器
request.interceptors.request.use(
  config => {
    // 展示 loading 效果
    Toast.loading({
      message: '加载中...', // 文本内容
      duration: 1000 // 展示时长(ms)，值为 0 时，toast 不会消失
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器（注意：响应拦截器也应该绑定给 instance 实例）
request.interceptors.response.use(
  response => {
    // 隐藏 loading 效果
    Toast.clear()
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
request.interceptors.request.use(
  config => {
    // 1. 获取 token 值
    const tokenStr = store.state.tokenInfo
    // 2. 判断 tokenStr 的值是否为空
    if (tokenStr) {
      // 3. 如果 tokenStr 的值不为空， 则为这次请求的请求头添加 Authorization 身份认证字段
      config.headers.Authorization = `Bearer ${tokenStr.token}`
      console.log(config)
      console.log(config.headers.Authorization)
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default request
