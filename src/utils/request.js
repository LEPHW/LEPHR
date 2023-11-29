import axios from "axios"
import store from '@/store/index'
import { Message } from 'element-ui'
import router from "@/router"
const service = axios.create({
  // baseURL: '/api',  //  基地址  开头会自动补齐代理服务器的地址
  baseURL: process.env.VUE_APP_BASE_API,  //适配开发环境与生产环境的基地址
  timeout: 10000 
})
//请求拦截器  参数为两个回调函数，前为成功拦截  后为失败拦截
service.interceptors.request.use((config) => {
  // 注入token
  if(store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token }`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use((response) => {
  //解构返回的数据
  const { data, message, success } = response.data
  if(success) {
    return data
  } else {
    return Promise.reject(new Error(message))
  }
},async (error) => {
  //提示错误信息 
  // 查看返回的信息 error.response
  //  console.log(error.response);
  // 状态码401，跳转至登录页
  console.log(error.response);
  if(error.response.request.status === 401) {
    await store.dispatch('user/logout')
    router.push('/login')
  }
  Message({ type:'error',message: error.response.data.message })
  return Promise.reject(error)
})
export default service