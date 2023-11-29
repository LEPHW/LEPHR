import router from "@/router"
// 进度条
import nProgress from "nprogress"
import 'nprogress/nprogress.css'
import store from "@/store"
 /**
  *前置守卫 
  *
 */
// 白名单 不进行跳转
const whiteList=['/login','/404']
router.beforeEach(async(to,from,next) => {
  // 打开进度条
  nProgress.start()
  // 存在token 即表示已经登录过了 ，判断当前页  to即为当前页
  if(store.getters.token){
    // 当前不需要再次登录 登录页直接跳转至首页
    if(to.path === "/login") {
        next('/')  // 跳转到主页   '/'  重定向至首页
        // next(地址) next存在地址 不会自动执行后置守卫  没有地址会自动执行后置守卫 
        // 手动关闭进度条
        nProgress.done()
    } else {
        // 其他页面 放行
        // 判断是否已经获取过用户资料 没有则获取
        // 目的：刷新页面，自动获取用户资料 实现数据资料的永久化
        if(!store.getters.userId){
          // await 等待获取完毕再执行后面程序  
          await store.dispatch('user/getUserInfo')
        }
        next()  // 放行
    }
  } else {
    // 没有token 跳转至登录页
    if(whiteList.includes(to.path)){
      //白名单 放行
      next()  
    } else {
      // 其他页面,跳转至登录页
      next('/login')
      // 关闭进度条
      nProgress.done()
    }
  }
})


   
 /**
  *后置守卫 
  *
 */
router.afterEach(() => {
  // 关闭进度条
  nProgress.done()
})