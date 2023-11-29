import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getUserInfo(){
  return request({
    url:'/sys/profile',
    // 默认方法就是get 可以省略不写
    // method:'get'
  })
}