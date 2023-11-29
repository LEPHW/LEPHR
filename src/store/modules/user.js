import { setToken, removeToken, getToken } from '@/utils/auth'
import {login,getUserInfo} from '@/api/user'
const state = {
  token: getToken(),
  useInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token=null,
    removeToken()
  },
  setUserInfo(state,useInfo){
    state.useInfo=useInfo
  }
} 
const actions = {
  // context 上下文 传入参数
 async login(context, data) {
      // 调用登录接口
      let token=await login(data)
      context.commit('setToken',token)
  },
  async getUserInfo(context) {
      const useInfo=await getUserInfo()
      context.commit('setUserInfo',useInfo)
  },
  async logout(context) {
    context.commit('removeToken')
    context.commit('setUserInfo',{})
  }
}
export default {
  namespaced: true, 
  state,
  mutations,
  actions 
}
