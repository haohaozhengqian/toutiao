import request from "@/utils/requset"
import store from "@/store/index.js"
//登录的方法
export const login=(data)=>{
  return request({
    url:'/app/v1_0/authorizations',
    method:'POST',
    data:data
  })
}
//获取验证法的方法
export const sendSms=mobile=>{
  return request({
    url:`/app/v1_0/sms/codes/${mobile}`
  })
}
//获取用户自己信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
/**
 * 获取用户自己的信息
 */
 export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
//获取用户个人资料
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}